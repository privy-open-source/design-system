import { render } from '@testing-library/vue'
import Card from './Card.vue'
import CardSection from './CardSection.vue'
import Button from '../button/Button.vue'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { Card },
    template: `
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
    template: `
      <Card disabled>
          Content
      </Card>
    `,
  })

  const card = screen.queryByTestId('card')

  expect(card).toBeInTheDocument()
  expect(card).toHaveClass('card', 'card--disabled')
})

it('Card-Section should have style "disabled" if disabled is provided', () => {
  const screen = render({
    components: { Card, CardSection },
    template  : `
      <Card>
        <Card-Section disabled>
          Content
        </Card-Section>
      </Card>
    `,
  })
 
   const cardSection  = screen.queryByTestId('card-section')
 
   expect(cardSection).toBeInTheDocument()
   expect(cardSection).toHaveClass('card__section', 'card__section--disabled')
})

it('should be able to add Footer Action via slot `footer` in Card-Section', () => {
  const screen = render({
    components: { Card, CardSection, Button },
    template  : `
      <Card sectioned>
        <Card-Section>
          <template #footer>
            <Button variant="outline" color="primary">Enable Sample Button</Button>
            <Button variant="link" color="primary">Button Text</Button>
          </template>
        </Card-Section>
      </Card>
    `,
  })

  const cardFooter  = screen.queryByTestId('card-footer')

  expect(cardFooter).toBeInTheDocument()
  expect(cardFooter).toHaveClass('card__footer')
})

it('should be able to add Card Footer and Card Header via slot `footer` and `header` in Card', () => {
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
        <template #footer>
          <Button variant="outline" color="primary">Enable Sample Button</Button>
          <Button variant="link" color="primary">Button Text</Button>
        </template>
      </Card>
    `,
  })

  const cardHeader  = screen.queryByTestId('card-header')
  const cardFooter  = screen.queryByTestId('card-footer')

  expect(cardHeader).toBeInTheDocument()
  expect(cardHeader).toHaveClass('card__header')
  expect(cardFooter).toBeInTheDocument()
  expect(cardFooter).toHaveClass('card__footer')
})

it('should be able to add Card Header via slot `header` in Card-Section', () => {
  const screen = render({
    components: { Card, CardSection, Button },
    template  : `
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

  const cardHeader  = screen.queryByTestId('card-header')

  expect(cardHeader).toBeInTheDocument()
  expect(cardHeader).toHaveClass('card__header')
})

it('should be able to add Card Header Action via slot `action` in Card/Card-Section', () => {
  const screen = render({
    components: { Card, CardSection, Button },
    template  : `
      <Card 
        title="Any title should here" sectioned>
        <template #action>
          <Button color="primary" variant="link">Button Text</Button>
        </template>
        <Card-Section>
          While here you will see the content of cards
        </Card-Section>
        <Card-Section>
          <template #action>
            <a href="#" class="text-primary-100 hover:text-primary-hovered underline">Edit</a>
          </template>
          While here you will see the content of cards
        </Card-Section>
      </Card>
    `,
  })

  const cardHeaderAction  = screen.queryByTestId('card-header-action')

  expect(cardHeaderAction).toBeInTheDocument()
  expect(cardHeaderAction).toHaveClass('card__header__action')
})
