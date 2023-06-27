import { render, fireEvent } from '@testing-library/vue'
import { ref } from 'vue-demi'
import Calendar from './Calendar.vue'

it('should render properly without any props', () => {
  const screen = render({
    components: { Calendar },
    template  : '<Calendar />',
  })

  const calendar = screen.getByTestId('calendar')

  expect(calendar).toBeInTheDocument()
  expect(calendar).toHaveClass('calendar')
})

it('should have disabled style if "disabled" props is provided', () => {
  const screen = render({
    components: { Calendar },
    template  : `
      <Calendar disabled />
    `,
  })

  const calendar = screen.getByTestId('calendar')

  expect(calendar).toBeInTheDocument()
  expect(calendar).toHaveClass('calendar--disabled')
})

it('should have readonly style if "readonly" props is provided', () => {
  const screen = render({
    components: { Calendar },
    template  : `
      <Calendar readonly />
    `,
  })

  const calendar = screen.getByTestId('calendar')

  expect(calendar).toBeInTheDocument()
  expect(calendar).toHaveClass('calendar--readonly')
})

it('should disabled the date if "min" props is provided', () => {
  const screen = render({
    components: { Calendar },
    template  : `
      <Calendar
        v-model="current"
        :min="min"
      />
    `,
    data () {
      return {
        current: new Date(2022, 0, 20), // 20 Jan 2022
        min    : new Date(2022, 0, 15), // 15 Jan 2022
      }
    },
  })

  const date = screen.getByText('13')

  expect(date).toBeInTheDocument()
  expect(date).toBeDisabled()
})

it('should disabled the date if "max" props is provided', () => {
  const screen = render({
    components: { Calendar },
    template  : `
      <Calendar
        v-model="current"
        :max="max"
      />
    `,
    data () {
      return {
        current: new Date(2022, 0, 20), // 20 Jan 2022
        max    : new Date(2022, 0, 15), // 15 Jan 2022
      }
    },
  })

  const date = screen.getByText('18')

  expect(date).toBeInTheDocument()
  expect(date).toHaveAttribute('disabled')
})

it('should go to next month, if next button is clicked', async () => {
  const screen = render({
    components: { Calendar },
    template  : `
      <Calendar
        v-model="current"
      />
    `,
    data () {
      return { current: new Date(2022, 0, 20) /* 20 Jan 2022 */ }
    },
  })

  const button = screen.queryByTestId('calendar-next')
  const title  = screen.queryByTestId('calendar-title')

  expect(title).toHaveTextContent('January 2022')

  await fireEvent.click(button)

  expect(title).toHaveTextContent('February 2022')
})

it('should go to prev month, if prev button is clicked', async () => {
  const screen = render({
    components: { Calendar },
    template  : `
      <Calendar
        v-model="current"
      />
    `,
    data () {
      return { current: new Date(2022, 0, 20) /* 20 Jan 2022 */ }
    },
  })

  const button = screen.queryByTestId('calendar-prev')
  const title  = screen.queryByTestId('calendar-title')

  expect(title).toHaveTextContent('January 2022')

  await fireEvent.click(button)

  expect(title).toHaveTextContent('December 2021')
})

it('should change to viewmode if title is clicked (date => month => year)', async () => {
  const screen = render({
    components: { Calendar },
    template  : `
      <Calendar
        v-model="current"
      />
    `,
    data () {
      return { current: new Date(2022, 0, 20) /* 20 Jan 2022 */ }
    },
  })

  const calendar = screen.queryByTestId('calendar')
  const title    = screen.queryByTestId('calendar-title')

  expect(calendar).toHaveAttribute('viewmode', 'date')
  expect(title).toHaveTextContent('January 2022')

  await fireEvent.click(title)

  expect(calendar).toHaveAttribute('viewmode', 'month')
  expect(title).toHaveTextContent('2022')

  await fireEvent.click(title)

  expect(calendar).toHaveAttribute('viewmode', 'year')
  expect(title).toHaveTextContent('2020 - 2029')
})

it('should go to specific month if on viewmode "month" and one of items is selected (clicked) (month => date)', async () => {
  const screen = render({
    components: { Calendar },
    template  : `
      <Calendar
        v-model="current"
      />
    `,
    data () {
      return { current: new Date(2022, 0, 20) /* 20 Jan 2022 */ }
    },
  })

  const calendar = screen.queryByTestId('calendar')
  const title    = screen.queryByTestId('calendar-title')

  expect(calendar).toHaveAttribute('viewmode', 'date')
  expect(title).toHaveTextContent('January 2022')

  await fireEvent.click(title)

  const item = screen.queryByText('Jul')

  await fireEvent.click(item)

  expect(title).toHaveTextContent('July 2022')
})

it('should go to month viewmode at first time if props "mode" set to "month"', () => {
  const screen = render({
    components: { Calendar },
    template  : `
      <Calendar
        mode="month"
        v-model="current"
      />
    `,
    data () {
      return { current: new Date(2022, 0, 20) /* 20 Jan 2022 */ }
    },
  })

  const calendar = screen.queryByTestId('calendar')

  expect(calendar).toHaveAttribute('viewmode', 'month')
})

it('should limit to month selection, if props "mode" set to "month"', async () => {
  const screen = render({
    components: { Calendar },
    template  : `
      <Calendar
        mode="month"
        v-model="current"
      />
    `,
    data () {
      return { current: new Date(2022, 0, 20) /* 20 Jan 2022 */ }
    },
  })

  const calendar = screen.queryByTestId('calendar')
  const title    = screen.queryByTestId('calendar-title')
  const item     = screen.queryByText('Jul')

  await fireEvent.click(item)

  expect(calendar).toHaveAttribute('viewmode', 'month')
  expect(title).toHaveTextContent('2022')
})

it('should force current viewmode, if props "mode" changed and current viewmode is not allowed to access', async () => {
  const screen = render({
    components: { Calendar },
    template  : `
      <div>
        <Calendar
          :mode="mode"
          v-model="current"
        />
        <button data-testid="change-mode" @click="changeMode()">
          Change Mode
        </button>
      </div>
    `,
    data () {
      return {
        mode   : 'date',
        current: new Date(2022, 0, 20), // 20 Jan 2022
      }
    },
    methods: {
      changeMode () {
        this.mode = 'year'
      },
    },
  })

  const calendar = screen.queryByTestId('calendar')
  const button   = screen.queryByTestId('change-mode')

  expect(calendar).toHaveAttribute('viewmode', 'date')

  await fireEvent.click(button)

  expect(calendar).toHaveAttribute('viewmode', 'year')
})

it('should modify value in v-model', async () => {
  const model  = ref(new Date(2022, 0, 15))
  const screen = render({
    components: { Calendar },
    template  : `
      <Calendar v-model="model" />
    `,
    setup () {
      return { model }
    },
  })

  const items    = screen.queryAllByTestId('calendar-item')
  const expected = new Date(2022, 0, 1)

  await fireEvent.click(items.at(12))

  expect(model.value).toBeDate()
  expect(model.value.toISOString()).toBe(expected.toISOString())
})

it('should able to select range of date using prop `range`', async () => {
  const model  = ref([new Date(2022, 0, 15), new Date(2022, 0, 31)])
  const screen = render({
    components: { Calendar },
    template  : `
      <Calendar v-model="model" range />
    `,
    setup () {
      return { model }
    },
  })

  const items    = screen.queryAllByTestId('calendar-item')
  const expected = [new Date(2022, 0, 1), new Date(2022, 0, 8)]

  await fireEvent.click(items.at(12))
  await fireEvent.click(items.at(19))

  expect(model.value).toBeArray()
  expect(model.value[0]).toBeDate()
  expect(model.value[1]).toBeDate()
  expect(model.value[0].toISOString()).toBe(expected[0].toISOString())
  expect(model.value[1].toISOString()).toBe(expected[1].toISOString())
})

it('should modify v-model:start and v-model:end when using props `range`', async () => {
  const start  = ref(new Date(2022, 0, 15))
  const end    = ref(new Date(2022, 0, 31))
  const screen = render({
    components: { Calendar },
    template  : `
      <Calendar
        v-model:start="start"
        v-model:end="end"
        range
      />
    `,
    setup () {
      return { start, end }
    },
  })

  const items    = screen.queryAllByTestId('calendar-item')
  const expected = [new Date(2022, 0, 1), new Date(2022, 0, 8)]

  await fireEvent.click(items.at(12))

  expect(start.value).toBeDate()
  expect(end.value).toBeUndefined()

  await fireEvent.click(items.at(19))

  expect(start.value).toBeDate()
  expect(end.value).toBeDate()

  expect(start.value.toISOString()).toBe(expected[0].toISOString())
  expect(end.value.toISOString()).toBe(expected[1].toISOString())
})

it('should highlight the date range when hover date after selecting start\'s date', async () => {
  const start  = ref(new Date(2022, 0, 15))
  const end    = ref(new Date(2022, 0, 31))
  const screen = render({
    components: { Calendar },
    template  : `
      <Calendar
        v-model:start="start"
        v-model:end="end"
        range
      />
    `,
    setup () {
      return { start, end }
    },
  })

  let items = screen.queryAllByTestId('calendar-item')

  await fireEvent.click(items.at(12)) // Jan 1st

  expect(start.value).toBeDate()
  expect(end.value).toBeUndefined()

  await fireEvent.mouseOver(items.at(19))

  items = screen.queryAllByTestId('calendar-item')

  expect(items.at(15)).toHaveClass('calendar__item--in-range')
  expect(items.at(16)).toHaveClass('calendar__item--in-range')
  expect(items.at(17)).toHaveClass('calendar__item--in-range')
  expect(items.at(19)).toHaveClass('calendar__item--in-range')

  await fireEvent.click(items.at(19))

  items = screen.queryAllByTestId('calendar-item')

  expect(items.at(19)).not.toHaveClass('calendar__item--in-range')
  expect(items.at(12)).toHaveClass('calendar__item--head')
  expect(items.at(19)).toHaveClass('calendar__item--tail')
})

it('should able to limit date range using prop `min-range` and `max-range`', async () => {
  const start  = ref(new Date(2022, 0, 15))
  const end    = ref(new Date(2022, 0, 30))
  const screen = render({
    components: { Calendar },
    template  : `
      <Calendar
        v-model:start="start"
        v-model:end="end"
        min-range="3D"
        max-range="1W-1D"
        range
      />
    `,
    setup () {
      return { start, end }
    },
  })

  let items = screen.queryAllByTestId('calendar-item')

  await fireEvent.click(items.at(12)) // Jan 1st

  items = screen.queryAllByTestId('calendar-item')

  expect(items.at(12)).toBeDisabled()
  expect(items.at(13)).toBeDisabled()
  expect(items.at(14)).toBeDisabled()
  expect(items.at(15)).not.toBeDisabled()

  expect(items.at(18)).not.toBeDisabled()
  expect(items.at(19)).toBeDisabled()
})
