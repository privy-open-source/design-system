import { SelectProps, SelectItem } from '../use-select'
import { useOptionsProp } from './adapter'

it('should be able to convert Array of String into Array of SelectItem', () => {
  const props: SelectProps = {
    modelValue: undefined,
    selected  : undefined,
    options   : [
      'Apple',
      'Grape',
      'Orange',
    ],
  }

  const result                 = useOptionsProp(props)
  const expected: SelectItem[] = [
    {
      text : 'Apple',
      value: 'Apple',
    },
    {
      text : 'Grape',
      value: 'Grape',
    },
    {
      text : 'Orange',
      value: 'Orange',
    },
  ]

  expect(result.value).toBeArray()
  expect(result.value).toStrictEqual(expected)
})

it('should be return as is if options is already an Array of SelectItem', () => {
  const props: SelectProps = {
    modelValue: undefined,
    selected  : undefined,
    options   : [
      {
        text : 'Apple',
        value: 'Apple',
      },
      {
        text : 'Grape',
        value: 'Grape',
      },
      {
        text : 'Orange',
        value: 'Orange',
      },
    ],
  }

  const result                 = useOptionsProp(props)
  const expected: SelectItem[] = [
    {
      text : 'Apple',
      value: 'Apple',
    },
    {
      text : 'Grape',
      value: 'Grape',
    },
    {
      text : 'Orange',
      value: 'Orange',
    },
  ]

  expect(result.value).toBeArray()
  expect(result.value).toStrictEqual(expected)
})

it('should return empty array if props is not valid array', () => {
  const props: SelectProps = {
    modelValue: undefined,
    selected  : undefined,
    // @ts-expect-error, It should be never happen, because it's not allowsd
    options   : {},
  }

  const result                 = useOptionsProp(props)
  const expected: SelectItem[] = []

  expect(result.value).toBeArray()
  expect(result.value).toStrictEqual(expected)
})
