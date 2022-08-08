import defu from 'defu'
import { SelectProps } from '../select/use-select'
import { Adapter } from '../select/adapter/adapter'
import { startCase } from 'lodash-es'

interface FilterType {
  key: string,
  label?: string,
  placeholder?: string,
  default?: any,
  pinned?: boolean,
  type: 'text' | 'select' | 'multiselect' | 'toggle' | 'date' | 'daterange',
}

interface FilterText extends FilterType {
  type: 'text',
}

export interface FilterSelect extends FilterType {
  type: 'select',
  options: SelectProps['options'],
  search?: boolean,
  adapter?: Adapter,
}

export interface FilterSelectMultiple extends FilterType {
  type: 'multiselect',
  options: SelectProps['options'],
  search?: boolean,
  adapter?: Adapter,
}

interface FilterToggle extends FilterType {
  type: 'toggle',
  value?: unknown,
  uncheckedValue?: unknown,
}

interface FilterDate extends FilterType {
  type: 'date',
  min?: Date,
  max?: Date,
}

interface FitlerDateRange extends FilterType {
  type: 'daterange',
}

export type FilterItem = FilterText | FilterSelect | FilterToggle | FilterDate | FitlerDateRange

export function defineFilter (scheme: FilterItem[]): FilterItem[] {
  return scheme.map((item) => {
    return defu(item, { label: startCase(item.key), pinned: true })
  })
}
