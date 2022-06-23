import { fireEvent, render } from '@testing-library/vue'
import Select from '../Select.vue'
import Adapter from './fuzzy-adapter'

it('should be able to display items from props `options`', async () => {
  const screen = render({
    components: { Select },
    template  : `
      <Select
        :adapter="adapter"
        :options="options" />
    `,
    setup () {
      const options = [
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

      return {
        options,
        adapter: Adapter,
      }
    },
  })

  const select = screen.queryByTestId('select')

  await fireEvent.click(select)

  const items  = screen.queryAllByTestId('select-item')
  const apple  = screen.queryByText('Apple')
  const grape  = screen.queryByText('Grape')
  const orange = screen.queryByText('Orange')

  expect(select).toBeInTheDocument()
  expect(items).toHaveLength(3)

  expect(apple).toBeInTheDocument()
  expect(grape).toBeInTheDocument()
  expect(orange).toBeInTheDocument()
})

it('should be able to filter (search) items by keyword', async () => {
  const screen = render({
    components: { Select },
    template  : `
      <Select
        :adapter="adapter"
        :options="options" />
    `,
    setup () {
      const options = [
        {
          text : 'Apple',
          value: 'Apple',
        },
        {
          text : 'Grape',
          value: 'Grape',
        },
        {
          text : 'Banana',
          value: 'Banana',
        },
      ]

      return {
        options,
        adapter: Adapter,
      }
    },
  })

  const select = screen.queryByTestId('select')
  const search = screen.queryByTestId('select-search')

  await fireEvent.click(select)

  expect(select).toBeInTheDocument()

  expect(screen.queryByText('Apple')).toBeInTheDocument()
  expect(screen.queryByText('Grape')).toBeInTheDocument()
  expect(screen.queryByText('Banana')).toBeInTheDocument()

  await fireEvent.focus(search)
  await fireEvent.update(search, 'nn')

  expect(screen.queryByText('Apple')).not.toBeInTheDocument()
  expect(screen.queryByText('Grape')).not.toBeInTheDocument()
  expect(screen.queryByText('Banana')).toBeInTheDocument()
})
