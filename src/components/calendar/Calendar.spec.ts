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
