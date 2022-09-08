import { CalendarItem } from './adapter'
import { createMockContext } from './date.spec'
import Adapter from './month'

describe('getItems', () => {
  it('should be able to return list of monts in one years', () => {
    const context = createMockContext()
    const items   = Adapter.getItems(context).map((i) => i.text)

    /* eslint-disable array-element-newline, no-multi-spaces */
    const expected = [
      'Jan', 'Feb', 'Mar', 'Apr',
      'May', 'Jun', 'Jul', 'Aug',
      'Sep', 'Oct', 'Nov', 'Dec',
    ]
    /* eslint-enable array-element-newline, no-multi-spaces */

    expect(items).toStrictEqual(expected)
  })

  it('should be disabled if the date is before "min"', () => {
    const context    = createMockContext(new Date(2022, 4, 1))
    const items      = Adapter.getItems(context)
    const isDisabled = (item: CalendarItem) => item.disabled

    // Jan, Feb, Mar, Apr
    expect(items.slice(0, 4)).toSatisfyAll(isDisabled)
  })

  it('should be enabled if the date same as "min"', () => {
    const context = createMockContext(new Date(2022, 4, 9))
    const items   = Adapter.getItems(context)

    expect(items[4].text).toBe('May')
    expect(items[4].disabled).toBe(false)
  })

  it('should be disabled if the date is after "max"', () => {
    const context    = createMockContext(undefined, new Date(2022, 4, 1))
    const items      = Adapter.getItems(context)
    const isDisabled = (item: CalendarItem) => item.disabled

    // June - Dec
    expect(items.slice(5)).toSatisfyAll(isDisabled)
  })

  it('should be enabled if the date same as "max"', () => {
    const context = createMockContext(new Date(2022, 4, 1))
    const items   = Adapter.getItems(context)

    expect(items[4].text).toBe('May')
    expect(items[4].disabled).toBe(false)
  })
})

describe('getTitle', () => {
  it('should be able to return title of current cursor', () => {
    const context  = createMockContext()
    const title    = Adapter.getTitle(context)
    const expected = '2022'

    expect(title).toBe(expected)
  })
})

describe('getPrevCursor', () => {
  it('should be able to return previous year', () => {
    const context  = createMockContext()
    const month    = Adapter.getPrevCursor(context).getFullYear()
    const expected = 2021

    expect(month).toBe(expected)
  })
})

describe('getNextCursor', () => {
  it('should be able to return next year', () => {
    const context  = createMockContext()
    const month    = Adapter.getNextCursor(context).getFullYear()
    const expected = 2023

    expect(month).toBe(expected)
  })
})

describe('canPrev', () => {
  it('should return true if min not provided', () => {
    const context = createMockContext()
    const result  = Adapter.canPrev(context)

    expect(result).toBe(true)
  })

  it('should return false if min set to this year', () => {
    const context = createMockContext(new Date(2022, 0, 1))
    const result  = Adapter.canPrev(context)

    expect(result).toBe(false)
  })

  it('should return true if min set to last year', () => {
    const context = createMockContext(new Date(2021, 0, 1))
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

  it('should return false if max set to this year', () => {
    const context = createMockContext(undefined, new Date(2022, 0, 1))
    const result  = Adapter.canNext(context)

    expect(result).toBe(false)
  })

  it('should return true if max set to next year', () => {
    const context = createMockContext(undefined, new Date(2023, 0, 1))
    const result  = Adapter.canNext(context)

    expect(result).toBe(true)
  })
})
