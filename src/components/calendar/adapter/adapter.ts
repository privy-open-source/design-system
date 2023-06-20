import { Ref } from 'vue-demi'
import { format } from 'date-fns'
import id from 'date-fns/locale/id/index'
import en from 'date-fns/locale/en-US/index'
import { getLang } from '../../global/context'

const localePacks = { en, id }

export interface CalendarItem {
  value: Date,
  text: string,
  disabled: boolean,
  readonly: boolean,
  active: boolean,
  head: boolean,
  tail: boolean,
}

export interface CalendarContext {
  cursor: Ref<Date>,
  start: Ref<Date>,
  end: Ref<Date>,
  max: Ref<Date | undefined>,
  min: Ref<Date | undefined>,
}

export interface CalendarAdapter {
  getItems: (this: this, context: CalendarContext) => CalendarItem[],
  getTitle: (this: this, context: CalendarContext) => string,
  getNextCursor: (this: this, context: CalendarContext) => Date,
  getPrevCursor: (this: this, context: CalendarContext) => Date,

  canNext: (this: this, context: CalendarContext) => boolean,
  canPrev: (this: this, context: CalendarContext) => boolean,
}

export const CalendarFormat = [
  'date',
  'month',
  'year',
] as const

export type CalendarMode = typeof CalendarFormat[number]

export function defineAdapter (adapter: CalendarAdapter): CalendarAdapter {
  return adapter
}

/**
 * Format date using date-fns/format,
 * Automatically switch local following global lang setting.
 * @param date Date
 * @param formatStr date format
 */
export function formatDate (date: Date, formatStr: string): string {
  return format(date, formatStr, { locale: localePacks[getLang()] })
}
