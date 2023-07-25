import { vi } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import Button from './Button.vue'
import ButtonGroup from '../button-group/ButtonGroup.vue'
import InputGroup from '../input-group/InputGroup.vue'

it('should render properly without any props', () => {
  const screen = render({
    components: { Button },
    template  : `
      <Button>
        Hello
      </Button>
    `,
  })

  const button = screen.queryByTestId('btn')
  const text   = screen.queryByText('Hello')

  expect(button).toBeInTheDocument()
  expect(button).toHaveClass('btn', 'btn--variant-solid', 'btn--md', 'btn--default')
  expect(text).toBeInTheDocument()
})

it('should have style "outline" if variant props set to "outline"', () => {
  const screen = render({
    components: { Button },
    template  : `
      <Button variant="outline">
        Hello
      </Button>
    `,
  })

  const button = screen.queryByTestId('btn')

  expect(button).toBeInTheDocument()
  expect(button).toHaveClass('btn', 'btn--variant-outline', 'btn--default')
  expect(button).not.toHaveClass('btn--solid')
})

it('should have style "secondary" if color props set to "secondary"', () => {
  const screen = render({
    components: { Button },
    template  : `
      <Button color="secondary">
        Hello
      </Button>
    `,
  })

  const button = screen.queryByTestId('btn')

  expect(button).toBeInTheDocument()
  expect(button).toHaveClass('btn', 'btn--variant-solid', 'btn--secondary')
  expect(button).not.toHaveClass('btn--primary')
})

it('should have style "lg" if size props set to "lg"', () => {
  const screen = render({
    components: { Button },
    template  : `
      <Button size="lg">
        Hello
      </Button>
    `,
  })

  const button = screen.queryByTestId('btn')

  expect(button).toBeInTheDocument()
  expect(button).toHaveClass('btn', 'btn--variant-solid', 'btn--lg')
  expect(button).not.toHaveClass('btn--md')
})

it('should have style "icon" if icon is provided', () => {
  const screen = render({
    components: { Button },
    template  : `
      <Button icon>
        Hello
      </Button>
    `,
  })

  const button = screen.queryByTestId('btn')

  expect(button).toBeInTheDocument()
  expect(button).toHaveClass('btn--icon')
})

it('should have style "pill" if pill is provided', () => {
  const screen = render({
    components: { Button },
    template  : `
      <Button pill>
        Hello
      </Button>
    `,
  })

  const button = screen.queryByTestId('btn')

  expect(button).toBeInTheDocument()
  expect(button).toHaveClass('btn--pill')
})

it('should emit "click" when button is clicked', async () => {
  const spy    = vi.fn()
  const screen = render({
    components: { Button },
    template  : `
      <Button @click="onClick">
        Hello
      </Button>
    `,
    methods: { onClick: spy },
  })

  const button = screen.queryByTestId('btn')

  await fireEvent.click(button)

  expect(spy).toBeCalled()
})

it('should be an anchor when button have `href` props', async () => {
  const screen = render({
    components: { Button },
    template  : `
      <Button href="#">
        Hello
      </Button>
    `,
  })

  const button = screen.queryByTestId('btn')

  expect(button).toHaveAttribute('href', '#')
  expect(button).toContainHTML('a')
})

it('should be an router-link when button have `href` props without http', async () => {
  const screen = render({
    components: { Button },
    template  : `
      <Button href="/">
        Hello
      </Button>
    `,
  })

  const button = screen.queryByTestId('btn')

  expect(button).toHaveAttribute('to', '/')
  expect(button).toContainHTML('router-link')
})

it('should be an anchor when button have `href` props and with http', async () => {
  const screen = render({
    components: { Button },
    template  : `
      <Button href="https://privy.id">
        Hello
      </Button>
    `,
  })

  const button = screen.queryByTestId('btn')

  expect(button).toHaveAttribute('href', 'https://privy.id')
  expect(button).toContainHTML('a')
})

it('should automatically set size of each button via `size` props of button-group', () => {
  const screen = render({
    components: { ButtonGroup, Button },
    template  : `
      <ButtonGroup size="lg">
        <Button>Text</Button>
      </ButtonGroup>
    `,
  })

  const buttonGroup = screen.queryByTestId('btn-group')
  const button      = screen.queryByTestId('btn')

  expect(buttonGroup).toBeInTheDocument()
  expect(button).toHaveClass('btn--lg')
})

it('should automatically set size of button via `size` props of input-group', () => {
  const screen = render({
    components: { InputGroup, Button },
    template  : `
      <InputGroup size="sm">
        <Button variant="input">Text</Button>
      </InputGroup>
    `,
  })

  const inputGroup = screen.queryByTestId('input-group')
  const button     = screen.queryByTestId('btn')

  expect(inputGroup).toBeInTheDocument()
  expect(button).toHaveClass('btn--sm')
})
