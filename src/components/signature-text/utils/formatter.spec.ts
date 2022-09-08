import { expect } from 'vitest'
import { capitalize, formatName } from './formatter'

describe('capitalize', () => {
  const cases: Array<[string | undefined, string]> = [
    ['hello world', 'Hello World'],
    ['HELLO WORLD', 'Hello World'],
    ['HeLLO wORLD', 'Hello World'],
    ['HeLLO wORLD   ', 'Hello World   '],
    ['HeLLO wORLD   ', 'Hello World   '],
    ['HeLLO    wORLD', 'Hello    World'],
    ['   HeLLO wORLD', '   Hello World'],
  ]

  it.each(cases)('should be able to convert %s to %s', (input, expected) => {
    expect(capitalize(input)).toBe(expected)
  })
})

describe('formatName', () => {
  it('should capitalize the text', () => {
    expect(formatName('hello world')).toBe('Hello World')
    expect(formatName('hellO woRld')).toBe('Hello World')
    expect(formatName('HELLO WORLD')).toBe('Hello World')
  })

  it('should return empty text if input is undefined', () => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    expect(formatName(undefined)).toBe('')
  })

  it('should remove non alphabet character (except: dot, colon, space)', () => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    expect(formatName('M. Rif\'an Ade')).toBe('M. Rifan Ade')
  })
})
