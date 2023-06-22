import { defineAdapter, getLimit } from './adapter'
import {
  addYears,
  eachYearOfInterval,
  endOfDecade,
  isAfter,
  isBefore,
  isSameYear,
  isWithinInterval,
  startOfDecade,
  subYears,
} from 'date-fns'

function getInterval (date: Date) {
  const start = startOfDecade(date)
  const end   = endOfDecade(date)

  return {
    start,
    end,
  }
}

export default defineAdapter({
  getItems (context) {
    return eachYearOfInterval(getInterval(context.cursor.value)).map((date) => {
      const { start, end } = getLimit(context)
      const isDisabled     = !isSameYear(start, date)
        && !isSameYear(end, date)
        && !isWithinInterval(date, { start, end })

      const isHead = isSameYear(context.start.value, date)
      const isTail = isSameYear(context.end.value, date)

      return {
        value   : date,
        text    : date.getFullYear().toString(),
        disabled: isDisabled,
        readonly: false,
        head    : isHead,
        tail    : isTail,
        active  : isHead || isTail,
      }
    })
  },

  getTitle ({ cursor }) {
    const { start, end } = getInterval(cursor.value)

    return `${start.getFullYear()} - ${end.getFullYear()}`
  },

  getNextCursor ({ cursor }) {
    return startOfDecade(addYears(cursor.value, 10))
  },

  getPrevCursor ({ cursor }) {
    return startOfDecade(subYears(cursor.value, 10))
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
