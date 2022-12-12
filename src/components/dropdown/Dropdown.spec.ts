import { fireEvent, render } from '@testing-library/vue'
import { delay } from 'nanodelay'
import { vi } from 'vitest'
import { nextTick, ref } from 'vue-demi'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'

const nextFocus = vi.fn()
const prevFocus = vi.fn()

vi.mock('./utils/use-focus', () => {
  function useFocus () {
    return {
      next: nextFocus,
      prev: prevFocus,
    }
  }

  return { useFocus }
})

afterEach(() => {
  vi.resetAllMocks()
})

it('should render properly without any props', () => {
  const screen = render({
    components: { Dropdown },
    template  : `
      <Dropdown />
    `,
  })

  const dropdown = screen.queryByTestId('dropdown')

  expect(dropdown).toBeInTheDocument()
})

it('should be able to change button text via props `text`', () => {
  const screen = render({
    components: { Dropdown },
    template  : `
      <Dropdown text="Hello World" />
    `,
  })

  const text = screen.queryByText('Hello World')

  expect(text).toBeInTheDocument()
})

it('should toggle dropdown menu if button clicked', async () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown text="Hello World">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const dropdown = screen.queryByTestId('dropdown')
  const button   = screen.queryByTestId('dropdown-activator')

  let menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toBeInTheDocument()
  expect(button).toBeInTheDocument()
  expect(menu).not.toBeVisible()

  await fireEvent.click(button)

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toHaveClass('dropdown--open')
  expect(menu).toBeVisible()

  await fireEvent.click(button)

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).not.toHaveClass('dropdown--open')
  expect(menu).not.toBeVisible()
})

it('should be able to change placement via props `placement`', async () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown placement="top-end" text="Hello World">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const menu = screen.queryByTestId('dropdown-menu')

  await delay(0)

  expect(menu).toHaveAttribute('data-popper-placement', 'top-end')
})

it('should hide when `Escape` key is pressed', async () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown text="Hello World">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const dropdown = screen.queryByTestId('dropdown')
  const button   = screen.queryByTestId('dropdown-activator')

  let menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toBeInTheDocument()
  expect(button).toBeInTheDocument()
  expect(menu).not.toBeVisible()

  await fireEvent.click(button)

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toHaveClass('dropdown--open')
  expect(menu).toBeVisible()

  await fireEvent.keyDown(window, { key: 'Escape' })

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).not.toHaveClass('dropdown--open')
  expect(menu).not.toBeVisible()
})

it('should hide when click outside', async () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown text="Hello World">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const dropdown = screen.queryByTestId('dropdown')
  const button   = screen.queryByTestId('dropdown-activator')

  let menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toBeInTheDocument()
  expect(button).toBeInTheDocument()
  expect(menu).not.toBeVisible()

  await fireEvent.click(button)

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toHaveClass('dropdown--open')
  expect(menu).toBeVisible()

  await fireEvent.click(window)
  await delay(0)

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).not.toHaveClass('dropdown--open')
  expect(menu).not.toBeVisible()
})

it('should hide when click item clicked', async () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown text="Hello World">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const dropdown = screen.queryByTestId('dropdown')
  const button   = screen.queryByTestId('dropdown-activator')
  const items    = screen.queryAllByTestId('dropdown-item')

  let menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toBeInTheDocument()
  expect(button).toBeInTheDocument()
  expect(menu).not.toBeVisible()

  await fireEvent.click(button)

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toHaveClass('dropdown--open')
  expect(menu).toBeVisible()

  await fireEvent.click(items.at(0))

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).not.toHaveClass('dropdown--open')
  expect(menu).not.toBeVisible()
})

it('should focus on next item when ArrowDown\'s key is pressed', async () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown text="Hello World">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const dropdown = screen.queryByTestId('dropdown')
  const button   = screen.queryByTestId('dropdown-activator')

  let menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toBeInTheDocument()
  expect(button).toBeInTheDocument()
  expect(menu).not.toBeVisible()

  await fireEvent.click(button)

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toHaveClass('dropdown--open')
  expect(menu).toBeVisible()

  await fireEvent.keyDown(window, { key: 'ArrowDown' })

  expect(nextFocus).toBeCalled()
})

it('should focus on prev item when ArrowUp\'s key is pressed', async () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown text="Hello World">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const dropdown = screen.queryByTestId('dropdown')
  const button   = screen.queryByTestId('dropdown-activator')

  let menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toBeInTheDocument()
  expect(button).toBeInTheDocument()
  expect(menu).not.toBeVisible()

  await fireEvent.click(button)

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toHaveClass('dropdown--open')
  expect(menu).toBeVisible()

  await fireEvent.keyDown(window, { key: 'ArrowUp' })

  expect(prevFocus).toBeCalled()
})

it('should focus on next item when Tab\'s key is pressed', async () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown text="Hello World">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const dropdown = screen.queryByTestId('dropdown')
  const button   = screen.queryByTestId('dropdown-activator')

  let menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toBeInTheDocument()
  expect(button).toBeInTheDocument()
  expect(menu).not.toBeVisible()

  await fireEvent.click(button)

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toHaveClass('dropdown--open')
  expect(menu).toBeVisible()

  await fireEvent.keyDown(window, { key: 'Tab' })

  expect(nextFocus).toBeCalled()
})

it('should focus on prev item when Tab+Shift\'s key is pressed', async () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown text="Hello World">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const dropdown = screen.queryByTestId('dropdown')
  const button   = screen.queryByTestId('dropdown-activator')

  let menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toBeInTheDocument()
  expect(button).toBeInTheDocument()
  expect(menu).not.toBeVisible()

  await fireEvent.click(button)

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toHaveClass('dropdown--open')
  expect(menu).toBeVisible()

  await fireEvent.keyDown(window, { key: 'Tab', shiftKey: true })

  expect(prevFocus).toBeCalled()
})

it('should be able to custom activator button', async () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown>
        <template #activator="{ open }">
          <input
            data-testid="sample"
            @focus="open"
          />
        </template>
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const dropdown = screen.queryByTestId('dropdown')
  const input    = screen.queryByTestId('sample')

  expect(input).toBeInTheDocument()
  expect(dropdown).not.toHaveClass('dropdown--open')

  input.focus()
  await nextTick()

  expect(dropdown).toHaveClass('dropdown--open')
})

it('should be able to change button variant via `variant` prop', () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown variant="outline">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const button = screen.queryByTestId('dropdown-activator')

  expect(button).toHaveClass('btn--variant-outline')
})

it('should be able to change button color via `color` prop', () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown color="success">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const button = screen.queryByTestId('dropdown-activator')

  expect(button).toHaveClass('btn--success')
})

it('should be able to change button size via `size` prop', () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown size="lg">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const button = screen.queryByTestId('dropdown-activator')

  expect(button).toHaveClass('btn--lg')
})

it('should be able to change to pill mode via `pill` prop', () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown pill>
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const button = screen.queryByTestId('dropdown-activator')

  expect(button).toHaveClass('btn--pill')
})

it('should be able to change to icon mode via `icon` prop', () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown icon>
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const button = screen.queryByTestId('dropdown-activator')

  expect(button).toHaveClass('btn--icon')
})

it('should be able to toggle dropdown via v-model', async () => {
  const model  = ref(false)
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown v-model="model">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
    setup () {
      return { model }
    },
  })

  const dropdown = screen.queryByTestId('dropdown')
  const button   = screen.queryByTestId('dropdown-activator')

  let menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toBeInTheDocument()
  expect(button).toBeInTheDocument()
  expect(menu).not.toBeVisible()

  model.value = true
  await nextTick()

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toHaveClass('dropdown--open')
  expect(menu).toBeVisible()

  await fireEvent.click(button)

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).not.toHaveClass('dropdown--open')
  expect(menu).not.toBeVisible()
  expect(model.value).toBe(false)
})

it('should trigger event `show` when Dropdown shown', async () => {
  const spy    = vi.fn()
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown @show="onShow">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
    setup () {
      return { onShow: spy }
    },
  })

  const button = screen.queryByTestId('dropdown-activator')

  await fireEvent.click(button)

  expect(spy).toBeCalled()
})

it('should trigger event `show` when Dropdown shown', async () => {
  const spy    = vi.fn()
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown @hide="onHide">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
    setup () {
      return { onHide: spy }
    },
  })

  const button = screen.queryByTestId('dropdown-activator')

  await fireEvent.click(button)
  await fireEvent.click(button)

  expect(spy).toBeCalled()
})

it('should hide caret icon if props `no-caret` is provided', () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown no-caret>
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const caret = screen.queryByTestId('dropdown-caret')

  expect(caret).not.toBeInTheDocument()
})

it('should have style "divider" if props `divider` has provided', () => {
  const screen = render({
    components: { Dropdown },
    template  : `
      <Dropdown divider />
    `,
  })

  const dropdown = screen.queryByTestId('dropdown')

  expect(dropdown).toBeInTheDocument()
  expect(dropdown).toHaveClass('dropdown--divider')
})
