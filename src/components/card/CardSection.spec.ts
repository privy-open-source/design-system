import { render } from '@testing-library/vue'
import Card from './Card.vue'
import CardSection from './CardSection.vue'
import Button from '../button/Button.vue'

it('should rendered properly with "sectioned" props', () => {
  const screen = render({
    components: { Card, CardSection },
    template  : `
      <Card sectioned>
        <Card-Section>
          Content
        </Card-Section>
      </Card>
    `,
  })

  const card        = screen.queryByTestId('card')
  const cardSection = screen.queryByTestId('card-section')
  const text        = screen.queryByText('Content')

  expect(card).toBeInTheDocument()
  expect(cardSection).toBeInTheDocument()
  expect(card).toHaveClass('card', 'card--sectioned')
  expect(cardSection).toHaveClass('card__section')
  expect(text).toBeInTheDocument()
})

it('Card-Section should have style "disabled" if disabled is provided', () => {
  const screen = render({
    components: { Card, CardSection },
    template  : `
      <Card sectioned>
        <Card-Section disabled>
          Content
        </Card-Section>
      </Card>
    `,
  })

  const cardSection = screen.queryByTestId('card-section')

  expect(cardSection).toBeInTheDocument()
  expect(cardSection).toHaveClass('card__section', 'card__section--disabled')
})

it('should be able to add Card Header via slot `header`', () => {
  const screen = render({
    components: {
      Card, CardSection, Button,
    },
    template: `
      <Card sectioned>
        <Card-Section>
          <template #header>
            <div class="flex justify-between items-center">
              <h3>Card Header</h3>
              <span>
                <Button variant="link" color="primary">Button Text</Button>
              </span>
            </div>
          </template>
        </Card-Section>
      </Card>
    `,
  })

  const cardHeader = screen.queryByTestId('card-header')
  const text       = screen.queryByText('Card Header')
  const action     = screen.queryByText('Button Text')

  expect(cardHeader).toBeInTheDocument()
  expect(cardHeader).toHaveClass('card__header')
  expect(text).toBeInTheDocument()
  expect(action).toBeInTheDocument()
})

it('should be able to add Footer Action via slot `footer`', () => {
  const screen = render({
    components: {
      Card, CardSection, Button,
    },
    template: `
      <Card sectioned>
        <Card-Section>
          <template #footer>
            <Button variant="outline" color="primary">Sample Button</Button>
            <Button variant="link" color="primary">Button Text</Button>
          </template>
        </Card-Section>
      </Card>
    `,
  })

  const cardFooter = screen.queryByTestId('card-footer')
  const text       = screen.queryByText('Sample Button')

  expect(cardFooter).toBeInTheDocument()
  expect(cardFooter).toHaveClass('card__footer')
  expect(text).toBeInTheDocument()
})

it('should be able to add Header Action via slot `action`', () => {
  const screen = render({
    components: { Card, CardSection },
    template  : `
      <Card sectioned>
        <Card-Section title="Any title should here">
          <template #action>
            <a href="#" class="text-link underline">Edit</a>
          </template>
          Content
        </Card-Section>
      </Card>
    `,
  })

  const cardHeaderAction = screen.queryByTestId('card-header-action')
  const text             = screen.queryByText('Content')
  const action           = screen.queryByText('Edit')

  expect(cardHeaderAction).toBeInTheDocument()
  expect(cardHeaderAction).toHaveClass('card__header__action')
  expect(text).toBeInTheDocument()
  expect(action).toBeInTheDocument()
})
