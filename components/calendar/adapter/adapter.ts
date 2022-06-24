import { Ref } from 'vue-demi'

export interface CalendarItem {
  value: Date,
  text: string,
  disabled: boolean,
  readonly: boolean,
  active: boolean,
}

export interface CalendarContext {
  cursor: Ref<Date>,
  model: Ref<Date>,
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
