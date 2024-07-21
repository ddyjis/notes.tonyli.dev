import {metadata} from '@/app/metadata'
import lunr from 'lunr'

import {cache} from 'react'

export const GET = async (request: Request) => {
  const query = new URL(request.url).searchParams.get('q')
  if (!query) {
    return new Response('Missing query', {status: 400})
  }
  const results = await search(query)
  return new Response(JSON.stringify(results), {status: 200})
}

export type SearchResult = {id: string; positions: [number, number][]}

const getIndex = cache(async () => {
  const noteMapping = metadata.notes
  return lunr(function () {
    this.ref('id')
    this.field('document')

    this.metadataWhitelist = ['position']

    for (const [id, {document}] of Object.entries(noteMapping)) {
      this.add({id, document})
    }
  })
})
const search = async (query: string) => {
  const index = await getIndex()
  const noteMapping = metadata.notes
  const results = index.search(query)
  return results.flatMap((result) => {
    const {ref} = result
    const document = noteMapping[ref]
    if (!document) throw new Error(`Document not found: ${ref}`)

    const matches = result.matchData.metadata
    const positions: [number, number][] = Object.values(matches).flatMap(
      (data) => data.document.position,
    )
    return {id: ref, positions}
  })
}
