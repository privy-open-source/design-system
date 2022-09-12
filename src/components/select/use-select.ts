export interface SelectItem {
  text: string,
  value: unknown,
}

export interface SelectProps {
  modelValue: unknown,
  selected?: SelectItem,
  options?: SelectItem[] | string[],
}

export function defineOptions (options: SelectItem[]): SelectItem[] {
  return options
}
