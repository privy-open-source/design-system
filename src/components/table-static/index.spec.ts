import { nextTick, ref } from 'vue-demi'
import { useTableQuery } from '.'

describe('useTableQuery', () => {
  it('should able to filter by object', async () => {
    const list = ref([
      {
        id    : 1,
        name  : 'Tarjono',
        age   : 20,
        gender: 'male',
      },
      {
        id    : 2,
        name  : 'Yuki',
        age   : 25,
        gender: 'female',
      },
      {
        id    : 3,
        name  : 'Agus',
        age   : 33,
        gender: 'male',
      },
      {
        id    : 4,
        name  : 'Tumijah',
        age   : 70,
        gender: 'female',
      },
      {
        id    : 5,
        name  : 'Admojo',
        age   : 55,
        gender: 'male',
      },
    ])

    const filterBy = ref({ gender: 'male' })
    const items    = useTableQuery(list, { filterBy })

    expect(items.value).toStrictEqual([
      {
        id    : 1,
        name  : 'Tarjono',
        age   : 20,
        gender: 'male',
      },
      {
        id    : 3,
        name  : 'Agus',
        age   : 33,
        gender: 'male',
      },
      {
        id    : 5,
        name  : 'Admojo',
        age   : 55,
        gender: 'male',
      },
    ])

    filterBy.value.gender = 'female'
    await nextTick()

    expect(items.value).toStrictEqual([
      {
        id    : 2,
        name  : 'Yuki',
        age   : 25,
        gender: 'female',
      },
      {
        id    : 4,
        name  : 'Tumijah',
        age   : 70,
        gender: 'female',
      },
    ])
  })

  it('should able to sorting list', async () => {
    const list = ref([
      {
        id    : 1,
        name  : 'Tarjono',
        age   : 20,
        gender: 'male',
      },
      {
        id    : 2,
        name  : 'Yuki',
        age   : 25,
        gender: 'female',
      },
      {
        id    : 3,
        name  : 'Agus',
        age   : 33,
        gender: 'male',
      },
      {
        id    : 4,
        name  : 'Tumijah',
        age   : 70,
        gender: 'female',
      },
      {
        id    : 5,
        name  : 'Admojo',
        age   : 55,
        gender: 'male',
      },
    ])

    const sortBy = ref<Record<string, 'asc' | 'desc'>>({ name: 'asc' })
    const items  = useTableQuery(list, { sortBy })

    expect(items.value).toStrictEqual([
      {
        id    : 5,
        name  : 'Admojo',
        age   : 55,
        gender: 'male',
      },
      {
        id    : 3,
        name  : 'Agus',
        age   : 33,
        gender: 'male',
      },
      {
        id    : 1,
        name  : 'Tarjono',
        age   : 20,
        gender: 'male',
      },
      {
        id    : 4,
        name  : 'Tumijah',
        age   : 70,
        gender: 'female',
      },
      {
        id    : 2,
        name  : 'Yuki',
        age   : 25,
        gender: 'female',
      },
    ])

    sortBy.value = { age: 'desc' }
    await nextTick()

    expect(items.value).toStrictEqual([
      {
        id    : 4,
        name  : 'Tumijah',
        age   : 70,
        gender: 'female',
      },
      {
        id    : 5,
        name  : 'Admojo',
        age   : 55,
        gender: 'male',
      },
      {
        id    : 3,
        name  : 'Agus',
        age   : 33,
        gender: 'male',
      },
      {
        id    : 2,
        name  : 'Yuki',
        age   : 25,
        gender: 'female',
      },
      {
        id    : 1,
        name  : 'Tarjono',
        age   : 20,
        gender: 'male',
      },
    ])
  })

  it('should able to limit list', async () => {
    const list = ref([
      {
        id    : 1,
        name  : 'Tarjono',
        age   : 20,
        gender: 'male',
      },
      {
        id    : 2,
        name  : 'Yuki',
        age   : 25,
        gender: 'female',
      },
      {
        id    : 3,
        name  : 'Agus',
        age   : 33,
        gender: 'male',
      },
      {
        id    : 4,
        name  : 'Tumijah',
        age   : 70,
        gender: 'female',
      },
      {
        id    : 5,
        name  : 'Admojo',
        age   : 55,
        gender: 'male',
      },
    ])

    const perPage = ref(3)
    const page    = ref(1)
    const items   = useTableQuery(list, { page, perPage })

    expect(items.value).toStrictEqual([
      {
        id    : 1,
        name  : 'Tarjono',
        age   : 20,
        gender: 'male',
      },
      {
        id    : 2,
        name  : 'Yuki',
        age   : 25,
        gender: 'female',
      },
      {
        id    : 3,
        name  : 'Agus',
        age   : 33,
        gender: 'male',
      },
    ])

    perPage.value = 2
    await nextTick()

    expect(items.value).toStrictEqual([
      {
        id    : 1,
        name  : 'Tarjono',
        age   : 20,
        gender: 'male',
      },
      {
        id    : 2,
        name  : 'Yuki',
        age   : 25,
        gender: 'female',
      },
    ])

    page.value = 2
    await nextTick()

    expect(items.value).toStrictEqual([
      {
        id    : 3,
        name  : 'Agus',
        age   : 33,
        gender: 'male',
      },
      {
        id    : 4,
        name  : 'Tumijah',
        age   : 70,
        gender: 'female',
      },
    ])
  })
})
