import { fireEvent, render } from '@testing-library/vue'
import { vi } from 'vitest'
import { nextTick, ref } from 'vue-demi'
import Datepicker from './Datepicker.vue'

const CalendarStub = vi.fn()

it('should be render properly without props', () => {
  const screen = render({
    components: { Datepicker },
    template  : `
      <Datepicker />
    `,
  })

  const picker = screen.queryByTestId('datepicker')

  expect(picker).toBeInTheDocument()
})

it('should open if input is focused', async () => {
  const screen = render({
    components: { Datepicker },
    template  : `
      <Datepicker />
    `,
  })

  const input = screen.queryByTestId('datepicker-input')

  input.focus()
  await nextTick()

  const picker   = screen.queryByTestId('datepicker')
  const calendar = screen.queryByTestId('calendar')

  expect(picker).toHaveClass('datepicker--open')
  expect(calendar).toBeVisible()
})

it('should be able set input placeholder via prop `placeholder`', () => {
  const screen = render({
    components: { Datepicker },
    template  : `
      <Datepicker placeholder="Pick A Date" />
    `,
  })

  const input = screen.queryByTestId('datepicker-input')

  expect(input).toHaveAttribute('placeholder', 'Pick A Date')
})

it('should be able to set display format via prop `format`', () => {
  const model  = ref(new Date(2022, 0, 31))
  const screen = render({
    components: { Datepicker },
    template  : `
      <Datepicker
        v-model="model"
        format="yyyy-MM-dd"
        placeholder="Pick A Date" />
    `,
    setup () {
      return { model }
    },
  })

  const input = screen.queryByTestId('datepicker-input')

  expect(input).toHaveValue('2022-01-31')
})

it('should have style readonly if props disabled is provided', () => {
  const screen = render({
    components: { Datepicker },
    template  : `
      <Datepicker disabled />
    `,
  })

  const datepicker = screen.queryByTestId('datepicker')

  expect(datepicker).toHaveClass('datepicker', 'datepicker--disabled')
})

it('should have not able to open if datepicker is disabled', async () => {
  const screen = render({
    components: { Datepicker },
    template  : `
      <Datepicker disabled />
    `,
  })

  const datepicker = screen.queryByTestId('datepicker')
  const input      = screen.queryByTestId('datepicker-input')

  input.focus()
  await nextTick()

  expect(datepicker).toHaveClass('datepicker--disabled')
  expect(datepicker).not.toHaveClass('datepicker--open')
})

it('should have not able to open if datepicker is readonly', async () => {
  const screen = render({
    components: { Datepicker },
    template  : `
      <Datepicker readonly />
    `,
  })

  const datepicker = screen.queryByTestId('datepicker')
  const input      = screen.queryByTestId('datepicker-input')

  input.focus()
  await nextTick()

  expect(datepicker).toHaveClass('datepicker--readonly')
  expect(datepicker).not.toHaveClass('datepicker--open')
})

it('should close calendar (popup) if user selected the date', async () => {
  const screen = render({
    components: { Datepicker },
    template  : `
      <Datepicker />
    `,
  })

  const input = screen.queryByTestId('datepicker-input')

  input.focus()
  await nextTick()

  let picker   = screen.queryByTestId('datepicker')
  let calendar = screen.queryByTestId('calendar')

  expect(picker).toHaveClass('datepicker--open')
  expect(calendar).toBeVisible()

  const items = screen.queryAllByTestId('calendar-item')

  await fireEvent.click(items.at(0))

  picker   = screen.queryByTestId('datepicker')
  calendar = screen.queryByTestId('calendar')

  expect(picker).not.toHaveClass('datepicker--open')
  expect(calendar).not.toBeVisible()
})

it('should passing prop `min` into Calendar component', () => {
  render({
    components: { Datepicker },
    template  : `
      <Datepicker :min="new Date(2022, 0, 1)" />
    `,
  }, { global: { stubs: { Calendar: CalendarStub } } })

  const props = expect.objectContaining({ min: new Date(2022, 0, 1) })

  // eslint-disable-next-line unicorn/no-null
  expect(CalendarStub).toBeCalledWith(props, null)
})

it('should passing prop `max` into Calendar component', () => {
  render({
    components: { Datepicker },
    template  : `
      <Datepicker :max="new Date(2022, 0, 1)" />
    `,
  }, { global: { stubs: { Calendar: CalendarStub } } })

  const props = expect.objectContaining({ max: new Date(2022, 0, 1) })

  // eslint-disable-next-line unicorn/no-null
  expect(CalendarStub).toBeCalledWith(props, null)
})

it('should passing prop `max` into Calendar component', () => {
  render({
    components: { Datepicker },
    template  : `
      <Datepicker mode="year" />
    `,
  }, { global: { stubs: { Calendar: CalendarStub } } })

  const props = expect.objectContaining({ mode: 'year' })

  // eslint-disable-next-line unicorn/no-null
  expect(CalendarStub).toBeCalledWith(props, null)
})
