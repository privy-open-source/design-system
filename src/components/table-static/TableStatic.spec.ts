import Draggable from '../table/__mocks__/vuedraggable'
import { vi } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import { ref } from 'vue-demi'
import { defineTable } from '../table'
import Table from './TableStatic.vue'

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

  const table = screen.getByTestId('table-static')

  expect(table).toBeInTheDocument()
  expect(table).toHaveClass('table-static')
})

it('should be able to render items', () => {
  const screen = render({
    components: { Table },
    template  : '<Table :fields="fields" :items="items" />',
    setup () {
      return { fields, items }
    },
  })

  const table = screen.getByTestId('table-static')
  const names = screen.getAllByText('Tarjono')

  expect(table).toBeInTheDocument()
  expect(table).toHaveClass('table-static')
  expect(names).toHaveLength(4)
})

it('should have style apperance table if prop `apperance` set to `card`', () => {
  const screen = render({
    components: { Table },
    template  : '<Table apperance="card" :fields="fields" :items="items" />',
    setup () {
      return { fields, items }
    },
  })

  const table = screen.getByTestId('table-static')

  expect(table).toBeInTheDocument()
  expect(table).toHaveClass('table-static', 'table-static--card')
  expect(table).not.toHaveClass('table-static--table')
})

it('should able to set cell width if width provided in fields scheme', () => {
  const fields = defineTable([{ key: 'id', width: 1 }])
  const itemsA = ref([])
  const screen = render({
    components: { Table },
    template  : `
      <div>
        <Table :fields="fields" :items="items" />
      </div>
    `,
    setup () {
      return {
        fields, items, itemsA,
      }
    },
  })

  const cells = screen.queryAllByTestId('table-static-header')

  expect(cells.at(0)).toHaveStyle({ width: '1%' })
  expect(cells.at(0)).not.toHaveStyle({ flex: '1 1 0%' })
})

it('should enable checkbox if prop `selectable` is provided', () => {
  const screen = render({
    components: { Table },
    template  : '<Table :fields="fields" :items="items" selectable />',
    setup () {
      return { fields, items }
    },
  })

  const checkboxs = screen.getAllByTestId('table-static-select')

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

  const checkboxs = screen.getAllByTestId('table-static-select')

  await fireEvent.click(checkboxs.at(0))

  expect(selected.value).toHaveLength(1)
  expect(selected.value.at(0)).toMatchObject({
    id    : 1,
    name  : 'Tarjono',
    status: true,
  })
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

  const handle = screen.getAllByTestId('table-static-drag-handle')

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

  const empty = screen.getByTestId('table-static-empty')

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

  const table = screen.getByTestId('table-static')

  expect(table).toBeInTheDocument()
  expect(table).toHaveClass('table-static--no-label')
})

it('should able to select all items (except disable one) in variant static', async () => {
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

  const selectAll = screen.getByTestId('table-static-select-all')

  await fireEvent.click(selectAll)

  expect(selected.value).toHaveLength(3)

  await fireEvent.click(selectAll)

  expect(selected.value).toHaveLength(0)
})
