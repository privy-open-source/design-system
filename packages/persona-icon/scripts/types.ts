export interface MetaData {
  name: string,
  folder: string,
  category: string,
  variant: string,
  aliases: string[],
  files: Array<{
    name: string,
    path: string,
  }>,
}

export interface ObjectData {
  id: string,
  name: string,
  hash: string,
  folder: string,
  variant: string,
  aliases: string[],
  category: string,
  filename: string,
  filepath: string,
}
