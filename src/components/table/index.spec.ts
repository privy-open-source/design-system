import {
  baseFormatter,
  defineTable,
  withKey,
  withoutKey,
  withUnit,
} from '.'

describe('defineTable', () => {
  it('should able convert string to field object', () => {
    const fields = defineTable([
      'id',
      'item',
      'status',
    ])

    expect(fields).toStrictEqual([
      {
        key      : 'id',
        label    : 'Id',
        formatter: baseFormatter,
      },
      {
        key      : 'item',
        label    : 'Item',
        formatter: baseFormatter,
      },
      {
        key      : 'status',
        label    : 'Status',
        formatter: baseFormatter,
      },
    ])
  })

  it('should able normalize field object', () => {
    const fields = defineTable([
      /* mising formatter */
      { key: 'id', label: '#' },
      /* mising label and formatter */
      { key: 'item' },
      {
        key    : 'status',
        label  : 'Is Active?',
        tdClass: 'center',
      },
    ])

    expect(fields).toMatchObject([
      {
        key      : 'id',
        label    : '#',
        formatter: baseFormatter,
      },
      {
        key      : 'item',
        label    : 'Item',
        formatter: baseFormatter,
      },
      {
        key      : 'status',
        label    : 'Is Active?',
        tdClass  : 'center',
        formatter: baseFormatter,
      },
    ])
  })
})

describe('baseFormatter', () => {
  const cases: Array<[unknown, string]> = [
    // eslint-disable-next-line unicorn/no-null
    [null, '-'],
    [undefined, '-'],
    [1, '1'],
    [true, 'true'],
    [false, 'false'],
    ['Hello', 'Hello'],
    ['', ''],
  ]

  it.each(cases)('should format %s to %s', (input, expected) => {
    const output = baseFormatter(input)

    expect(output).toBe(expected)
  })
})

describe('withKey', () => {
  it('should return object with `_key`', () => {
    const item   = { hello: 'world' }
    const output = withKey(item)

    expect(output._key).toBeDefined()
    expect(typeof output._key).toBe('symbol')
  })
})

describe('withoutKey', () => {
  it('should return object without `_key`', () => {
    const item   = { hello: 'world', _key: Symbol('item-key') }
    const output = withoutKey(item)

    expect(output._key).toBeUndefined()
    expect(typeof output._key).not.toBe('symbol')
  })
})

describe('withUnit', () => {
  it('should return percent if value is number', () => {
    expect(withUnit(5)).toBe('5%')
  })

  it('should return percent if value is string but has no unit', () => {
    expect(withUnit('100')).toBe('100%')
  })

  it('should return nothing if value is undefined', () => {
    expect(withUnit()).toBeUndefined()
  })

  it('should return as is if value has a unit', () => {
    expect(withUnit('10rem')).toBe('10rem')
  })
})
