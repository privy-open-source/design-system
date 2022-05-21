import { Ref } from 'vue-demi'

export interface CalendarItem {
  value: Date
  text: string
  disabled: boolean
  readonly: boolean
  active: boolean
}

export interface CalendarContext {
  cursor: Ref<Date>
  model: Ref<Date>
  max: Ref<Date | undefined>
  min: Ref<Date | undefined>
}

export interface CalendarAdapter {
  getItems: (this: CalendarAdapter, context: CalendarContext) => CalendarItem[]
  getTitle: (this: CalendarAdapter, context: CalendarContext) => string
  getNextCursor: (this: CalendarAdapter, context: CalendarContext) => Date
  getPrevCursor: (this: CalendarAdapter, context: CalendarContext) => Date

  canNext: (this: CalendarAdapter, context: CalendarContext) => boolean
  canPrev: (this: CalendarAdapter, context: CalendarContext) => boolean
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
