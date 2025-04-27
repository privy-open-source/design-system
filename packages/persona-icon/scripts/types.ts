import type { ComponentMetadata } from 'figma-api/lib/api-types.js'

export interface MetaData {
  name: string,
  folder: string,
  category: string,
  variant: string,
  aliases: string[],
  files: Array<{
    name: string,
    path: string,
    hash?: string,
  }>,
}

export interface ObjectData {
  hash: string,
  id: string,
  name: string,
  folder: string,
  variant: string,
  aliases: string[],
  category: string,
  filename: string,
  filepath: string,
  filehash?: string,
  component: ComponentMetadata,
}
