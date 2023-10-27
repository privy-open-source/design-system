import { render } from '@testing-library/vue'
import { vi } from 'vitest'
import type { FunctionalComponent } from 'vue-demi'
import Step from './Step.vue'
import StepSlider from './StepSlider.vue'

const KeepAlive: FunctionalComponent = vi.fn()

vi.spyOn(console, 'warn').mockReturnThis()

afterEach(() => {
  vi.restoreAllMocks()
})

it('should render only active step', () => {
  const screen = render({
    components: { Step, StepSlider },
    template  : `
      <StepSlider :active="1">
        <Step>Step 1</Step>
        <Step>Step 2</Step>
      </StepSlider>
    `,
  })

  const step1 = screen.queryByText('Step 1')
  const step2 = screen.queryByText('Step 2')

  expect(step1).not.toBeInTheDocument()
  expect(step2).toBeInTheDocument()
})

it('should keeping alive component if prop keep-alive is provided', async () => {
  render({
    components: {
      Step,
      StepSlider,
    },
    template: `
      <StepSlider :active="0" keep-alive>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
      </StepSlider>
    `,
    setup () {
      return {}
    },
  }, { global: { stubs: { 'keep-alive': KeepAlive } } })

  expect(KeepAlive).toBeCalled()
})
