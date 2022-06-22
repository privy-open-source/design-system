import { vi } from 'vitest'
import {
  ref,
  nextTick,
  isRef,
} from 'vue-demi'
import { usePopper, Placement } from './use-popper'

it('should create popper instance', async () => {
  const target    = ref(document.createElement('div'))
  const menu      = ref(document.createElement('div'))
  const placement = ref<Placement>('bottom-start')

  const instance = usePopper(target, menu, placement)

  expect(isRef(instance)).toBe(true)
  expect(instance.value).not.toBeUndefined()
})

it('should update optionse if placement changed', async () => {
  const target    = ref(document.createElement('div'))
  const menu      = ref(document.createElement('div'))
  const placement = ref<Placement>('bottom-start')

  const instance   = usePopper(target, menu, placement)
  const setOptions = vi.spyOn(instance.value, 'setOptions')

  placement.value = 'bottom-end'
  await nextTick()

  expect(instance.value.setOptions).toBeCalled()
  expect(setOptions).toBeCalledWith(expect.objectContaining({ placement: 'bottom-end' }))
})
