import { render } from '@testing-library/vue'
import Subheading from './Subheading.vue'

it('should rendered properly without any props', () => {
    const screen = render({
      components: { Subheading },
      template  : `
        <Subheading>
          Subheading Title
        </Subheading>
      `,
    })
  
    const subheading = screen.queryByTestId('subheading')
    const text   = screen.queryByText('Subheading Title')
  
    expect(subheading).toBeInTheDocument()
    expect(subheading).toHaveClass('subheading', 'subheading--md')
    expect(text).toBeInTheDocument()
})

it('should have style "sm" if size set to "sm"', () => {
    const screen = render({
      components: { Subheading },
      template  : `
        <Subheading size="sm">
          Title
        </Subheading>
      `,
    })
  
    const subheading = screen.queryByTestId('subheading')
  
    expect(subheading).toBeInTheDocument()
    expect(subheading).toHaveClass('subheading', 'subheading--sm')
    expect(subheading).not.toHaveClass('subheading--md')
})

it('should have style "overline normal" if overline normal is provided', () => {
    const screen = render({
      components: { Subheading },
      template  : `
        <Subheading overline="normal">
          Title
        </Subheading>
      `,
    })
  
    const subheading = screen.queryByTestId('subheading')
  
    expect(subheading).toBeInTheDocument()
    expect(subheading).toHaveClass('subheading', 'subheading--overline-normal')
    expect(subheading).not.toHaveClass('subheading--md', 'subheading--sm', 'subheading--overline-medium')
})
  