import { slugField, type CollectionConfig } from 'payload'

import { adminOrOwnCompany, isAdmin } from '../access/roles'
import { revalidatePartnersAfterChange, revalidatePartnersAfterDelete } from './hooks/revalidatePartners'

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
  hooks: {
    // Public partner pages are cached; clear them after any change
    afterChange: [revalidatePartnersAfterChange],
    afterDelete: [revalidatePartnersAfterDelete],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    slugField({ useAsSlug: 'name' }),
    // Image path or URL, as in constants/patners.ts
    { name: 'logo', type: 'text', required: true },
    { name: 'category', type: 'text', required: true, admin: { position: 'sidebar' } },
    // Optional: some existing partners have an empty description
    { name: 'description', type: 'textarea' },
    { name: 'aboutCompany', type: 'textarea' },
    { name: 'partnerPortalVideo', type: 'text' },
    { name: 'whyPartner', type: 'textarea' },
    { name: 'collaboration', type: 'textarea' },
    { name: 'whyJoin', type: 'textarea' },
    // Optional extra title + paragraph sections, shown after the fixed ones in this order
    {
      name: 'extraSections',
      type: 'array',
      maxRows: 10,
      labels: { singular: 'Section', plural: 'Extra Sections' },
      admin: { initCollapsed: true },
      fields: [
        { name: 'title', type: 'text', required: true, maxLength: 120 },
        { name: 'body', type: 'textarea', required: true, maxLength: 3000 },
      ],
    },
  ],
}
