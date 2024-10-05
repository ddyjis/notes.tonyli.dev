import { HfInference } from "@huggingface/inference";

import { normalizeVector } from "@/lib/math";

const inference = new HfInference(process.env.HUGGING_FACE_ACCESS_TOKEN);

export const generateEmbeddings = async (
  texts: string[]
): Promise<number[][]> => {
  const result = await inference.featureExtraction({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    inputs: texts,
  });
  return (result as number[][]).map(normalizeVector);
};

// TODO: Add a function to get summary
