import { FilterItem } from '..'

export function isFilled (filter: FilterItem, model: Record<string, unknown>): boolean {
  const value = model[filter.key]

  return Array.isArray(value)
    ? value.length > 0
    : Boolean(value)
}
