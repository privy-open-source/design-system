import { render } from '@testing-library/vue'
import Card from './Card.vue'
import CardSection from './CardSection.vue'

it('should rendered properly without any props', () => {
   const screen = render({
      component: { Card },
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

it('should have style "sectioned" if section is provided', () => {
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
 
   const card         = screen.queryByTestId('card')
   const cardSection  = screen.queryByTestId('card-section')
 
   expect(card).toBeInTheDocument()
   expect(cardSection).toBeInTheDocument()
   expect(card).toHaveClass('card', 'card--sectioned')
   expect(cardSection).toHaveClass('card__section')
})
