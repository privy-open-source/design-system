export interface Color {
  id: number,
  token: string,
  figma: string,
  hex: string,
  semantics?: string,
  overlay?: string,
  border?: string,
}

export interface ColorGroup {
  id: number,
  title: string,
  grid?: number,
  data: Color[],
}

export type Colors = ColorGroup[]
