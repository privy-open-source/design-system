import { fireEvent, render } from '@testing-library/vue'
import { delay } from 'nanodelay'
import { vi } from 'vitest'
import Wizard from './Wizard.vue'
import WizardStep from './WizardStep.vue'

it('should showing title if prop `title` is provided', () => {
  const screen = render({
    components: { Wizard, WizardStep },
    template  : `
      <wizard>
        <wizard-step title="Step 1" />
        <wizard-step title="Step 2" />
      </wizard>
    `,
  })

  const wizard = screen.queryByTestId('wizard')
  const title1 = screen.queryByText('Step 1')
  const title2 = screen.queryByText('Step 2')

  expect(wizard).toBeInTheDocument()
  expect(title1).toBeInTheDocument()
  expect(title2).toBeInTheDocument()
})

it('should able to replace title content with slot `icon`', () => {
  const screen = render({
    components: { Wizard, WizardStep },
    template  : `
      <wizard>
        <wizard-step title="Step 1">
          <template #icon>
            <span data-testid="step-icon" />
          </template>
        </wizard-step>
        <wizard-step title="Step 2" />
      </wizard>
    `,
  })

  const icon = screen.queryByTestId('step-icon')

  expect(icon).toBeInTheDocument()
})

it('should able to replace title content with slot `title`', () => {
  const screen = render({
    components: { Wizard, WizardStep },
    template  : `
      <wizard>
        <wizard-step>
          <template #title>
            <span data-testid="step-title">
              Hello World
            </span>
          </template>
        </wizard-step>
      </wizard>
    `,
  })

  const title = screen.queryByTestId('step-title')

  expect(title).toBeInTheDocument()
  expect(title).toHaveTextContent('Hello World')
})

it('should trigger on-before-next when next() is called', async () => {
  const onBeforeNext = vi.fn(() => true)
  const screen       = render({
    components: { WizardStep, Wizard },
    template  : `
      <Wizard>
        <WizardStep :on-before-next="onBeforeNext">
          <template #default="{ prev, next }">
            <button @click="prev">
              Prev
            </button>
            <button @click="next">
              Next
            </button>
          </template>
        </WizardStep>
        <WizardStep />
      </Wizard>
    `,
    setup () {
      return { onBeforeNext }
    },
  })

  const next = screen.queryByText('Next')

  await fireEvent.click(next)

  expect(onBeforeNext).toBeCalledWith(2, 1)
})

it('should trigger on-before-prev when prev() is called', async () => {
  const onBeforePrev = vi.fn(() => true)
  const screen       = render({
    components: { WizardStep, Wizard },
    template  : `
      <Wizard :modelValue="2">
        <WizardStep />
        <WizardStep :on-before-prev="onBeforePrev">
          <template #default="{ prev, next }">
            <button @click="prev">
              Prev
            </button>
            <button @click="next">
              Next
            </button>
          </template>
        </WizardStep>
        <WizardStep />
      </Wizard>
    `,
    setup () {
      return { onBeforePrev }
    },
  })

  const prev = screen.queryByText('Prev')

  await fireEvent.click(prev)
  await delay(0)

  expect(onBeforePrev).toBeCalledWith(1, 2)
})
