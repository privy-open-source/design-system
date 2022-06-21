import { fireEvent } from '@testing-library/vue'
import { vi } from 'vitest'
import { ref } from 'vue-demi'
import { onScrollBottom } from './use-on-scroll'

it('should invoke handler if scroll reach the bottom', async () => {
  const handler = vi.fn()
  const element = ref(document.createElement('div'))

  onScrollBottom(element, handler)

  await fireEvent.scroll(element.value, {
    target: {
      offsetHeight: 0,
      scrollHeight: 100,
      scrollTop   : 100,
    },
  })

  expect(handler).toBeCalled()
})
