export interface SelectItem {
  text: string
  value: unknown
}

export interface SelectProps {
  modelValue: unknown
  selected: SelectItem
  [key: string]: unknown
}

export function defineOptions (options: SelectItem[]): SelectItem[] {
  return options
}
