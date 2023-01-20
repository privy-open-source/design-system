import {
  getCenter,
  getEmptyPosition,
  isOffside,
  useMapSnapshot,
} from './overlap'

describe('getCenter', () => {
  it('should return center position', () => {
    const result = getCenter({ width: 100, height: 100 }, { width: 500, height: 500 })

    expect(result.x).toBe(200)
    expect(result.y).toBe(200)
  })
})

describe('isOffside', () => {
  it('should able to detect is object offside from boundary', () => {
    const a = isOffside({
      x     : 100,
      y     : 100,
      width : 150,
      height: 50,
    }, { width: 200, height: 200 })

    const b = isOffside({
      x     : 175,
      y     : 100,
      width : 150,
      height: 50,
    }, { width: 200, height: 200 })

    const c = isOffside({
      x     : 100,
      y     : 100,
      width : 50,
      height: 50,
    }, { width: 200, height: 200 })

    expect(a).toBe(true)
    expect(b).toBe(true)
    expect(c).toBe(false)
  })
})

describe('useMapSnapshot', () => {
  it('should able detect is object overlaping (collision)', () => {
    const objects = [
      { x: 100, y: 100 },
      { x: 115, y: 115 },
      { x: 130, y: 130 },
      { x: 145, y: 145 },
      { x: 160, y: 160 },
      { x: 175, y: 175 },
      { x: 190, y: 190 },
    ]

    const checkOverlap = useMapSnapshot(objects)

    const a = checkOverlap({ x: 130, y: 130 }, [])
    const b = checkOverlap({ x: 135, y: 130 }, [])
    const c = checkOverlap({ x: 50, y: 50 }, [])

    expect(a).toBe(true)
    expect(b).toBe(true)
    expect(c).toBe(false)
  })
})

describe('getEmptyPosition', () => {
  it('should return center of offside reference size', () => {
    const offside = {
      width : 793,
      height: 1122,
    }

    const size = {
      width : 198,
      height: 106,
    }

    const result = getEmptyPosition({
      offside: offside,
      size   : size,
      objects: [],
    })

    expect(result.x).toBe(297.5)
    expect(result.y).toBe(508)
  })

  it('should return other position if current center position is already taken', () => {
    const offside = {
      width : 793,
      height: 1122,
    }

    const size = {
      width : 198,
      height: 106,
    }

    const result = getEmptyPosition({
      offside: offside,
      size   : size,
      objects: [
        {
          x: 297.5,
          y: 508,
        },
      ],
    })

    expect(result.x).toBe(297.5 + 15)
    expect(result.y).toBe(508 + 15)
  })

  it('should return no offside position', () => {
    const offside = {
      width : 300,
      height: 300,
    }

    const size = {
      width : 100,
      height: 100,
    }

    const objects = [
      { x: 100, y: 100 },
      { x: 115, y: 115 },
      { x: 130, y: 130 },
      { x: 145, y: 145 },
      { x: 160, y: 160 },
      { x: 175, y: 175 },
      { x: 190, y: 190 },
    ]

    // Next position should be [205, 205]
    // But, 205 + 100 = 305, it's over 300 (width)
    // So, it should back to center, and +15 to y-axis

    const result = getEmptyPosition({
      offside: offside,
      size   : size,
      objects: objects,
    })

    expect(result.x).toBe(100)
    expect(result.y).toBe(115)
  })
})
