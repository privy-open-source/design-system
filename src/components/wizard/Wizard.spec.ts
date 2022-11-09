import { fireEvent, render } from '@testing-library/vue'
import { delay } from 'nanodelay'
import { vi } from 'vitest'
import { ref } from 'vue-demi'
import Wizard from './Wizard.vue'
import WizardStep from './WizardStep.vue'

it('should render properly', () => {
  const screen = render({
    components: { Wizard, WizardStep },
    template  : `
      <wizard>
        <wizard-step title="Step 1">
          <template #default="{ prev, next }">
            <h1>Hello Step 1</h1>
            <button @click="prev">
              Prev
            </button>
            <button @click="next">
              Next
            </button>
          </template>
        </wizard-step>
        <wizard-step title="Step 2" />
      </wizard>
    `,
  })

  const wizard   = screen.queryByTestId('wizard')
  const progress = screen.queryAllByTestId('wizard-progress-item')
  const step     = screen.queryByTestId('wizard-step')

  expect(wizard).toBeInTheDocument()
  expect(progress).toHaveLength(2)
  expect(step).toBeInTheDocument()
})

it('should have progress variant "counter" if props `variant` set to "counter"', () => {
  const screen = render({
    components: { Wizard, WizardStep },
    template  : `
      <wizard variant="counter">
        <wizard-step title="Step 1">
          <template #default="{ prev, next }">
            <h1>Hello Step 1</h1>
            <button @click="prev">
              Prev
            </button>
            <button @click="next">
              Next
            </button>
          </template>
        </wizard-step>
        <wizard-step title="Step 2" />
      </wizard>
    `,
  })

  const progress = screen.queryByTestId('wizard-progress')

  expect(progress).toHaveClass('progress--counter')
})

it('should have title variant "general" if props `title-variant` set to "general"', () => {
  const screen = render({
    components: { Wizard, WizardStep },
    template  : `
      <wizard title-variant="general">
        <wizard-step title="Step 1">
          <template #default="{ prev, next }">
            <h1>Hello Step 1</h1>
            <button @click="prev">
              Prev
            </button>
            <button @click="next">
              Next
            </button>
          </template>
        </wizard-step>
        <wizard-step title="Step 2" />
      </wizard>
    `,
  })

  const progress = screen.queryByTestId('wizard-progress')

  expect(progress).toHaveClass('progress--general')
})

it('should able to slide to next step if `next()` called', async () => {
  const screen = render({
    components: { Wizard, WizardStep },
    template  : `
      <wizard>
        <wizard-step title="Step 1">
          <template #default="{ prev, next }">
            <h1>Hello Step 1</h1>
            <button @click="prev">
              Prev
            </button>
            <button @click="next">
              Next
            </button>
          </template>
        </wizard-step>
        <wizard-step title="Step 2">
          <h1>Hello Step 2</h1>
        </wizard-step>
      </wizard>
    `,
  })

  const nextBtn  = screen.queryByText('Next')
  const progress = screen.queryAllByTestId('wizard-progress-item')

  expect(progress.at(0)).toHaveClass('progress--active')
  expect(progress.at(1)).not.toHaveClass('progress--active')

  await fireEvent.click(nextBtn)
  await delay(0)

  const step2 = screen.queryByText('Hello Step 2')

  expect(step2).toBeInTheDocument()
  expect(progress.at(0)).toHaveClass('progress--active')
  expect(progress.at(1)).toHaveClass('progress--active')
})

it('should able to slide to previous step if `prev()` called', async () => {
  const screen = render({
    components: { Wizard, WizardStep },
    template  : `
      <wizard :modelValue="2">
        <wizard-step title="Step 1">
          <h1>Hello Step 1</h1>
        </wizard-step>
        <wizard-step title="Step 2">
          <template #default="{ prev, next }">
            <h1>Hello Step 2</h1>
            <button @click="prev">
              Prev
            </button>
            <button @click="next">
              Next
            </button>
          </template>
        </wizard-step>
      </wizard>
    `,
  })

  const prevBtn  = screen.queryByText('Prev')
  const progress = screen.queryAllByTestId('wizard-progress-item')

  expect(progress.at(0)).toHaveClass('progress--active')
  expect(progress.at(1)).toHaveClass('progress--active')

  await fireEvent.click(prevBtn)
  await delay(0)

  const step2 = screen.queryByText('Hello Step 1')

  expect(step2).toBeInTheDocument()
  expect(progress.at(0)).toHaveClass('progress--active')
  expect(progress.at(1)).not.toHaveClass('progress--active')
})

it('should trigger on-before-next when next() is called', async () => {
  const onBeforeNext = vi.fn(() => true)
  const screen       = render({
    components: { WizardStep, Wizard },
    template  : `
      <Wizard :on-before-next="onBeforeNext">
        <WizardStep>
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
  await delay(0)

  expect(onBeforeNext).toBeCalledWith(2, 1)
})

it('should trigger on-before-prev when prev() is called', async () => {
  const onBeforePrev = vi.fn(() => true)
  const screen       = render({
    components: { WizardStep, Wizard },
    template  : `
      <Wizard
        :on-before-prev="onBeforePrev"
        :modelValue="2">
        <WizardStep />
        <WizardStep>
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

it('should trigger on-finished when next() is called on last step', async () => {
  const onFinished = vi.fn(() => true)
  const screen     = render({
    components: { WizardStep, Wizard },
    template  : `
      <Wizard :on-finished="onFinished">
        <WizardStep>
          <template #default="{ prev, next }">
            <button @click="prev">
              Prev
            </button>
            <button @click="next">
              Next
            </button>
          </template>
        </WizardStep>
      </Wizard>
    `,
    setup () {
      return { onFinished }
    },
  })

  const next = screen.queryByText('Next')

  await fireEvent.click(next)
  await delay(0)

  expect(onFinished).toBeCalled()
})

it('should modify value inside v-model', async () => {
  const model  = ref(1)
  const screen = render({
    components: { Wizard, WizardStep },
    template  : `
      <Wizard v-model="model">
        <WizardStep>
          <template #default="{ prev, next }">
            <button @click="prev">
              Prev
            </button>
            <button @click="next">
              Next
            </button>
          </template>
        </WizardStep>
        <WizardStep>
          <span>Step 2</span>
        </WizardStep>
      </Wizard>
    `,
    setup () {
      return { model }
    },
  })

  const nextBtn = screen.queryByText('Next')

  await fireEvent.click(nextBtn)
  await delay(0)

  expect(model.value).toBe(2)
})
