import { isEqual, valueIn } from '../utils/value'

export interface SelectItem {
  text: string,
  value: unknown,
  disabled?: boolean,
  [key: string]: unknown,
}

export interface SelectProps {
  modelValue: unknown,
  selected?: SelectItem,
  options?: SelectItem[] | string[],
}

export function defineOptions (options: SelectItem[]): SelectItem[] {
  return options
}

export function findSelected (items: SelectItem[], value: unknown): SelectItem {
  return items.find((item) => isEqual(item.value, value))
    ?? { text: '', value: undefined }
}

export function filterSelected (items: SelectItem[], value: unknown[]): SelectItem[] {
  return Array.isArray(value)
    ? items.filter((item) => valueIn(value, item.value))
    : []
}
