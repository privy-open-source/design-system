import { vi } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import Label from './Label.vue'

it('should render properly without any props', () => {
  const screen = render({
    components: { Label },
    template  : `
      <Label>Label</Label>
    `,
  })

  const label = screen.queryByTestId('label')
  const text  = screen.queryByText('Label')

  expect(label).toBeInTheDocument()
  expect(label).toHaveClass('label', 'label--default', 'label--variant-default', 'label--md')
  expect(text).toBeInTheDocument()
})

it('should have style "success" if color props set to "success"', () => {
  const screen = render({
    components: { Label },
    template  : `
      <Label color="success">
        Label
      </Label>
    `,
  })

  const label = screen.queryByTestId('label')
  const text  = screen.queryByText('Label')

  expect(label).toBeInTheDocument()
  expect(label).toHaveClass('label', 'label--variant-default', 'label--success')
  expect(label).not.toHaveClass('label--default')
  expect(text).toBeInTheDocument()
})

it('should have style "light" if variant props set to "light"', () => {
  const screen = render({
    components: { Label },
    template  : `
      <Label variant="light">
        Label
      </Label>
    `,
  })

  const label = screen.queryByTestId('label')
  const text  = screen.queryByText('Label')

  expect(label).toBeInTheDocument()
  expect(label).toHaveClass('label', 'label--variant-light')
  expect(label).not.toHaveClass('label--variant-default')
  expect(text).toBeInTheDocument()
})

it('should have style "lg" if size props set to "lg"', () => {
  const screen = render({
    components: { Label },
    template  : `
      <Label color="danger" size="lg" variant="dot">
        Label
      </Label>
    `,
  })

  const label = screen.queryByTestId('label')
  const dot   = screen.queryByTestId('dot')
  const text  = screen.queryByText('Label')

  expect(label).toBeInTheDocument()
  expect(label).toHaveClass('label', 'label--danger', 'label--variant-dot', 'label--lg')
  expect(label).not.toHaveClass('label--variant-default', 'label--default', 'label--md')
  expect(dot).toBeInTheDocument()
  expect(dot).toHaveClass('dot', 'dot--danger')
  expect(text).toBeInTheDocument()
})

it('should have close button if props "dismissable" set to true', () => {
  const screen = render({
    components: { Label },
    template  : `
      <Label :dismissable="true">
        Label
      </Label>
    `,
  })

  const dismiss = screen.queryByTestId('label-dismiss')

  expect(dismiss).toBeInTheDocument()
})

it('should emit event "dismissed" if close button clicked', async () => {
  const spy    = vi.fn()
  const screen = render({
    components: { Label },
    template  : `
      <Label
        :dismissable="true"
        @dismissed="onDismissed">
        Label
      </Label>
    `,
    methods: { onDismissed: spy },
  })

  const label = screen.queryByTestId('label')
  const text  = screen.queryByText('Label')
  const close = screen.queryByTestId('label-dismiss')

  expect(label).toBeInTheDocument()
  expect(text).toBeInTheDocument()
  expect(close).toBeInTheDocument()

  await fireEvent.click(close)

  expect(spy).toBeCalled()
})
