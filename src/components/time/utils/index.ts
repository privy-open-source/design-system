import {
  set,
  eachHourOfInterval,
  eachMinuteOfInterval,
  endOfDay, format, isBefore,
  min as minDate,
  max as maxDate,
  startOfDay,
  isSameHour,
  endOfHour,
  startOfHour,
} from 'date-fns'
import { uniq } from 'lodash-es'

export function getHourUnits (model: Date, is12Hour: boolean, step: number = 1, min?: Date, max?: Date) {
  if (isBefore(max as Date, min as Date)) {
    console.warn('`max` value should greater than `min` value and vice versa')

    return []
  }

  let start = startOfDay(new Date())
  let end   = endOfDay(new Date())

  if (min)
    start = maxDate([model, min])
  if (max)
    end = minDate([endOfDay(start), max])

  const hourUnits = eachHourOfInterval({
    start,
    end,
  }, { step })

  const units = hourUnits.map((date) => {
    if (is12Hour)
      return format(date, 'hh')

    return format(date, 'HH')
  })

  return uniq(units)
}

export function getMinuteUnits (model: Date, currentHour: number, step: number = 1, min?: Date, max?: Date) {
  if (isBefore(max as Date, min as Date)) {
    console.warn('`max` value should greater than `min` value and vice versa')

    return []
  }

  let start = startOfDay(new Date())
  let end   = endOfDay(new Date())

  if (min)
    start = maxDate([model, min])
  if (max)
    end = minDate([endOfDay(start), max])

  const currentTime = set(start, { hours: currentHour })

  const minuteUnits = eachMinuteOfInterval({
    start: isSameHour(currentTime, start) ? currentTime : startOfHour(currentTime),
    end  : isSameHour(currentTime, end) ? end : endOfHour(currentTime),
  }, { step })

  const units = minuteUnits.map((date) => {
    return format(date, 'mm')
  })

  return uniq(units)
}

export function getFormat (is12Hour: boolean) {
  return is12Hour ? 'hh:mm a' : 'HH:mm'
}

export function parseTime (date: Date, timeFormat: string) {
  const [hh, mm] = format(date, timeFormat).split(':')
  const a        = format(date, 'a') as 'AM' | 'PM'

  return {
    hh,
    mm: mm.slice(0, 2),
    a,
  }
}

export function validateInterval (type: 'hour' | 'minute', value: number, is12Hour: boolean = false) {
  let min = 0
  let max = 0

  if (type === 'hour') {
    min = 1
    max = is12Hour ? 12 : 24
  } else if (type === 'minute') {
    min = 1
    max = 60
  }

  return (value >= min) && (value < max)
}
