import { render } from '@testing-library/vue'
import ProgressItem from './ProgressItem.vue'

it('should render properly', () => {
  const screen = render({
    components: { ProgressItem },
    template  : '<ProgressItem />',
  })

  const item = screen.queryByTestId('progress-item')

  expect(item).toBeInTheDocument()
})

it('should have style `active` if prop `active` is provided', () => {
  const screen = render({
    components: { ProgressItem },
    template  : '<ProgressItem active />',
  })

  const item = screen.queryByTestId('progress-item')

  expect(item).toBeInTheDocument()
  expect(item).toHaveClass('progress--active')
})

it('should show title text if prop `title` is provided', () => {
  const screen = render({
    components: { ProgressItem },
    template  : '<ProgressItem title="Step 1" />',
  })

  const title = screen.queryByText('Step 1')

  expect(title).toBeInTheDocument()
})

it('should able to replace icon content with slot `icon`', () => {
  const screen = render({
    components: { ProgressItem },
    template  : `
      <ProgressItem title="Step 1">
        <template #icon>
          <span data-testid="step-icon" />
        </template>
      </ProgressItem>
    `,
  })

  const icon = screen.queryByTestId('step-icon')

  expect(icon).toBeInTheDocument()
})

it('should able to replace title content with slot `title`', () => {
  const screen = render({
    components: { ProgressItem },
    template  : `
      <ProgressItem title="Step 1">
        <template #title>
          <span data-testid="step-title">
            Hello World
          </span>
        </template>
      </ProgressItem>
    `,
  })

  const title = screen.queryByTestId('step-title')

  expect(title).toBeInTheDocument()
  expect(title).toHaveTextContent('Hello World')
})
