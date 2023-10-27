import defu from 'defu'
import type { SelectProps } from '../select'
import type { Adapter } from '../select/adapter/adapter'
import { startCase } from 'lodash-es'
import type { CalendarMode } from '../calendar/adapter/adapter'
import type { MaybeRef } from '@vueuse/core'

interface FilterType {
  key: string,
  label?: string,
  placeholder?: string,
  default?: unknown,
  pinned?: boolean,
  type: 'text' | 'select' | 'multiselect' | 'toggle' | 'date' | 'daterange',
}

interface FilterText extends FilterType {
  type: 'text',
}

export interface FilterSelect extends FilterType {
  type: 'select',
  options: MaybeRef<SelectProps['options']>,
  search?: boolean,
  adapter?: Adapter,
}

export interface FilterSelectMultiple extends FilterType {
  type: 'multiselect',
  options: MaybeRef<SelectProps['options']>,
  search?: boolean,
  adapter?: Adapter,
}

export interface FilterToggle extends FilterType {
  type: 'toggle',
  value?: unknown,
  uncheckedValue?: unknown,
}

export interface FilterDate extends FilterType {
  type: 'date',
  min?: Date,
  max?: Date,
  format?: string,
  mode?: CalendarMode,
}

export interface FitlerDateRange extends FilterType {
  type: 'daterange',
}

export type FilterItem = FilterText | FilterSelect | FilterSelectMultiple | FilterToggle | FilterDate | FitlerDateRange

export function defineFilter (scheme: FilterItem[]): FilterItem[] {
  return scheme.map((item) => {
    return defu(item, { label: startCase(item.key), pinned: true })
  })
}
