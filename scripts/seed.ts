// Copies the partners shown on /partner-portal (from constants/patners.ts) into Payload.
// Safe to re-run: companies are matched by slug and opportunities by title,
// so existing records are updated instead of duplicated.
// Run with: npm run seed
import { getPayload } from 'payload'

import config from '../payload.config'
import { nationalPartners } from '../constants/patners'

// Only the partners currently featured on /partner-portal
const PORTAL_SLUGS = ['mas', 'cargills', 'ceylinco-life']

const payload = await getPayload({ config })

let companiesCreated = 0
let companiesUpdated = 0
let opportunitiesCreated = 0
let opportunitiesUpdated = 0

const partners = nationalPartners.filter((p) => p.slug && PORTAL_SLUGS.includes(p.slug))

for (const partner of partners) {
  // Slugs are kept exactly, so current /partner/<slug> URLs keep working
  const { opportunitiesList = [], slug, ...fields } = partner as typeof partner & { slug: string }

  const found = await payload.find({
    collection: 'companies',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const company = found.docs[0]
    ? await payload.update({ collection: 'companies', id: found.docs[0].id, data: { ...fields, slug } })
    : await payload.create({ collection: 'companies', data: { ...fields, slug } })
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
      await payload.update({ collection: 'opportunities', id: existing.docs[0].id, data })
      opportunitiesUpdated++
    } else {
      await payload.create({ collection: 'opportunities', data })
      opportunitiesCreated++
    }
  }
}

payload.logger.info(
  `Seed done. Companies: ${companiesCreated} created, ${companiesUpdated} updated. ` +
    `Opportunities: ${opportunitiesCreated} created, ${opportunitiesUpdated} updated.`,
)
process.exit(0)
