// Public, read-only access to partner portal data in Payload.
// Server-side only. Every public read goes through this file, so the
// "published only" and "public fields only" rules live in one place.
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

import type { Company, Opportunity } from '@/payload-types'
import { PARTNERS_CACHE_TAG } from './cacheTags'

export type PortalCompany = Pick<Company, 'id' | 'name' | 'slug' | 'logo' | 'category' | 'description'>

export type PublicOpportunity = Pick<Opportunity, 'id' | 'title' | 'description' | 'deadline' | 'applicationLink'>

export type PartnerPageData = Pick<
  Company,
  | 'id'
  | 'name'
  | 'slug'
  | 'logo'
  | 'category'
  | 'description'
  | 'aboutCompany'
  | 'partnerPortalVideo'
  | 'whyPartner'
  | 'collaboration'
  | 'whyJoin'
> & { opportunities: PublicOpportunity[] }

// Why unstable_cache: it saves each database answer and reuses it until a save in
// /admin clears it (see PARTNERS_CACHE_TAG). Next.js 16 docs call it the older way
// ("replaced by 'use cache'") but still support it for sites that don't turn on the
// cacheComponents setting, which this site doesn't. Turning that setting on changes
// how every page is built, so the switch to 'use cache' + cacheTag is left for the
// site revamp. Docs: node_modules/next/dist/docs/01-app/02-guides/caching-without-cache-components.md
//
// Access rules stay closed for the public API; these trusted server reads
// bypass them (overrideAccess: true) and filter themselves instead.
const fetchPortalCompanies = unstable_cache(
  async (): Promise<PortalCompany[]> => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'companies',
      overrideAccess: true,
      depth: 0,
      pagination: false,
      // Oldest first keeps the seeded card order (MAS, Cargills, Ceylinco Life)
      sort: 'createdAt',
      select: { name: true, slug: true, logo: true, category: true, description: true },
    })
    return docs
  },
  ['portal-companies'],
  { tags: [PARTNERS_CACHE_TAG] },
)

const fetchPartnerPage = unstable_cache(
  async (slug: string): Promise<PartnerPageData | null> => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'companies',
      overrideAccess: true,
      depth: 0,
      limit: 1,
      where: { slug: { equals: slug } },
      select: {
        name: true,
        slug: true,
        logo: true,
        category: true,
        description: true,
        aboutCompany: true,
        partnerPortalVideo: true,
        whyPartner: true,
        collaboration: true,
        whyJoin: true,
      },
    })
    const company = docs[0]
    if (!company) return null

    const opportunities = await payload.find({
      collection: 'opportunities',
      overrideAccess: true,
      // Never read drafts; a never-published opportunity also has _status 'draft'
      draft: false,
      depth: 0,
      pagination: false,
      where: {
        and: [{ company: { equals: company.id } }, { _status: { equals: 'published' } }],
      },
      // Oldest first matches the order in constants/patners.ts
      sort: 'createdAt',
      select: { title: true, description: true, deadline: true, applicationLink: true },
    })

    return { ...company, opportunities: opportunities.docs }
  },
  ['partner-page'],
  { tags: [PARTNERS_CACHE_TAG] },
)

// Returns null when the database can't be reached, so the portal can show a message
export async function getPortalCompanies(): Promise<PortalCompany[] | null> {
  try {
    return await fetchPortalCompanies()
  } catch (error) {
    console.error('[partners] Failed to load portal companies', error)
    return null
  }
}

// Returns null for an unknown slug; database errors are thrown to the page's error.tsx
export async function getCompanyWithOpportunities(slug: string): Promise<PartnerPageData | null> {
  return fetchPartnerPage(slug)
}
