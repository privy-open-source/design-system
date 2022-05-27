const COLOR_SEED: Array<[string, string]> = [
  ['#F2F7FD', '#0065D1'],
  ['#F8F8F8', '#737373'],
  ['#F4FBF6', '#23B242'],
  ['#F2FBFC', '#02AEC5'],
  ['#FFFBF4', '#F5A623'],
  ['#FEF5F4', '#E42E2C'],
  ['#FBFAF2', '#B79A00'],
  ['#FEFDF4', '#EFD52C'],
  ['#FAFEF5', '#A3E635'],
  ['#F3FBFA', '#12B89C'],
  ['#F7F2FD', '#5E00D1'],
]

export function colorHash (text: string): [string, string] {
  let hash = 0

  for (let index = 0; index < text.length; ++index)
    hash = ((hash << 5) - hash + text.charCodeAt(index)) | 0 // eslint-disable-line unicorn/prefer-math-trunc, unicorn/prefer-code-point

  return COLOR_SEED.at(Math.abs(hash) % COLOR_SEED.length)
}

export function colorRandom (): [string, string] {
  return COLOR_SEED.at(Math.floor(Math.random() * COLOR_SEED.length))
}
