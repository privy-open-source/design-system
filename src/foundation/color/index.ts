export interface Color {
  id: number,
  subtitle: string,
  code: string,
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
