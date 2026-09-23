import { slugField, type CollectionConfig } from 'payload'

import { adminOrOwnCompany, isAdmin } from '../access/roles'

// Mirrors the Partner type in types/partner.ts
export const Companies: CollectionConfig = {
  slug: 'companies',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'updatedAt'],
  },
  access: {
    create: isAdmin,
    read: adminOrOwnCompany('id'),
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    slugField({ useAsSlug: 'name' }),
    // Image path or URL, as in constants/patners.ts
    { name: 'logo', type: 'text', required: true },
    { name: 'category', type: 'text', required: true, admin: { position: 'sidebar' } },
    { name: 'description', type: 'textarea', required: true },
    { name: 'aboutCompany', type: 'textarea' },
    { name: 'partnerPortalVideo', type: 'text' },
    { name: 'whyPartner', type: 'textarea' },
    { name: 'collaboration', type: 'textarea' },
    { name: 'whyJoin', type: 'textarea' },
  ],
}
