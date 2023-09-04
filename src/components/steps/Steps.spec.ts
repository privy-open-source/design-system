import { fireEvent, render } from '@testing-library/vue'
import Steps from './Steps.vue'
import Step from './Step.vue'
import { delay } from 'nanodelay'
import { vi } from 'vitest'
import { ref } from 'vue-demi'

it('should render properly', () => {
  const screen = render({
    components: { Steps, Step },
    template  : `
      <Steps>
        <Step />
        <Step />
      </Steps>
    `,
  })

  const steps = screen.queryByTestId('steps')

  expect(steps).toBeInTheDocument()
})

it('should able to slide to next step if `next()` called', async () => {
  const screen = render({
    components: { Steps, Step },
    template  : `
      <Steps>
        <Step>
          <template #default="{ prev, next }">
            <button @click="prev">
              Prev
            </button>
            <button @click="next">
              Next
            </button>
          </template>
        </Step>
        <Step>
          <span>Step 2</span>
        </Step>
      </Steps>
    `,
  })

  const nextBtn = screen.queryByText('Next')

  await fireEvent.click(nextBtn)
  await delay(0)

  const step2 = screen.queryByText('Step 2')

  expect(step2).toBeInTheDocument()
})

it('should able to slide to previous step if `prev()` called', async () => {
  const screen = render({
    components: { Steps, Step },
    template  : `
      <Steps :modelValue="2">
        <Step>
          <span>Step 1</span>
        </Step>
        <Step>
          <template #default="{ prev, next }">
            <button @click="prev">
              Prev
            </button>
            <button @click="next">
              Next
            </button>
          </template>
        </Step>
      </Steps>
    `,
  })

  const prevBtn = screen.queryByText('Prev')

  await fireEvent.click(prevBtn)
  await delay(0)

  const step2 = screen.queryByText('Step 1')

  expect(step2).toBeInTheDocument()
})

it('should able to slide to spesific step if `goStep()` called', async () => {
  const screen = render({
    components: { Steps, Step },
    template  : `
      <Steps :modelValue="3">
        <Step>
          <span>Step 1</span>
        </Step>
        <Step>
          <span>Step 2</span>
        </Step>
        <Step>
          <template #default="{ toStep }">
            <button @click="toStep(1)">
              Goto Home
            </button>
          </template>
        </Step>
      </Steps>
    `,
  })

  const gotoBtn = screen.queryByText('Goto Home')

  await fireEvent.click(gotoBtn)
  await delay(0)

  const step2 = screen.queryByText('Step 1')

  expect(step2).toBeInTheDocument()
})

it('should trigger on-before-next when next() is called', async () => {
  const onBeforeNext = vi.fn(() => true)
  const screen       = render({
    components: { Step, Steps },
    template  : `
      <Steps :on-before-next="onBeforeNext">
        <Step>
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
  await delay(0)

  expect(onBeforeNext).toBeCalledWith(2, 1)
})

it('should trigger on-before-prev when prev() is called', async () => {
  const onBeforePrev = vi.fn(() => true)
  const screen       = render({
    components: { Step, Steps },
    template  : `
      <Steps
        :on-before-prev="onBeforePrev"
        :modelValue="2">
        <Step />
        <Step>
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

it('should trigger on-finished when next() is called on last step', async () => {
  const onFinished = vi.fn(() => true)
  const screen     = render({
    components: { Step, Steps },
    template  : `
      <Steps :on-finished="onFinished">
        <Step>
          <template #default="{ prev, next }">
            <button @click="prev">
              Prev
            </button>
            <button @click="next">
              Next
            </button>
          </template>
        </Step>
      </Steps>
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
    components: { Steps, Step },
    template  : `
      <Steps v-model="model">
        <Step>
          <template #default="{ prev, next }">
            <button @click="prev">
              Prev
            </button>
            <button @click="next">
              Next
            </button>
          </template>
        </Step>
        <Step>
          <span>Step 2</span>
        </Step>
      </Steps>
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

it('should loop over to start if prop loop set to true', async () => {
  const model  = ref(3)
  const screen = render({
    components: { Steps, Step },
    template  : `
      <Steps v-model="model" loop direction="vertical">
        <Step>
          <template #default="{ prev, next }">
            Step 1
            <button @click="prev">
              Prev
            </button>
            <button @click="next">
              Next
            </button>
          </template>
        </Step>
        <Step>
          <span>Step 2</span>
        </Step>
        <Step>
          <template #default="{ prev, next }">
            Step 3
            <button @click="prev">
              Prev
            </button>
            <button @click="next">
              Next
            </button>
          </template>
        </Step>
      </Steps>
    `,
    setup () {
      return { model }
    },
  })

  const nextBtn = screen.queryByText('Next')

  await fireEvent.click(nextBtn)
  await delay(0)

  expect(model.value).toBe(1)

  const prevBtn = screen.queryByText('Prev')

  await fireEvent.click(prevBtn)
  await delay(0)

  expect(model.value).toBe(3)
})
