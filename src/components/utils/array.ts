import { orderBy } from 'lodash-es'
import { isEqual } from './value'

export function arrayFilter (list: unknown[], filterBy: Record<string, any>) {
  const filters = Object.entries(filterBy)

  return list.filter((item) => {
    return filters.every(([key, value]) => isEqual(item[key], value))
  })
}

export function arraySort (list: unknown[], sortBy: Record<string, string>) {
  const sortKey: string[]                = []
  const sortOrder: Array<'asc' | 'desc'> = []

  for (const [key, order] of Object.entries(sortBy)) {
    if (order === 'asc' || order === 'desc') {
      sortKey.push(key)
      sortOrder.push(order)
    }
  }

  return orderBy(list, sortKey, sortOrder)
}
