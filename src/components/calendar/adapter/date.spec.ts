import Adapter from './date'
import { ref } from 'vue-demi'
import type { CalendarContext, CalendarItem } from './adapter'
import { initStore, setLang } from '../../global/store'
import {
  minTime as MIN_TIME,
  maxTime as MAX_TIME,
} from 'date-fns/constants'

export function createMockContext (
  minDate?: Date,
  maxDate?: Date,
): CalendarContext {
  const cursor = ref(new Date(2022, 9, 13))
  const start  = ref(new Date(2022, 9, 13))
  const end    = ref(new Date(2022, 9, 13))
  const min    = ref(minDate ?? new Date(MIN_TIME))
  const max    = ref(maxDate ?? new Date(MAX_TIME))

  return {
    cursor,
    start,
    end,
    min,
    max,
  }
}

beforeEach(() => {
  initStore()
})

describe('getItems', () => {
  /****************************
   * **   Calendar Style     **
   * **      Oct 2022        **
   * **************************
   * Mo  Tu  We  Th  Fr  Sa  Su
   * 25  26  27  28  29  30   1
   *  2   3   4   5   6   7   8
   *  9  10  11  12  13  14  15
   * 16  17  18  19  20  21  22
   * 23  24  25  26  27  28  29
   * 30  31   1   2   3   4   5
   */
  it('should be able to return list of date in one month (calendar-style)', () => {
    const context = createMockContext()
    const items   = Adapter.getItems(context).map((i) => i.text)

    /* eslint-disable array-element-newline, no-multi-spaces */
    const expected = [
      'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa',
      '25', '26', '27', '28', '29', '30', '1',
      '2',  '3',  '4',  '5',  '6',  '7',  '8',
      '9',  '10', '11', '12', '13', '14', '15',
      '16', '17', '18', '19', '20', '21', '22',
      '23', '24', '25', '26', '27', '28', '29',
      '30', '31',  '1',  '2',  '3',  '4',  '5',
    ]
    /* eslint-enable array-element-newline, no-multi-spaces */

    expect(items).toStrictEqual(expected)
  })

  it('should be disabled if the date is from other month', () => {
    const context    = createMockContext()
    const items      = Adapter.getItems(context)
    const isDisabled = (item: CalendarItem) => item.disabled

    // 25, 26, 27, 28, 29, 30 Apr
    expect(items.slice(7, 13)).toSatisfyAll(isDisabled)
    // 1, 2, 3, 4, 5 June
    expect(items.slice(-5)).toSatisfyAll(isDisabled)
  })

  it('should be disabled if the date is before "min"', () => {
    const context    = createMockContext(new Date(2022, 9, 9))
    const items      = Adapter.getItems(context)
    const isDisabled = (item: CalendarItem) => item.disabled

    // 2, 3, 4, 5, 6, 7, 8 Apr
    expect(items.slice(14, 21)).toSatisfyAll(isDisabled)
  })

  it('should be enabled if the date same as "min"', () => {
    const context = createMockContext(new Date(2022, 9, 9))
    const items   = Adapter.getItems(context)

    expect(items[21].text).toBe('9')
    expect(items[21].disabled).toBe(false)
  })

  it('should be disabled if the date is after "max"', () => {
    const context    = createMockContext(undefined, new Date(2022, 9, 1))
    const items      = Adapter.getItems(context)
    const isDisabled = (item: CalendarItem) => item.disabled

    // 2, 3, 4, 5, 6, 7, 8 Apr
    expect(items.slice(14, 21)).toSatisfyAll(isDisabled)
  })

  it('should be enabled if the date same as "max"', () => {
    const context = createMockContext(new Date(2022, 9, 1))
    const items   = Adapter.getItems(context)

    expect(items[13].text).toBe('1')
    expect(items[13].disabled).toBe(false)
  })
})

describe('getTitle', () => {
  it('should be able to return title of current cursor', () => {
    const context  = createMockContext()
    const title    = Adapter.getTitle(context)
    const expected = 'October 2022'

    expect(title).toBe(expected)
  })
})

describe('getPrevCursor', () => {
  it('should be able to return previous month', () => {
    const context  = createMockContext()
    const month    = Adapter.getPrevCursor(context).getMonth()
    const expected = 8 // Month in JS starts with 0, so Oct => 9, Sept => 8

    expect(month).toBe(expected)
  })
})

describe('getNextCursor', () => {
  it('should be able to return next month', () => {
    const context  = createMockContext()
    const month    = Adapter.getNextCursor(context).getMonth()
    const expected = 10 // Month in JS starts with 0, so Oct => 9, Nov => 10

    expect(month).toBe(expected)
  })
})

describe('canPrev', () => {
  it('should return true if min not provided', () => {
    const context = createMockContext()
    const result  = Adapter.canPrev(context)

    expect(result).toBe(true)
  })

  it('should return false if min set to this month', () => {
    const context = createMockContext(new Date(2022, 9, 1))
    const result  = Adapter.canPrev(context)

    expect(result).toBe(false)
  })

  it('should return true if min set to last month', () => {
    const context = createMockContext(new Date(2022, 3, 15))
    const result  = Adapter.canPrev(context)

    expect(result).toBe(true)
  })
})

describe('canNext', () => {
  it('should return true if max not provided', () => {
    const context = createMockContext()
    const result  = Adapter.canNext(context)

    expect(result).toBe(true)
  })

  it('should return false if max set to this month', () => {
    const context = createMockContext(undefined, new Date(2022, 9, 31))
    const result  = Adapter.canNext(context)

    expect(result).toBe(false)
  })

  it('should return true if max set to next month', () => {
    const context = createMockContext(undefined, new Date(2022, 10, 15))
    const result  = Adapter.canNext(context)

    expect(result).toBe(true)
  })
})

describe('Localization', () => {
  it('should respect global lang setting', () => {
    setLang('id')

    const context = createMockContext()
    const items   = Adapter.getItems(context).slice(0, 7).map((i) => i.text)

    const expected = [
      'Min',
      'Sen',
      'Sel',
      'Rab',
      'Kam',
      'Jum',
      'Sab',
    ]

    expect(items).toStrictEqual(expected)
  })
})

describe('setValue', () => {
  it('should only set date and keep the time', () => {
    const oldValue = new Date(2023, 2, 15, 5, 20, 45)
    const newValue = new Date(2025, 5, 1)
    const result   = Adapter.setValue(newValue, oldValue)

    expect(result.getFullYear()).toBe(2025)
    expect(result.getMonth()).toBe(5)
    expect(result.getDate()).toBe(1)

    expect(result.getHours()).toBe(5)
    expect(result.getMinutes()).toBe(20)
    expect(result.getSeconds()).toBe(45)
  })

  it('should return as is if oldValue undefined', () => {
    const oldValue = undefined
    const newValue = new Date(2025, 5, 1)
    const result   = Adapter.setValue(newValue, oldValue)

    expect(result.getFullYear()).toBe(2025)
    expect(result.getMonth()).toBe(5)
    expect(result.getDate()).toBe(1)
  })
})
