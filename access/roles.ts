import type { Access, FieldAccess } from 'payload'

type RoleUser = {
  id: number | string
  role?: 'admin' | 'partner' | null
  company?: { id: number | string } | number | string | null
} | null | undefined

export const isAdminUser = (user: RoleUser): boolean => user?.role === 'admin'

// The company relation may arrive as an ID or as a populated document
export const getCompanyId = (user: RoleUser) => {
  const company = user?.company
  if (!company) return undefined
  return typeof company === 'object' ? company.id : company
}

export const isAdmin: Access = ({ req: { user } }) => isAdminUser(user)

export const isAdminField: FieldAccess = ({ req: { user } }) => isAdminUser(user)

// Admins see everything; partners only rows belonging to their company
export const adminOrOwnCompany =
  (companyField: string): Access =>
  ({ req: { user } }) => {
    if (!user) return false
    if (isAdminUser(user)) return true
    const companyId = getCompanyId(user)
    if (!companyId) return false
    return { [companyField]: { equals: companyId } }
  }

export const adminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if (isAdminUser(user)) return true
  return { id: { equals: user.id } }
}
