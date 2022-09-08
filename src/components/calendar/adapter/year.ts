import { defineAdapter } from './adapter'
import {
  addYears,
  eachYearOfInterval,
  endOfDecade,
  isAfter,
  isBefore,
  isSameYear,
  isWithinInterval,
  maxTime,
  minTime,
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
  getItems ({ cursor, model, min, max }) {
    return eachYearOfInterval(getInterval(cursor.value)).map((date) => {
      const start      = min.value ?? minTime
      const end        = max.value ?? maxTime
      const isDisabled = !isSameYear(start, date)
        && !isSameYear(end, date)
        && !isWithinInterval(date, { start, end })

      return {
        value   : date,
        text    : date.getFullYear().toString(),
        disabled: isDisabled,
        readonly: false,
        active  : isSameYear(model.value, date),
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
