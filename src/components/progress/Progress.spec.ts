import { render } from '@testing-library/vue'
import Progress from './Progress.vue'
import ProgressItem from './ProgressItem.vue'

it('should mount properly', () => {
  const screen = render({
    components: { Progress, ProgressItem },
    template  : `
      <Progress>
        <ProgressItem />
        <ProgressItem />
      </Progress>
    `,
  })

  const progress      = screen.queryByTestId('progress')
  const progressItems = screen.queryAllByTestId('progress-item')

  expect(progress).toBeInTheDocument()
  expect(progressItems).toHaveLength(2)
})

it('should have style counter if `variant` set to "counter"', () => {
  const screen = render({
    components: { Progress, ProgressItem },
    template  : `
      <Progress variant="counter">
        <ProgressItem />
        <ProgressItem />
      </Progress>
    `,
  })

  const progress = screen.queryByTestId('progress')

  expect(progress).toHaveClass('progress--counter')
  expect(progress).not.toHaveClass('progress--dot')
})

it('should have style general if `title-variant` set to "general"', () => {
  const screen = render({
    components: { Progress, ProgressItem },
    template  : `
      <Progress title-variant="general">
        <ProgressItem />
        <ProgressItem />
      </Progress>
    `,
  })

  const progress = screen.queryByTestId('progress')

  expect(progress).toHaveClass('progress--general')
  expect(progress).not.toHaveClass('progress--specific')
})

it('should show title of last active item if `title-variant` set to "general"', () => {
  const screen = render({
    components: { Progress, ProgressItem },
    template  : `
      <Progress title-variant="general">
        <ProgressItem title="Step 1" />
        <ProgressItem title="Step 2" active />
      </Progress>
    `,
  })

  const title = screen.queryByTestId('progress-title-general')

  expect(title).toHaveTextContent('Step 2')
})

it('should slot title of last active item if `title-variant` set to "general"', () => {
  const screen = render({
    components: { Progress, ProgressItem },
    template  : `
      <Progress title-variant="general">
        <ProgressItem title="Step 1" />
        <ProgressItem active>
          <template #title>
            <span data-testid="icon-step-2">
              Icon Step 2
            </span>
          </template>
        </ProgressItem>
      </Progress>
    `,
  })

  const title = screen.queryByTestId('progress-title-general')
  const child = title.children.item(0)

  expect(child).toHaveAttribute('data-testid', 'icon-step-2')
  expect(child).toHaveTextContent('Icon Step 2')
})

it('should have style vertical mode if prop `vertical` is provided', () => {
  const screen = render({
    components: { Progress, ProgressItem },
    template  : `
      <Progress vertical>
        <ProgressItem />
        <ProgressItem />
      </Progress>
    `,
  })

  const progress = screen.queryByTestId('progress')

  expect(progress).toHaveClass('progress--vertical')
  expect(progress).not.toHaveClass('progress--horizontal')
})
