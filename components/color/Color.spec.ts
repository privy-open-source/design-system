import { render } from '@testing-library/vue'
import Colors from './Colors.vue'
import Color from './Color.vue'

it('should render Colors', () => {
  const screen = render({
    components: { Colors },
    template  : `
      <Colors>
        Black
      </Colors>
    `,
  })

  const colors = screen.queryByTestId('colors')
  const title  = screen.queryByText('Black')

  expect(colors).toBeInTheDocument()
  expect(colors).toHaveClass('colors')
  expect(title).toBeInTheDocument()
})

it('should render color', () => {
  const screen = render({
    components: { Color },
    template  : `
      <Color>
        <template #subtitle>Title</template>
        <template #code>#FFFFFF</template>
      </Color>
    `,
  })

  const color = screen.queryByTestId('color')
  const title = screen.queryByText('Title')
  const code  = screen.queryByText('#FFFFFF')

  expect(color).toBeInTheDocument()
  expect(color).toHaveClass('color')
  expect(title).toBeInTheDocument()
  expect(code).toBeInTheDocument()
})
