import { render } from '@testing-library/vue'
import ButtonGroup from './ButtonGroup.vue'
import Button from '../button/Button.vue'

it('should render properly without any props', () => {
  const screen = render({
    components: { ButtonGroup, Button },
    template  : `
      <Button-Group>
        <Button>Button Text</Button>
        <Button>Button Text</Button>
      </Button-Group>
    `,
  })

  const button = screen.queryByTestId('btn-group')

  expect(button).toBeInTheDocument()
  expect(button).toHaveClass('btn-group', 'btn-group--md')
})

it('should have style "lg" if size props set to "lg"', () => {
  const screen = render({
    components: { ButtonGroup, Button },
    template  : `
      <Button-Group size="lg">
        <Button>Button Text</Button>
      </Button-Group>
    `,
  })

  const buttonGroup = screen.queryByTestId('btn-group')
  const button      = screen.queryByTestId('btn')

  expect(buttonGroup).toBeInTheDocument()
  expect(buttonGroup).toHaveClass('btn-group', 'btn-group--lg')
  expect(buttonGroup).not.toHaveClass('btn-group--md')
  expect(button).toHaveClass('btn--lg')
})

it('should have style "pill" if pill is provided', () => {
  const screen = render({
    components: { ButtonGroup, Button },
    template  : `
      <Button-Group pill>
        <Button>Button Text</Button>
        <Button>Button Text</Button>
      </Button-Group>
    `,
  })

  const button = screen.queryByTestId('btn-group')

  expect(button).toBeInTheDocument()
  expect(button).toHaveClass('btn-group', 'btn-group--pill')
})
