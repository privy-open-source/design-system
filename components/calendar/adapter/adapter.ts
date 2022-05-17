import { Ref } from "vue-demi"

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
  getItems (context: CalendarContext): CalendarItem[],
  getTitle (context: CalendarContext): string,
  getNextCursor (context: CalendarContext): Date,
  getPrevCursor (context: CalendarContext): Date,

  canNext (context: CalendarContext): boolean,
  canPrev (context: CalendarContext): boolean,
}

export const CalendarFormat = ['date', 'month', 'year'] as const

export type CalendarMode = typeof CalendarFormat[number]

export function defineAdapter<Adapter extends CalendarAdapter>(adapter: Adapter): CalendarAdapter {
  return adapter
}
