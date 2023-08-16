import Draggable from './__mocks__/vuedraggable'
import { vi } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import { ref } from 'vue-demi'
import { defineTable } from '.'
import Table from './Table.vue'

vi.mock('vuedraggable', () => ({ default: Draggable }))

const fields = defineTable([
  'id',
  'name',
  'status',
])

const items = ref([
  {
    id    : 1,
    name  : 'Tarjono',
    status: true,
  },
  {
    id    : 2,
    name  : 'Tarjono',
    status: false,
  },
  {
    id    : 3,
    name  : 'Tarjono',
    status: true,
  },
  {
    id         : 4,
    name       : 'Tarjono',
    status     : true,
    _selectable: false,
  },
])

it('should render properly', () => {
  const screen = render({
    components: { Table },
    template  : '<Table />',
  })

  const table = screen.getByTestId('datatable')

  expect(table).toBeInTheDocument()
  expect(table).toHaveClass('datatable')
})

it('should be able to render items', () => {
  const screen = render({
    components: { Table },
    template  : '<Table :fields="fields" :items="items" />',
    setup () {
      return { fields, items }
    },
  })

  const table = screen.getByTestId('datatable')
  const names = screen.getAllByText('Tarjono')

  expect(table).toBeInTheDocument()
  expect(table).toHaveClass('datatable')
  expect(names).toHaveLength(4)
})

it('should have style static if variant set to `static`', () => {
  const screen = render({
    components: { Table },
    template  : '<Table variant="static" :fields="fields" :items="items" />',
    setup () {
      return { fields, items }
    },
  })

  const table = screen.getByTestId('datatable')

  expect(table).toBeInTheDocument()
  expect(table).toHaveClass('datatable', 'datatable--static')
  expect(table).not.toHaveClass('datatable--flexible')
})

it('should able to set cell width if width provided in fields scheme', () => {
  const fields = defineTable([{ key: 'id', width: 1 }])
  const itemsA = ref([])
  const screen = render({
    components: { Table },
    template  : `
      <div>
        <Table variant="flexible" :fields="fields" :items="items" />
        <Table variant="static" :fields="fields" :items="items" />
        <Table :fields="fields" :items="itemsA" />
      </div>
    `,
    setup () {
      return {
        fields, items, itemsA,
      }
    },
  })

  const cells = screen.queryAllByTestId('datatable-cell')

  expect(cells.at(0)).toHaveStyle({ width: '1%' })
  expect(cells.at(0)).not.toHaveStyle({ flex: '1 1 0%' })

  const headers = screen.getAllByTestId('datatable-static-header')

  expect(headers.at(0)).toHaveStyle({ width: '1%' })
  expect(headers.at(0)).not.toHaveStyle({ flex: '1 1 0%' })

  const cellsEmpty = screen.getAllByTestId('datatable-cell-empty')

  expect(cellsEmpty.at(0)).toHaveStyle({ width: '1%' })
  expect(cellsEmpty.at(0)).not.toHaveStyle({ flex: '1 1 0%' })
})

it('should enable checkbox if prop `selectable` is provided', () => {
  const screen = render({
    components: { Table },
    template  : '<Table :fields="fields" :items="items" selectable />',
    setup () {
      return { fields, items }
    },
  })

  const checkboxs = screen.getAllByTestId('datatable-select')

  expect(checkboxs).toHaveLength(4)
})

it('should binding checked item into `v-model`', async () => {
  const selected = ref([])
  const screen   = render({
    components: { Table },
    template  : `
      <Table
        v-model="selected"
        :fields="fields"
        :items="items"
        selectable
      />`,
    setup () {
      return {
        fields,
        items,
        selected,
      }
    },
  })

  const checkboxs = screen.getAllByTestId('datatable-select')

  await fireEvent.click(checkboxs.at(0))

  expect(selected.value).toHaveLength(1)
  expect(selected.value.at(0)).toMatchObject({
    id    : 1,
    name  : 'Tarjono',
    status: true,
  })
})

it('should able to select all items (except disable one) in variant static', async () => {
  const selected = ref([])
  const screen   = render({
    components: { Table },
    template  : `
      <Table
        v-model="selected"
        variant="static"
        :fields="fields"
        :items="items"
        selectable
      />`,
    setup () {
      return {
        fields,
        items,
        selected,
      }
    },
  })

  const selectAll = screen.getByTestId('datatable-select-all')

  await fireEvent.click(selectAll)

  expect(selected.value).toHaveLength(3)

  await fireEvent.click(selectAll)

  expect(selected.value).toHaveLength(0)
})

it('should show drag handle if `draggable` prop is provided', () => {
  const screen = render({
    components: { Table },
    template  : `
      <Table
        variant="static"
        :fields="fields"
        :items="items"
        draggable
      />`,
    setup () {
      return {
        fields,
        items,
      }
    },
  })

  const handle = screen.getAllByTestId('datatable-drag-handle')

  expect(handle).toHaveLength(4)
})

it('should binding v-model:item when drag the item', async () => {
  const items = ref([
    {
      id    : 1,
      name  : 'Tarjono',
      status: true,
    },
    {
      id    : 2,
      name  : 'Tarjono',
      status: false,
    },
    {
      id    : 3,
      name  : 'Tarjono',
      status: true,
    },
  ])

  render({
    components: { Table },
    template  : `
      <Table
        v-model:items="items"
        variant="static"
        :fields="fields"
        draggable
      />`,
    setup () {
      return {
        fields,
        items,
      }
    },
  })

  // eslint-disable-next-line array-bracket-newline, array-element-newline
  expect(items.value.map((i) => i.id)).toEqual([3, 2, 1])
})

it('should able to change empty state label via `empty-label` prop', () => {
  const itemsA = ref([])
  const screen = render({
    components: { Table },
    template  : `
      <Table
        :fields="fields"
        :items="itemsA"
        empty-label="nothing to show here"
      />`,
    setup () {
      return {
        fields,
        itemsA,
      }
    },
  })

  const empty = screen.getByTestId('datatable-empty')

  expect(empty).toBeInTheDocument()
  expect(empty).toHaveTextContent('nothing to show here')
})

it('should able to hide label in flexible variant via `no-label` prop', () => {
  const screen = render({
    components: { Table },
    template  : `
      <Table
        :fields="fields"
        :items="items"
        no-label
      />`,
    setup () {
      return {
        fields,
        items,
      }
    },
  })

  const table = screen.getByTestId('datatable')

  expect(table).toBeInTheDocument()
  expect(table).toHaveClass('datatable--no-label')
})

it('should able to show table header in flexible variant via `show-table-header` prop', () => {
  const screen = render({
    components: { Table },
    template  : `
      <Table
        :fields="fields"
        :items="items"
        show-table-header
      />`,
    setup () {
      return {
        fields,
        items,
      }
    },
  })

  const table = screen.getByTestId('datatable')

  expect(table).toBeInTheDocument()
  expect(table).toHaveClass('datatable--show-table-header')
})
