import algoliasearch from 'algoliasearch'

import type {Metadata} from '@/lib/preflight'

export const updateAlgoliaIndex = async (notesMetadata: Metadata['notes']) => {
  const objects = Object.values(notesMetadata).map(({id, frontmatter, document}) => ({
    objectID: id,
    ...frontmatter,
    title: frontmatter.title ?? id,
    document,
  }))
  try {
    const result = await index.saveObjects(objects)
    console.log(`Updated ${result.objectIDs.length} records in Algolia index`)
  } catch (error) {
    console.error(`Error updating Algolia index: ${error}`)
  }
}

const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY)
const index = client.initIndex('notes')
