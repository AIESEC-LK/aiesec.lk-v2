import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { PARTNERS_CACHE_TAG } from '../../lib/cacheTags'

// Clears the cached partner portal data so the public pages show the change on the next visit.
// { expire: 0 } drops the old copy at once, so an unpublished opportunity is never shown again.
const revalidatePartners = (context: Record<string, unknown>, logger: { error: (msg: string) => void }) => {
  // Set by scripts (e.g. npm run seed) that run outside Next.js, where revalidateTag can't work
  if (context.disableRevalidate) return
  try {
    revalidateTag(PARTNERS_CACHE_TAG, { expire: 0 })
  } catch (error) {
    // The save already succeeded; don't fail it because the cache couldn't be cleared
    logger.error(`[partners] Cache revalidation failed: ${String(error)}`)
  }
}

export const revalidatePartnersAfterChange: CollectionAfterChangeHook = ({ doc, req }) => {
  revalidatePartners(req.context, req.payload.logger)
  return doc
}

export const revalidatePartnersAfterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  revalidatePartners(req.context, req.payload.logger)
  return doc
}
