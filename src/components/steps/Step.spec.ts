import { fireEvent, render } from '@testing-library/vue'
import { delay } from 'nanodelay'
import { vi } from 'vitest'
import Step from './Step.vue'
import Steps from './Steps.vue'

const csl = vi.spyOn(console, 'warn').mockReturnThis()

afterEach(() => {
  vi.restoreAllMocks()
})

it('should give warning if not placed inside <p-steps>', () => {
  const screen = render({
    components: { Step },
    template  : '<Step />',
  })

  const step = screen.queryByTestId('step')

  expect(step).toBeInTheDocument()
  expect(csl).toBeCalledTimes(1)
  expect(csl).toBeCalledWith('<p-step> must be placed inside <p-steps>')
})

it('should trigger on-before-next when next() is called', async () => {
  const onBeforeNext = vi.fn(() => true)
  const screen       = render({
    components: { Step, Steps },
    template  : `
      <Steps>
        <Step :on-before-next="onBeforeNext">
          <template #default="{ prev, next }">
            <button @click="prev">
              Prev
            </button>
            <button @click="next">
              Next
            </button>
          </template>
        </Step>
        <Step />
      </Steps>
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
    components: { Step, Steps },
    template  : `
      <Steps :modelValue="2">
        <Step />
        <Step :on-before-prev="onBeforePrev">
          <template #default="{ prev, next }">
            <button @click="prev">
              Prev
            </button>
            <button @click="next">
              Next
            </button>
          </template>
        </Step>
        <Step />
      </Steps>
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
