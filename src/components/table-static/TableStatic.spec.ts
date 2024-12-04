import Draggable from '../table/__mocks__/vuedraggable'
import { vi } from 'vitest'
import {
  render,
  fireEvent,
  queryByTestId,
} from '@testing-library/vue'
import { nextTick, ref } from 'vue-demi'
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

const sortableFields = defineTable([
  { key: 'id' },
  { key: 'name' },
  {
    key     : 'gender',
    sortable: false,
  },
  {
    key     : 'age',
    sortable: true,
  },
])

function generateItems () {
  return [
    {
      id    : 1,
      name  : 'Dora',
      gender: 'male',
      age   : 27,
    },
    {
      id    : 2,
      name  : 'Emilly',
      gender: 'male',
      age   : 20,
    },
    {
      id    : 3,
      name  : 'Jane',
      gender: 'female',
      age   : 30,
    },
    {
      id    : 4,
      name  : 'Andi',
      gender: 'male',
      age   : 21,
    },
    {
      id    : 5,
      name  : 'Bella',
      gender: 'female',
      age   : 24,
    },
  ]
}

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

it('should unchecked select all if items length is zero', () => {
  const screen = render({
    components: { Table },
    template  : '<Table :fields="fields" :items="[]" selectable />',
    setup () {
      return { fields }
    },
  })

  const selectAll = screen.getByTestId('table-static-select-all')

  expect(selectAll).not.toBeChecked()
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

it('should X field header have sortable class if have `sortable` property with `true` value & `sortable` prop is provided', () => {
  const items  = ref(generateItems())
  const screen = render({
    components: { Table },
    template  : `
      <Table
        :fields="sortableFields"
        :items="items"
        sortable
      />`,
    setup () {
      return {
        sortableFields,
        items,
      }
    },
  })

  const heads = screen.queryAllByTestId('table-static-header')

  expect(heads.at(0)).toHaveClass('table-static__header--sortable')
  expect(heads.at(2)).not.toHaveClass('table-static__header--sortable')
})

it('should able modify sort by header using v-model:sort-by', async () => {
  const items  = ref(generateItems())
  const sortBy = ref({})
  const screen = render({
    components: { Table },
    template  : `
      <Table
        v-model:sort-by="sortBy"
        :fields="sortableFields"
        :items="items"
        sortable
      />`,
    setup () {
      return {
        sortableFields,
        items,
        sortBy,
      }
    },
  })

  const heads = screen.queryAllByTestId('table-static-header')

  expect(heads.at(0)).toHaveClass('table-static__header--sortable')
  expect(heads.at(2)).not.toHaveClass('table-static__header--sortable')

  await fireEvent.click(heads.at(0))

  const icon = queryByTestId(heads[0], 'table-static-header-sort')

  expect(icon).toHaveAttribute('active', 'asc')
  expect(sortBy.value).toStrictEqual({ id: 'asc' })

  await fireEvent.click(heads.at(0))

  expect(icon).toHaveAttribute('active', 'desc')
  expect(sortBy.value).toStrictEqual({ id: 'desc' })

  await fireEvent.click(heads.at(0))

  expect(icon).not.toHaveAttribute('active', 'desc')
  expect(sortBy.value).toStrictEqual({ id: undefined })

  sortBy.value = { name: 'desc' }
  await nextTick()

  const icon2 = queryByTestId(heads[1], 'table-static-header-sort')

  expect(icon).not.toHaveAttribute('active', 'asc')
  expect(icon2).toHaveAttribute('active', 'desc')
})

it('should have multiple value if sortable set to `multiple`', async () => {
  const items  = ref(generateItems())
  const sortBy = ref({})
  const screen = render({
    components: { Table },
    template  : `
      <Table
        v-model:sort-by="sortBy"
        :fields="sortableFields"
        :items="items"
        sortable="multiple"
      />`,
    setup () {
      return {
        sortableFields,
        items,
        sortBy,
      }
    },
  })

  const heads = screen.queryAllByTestId('table-static-header')

  expect(heads.at(0)).toHaveClass('table-static__header--sortable')
  expect(heads.at(2)).not.toHaveClass('table-static__header--sortable')

  await fireEvent.click(heads.at(0))

  const icon  = queryByTestId(heads[0], 'table-static-header-sort')
  const icon2 = queryByTestId(heads[1], 'table-static-header-sort')

  expect(icon).toHaveAttribute('active', 'asc')
  expect(sortBy.value).toStrictEqual({ id: 'asc' })

  await fireEvent.click(heads.at(1))

  expect(icon).toHaveAttribute('active', 'asc')
  expect(icon2).toHaveAttribute('active', 'asc')
  expect(sortBy.value).toStrictEqual({ id: 'asc', name: 'asc' })
})
