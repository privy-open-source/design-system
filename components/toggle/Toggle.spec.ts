
import { render } from "@testing-library/vue"
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
