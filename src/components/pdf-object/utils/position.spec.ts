import { queryByTestId } from '@testing-library/dom'
import { vi } from 'vitest'
import {
  findRelativeParent,
  computePosition,
  getPosition,
} from './position'

beforeEach(() => {
  document.body.innerHTML = `
    <div data-testid="container" style="position:relative;">
      <div data-testid="viewer" style="position:absolute;top:0;left:0;width:500px;height:500px;overflow-y:auto;">
        <div data-testid="page-1" data-page-number="1" style="width:300px;height:400px;"></div>
        <div data-testid="page-2" data-page-number="2" style="width:300px;height:400px;"></div>
      </div>
      <div data-testid="object"></div>
    </div>
  `
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('findRelativeParent', () => {
  it('should return nearest relative parent', () => {
    const container = queryByTestId(document.body, 'container') as HTMLDivElement
    const viewer    = queryByTestId(document.body, 'viewer') as HTMLDivElement
    const reference = queryByTestId(document.body, 'page-2') as HTMLDivElement

    const parent = findRelativeParent(reference, container)

    expect(parent).toBe(viewer)
  })

  it('should return the container if cannot be found', () => {
    const div = document.createElement('div')

    document.body.append(div)

    const reference = div
    const parent    = findRelativeParent(reference, document.body)

    expect(parent).toBe(document.body)
  })
})

describe('computePosition', () => {
  it('should render x, y position to top, left position', () => {
    const container = queryByTestId(document.body, 'container') as HTMLDivElement
    const viewer    = queryByTestId(document.body, 'viewer') as HTMLDivElement
    const reference = queryByTestId(document.body, 'page-2') as HTMLDivElement

    vi.spyOn(viewer, 'getBoundingClientRect').mockReturnValue({
      top   : 400,
      y     : 400,
      x     : 0,
      left  : 0,
      width : 500,
      height: 500,
      bottom: 0,
      right : 0,
      toJSON: vi.fn(),
    })

    vi.spyOn(reference, 'getBoundingClientRect').mockReturnValue({
      top   : 800,
      y     : 800,
      x     : 100,
      left  : 100,
      width : 300,
      height: 400,
      bottom: 0,
      right : 0,
      toJSON: vi.fn(),
    })

    const { top, left } = computePosition({
      container: container,
      reference: reference,
      x        : 50,
      y        : 50,
      scale    : 1,
    })

    expect(top).toBe(450)
    expect(left).toBe(150)
  })
})

describe('getPosition', () => {
  it('should able to return x, y position of current object', () => {
    const object    = queryByTestId(document.body, 'object') as HTMLDivElement
    const reference = queryByTestId(document.body, 'page-2') as HTMLDivElement

    vi.spyOn(object, 'getBoundingClientRect').mockReturnValue({
      top   : 500,
      y     : 500,
      x     : 150,
      left  : 150,
      width : 500,
      height: 500,
      bottom: 0,
      right : 0,
      toJSON: vi.fn(),
    })

    vi.spyOn(reference, 'getBoundingClientRect').mockReturnValue({
      top   : 400,
      y     : 400,
      x     : 100,
      left  : 100,
      width : 300,
      height: 400,
      bottom: 0,
      right : 0,
      toJSON: vi.fn(),
    })

    const { x, y, page } = getPosition({
      reference: reference,
      object   : object,
      scale    : 1,
      container: undefined,
    })

    expect(page).toBe(2)
    expect(x).toBe(50)
    expect(y).toBe(100)
  })
})
