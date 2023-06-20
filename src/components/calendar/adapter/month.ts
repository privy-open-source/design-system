import {
  addYears,
  eachMonthOfInterval,
  endOfYear,
  isAfter,
  isBefore,
  isSameMonth,
  isWithinInterval,
  maxTime,
  minTime,
  startOfYear,
  subYears,
} from 'date-fns'
import { defineAdapter, formatDate } from './adapter'

function getInterval (date: Date) {
  const start = startOfYear(date)
  const end   = endOfYear(date)

  return {
    start,
    end,
  }
}

export default defineAdapter({
  getItems ({ cursor, start: vStart, end: vEnd, min, max }) {
    return eachMonthOfInterval(getInterval(cursor.value))
      .map((date) => {
        const start      = min.value ?? minTime
        const end        = max.value ?? maxTime
        const isDisabled = !isSameMonth(start, date)
          && !isSameMonth(end, date)
          && !isWithinInterval(date, { start, end })

        const isHead = isSameMonth(vStart.value, date)
        const isTail = isSameMonth(vEnd.value, date)

        return {
          value   : date,
          text    : formatDate(date, 'MMM'),
          disabled: isDisabled,
          readonly: false,
          head    : isHead,
          tail    : isTail,
          active  : isHead || isTail,
        }
      })
  },

  getTitle ({ cursor }) {
    return cursor.value.getFullYear().toString()
  },

  getNextCursor ({ cursor }) {
    return addYears(cursor.value, 1)
  },

  getPrevCursor ({ cursor }) {
    return subYears(cursor.value, 1)
  },

  canNext (context) {
    const max  = context.max.value
    const date = this.getNextCursor(context)

    return !max || isBefore(date, max) || isWithinInterval(max, getInterval(date))
  },

  canPrev (context) {
    const min  = context.min.value
    const date = this.getPrevCursor(context)

    return !min || isAfter(date, min) || isWithinInterval(min, getInterval(date))
  },
})
