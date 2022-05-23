import { eachDayOfInterval, endOfMonth, endOfWeek, isSameDay, isSameMonth, startOfMonth, startOfWeek, format, addMonths, subMonths, isAfter, isBefore, isWithinInterval, minTime, maxTime } from "date-fns"
import { CalendarItem, defineAdapter } from "./adapter"

export default defineAdapter({
  getInterval (date: Date) {
    const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 })
    const end   = endOfWeek(endOfMonth(date), { weekStartsOn: 1 })

    return { start, end }
  },

  getItems ({ cursor, model, min, max }) {
    const dates: CalendarItem[] = eachDayOfInterval(this.getInterval(cursor.value))
      .map((date) => {
        const start      = min.value ?? minTime
        const end        = max.value ?? maxTime
        const isDisabled = !isSameMonth(cursor.value, date)
          || !isWithinInterval(date, { start, end })

        return {
          value   : date,
          text    : date.getDate().toString(),
          disabled: isDisabled,
          active  : isSameDay(model.value, date),
          readonly: false,
        }
      })

    const days: CalendarItem[] = dates.slice(0, 7)
      .map((item) => {
        return {
          value   : item.value,
          text    : format(item.value, 'EEEEEE'),
          disabled: false,
          readonly: true,
          active  : false,
        }
      })

    return [
      ...days,
      ...dates,
    ]
  },

  getTitle ({ cursor }) {
    return format(cursor.value, 'MMMM yyyy')
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
