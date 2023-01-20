import {
  DOTS, getPageRange, getSiblings, getPageItems,
} from './calculate-page'

describe('getPageRange', () => {
  it('should return array from given start index to end index', () => {
    const pageRange = getPageRange(1, 5)

    expect(pageRange).toBeInstanceOf(Array)
    expect(pageRange).toHaveLength(5)
    expect(pageRange).toStrictEqual([
      1,
      2,
      3,
      4,
      5,
    ])
  })
})

describe('getSiblings', () => {
  it('should return total siblings and total page display', () => {
    const { totalSiblings, totalPageDisplay } = getSiblings(10)

    expect(totalSiblings).toBe(2)
    expect(totalPageDisplay).toBe(7)
    expect(totalSiblings + totalPageDisplay).toBe(9) // for even display limit, the total returned page items should  be display limit - 1
  })
})

describe('getPageItems', () => {
  it('should return page items with left ellipsis only', () => {
    // current page - total siblings greater than 2
    // current page + total siblings greater than total page count - 2

    const pageItems = getPageItems(12, 15, 10) // current page, total page count, display limit

    expect(pageItems).toBeInstanceOf(Array)
    expect(pageItems).toHaveLength(9)
    expect(pageItems).toStrictEqual([
      1,
      DOTS,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
    ])
  })

  it('should return page items with right ellipsis only', () => {
    // current page - total siblings less than 2
    // current page + total siblings less equal than total page count - 2

    const pageItems = getPageItems(1, 15, 10)

    expect(pageItems).toBeInstanceOf(Array)
    expect(pageItems).toHaveLength(9)
    expect(pageItems).toStrictEqual([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      DOTS,
      15,
    ])
  })

  it('should return page items with left and right ellipsis', () => {
    // current page - total siblings greater than 2
    // current page + total siblings less equal than total page count - 2

    const pageItems = getPageItems(6, 15, 10)

    expect(pageItems).toBeInstanceOf(Array)
    expect(pageItems).toHaveLength(9)
    expect(pageItems).toStrictEqual([
      1,
      DOTS,
      4,
      5,
      6,
      7,
      8,
      DOTS,
      15,
    ])
  })
})
