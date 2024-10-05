import {cache} from 'react'

import {metadata} from '@/app/metadata'
import {generateEmbeddings} from '@/lib/language-models'
import {dotProduct} from '@/lib/math'

const MIN_RESULTS = 5
const PERCENTILE = 0.8

export const GET = async (request: Request) => {
  const query = new URL(request.url).searchParams.get('q')
  if (!query) return new Response('Missing query', {status: 400})
  const results = await search(query)
  return new Response(JSON.stringify(results), {status: 200})
}

const search = cache(async (query: string) => {
  const embeddings = await generateEmbeddings([query])
  const embedding = embeddings[0]
  const notesSortedBySimilarity = Object.values(metadata.notes).map((noteMetadata) => {
    const similarity = dotProduct(embedding, noteMetadata.embedding)
    return {similarity, ...noteMetadata}
  }).sort((a, b) => b.similarity - a.similarity)
  const similarities = notesSortedBySimilarity.map((note) => note.similarity)
  const threshold = getThreshold(similarities)
  return notesSortedBySimilarity.filter((note) => note.similarity >= threshold).map(({embedding, ...rest}) => rest)
})

const getThreshold = (similarities: number[]) => {
  const minResultsThreshold = similarities[Math.min(MIN_RESULTS, similarities.length) - 1]
  const percentileIndex = Math.floor(similarities.length * PERCENTILE)
  const percentileThreshold = similarities[percentileIndex]
  return Math.min(minResultsThreshold, percentileThreshold)
}
