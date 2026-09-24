// Copies the partners shown on /partner-portal (from constants/patners.ts) into Payload.
// Safe to re-run: companies are matched by slug and opportunities by title,
// so existing records are updated instead of duplicated.
// Run with: npm run seed
import { getPayload } from 'payload'

import config from '../payload.config'
import { nationalPartners } from '../constants/patners'

// Only the partners currently featured on /partner-portal
const PORTAL_SLUGS = ['mas', 'cargills', 'ceylinco-life']

// Short card texts from the old hard-coded PartnersSection (description is empty in constants)
const CARD_DESCRIPTIONS: Record<string, string> = {
  mas: "South Asia's largest design-to-delivery solution provider in apparel and textile manufacturing. Explore opportunities and join our team!",
  cargills:
    "A cornerstone of Sri Lanka's economy with over 180 years of heritage across Retail, FMCG, Restaurants, and more. Discover part-time opportunities!",
  'ceylinco-life':
    "Sri Lanka's leading life insurance company with over 37 years of helping people achieve their aspirations. Explore internship opportunities!",
}

// The seed runs outside Next.js, so skip cache revalidation hooks
const context = { disableRevalidate: true }

const payload = await getPayload({ config })

let companiesCreated = 0
let companiesUpdated = 0
let opportunitiesCreated = 0
let opportunitiesUpdated = 0

const partners = nationalPartners.filter((p) => p.slug && PORTAL_SLUGS.includes(p.slug))

for (const partner of partners) {
  // Slugs are kept exactly, so current /partner/<slug> URLs keep working
  const { opportunitiesList = [], slug, ...rest } = partner as typeof partner & { slug: string }
  const fields = { ...rest, description: CARD_DESCRIPTIONS[slug] || rest.description }

  const found = await payload.find({
    collection: 'companies',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const company = found.docs[0]
    ? await payload.update({ collection: 'companies', id: found.docs[0].id, data: { ...fields, slug }, context })
    : await payload.create({ collection: 'companies', data: { ...fields, slug }, context })
  if (found.docs[0]) companiesUpdated++
  else companiesCreated++

  for (const opportunity of opportunitiesList) {
    const existing = await payload.find({
      collection: 'opportunities',
      where: { and: [{ company: { equals: company.id } }, { title: { equals: opportunity.title } }] },
      limit: 1,
    })
    const data = { ...opportunity, company: company.id, _status: 'published' as const }

    if (existing.docs[0]) {
      await payload.update({ collection: 'opportunities', id: existing.docs[0].id, data, context })
      opportunitiesUpdated++
    } else {
      await payload.create({ collection: 'opportunities', data, context })
      opportunitiesCreated++
    }
  }
}

payload.logger.info(
  `Seed done. Companies: ${companiesCreated} created, ${companiesUpdated} updated. ` +
    `Opportunities: ${opportunitiesCreated} created, ${opportunitiesUpdated} updated.`,
)
process.exit(0)
