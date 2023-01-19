import { computed, toRef } from 'vue-demi'
import {
  getPageItems, getPageRange, PAGE_PADDING,
} from './utils/calculate-page'

interface PaginationProps {
  modelValue: number,
  perPage: number,
  total: number,
  displayLimit: number,
}

export function usePagination (props: PaginationProps) {
  const page         = toRef(props, 'modelValue')
  const perPage      = toRef(props, 'perPage')
  const total        = toRef(props, 'total')
  const displayLimit = toRef(props, 'displayLimit')

  const totalPageCount = computed(() => {
    return total.value <= 0 ? 0 : Math.ceil(total.value / perPage.value)
  })

  const rowRange = computed(() => {
    return [total.value === 0 ? 0 : (page.value - 1) * perPage.value + 1, page.value * perPage.value > total.value ? total.value : page.value * perPage.value]
  })

  const pageItems = computed(() => {
    if (totalPageCount.value === 0 || displayLimit.value < PAGE_PADDING)
      return []

    if (totalPageCount.value === 1)
      return [1]

    if (displayLimit.value >= totalPageCount.value)
      return getPageRange(1, totalPageCount.value)

    return getPageItems(page.value, totalPageCount.value, displayLimit.value)
  })

  const canNext = computed(() => page.value !== totalPageCount.value)
  const canPrev = computed(() => page.value !== 1)

  return {
    pageItems,
    rowRange,
    totalPageCount,
    canNext,
    canPrev,
  }
}
