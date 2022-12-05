import { baseFormatter, defineTable } from '.'

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
