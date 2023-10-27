import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  addMonths,
  subMonths,
  isAfter,
  isBefore,
  isWithinInterval,
} from 'date-fns'
import type { CalendarItem } from './adapter'
import {
  defineAdapter,
} from './adapter'
import { formatDate } from '../../utils/date'

function getInterval (date: Date) {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 })
  const end   = endOfWeek(endOfMonth(date), { weekStartsOn: 1 })

  return {
    start,
    end,
  }
}

export default defineAdapter({
  getItems ({ cursor, start, end, min, max }) {
    const dates: CalendarItem[] = eachDayOfInterval(getInterval(cursor.value)).map((date) => {
      const isDisabled = !isSameMonth(cursor.value, date)
        || !isWithinInterval(date, { start: min.value, end: max.value })

      const isHead = isSameDay(start.value, date)
      const isTail = isSameDay(end.value, date)

      return {
        value   : date,
        text    : date.getDate().toString(),
        disabled: isDisabled,
        head    : isHead,
        tail    : isTail,
        active  : isHead || isTail,
        readonly: false,
      }
    })

    const days: CalendarItem[] = dates.slice(0, 7).map((item) => {
      return {
        value   : item.value,
        text    : formatDate(item.value, 'EEEEEE'),
        disabled: false,
        readonly: true,
        head    : false,
        tail    : false,
        active  : false,
      }
    })

    return [...days, ...dates]
  },

  getTitle ({ cursor }) {
    return formatDate(cursor.value, 'MMMM yyyy')
  },

  getNextCursor ({ cursor }) {
    return addMonths(cursor.value, 1)
  },

  getPrevCursor ({ cursor }) {
    return subMonths(cursor.value, 1)
  },

  canNext (context) {
    const max   = context.max.value
    const date  = this.getNextCursor(context)
    const start = startOfMonth(date)
    const end   = endOfMonth(date)

    return !max || isBefore(date, max) || isWithinInterval(max, { start, end })
  },

  canPrev (context) {
    const min   = context.min.value
    const date  = this.getPrevCursor(context)
    const start = startOfMonth(date)
    const end   = endOfMonth(date)

    return !min || isAfter(date, min) || isWithinInterval(min, { start, end })
  },
})
