import {
  addYears,
  eachMonthOfInterval,
  endOfYear,
  isAfter,
  isBefore,
  isSameMonth,
  isWithinInterval,
  startOfYear,
  subYears,
} from 'date-fns'
import {
  defineAdapter,
  formatDate,
  getLimit,
} from './adapter'

function getInterval (date: Date) {
  const start = startOfYear(date)
  const end   = endOfYear(date)

  return {
    start,
    end,
  }
}

export default defineAdapter({
  getItems (context) {
    return eachMonthOfInterval(getInterval(context.cursor.value))
      .map((date) => {
        const { start, end } = getLimit(context)
        const isDisabled     = !isSameMonth(start, date)
          && !isSameMonth(end, date)
          && !isWithinInterval(date, { start, end })

        const isHead = isSameMonth(context.start.value, date)
        const isTail = isSameMonth(context.end.value, date)

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
    const max  = getLimit(context).end
    const date = this.getNextCursor(context)

    return !max || isBefore(date, max) || isWithinInterval(max, getInterval(date))
  },

  canPrev (context) {
    const min  = getLimit(context).start
    const date = this.getPrevCursor(context)

    return !min || isAfter(date, min) || isWithinInterval(min, getInterval(date))
  },
})
