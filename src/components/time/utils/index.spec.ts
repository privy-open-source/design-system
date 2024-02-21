import {
  validateInterval,
  parseTime,
  getFormat, getHourUnits, getMinuteUnits,
} from './'
import {
  set, getHours, getMinutes,
} from 'date-fns'

const HOURS_24 = 24
const HOURS_12 = 12
const MINUTES  = 60

export function createMockDate () {
  const date    = set(new Date(), {
    hours: 0, minutes: 0, seconds: 0,
  })
  const minDate = set(new Date(), {
    hours: 15, minutes: 0, seconds: 0,
  })
  const maxDate = set(new Date(), {
    hours: 17, minutes: 30, seconds: 0,
  })

  return {
    date, minDate, maxDate,
  }
}

describe('getHourUnits', () => {
  it('should return array of string', () => {
    const { date } = createMockDate()

    const items = getHourUnits(date, false)

    expect(items).toBeInstanceOf(Array)
  })

  it('should return empty items if max is greater than min, vice versa', () => {
    const { date } = createMockDate()
    const minDate  = set(new Date(), {
      hours: 15, minutes: 0, seconds: 0,
    })
    const maxDate  = set(new Date(), {
      hours: 12, minutes: 30, seconds: 0,
    })

    const items = getHourUnits(date, true, 1, minDate, maxDate)

    expect(items).toHaveLength(0)
    expect(items[0]).toBe(undefined)
    expect(items.at(-1)).toBe(undefined)
  })

  describe('24-hour format', () => {
    it('should return full items', () => {
      const { date } = createMockDate()

      const items = getHourUnits(date, false)

      /* eslint-disable array-element-newline, no-multi-spaces */
      const expected = [
        '00', '01', '02', '03', '04', '05', '06', '07', '08',
        '09', '10', '11', '12', '13', '14', '15', '16', '17',
        '18', '19', '20', '21', '22', '23',
      ]
      /* eslint-enable array-element-newline, no-multi-spaces */

      expect(items).toStrictEqual(expected)
      expect(items).toHaveLength(HOURS_24)
    })

    it('should return items with interval', () => {
      const { date } = createMockDate()

      const interval = 2
      const items    = getHourUnits(date, false, interval)

      /* eslint-disable array-element-newline, no-multi-spaces */
      const expected = [
        '00', '02', '04', '06', '08',
        '10', '12', '14', '16', '18',
        '20', '22',
      ]
      /* eslint-enable array-element-newline, no-multi-spaces */

      expect(items).toStrictEqual(expected)
      expect(items).toHaveLength(HOURS_24 / interval)
    })

    it('should return items greater equal than min hours', () => {
      const { date, minDate } = createMockDate()

      const items       = getHourUnits(date, false, 1, minDate)
      const minHours    = getHours(minDate)
      const itemsLength = HOURS_24 - minHours

      expect(items[0]).toBe(minHours.toString().padStart(2, '0'))
      expect(items).toHaveLength(itemsLength)
    })

    it('should return items lower equal than max hours', () => {
      const { date, maxDate } = createMockDate()

      const maxHours    = getHours(maxDate)
      const items       = getHourUnits(date, false, 1, undefined, maxDate)
      const itemsLength = (maxHours % HOURS_24) + 1
      const itemLast    = maxHours < HOURS_24 ? maxHours.toString().padStart(2, '0') : '23'

      expect(items.at(-1)).toBe(itemLast)
      expect(items).toHaveLength(itemsLength)
    })

    it('should return items between min and max hours', () => {
      const { date, minDate, maxDate } = createMockDate()

      const minHours = getHours(minDate)
      const maxHours = getHours(maxDate)

      const items       = getHourUnits(date, false, 1, minDate, maxDate)
      const itemsLength = maxHours - minHours

      expect(items[0]).toBe(minHours.toString().padStart(2, '0'))
      expect(items.at(-1)).toBe(maxHours.toString().padStart(2, '0'))
      expect(items).toHaveLength(itemsLength + 1)
    })
  })

  describe('12-hour format', () => {
    it('should return full items', () => {
      const { date }  = createMockDate()
      const hourUnits = getHourUnits(date, true)

      /* eslint-disable array-element-newline, no-multi-spaces */
      const expected = [
        '12', '01', '02', '03', '04', '05', '06',
        '07', '08', '09', '10', '11',
      ]
      /* eslint-enable array-element-newline, no-multi-spaces */

      expect(hourUnits).toStrictEqual(expected)
      expect(hourUnits).toHaveLength(HOURS_12)
      expect(hourUnits[0]).toBe('12')
      expect(hourUnits.at(-1)).toBe('11')
    })

    it('should return items with interval', () => {
      const { date } = createMockDate()

      const interval = 2
      const items    = getHourUnits(date, true, interval)

      /* eslint-disable array-element-newline, no-multi-spaces */
      const expected = [
        '12', '02', '04',
        '06', '08', '10',
      ]
      /* eslint-enable array-element-newline, no-multi-spaces */

      expect(items).toStrictEqual(expected)
      expect(items).toHaveLength(HOURS_12 / interval)
    })

    it('should return items greater equal than min hours', () => {
      const { date, minDate } = createMockDate()

      const minHours = getHours(minDate)

      const items       = getHourUnits(date, true, 1, minDate)
      const itemsLength = minHours <= 12 ? HOURS_12 : (HOURS_24 % minHours)
      const modulo      = minHours % HOURS_12

      expect(items[0]).toBe(modulo === 0 ? '12' : modulo.toString().padStart(2, '0'))
      expect(items).toHaveLength(itemsLength)
    })

    it('should return items lower equal than max hours', () => {
      const { date, maxDate } = createMockDate()

      const maxHours = getHours(maxDate)

      const items       = getHourUnits(date, true, 1, undefined, maxDate)
      const itemsLength = maxHours >= 12 ? HOURS_12 : (maxHours % HOURS_24) + 1
      const itemLast    = ((maxHours < HOURS_12) && (HOURS_12 % maxHours < 12)) ? maxHours.toString().padStart(2, '0') : '11'

      expect(items.at(-1)).toBe(itemLast)
      expect(items).toHaveLength(itemsLength)
    })

    it('should return items between min and max hours', () => {
      const { date, minDate, maxDate } = createMockDate()

      const minHours   = getHours(minDate)
      const maxHours   = getHours(maxDate)
      const rangeHours = maxHours - minHours
      const modulo     = minHours % HOURS_12

      const items       = getHourUnits(date, true, 1, minDate, maxDate)
      const itemsLength = rangeHours < HOURS_12 ? rangeHours + 1 : HOURS_12
      const itemLast    = maxHours < HOURS_12 ? maxHours : maxHours % HOURS_12

      expect(items[0]).toBe(modulo === 0 ? '12' : modulo.toString().padStart(2, '0'))
      expect(items.at(-1)).toBe(itemsLength === HOURS_12 ? '12' : itemLast.toString().padStart(2, '0'))
      expect(items).toHaveLength(itemsLength)
    })
  })
})

describe('getMinuteUnits', () => {
  it('should return array of string', () => {
    const { date } = createMockDate()

    const items = getMinuteUnits(date, 0, 1)

    expect(items).toBeInstanceOf(Array)
  })

  it('should return full items', () => {
    const { date } = createMockDate()

    const items = getMinuteUnits(date, 0, 1)

    expect(items).toHaveLength(MINUTES)
  })

  it('should return items with interval', () => {
    const { date } = createMockDate()

    const interval = 10
    const items    = getMinuteUnits(date, 0, interval)

    /* eslint-disable array-element-newline, no-multi-spaces */
    const expected = [
      '00', '10', '20',
      '30', '40', '50',
    ]
    /* eslint-enable array-element-newline, no-multi-spaces */

    expect(items).toStrictEqual(expected)
    expect(items).toHaveLength(MINUTES / interval)
  })

  it('should return items greater equal than min minutes, based on current hours', () => {
    const { date }   = createMockDate()
    const minDate    = set(new Date(), {
      hours: 15, minutes: 20, seconds: 0,
    })
    const minMinutes = getMinutes(minDate)

    let items = getMinuteUnits(date, 15, 1, minDate)

    expect(items[0]).toBe('20')
    expect(items.at(-1)).toBe('59')
    expect(items).toHaveLength(MINUTES - minMinutes)

    items = getMinuteUnits(date, 17, 1, minDate)

    expect(items[0]).toBe('00')
    expect(items.at(-1)).toBe('59')
    expect(items).toHaveLength(MINUTES)
  })

  it('should return items lower equal than max minutes, based on current hours', () => {
    const { date }   = createMockDate()
    const maxDate    = set(new Date(), {
      hours: 15, minutes: 45, seconds: 0,
    })
    const maxMinutes = getMinutes(maxDate)

    let items = getMinuteUnits(date, 0, 1, undefined, maxDate)

    expect(items[0]).toBe('00')
    expect(items.at(-1)).toBe('59')
    expect(items).toHaveLength(MINUTES)

    items = getMinuteUnits(date, 15, 1, undefined, maxDate)

    expect(items[0]).toBe('00')
    expect(items.at(-1)).toBe('45')
    expect(items).toHaveLength(maxMinutes + 1)
  })

  it('should return items between min and max minutes', () => {
    const { date } = createMockDate()
    const minDate  = set(new Date(), {
      hours: 15, minutes: 10, seconds: 0,
    })
    const maxDate  = set(new Date(), {
      hours: 15, minutes: 30, seconds: 0,
    })

    const rangeMinutes = getMinutes(maxDate) - getMinutes(minDate)

    const items = getMinuteUnits(date, 15, 1, minDate, maxDate)

    expect(items[0]).toBe('10')
    expect(items.at(-1)).toBe('30')
    expect(items).toHaveLength(rangeMinutes + 1)
  })

  it('should return empty items if max is greater than min, vice versa', () => {
    const { date } = createMockDate()
    const minDate  = set(new Date(), {
      hours: 15, minutes: 0, seconds: 0,
    })
    const maxDate  = set(new Date(), {
      hours: 12, minutes: 30, seconds: 0,
    })

    const items = getMinuteUnits(date, 0, 1, minDate, maxDate)

    expect(items).toHaveLength(0)
    expect(items[0]).toBe(undefined)
    expect(items.at(-1)).toBe(undefined)
  })
})

describe('getFormat', () => {
  it('should return 24-hour format', () => {
    const format = getFormat(false)

    expect(format).toBe('HH:mm')
  })
  it('should return 12-hour format', () => {
    const format = getFormat(true)

    expect(format).toBe('hh:mm a')
  })
})

describe('parseTime', () => {
  it('should return hour, minute, and period in 24-hour format', () => {
    const { hh, mm, a } = parseTime(new Date(2024, 2, 12, 4, 30, 0), 'HH:mm')

    expect(hh).toBe('04')
    expect(mm).toBe('30')
    expect(a).toBe('AM')
  })
  it('should return hour, minute, and period in 12-hour format', () => {
    const { hh, mm, a } = parseTime(new Date(2024, 2, 12, 17, 30, 0), 'hh:mm a')

    expect(hh).toBe('05')
    expect(mm).toBe('30')
    expect(a).toBe('PM')
  })
})

describe('validateInterval', () => {
  describe('hour interval', () => {
    it('should be truthy if hour interval between 1 and 24', () => {
      const result = validateInterval('hour', 6, false)

      expect(result).toBeTruthy()
    })
    it('should be truthy if hour interval between 1 and 12 for 12-hour', () => {
      const result = validateInterval('hour', 6, true)

      expect(result).toBeTruthy()
    })
    it('should be falsy if hour is minus', () => {
      const result = validateInterval('hour', -15, false)

      expect(result).toBeFalsy()
    })
  })
  describe('minute interval', () => {
    it('should be truthy if minute interval between 1 and 60', () => {
      const result = validateInterval('minute', 5, false)

      expect(result).toBeTruthy()
    })
    it('should be falsy if minute is minus', () => {
      const result = validateInterval('minute', -15, false)

      expect(result).toBeFalsy()
    })
  })
})
