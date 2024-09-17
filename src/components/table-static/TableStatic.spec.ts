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

const sortableFields = defineTable([
  { key: 'id' },
  {
    key     : 'name',
    sortable: true,
  },
  {
    key     : 'gender',
    sortable: true,
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
  const items = ref([])
  items.value = generateItems()

  const screen = render({
    components: { Table },
    template  : `
      <Table
        :fields="sortableFields"
        v-model:items="items"
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

  expect(heads.at(0)).not.toHaveClass('table-static__header--sortable')
  expect(heads.at(1)).toHaveClass('table-static__header--sortable')
})

it('should X field header have caret up/down icon when sort by field', async () => {
  const items = ref([])
  items.value = generateItems()

  const screen = render({
    components: { Table },
    template  : `
      <Table
        :fields="sortableFields"
        v-model:items="items"
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

  await fireEvent.click(heads.at(1))

  const sortUp = heads.at(1).querySelector('.table-static__header__sort-up')

  expect(sortUp).toBeInTheDocument()

  await fireEvent.click(heads.at(1))

  const sortDown = heads.at(1).querySelector('.table-static__header__sort-down')

  expect(sortDown).toBeInTheDocument()
  expect(sortUp).not.toBeInTheDocument()

  await fireEvent.click(heads.at(1))

  expect(sortDown).not.toBeInTheDocument()
})

it('should able to sort by field if `sortable` prop is provided', async () => {
  const items = ref([])
  items.value = generateItems()

  const sorts = ref([])

  const screen = render({
    components: { Table },
    template  : `
      <Table
        :fields="sortableFields"
        v-model:items="items"
        sortable
        @sort="sorts = $event"
      />`,
    setup () {
      return {
        sortableFields,
        items,
        sorts,
      }
    },
  })

  expect(sorts.value).toHaveLength(0)

  const heads = screen.queryAllByTestId('table-static-header')

  await fireEvent.click(heads.at(1))

  expect(items.value.at(0).name).toStrictEqual('Andi')
  expect(sorts.value).toHaveLength(1)

  await fireEvent.click(heads.at(1))

  expect(items.value.at(0).name).toStrictEqual('Jane')

  await fireEvent.click(heads.at(1))

  expect(items.value.at(0).name).toStrictEqual('Dora')
})

it('should be not sort by field if field not `sortable` eventhough prop `sortable` is provided when render table', async () => {
  const fields = defineTable([{ key: 'id' }, { key: 'name' }])
  const items  = ref([
    {
      id  : 1,
      name: 'Jane',
    },
    {
      id  : 2,
      name: 'Tarjono',
    },
  ])
  const sorts  = ref([])

  const screen = render({
    components: { Table },
    template  : `
      <Table
        :fields="fields"
        v-model:items="items"
        sortable
        @sort="sorts = $event"
      />`,
    setup () {
      return {
        fields,
        items,
        sorts,
      }
    },
  })

  const heads = screen.queryAllByTestId('table-static-header')

  await fireEvent.click(heads.at(1))

  const sortUp = heads.at(1).querySelector('.table-static__header__sort-up')

  expect(sortUp).not.toBeInTheDocument()
  expect(sorts.value).toHaveLength(0)
})

it('should able to sort by field if `sortable` prop is provided', async () => {
  const items = ref([])
  items.value = generateItems()

  const sorts = ref([])

  const screen = render({
    components: { Table },
    template  : `
      <Table
        :fields="sortableFields"
        v-model:items="items"
        sortable
        sortable-asyncronous
        @sort="sorts = $event"
      />`,
    setup () {
      return {
        sortableFields,
        items,
        sorts,
      }
    },
  })

  expect(sorts.value).toHaveLength(0)

  const heads = screen.queryAllByTestId('table-static-header')

  await fireEvent.click(heads.at(2)) // sort gender to ASC
  expect(sorts.value).toHaveLength(1)
  expect(sorts.value.at(0)).toStrictEqual({ key: 'gender', value: 'asc' })

  await fireEvent.click(heads.at(3)) // sort age to ASC
  expect(sorts.value).toHaveLength(2)
  expect(sorts.value.at(1)).toStrictEqual({ key: 'age', value: 'asc' })

  await fireEvent.click(heads.at(2)) // sort gender to DESC
  expect(sorts.value).toHaveLength(2)
  expect(sorts.value.at(0)).toStrictEqual({ key: 'gender', value: 'desc' })

  await fireEvent.click(heads.at(2)) // clear gender sort
  expect(sorts.value).toHaveLength(1)

  await fireEvent.click(heads.at(3)) // sort age to DESC
  expect(sorts.value.at(0)).toStrictEqual({ key: 'age', value: 'desc' })

  await fireEvent.click(heads.at(3)) // clear age sort
  expect(sorts.value).toHaveLength(0)
})
