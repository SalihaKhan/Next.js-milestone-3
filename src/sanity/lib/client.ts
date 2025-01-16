import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2025-01-11",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
