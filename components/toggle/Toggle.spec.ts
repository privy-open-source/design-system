
import { fireEvent, render } from "@testing-library/vue"
import { ref } from "vue-demi"
import Toggle from "./Toggle.vue"

it('should render properly without any prop', () => {
  const screen = render({
    components: { Toggle },
    template  : `<Toggle />`
  })

  const toggle = screen.queryByTestId('toggle')

  expect(toggle).toBeInTheDocument()
  expect(toggle).toHaveClass('toggle', 'toggle--pill')
})

it('should have style "flat" if variant prop set to "flat"', () => {
  const screen = render({
    components: { Toggle },
    template  : `<Toggle variant="flat" />`
  })

  const toggle = screen.queryByTestId('toggle')

  expect(toggle).toBeInTheDocument()
  expect(toggle).toHaveClass('toggle', 'toggle--flat')
  expect(toggle).not.toHaveClass('toggle--pill')
})

it('should be able to change checked label with `checked-label` prop', () => {
  const screen = render({
    components: { Toggle },
    template  : `<Toggle checked-label="PM" />`
  })

  const label = screen.queryByText('PM')

  expect(label).toBeInTheDocument()
})

it('should be able to change unchecked label with `unchecked-label` prop', () => {
  const screen = render({
    components: { Toggle },
    template  : `<Toggle unchecked-label="AM" />`
  })

  const label = screen.queryByText('AM')

  expect(label).toBeInTheDocument()
})

it('should no label if `no-label` prop is given', () => {
  const screen = render({
    components: { Toggle },
    template  : `<Toggle no-label />`
  })

  const checkLabel   = screen.queryByText('on')
  const uncheckLabel = screen.queryByText('off')

  expect(checkLabel).not.toBeInTheDocument()
  expect(uncheckLabel).not.toBeInTheDocument()
})


it('should have disabled state if prop `disabled` is provided', () => {
  const screen = render({
    components: { Toggle },
    template  : `<Toggle disabled />`,
  })

  const toggle = screen.queryByTestId('toggle')

  expect(toggle).toBeInTheDocument()
  expect(toggle).toHaveClass('toggle', 'toggle--disabled')
})

it('should have readonly state if prop `readonly` is provided', () => {
  const screen = render({
    components: { Toggle },
    template  : `<Toggle readonly />`,
  })

  const toggle = screen.queryByTestId('toggle')

  expect(toggle).toBeInTheDocument()
  expect(toggle).toHaveClass('toggle', 'toggle--readonly')
})

it('should toggle the state if clicked', async () => {
  const screen = render({
    components: { Toggle },
    template  : `<Toggle />`,
  })

  const toggle = screen.queryByTestId('toggle')

  expect(toggle).not.toHaveClass('toggle--checked')

  await fireEvent.click(toggle)

  expect(toggle).toHaveClass('toggle--checked')
})

it('should modify state in v-model', async () => {
  const model  = ref(false)
  const screen = render({
    components: { Toggle },
    template  : `
      <Toggle v-model="model" />
    `,
    setup () {
      return {
        model,
      }
    }
  })

  const toggle = screen.queryByTestId('toggle')

  expect(model.value).toBe(false)

  await fireEvent.click(toggle)

  expect(model.value).toBe(true)
})

it('should use value in props `value` instead of true/false', async () => {
  const model  = ref(false)
  const screen = render({
    components: { Toggle },
    template  : `
      <Toggle v-model="model" value="On" />
    `,
    setup () {
      return {
        model,
      }
    }
  })

  const toggle = screen.queryByTestId('toggle')

  expect(model.value).toBe(false)

  await fireEvent.click(toggle)

  expect(model.value).toBe('On')
})

it('should use value in props `value` instead of true/false', async () => {
  const model  = ref(false)
  const screen = render({
    components: { Toggle },
    template  : `
      <Toggle v-model="model" value="On" />
    `,
    setup () {
      return {
        model,
      }
    }
  })

  const toggle = screen.queryByTestId('toggle')

  expect(model.value).toBe(false)

  await fireEvent.click(toggle)

  expect(model.value).toBe('On')
})

it('should use value in props `value` and `unchecked-value` instead of true/false', async () => {
  const model  = ref(false)
  const screen = render({
    components: { Toggle },
    template  : `
      <Toggle
        v-model="model"
        value="On"
        unchecked-value="Off" />
    `,
    setup () {
      return {
        model,
      }
    }
  })

  const toggle = screen.queryByTestId('toggle')

  expect(model.value).toBe('Off')

  await fireEvent.click(toggle)

  expect(model.value).toBe('On')

  await fireEvent.click(toggle)
})

it('should append value if v-model is an array', async () => {
  const model  = ref([])
  const screen = render({
    components: { Toggle },
    template  : `
      <Toggle v-model="model" value="apple">Apple</Toggle>
      <Toggle v-model="model" value="grape">Grape</Toggle>
      <Toggle v-model="model" value="pineapple">Pineapple</Toggle>
    `,
    setup () {
      return {
        model,
      }
    }
  })

  expect(model.value).toStrictEqual([])

  const toggleApple    = screen.queryByText('Apple')
  const toggleGrape    = screen.queryByText('Grape')
  const togglePineaple = screen.queryByText('Pineapple')

  await fireEvent.click(toggleApple)
  await fireEvent.click(toggleGrape)
  await fireEvent.click(togglePineaple)

  expect(model.value).toStrictEqual(['apple', 'grape', 'pineapple'])
})
