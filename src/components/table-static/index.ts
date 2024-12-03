import type { MaybeRefOrGetter } from 'vue-demi'
import {
  computed,
  toValue,
} from 'vue-demi'
import { arrayFilter, arraySort } from '../utils/array'

export type SortValue = 'asc' | 'desc'

export interface DataTableOption {
  /**
   * Filter list equal to object
   * @example
   * // Filter list with name === 'Tarjono' and gender === 'male'
   * const items = useTable(list, {
   *    filterBy: {
   *      name: 'Tarjono',
   *      gender: 'male',
   *    }
   * })
   */
  filterBy?: MaybeRefOrGetter<Record<string, string>>,
  /**
   * Sort list based on key
   * @example
   * const items = useTable(list, {
   *    sortBy: {
   *      name: 'asc',
   *    }
   * })
   */
  sortBy?: MaybeRefOrGetter<Record<string, string>>,
  /**
   * Limit showing list
   * @example
   * const items = useTable(lst, {
   *    perPage: 5,
   *    page: 2,
   * })
   */
  perPage?: MaybeRefOrGetter<number>,
  page?: MaybeRefOrGetter<number>,
}

/**
 * Reactive filter, sort and paginate array of object
 * @param items
 * @param options
 * @returns
 * @example
 *
 * const list = ref([
 *   { id: 1, name: 'Tarjono', age: 20, gender: 'male' },
 *   { id: 2, name: 'Yuki', age: 25, gender: 'female' },
 *   { id: 3, name: 'Agus', age: 33, gender: 'male' },
 *   { id: 4, name: 'Tumijah', age: 70, gender: 'female' },
 *   { id: 5, name: 'Admojo', age: 55, gender: 'male' },
 * ])
 *
 * const filterBy = ref({ gender: 'male' })
 * const sortBy   = ref({ age: 'asc' })
 * const page     = ref(1)
 * const perPage  = ref(3)
 *
 * const items = useTableQuery(list, {
 *   filterBy,
 *   sortBy,
 *   page,
 *   perPage,
 * })
 */
export function useTableQuery (items: MaybeRefOrGetter<unknown[]>, options: DataTableOption = {}) {
  const filteredItems = computed(() => {
    const filterBy = toValue(options.filterBy)
    const list     = toValue(items)

    return filterBy
      ? arrayFilter(list, filterBy)
      : list
  })

  const sortedItems = computed(() => {
    const sortBy = toValue(options.sortBy)

    return sortBy
      ? arraySort(filteredItems.value, sortBy)
      : filteredItems.value
  })

  const paginateItems = computed(() => {
    const perPage = toValue(options.perPage) ?? sortedItems.value.length
    const page    = toValue(options.page) ?? 1
    const start   = (page - 1) * perPage
    const end     = start + perPage

    return sortedItems.value.slice(start, end)
  })

  return paginateItems
}
