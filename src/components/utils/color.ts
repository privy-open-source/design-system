interface RGB {
  R: number,
  G: number,
  B: number,
}

/**
 * Parse hex string to R,G,B Object
 * @param color RGB Object
 * @example toRGB('#6E1E62') // {R: 110, G: 30, B: 98}
 */
export function toRGB (color: string): RGB {
  const r = color.slice(1, 3)
  const g = color.slice(3, 5)
  const b = color.slice(5, 7)

  return {
    R: Number.parseInt(r, 16),
    G: Number.parseInt(g, 16),
    B: Number.parseInt(b, 16),
  }
}
