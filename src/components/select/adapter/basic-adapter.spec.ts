import Adapter from './basic-adapter'
import { nextTick, ref } from 'vue-demi'

it('should be able to display items from props `options`', async () => {
  const items = Adapter.setup({
    props: {
      options: [
        'Apple',
        'Grape',
        'Orange',
      ],
      modelValue: undefined,
      selected  : undefined,
    },
    isLoading: ref(false),
    menuEl   : ref(),
    keyword  : ref(''),
    isOpen   : ref(true),
  })

  expect(items.value).toStrictEqual([
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
  ])
})

it('should be able to filter (search) items by keyword', async () => {
  const keyword = ref('')
  const items   = Adapter.setup({
    props: {
      options: [
        'Apple',
        'Grape',
        'Orange',
      ],
      modelValue: undefined,
      selected  : undefined,
    },
    isLoading: ref(false),
    menuEl   : ref(),
    keyword  : keyword,
    isOpen   : ref(true),
  })

  expect(items.value).toStrictEqual([
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
  ])

  keyword.value = 'orange'

  await nextTick()

  expect(items.value).toStrictEqual([
    {
      text : 'Orange',
      value: 'Orange',
    },
  ])
})
