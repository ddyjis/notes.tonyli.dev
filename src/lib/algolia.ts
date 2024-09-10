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
    const {hits} = await index.search('', {attributesToRetrieve: ['objectID']})
    const newObjectIds = new Set(objects.map((obj) => obj.objectID))
    const objectIdsToDelete = hits.map((hit) => hit.objectID).filter((id) => !newObjectIds.has(id))

    const result = await index.saveObjects(objects)
    console.log(`Updated ${result.objectIDs.length} records in Algolia index`)
    if (objectIdsToDelete.length > 0) {
      const result = await index.deleteObjects(objectIdsToDelete)
      console.log(`Deleted ${result.objectIDs.length} records from Algolia index`)
    }
  } catch (error) {
    console.error(`Error updating Algolia index: ${error}`)
  }
}

const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY)
const index = client.initIndex('notes')
