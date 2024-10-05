export const dotProduct = (vec1: number[], vec2: number[]) =>
  vec1.reduce((acc, val, index) => acc + val * vec2[index], 0)
export const normalizeVector = (vec: number[]) => {
  const norm = Math.sqrt(vec.reduce((acc, val) => acc + val * val, 0))
  return vec.map((val) => val / norm)
}
