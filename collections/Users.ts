import type { CollectionConfig } from 'payload'

import { adminOrSelf, isAdmin, isAdminField } from '../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'company'],
  },
  auth: true,
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    // Accounts are handed out by admins; the very first account uses Payload's first-register screen
    create: isAdmin,
    read: adminOrSelf,
    update: adminOrSelf,
    delete: isAdmin,
  },
  fields: [
    // Email added by default
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'partner',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Partner', value: 'partner' },
      ],
      saveToJWT: true,
      access: {
        create: isAdminField,
        update: isAdminField,
      },
      hooks: {
        // The first account ever created becomes the admin, so the panel can't be locked out.
        // Runs before validation so the "partner needs a company" rule doesn't block it.
        beforeValidate: [
          async ({ operation, req, value }) => {
            if (operation !== 'create') return value
            const { totalDocs } = await req.payload.count({ collection: 'users', req })
            return totalDocs === 0 ? 'admin' : value
          },
        ],
      },
      admin: { position: 'sidebar' },
    },
    {
      name: 'company',
      type: 'relationship',
      relationTo: 'companies',
      saveToJWT: true,
      access: {
        create: isAdminField,
        update: isAdminField,
      },
      validate: (value: unknown, { siblingData }: { siblingData: { role?: string } }) =>
        siblingData?.role === 'partner' && !value ? 'Partner accounts need a company' : true,
      admin: {
        position: 'sidebar',
        condition: (_, siblingData) => siblingData?.role === 'partner',
      },
    },
  ],
}
