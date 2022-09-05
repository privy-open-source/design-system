import { CalendarItem } from './adapter'
import { createMockContext } from './date.spec'
import Adapter from './year'

describe('getItems', () => {
  it('should be able to return list of year in one decade', () => {
    const context = createMockContext()
    const items   = Adapter.getItems(context).map((i) => i.text)

    /* eslint-disable array-element-newline, no-multi-spaces */
    const expected = [
      '2020', '2021', '2022', '2023',
      '2024', '2025', '2026', '2027',
      '2028', '2029',
    ]
    /* eslint-enable array-element-newline, no-multi-spaces */

    expect(items).toStrictEqual(expected)
  })

  it('should be disabled if the date is before "min"', () => {
    const context    = createMockContext(new Date(2024, 0, 1))
    const items      = Adapter.getItems(context)
    const isDisabled = (item: CalendarItem) => item.disabled

    // 2020, 2021, 2022, 2023
    expect(items.slice(0, 4)).toSatisfyAll(isDisabled)
  })

  it('should be enabled if the date same as "min"', () => {
    const context = createMockContext(new Date(2024, 0, 1))
    const items   = Adapter.getItems(context)

    expect(items[4].text).toBe('2024')
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
    const context = createMockContext(new Date(2024, 4, 1))
    const items   = Adapter.getItems(context)

    expect(items[4].text).toBe('2024')
    expect(items[4].disabled).toBe(false)
  })
})

describe('getTitle', () => {
  it('should be able to return title of current cursor', () => {
    const context  = createMockContext()
    const title    = Adapter.getTitle(context)
    const expected = '2020 - 2029'

    expect(title).toBe(expected)
  })
})

describe('getPrevCursor', () => {
  it('should be able to return previous decade', () => {
    const context  = createMockContext()
    const month    = Adapter.getPrevCursor(context).getFullYear()
    const expected = 2010

    expect(month).toBe(expected)
  })
})

describe('getNextCursor', () => {
  it('should be able to return next decade', () => {
    const context  = createMockContext()
    const month    = Adapter.getNextCursor(context).getFullYear()
    const expected = 2030

    expect(month).toBe(expected)
  })
})

describe('canPrev', () => {
  it('should return true if min not provided', () => {
    const context = createMockContext()
    const result  = Adapter.canPrev(context)

    expect(result).toBe(true)
  })

  it('should return false if min set to this decade', () => {
    const context = createMockContext(new Date(2022, 0, 1))
    const result  = Adapter.canPrev(context)

    expect(result).toBe(false)
  })

  it('should return true if min set to last decade', () => {
    const context = createMockContext(new Date(2011, 0, 1))
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

  it('should return false if max set to this decade', () => {
    const context = createMockContext(undefined, new Date(2022, 0, 1))
    const result  = Adapter.canNext(context)

    expect(result).toBe(false)
  })

  it('should return true if max set to next decade', () => {
    const context = createMockContext(undefined, new Date(2033, 0, 1))
    const result  = Adapter.canNext(context)

    expect(result).toBe(true)
  })
})
