import type { Access, CollectionConfig } from 'payload'

import { adminOrOwnCompany, getCompanyId, isAdminUser } from '../access/roles'
import { revalidatePartnersAfterChange, revalidatePartnersAfterDelete } from './hooks/revalidatePartners'

// Partners may create only when their account is linked to a company
const canCreate: Access = ({ req: { user } }) => isAdminUser(user) || Boolean(getCompanyId(user))

// Mirrors the Opportunity type in types/partner.ts
export const Opportunities: CollectionConfig = {
  slug: 'opportunities',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'company', 'deadline', '_status'],
  },
  versions: {
    drafts: true,
  },
  access: {
    create: canCreate,
    read: adminOrOwnCompany('company'),
    update: adminOrOwnCompany('company'),
    delete: adminOrOwnCompany('company'),
  },
  hooks: {
    // Public partner pages are cached; clear them after any change (drafts too, harmless)
    afterChange: [revalidatePartnersAfterChange],
    afterDelete: [revalidatePartnersAfterDelete],
    // Runs before validation, so the required company is set in time
    beforeValidate: [
      // A partner's opportunity always belongs to their own company, whatever was submitted
      ({ data, req: { user } }) => {
        if (data && user && !isAdminUser(user)) {
          data.company = getCompanyId(user)
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    // Free text: existing entries use dates and values like "Open"
    { name: 'deadline', type: 'text', required: true },
    { name: 'applicationLink', type: 'text' },
    {
      name: 'company',
      type: 'relationship',
      relationTo: 'companies',
      required: true,
      admin: {
        position: 'sidebar',
        // Partners don't pick a company; the hook sets it
        condition: (_, __, { user }) => isAdminUser(user),
      },
    },
  ],
}
