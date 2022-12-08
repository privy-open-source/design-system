import { deepEqual } from 'fast-equals'

export type JsonObject = {
  [Key in string]?: JsonValue
}

export type JsonArray = JsonValue[]

export type JsonPrimitive = string | number | boolean | null

export type JsonValue = JsonPrimitive | JsonObject | JsonArray

export function isEqual (a: unknown, b: unknown): boolean {
  return deepEqual(a, b)
}

export function valueIn (array: unknown[], value: unknown): boolean {
  return array.some((item) => isEqual(item, value))
}
