export interface LockData {
  id: string,
  name: string,
  hash: string,
}

export interface MetaData {
  name: string,
  category: string,
  aliases: string[],
  files: string[],
}
