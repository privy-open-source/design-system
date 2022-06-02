import { render } from '@testing-library/vue'
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
  expect(label).toHaveClass('label', 'label--default', 'label--medium')
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
  expect(label).toHaveClass('label', 'label--default', 'label--success')
  expect(label).not.toHaveClass('label--primary')
  expect(text).toBeInTheDocument()
})

it('should have style "light" if variant props set to "light"', () => {
  const screen = render({
    components: { Label },
    template  : `
      <Label color="warning" variant="light">
        Label
      </Label>
    `,
  })

  const label = screen.queryByTestId('label')
  const text  = screen.queryByText('Label')

  expect(label).toBeInTheDocument()
  expect(label).toHaveClass('label', 'label--warning', 'label--light')
  expect(label).not.toHaveClass('label--default', 'label--primary')
  expect(text).toBeInTheDocument()
})

it('should have style "large" if size props set to "large"', () => {
  const screen = render({
    components: { Label },
    template  : `
      <Label color="danger" size="large" variant="dot">
        Label
      </Label>
    `,
  })

  const label = screen.queryByTestId('label')
  const dot   = screen.queryByTestId('dot')
  const text  = screen.queryByText('Label')

  expect(label).toBeInTheDocument()
  expect(label).toHaveClass('label', 'label--danger', 'label--dot', 'label--large')
  expect(label).not.toHaveClass('label--default', 'label--primary', 'label--medium')
  expect(dot).toBeInTheDocument()
  expect(dot).toHaveClass('dot', 'dot--danger')
  expect(text).toBeInTheDocument()
})
