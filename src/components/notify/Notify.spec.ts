import { fireEvent, render } from '@testing-library/vue'
import Sample from './__mocks__/Sample.vue'
import pNotify from './Notify.vue'
import { nextTick, ref } from 'vue-demi'
import { vi } from 'vitest'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

it('should able to show notify', async () => {
  const notify = ref<InstanceType<typeof pNotify>>()
  const screen = render({
    components: { pNotify },
    template  : `
      <pNotify ref="notify">
    `,
    setup () {
      return { notify }
    },
  })

  await nextTick()

  const instance = await notify.value.show({
    component: Sample,
    props    : { text: 'Hello World!' },
  })

  const sample = screen.queryByTestId('sample')

  expect(sample).toBeInTheDocument()

  instance.close()
  await nextTick()

  expect(sample).not.toBeInTheDocument()
})

it('should auto close by duration', async () => {
  const notify = ref<InstanceType<typeof pNotify>>()
  const screen = render({
    components: { pNotify },
    template  : `
      <pNotify ref="notify">
    `,
    setup () {
      return { notify }
    },
  })

  await notify.value.show({
    component: Sample,
    props    : { text: 'Hello World!' },
    duration : 500,
  })

  const sample = screen.queryByTestId('sample')

  expect(sample).toBeInTheDocument()

  vi.advanceTimersByTime(500)
  await nextTick()

  expect(sample).not.toBeInTheDocument()
})

it('should able to update notify', async () => {
  const notify = ref<InstanceType<typeof pNotify>>()
  const screen = render({
    components: { pNotify },
    template  : `
      <pNotify ref="notify">
    `,
    setup () {
      return { notify }
    },
  })

  await nextTick()

  const instance = await notify.value.show({
    component: Sample,
    props    : { text: 'Hello World!' },
  })

  const sample = screen.queryByTestId('sample')
  const text   = screen.queryByTestId('sample-text')

  expect(sample).toBeInTheDocument()
  expect(text).toHaveTextContent('Hello World!')

  instance.update({ props: { text: 'Hello World! #2' } })
  await nextTick()

  expect(text).toHaveTextContent('Hello World! #2')
})

it('should able to self update / close using `useNotifyItem`', async () => {
  const notify = ref<InstanceType<typeof pNotify>>()
  const screen = render({
    components: { pNotify },
    template  : `
      <pNotify ref="notify">
    `,
    setup () {
      return { notify }
    },
  })

  await nextTick()

  await notify.value.show({
    component: Sample,
    props    : { text: 'Hello World!' },
  })

  const sample = screen.queryByTestId('sample')
  const text   = screen.queryByTestId('sample-text')

  expect(sample).toBeInTheDocument()
  expect(text).toHaveTextContent('Hello World!')

  const close  = screen.queryByTestId('sample-close')
  const update = screen.queryByTestId('sample-update')

  await fireEvent.click(update)

  expect(text).toHaveTextContent('New Text')

  await fireEvent.click(close)

  expect(sample).not.toBeInTheDocument()
})
