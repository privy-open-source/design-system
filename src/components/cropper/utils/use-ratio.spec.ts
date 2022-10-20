import {
  useRatio,
  useRatioHeight,
  useRatioWidth,
} from './use-ratio'

describe('useRatio', () => {
  it('should calculate ratio if props width and props height was provided', () => {
    const ratio = useRatio({
      width : 500,
      height: 300,
      ratio : 1,
    })

    expect(ratio.value).toBe(5 / 3)
  })

  it('should return ratio if ratio is provided', () => {
    const ratio = useRatio({ width: 500, ratio: 4 / 3 })

    expect(ratio.value).toBe(4 / 3)
  })

  it('should return ratio 1 if no props provided', () => {
    const ratio = useRatio({})

    expect(ratio.value).toBe(1)
  })
})

describe('useRatioWidth', () => {
  it('should return width if props width was provided', () => {
    const width = useRatioWidth({ width: 500, ratio: 4 / 3 })

    expect(width.value).toBe(500)
  })

  it('should calculate width if props width not provided but height and ratio was provided', () => {
    const width = useRatioWidth({ height: 300, ratio: 4 / 3 })

    expect(width.value).toBe(400)
  })
})

describe('useRatioHeight', () => {
  it('should return height if props height was provided', () => {
    const width = useRatioHeight({ height: 500, ratio: 4 / 3 })

    expect(width.value).toBe(500)
  })

  it('should calculate height if props height not provided but width and ratio was provided', () => {
    const width = useRatioHeight({ width: 400, ratio: 4 / 3 })

    expect(width.value).toBe(300)
  })
})
