import { vi } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import Card from './Card.vue'
import Button from '../button/Button.vue'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { Card },
    template  : `
      <Card>
        Content
      </Card>
    `,
  })

  const card = screen.queryByTestId('card')
  const text = screen.queryByText('Content')

  expect(card).toBeInTheDocument()
  expect(card).toHaveClass('card')
  expect(text).toBeInTheDocument()
})

it('Card should have style "disabled" if disabled is provided', () => {
  const screen = render({
    components: { Card },
    template  : `
      <Card disabled>
        Content
      </Card>
    `,
  })

  const card = screen.queryByTestId('card')

  expect(card).toBeInTheDocument()
  expect(card).toHaveClass('card', 'card--disabled')
})

it('should be able to add Card Header via slot `header`', () => {
  const screen = render({
    components: { Card, Button },
    template  : `
      <Card>
        <template #header>
          <div class="flex justify-between items-center">
            <h3>Card Header</h3>
            <span>
              <Button variant="link" color="primary">Button Text</Button>
            </span>
          </div>
        </template>
      </Card>
    `,
  })

  const cardHeader = screen.queryByTestId('card-header')
  const text       = screen.queryByText('Card Header')
  const action     = screen.queryByText('Button Text')

  expect(cardHeader).toBeInTheDocument()
  expect(text).toBeInTheDocument()
  expect(action).toBeInTheDocument()
  expect(cardHeader).toHaveClass('card__header')
})

it('should be able to add Card Header Action via slot `action`', () => {
  const screen = render({
    components: { Card, Button },
    template  : `
      <Card
        title="Any title should here">
        <template #action>
          <Button color="primary" variant="link">Button Text</Button>
        </template>
        Content
      </Card>
    `,
  })

  const cardHeaderAction = screen.queryByTestId('card-header-action')
  const text             = screen.queryByText('Content')
  const action           = screen.queryByText('Button Text')

  expect(cardHeaderAction).toBeInTheDocument()
  expect(cardHeaderAction).toHaveClass('card__header__action')
  expect(text).toBeInTheDocument()
  expect(action).toBeInTheDocument()
})

it('should be able to add Card Footer via slot `footer`', () => {
  const screen = render({
    components: { Card, Button },
    template  : `
      <Card>
        <template #footer>
          <Button variant="outline" color="primary">Sample Button</Button>
          <Button variant="link" color="primary">Button Text</Button>
        </template>
      </Card>
    `,
  })

  const cardFooter = screen.queryByTestId('card-footer')
  const action     = screen.queryByText('Button Text')

  expect(cardFooter).toBeInTheDocument()
  expect(cardFooter).toHaveClass('card__footer')
  expect(action).toBeInTheDocument()
})

it('Card should have style "callout" when callout is provided', async () => {
  const screen = render({
    components: { Card, Button },
    template  : `
      <Card
        title="Any title should here"
        callout>
        Content
      </Card>
    `,
  })

  const card    = screen.queryByTestId('card')
  const dismiss = screen.queryByTestId('card-callout-dismiss')
  const text    = screen.queryByText('Content')

  expect(card).toBeInTheDocument()
  expect(card).toHaveClass('card', 'card--callout')
  expect(text).toBeInTheDocument()

  await fireEvent.click(dismiss)

  expect(card).not.toBeInTheDocument()
  expect(text).not.toBeInTheDocument()
})

it('should emit event "dismissed" if close button clicked', async () => {
  const spy    = vi.fn()
  const screen = render({
    components: { Card },
    template  : `
      <Card
        title="Callout Title"
        @dismissed="onDismissed" callout>
        Content
      </Card>
    `,
    methods: { onDismissed: spy },
  })

  const card  = screen.queryByTestId('card')
  const text  = screen.queryByText('Content')
  const close = screen.queryByTestId('card-callout-dismiss')

  expect(card).toBeInTheDocument()
  expect(text).toBeInTheDocument()
  expect(close).toBeInTheDocument()

  await fireEvent.click(close)

  expect(spy).toBeCalled()
})

it('should have no close button if props "dismissable" set to false', () => {
  const screen = render({
    components: { Card },
    template  : `
      <Card :dismissable="false">
        Content
      </Card>
    `,
  })

  const dismiss = screen.queryByTestId('card-callout-dismiss')

  expect(dismiss).not.toBeInTheDocument()
})

it('should have custom body class via "body-class" props', () => {
  const screen = render({
    components: { Card },
    template  : `
      <Card body-class="bg-info">
        Content
      </Card>
    `,
  })

  const body = screen.queryByTestId('card-body')

  expect(body).toBeInTheDocument()
  expect(body).toHaveClass('bg-info')
})
