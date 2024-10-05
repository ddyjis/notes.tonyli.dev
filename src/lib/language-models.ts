import {HfInference} from '@huggingface/inference'

import {normalizeVector} from '@/lib/math'

const inference = new HfInference(process.env.HUGGING_FACE_ACCESS_TOKEN)

export const generateEmbeddings = async (texts: string[]): Promise<number[][]> => {
  const result = await inference.featureExtraction({
    model: 'sentence-transformers/all-MiniLM-L6-v2',
    inputs: texts,
  })
  return (result as number[][]).map(normalizeVector)
}

const MAX_SUMMARY_LENGTH = 250

export const generateSummary = async (text: string): Promise<string> => {
  try {
    const result = await inference.summarization({
      model: 'facebook/bart-large-cnn',
      inputs: text,
      parameters: {
        max_length: MAX_SUMMARY_LENGTH,
      },
    })
    return result.summary_text
  } catch (error) {
    console.error(error)
    return text.slice(0, MAX_SUMMARY_LENGTH)
  }
}
