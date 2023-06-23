import { parseDuration, validateDuration } from './adapter'

describe('validateDuration', () => {
  const cases: Array<[string, boolean]> = [
    ['', false],
    ['4H', true],
    ['8D7H', true],
    ['8D7H30m', true],
    ['DD', false],
    ['88', false],
    ['8D77', false],
    ['8DHH77', false],
    ['-4H', true],
    ['1W-1D', true],
  ]

  it.each(cases)('"%s" should return "%s"', (input, expected) => {
    expect(validateDuration(input)).toBe(expected)
  })
})

describe('parseDuration', () => {
  it('should able to parse single value', () => {
    expect(parseDuration('4H')).toStrictEqual({ hours: 4 })
  })

  it('should able to parse multiple value', () => {
    expect(parseDuration('1W4D')).toStrictEqual({ weeks: 1, days: 4 })
  })

  it('should sum value of multiple value with same token (suffix)', () => {
    expect(parseDuration('3D4D')).toStrictEqual({ days: 7 })
  })

  it('should able to use negative value', () => {
    expect(parseDuration('1W-1D')).toStrictEqual({ weeks: 1, days: -1 })
  })
})
