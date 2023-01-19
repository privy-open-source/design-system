/**
* PAGE_PADDING is total from first_page + last_page + current_page + 2*DOTS
*/

export const DOTS = '...'
export const PAGE_PADDING = 5

export function getPageRange (start: number, end: number) {
  const length = end - start + 1

  return Array.from({ length }, (_, index) => index + start)
}

export function getSiblings (displayLimit: number) {
  const totalSiblings    = Math.floor((displayLimit - PAGE_PADDING) / 2)
  const totalPageNumber  = 2 * totalSiblings + PAGE_PADDING
  const totalPageDisplay = totalPageNumber - 2

  return {
    totalSiblings,
    totalPageDisplay,
  }
}

export function getPageItems (page: number, totalPageCount: number, displayLimit: number) {
  const { totalSiblings, totalPageDisplay } = getSiblings(displayLimit)

  const startPage = Math.max(page - totalSiblings, 1)
  const endPage   = Math.min(page + totalSiblings, totalPageCount)

  /**
   * ellipsis located at second index from first page and last page
   */
  const showLeftEllipsis  = startPage > 2
  const showRightEllipsis = endPage <= totalPageCount - 2

  if (showLeftEllipsis && !showRightEllipsis) {
    const pageRange = getPageRange(totalPageCount - totalPageDisplay + 1, totalPageCount)

    return [
      1,
      DOTS,
      ...pageRange,
    ]
  }

  if (!showLeftEllipsis && showRightEllipsis) {
    const pageRange = getPageRange(1, totalPageDisplay)

    return [
      ...pageRange,
      DOTS,
      totalPageCount,
    ]
  }

  if (showLeftEllipsis && showRightEllipsis) {
    const pageRange = getPageRange(startPage, endPage)

    return [
      1,
      DOTS,
      ...pageRange,
      DOTS,
      totalPageCount,
    ]
  }
}
