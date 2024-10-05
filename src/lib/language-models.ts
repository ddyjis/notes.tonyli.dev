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

export const generateSummary = async (text: string): Promise<string> => {
  const result = await inference.summarization({
    model: 'google-t5/t5-base',
    inputs: text,
    parameters: {
      max_length: 250,
    },
  })
  return result.summary_text
}
