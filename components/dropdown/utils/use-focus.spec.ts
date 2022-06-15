import { queryByTestId } from '@testing-library/dom'
import { useFocus } from './use-focus'
import { shallowRef } from 'vue-demi'
import { vi } from 'vitest'

vi.mock('tabbable', () => {
  return {
    focusable (target: HTMLDivElement) {
      return target.children
    },
  }
})

it('should be able travel focus on elements', () => {
  const div = document.createElement('div')

  div.innerHTML = `
    <button data-testid="1">A</button>
    <button data-testid="2">B</button>
    <button data-testid="3">C</button>
  `

  document.body.append(div)

  const target         = shallowRef(div)
  const { next, prev } = useFocus(target)

  const itemA = queryByTestId(div, '1')
  const itemB = queryByTestId(div, '2')

  next()

  expect(itemA).toHaveFocus()
  expect(itemB).not.toHaveFocus()

  next()

  expect(itemA).not.toHaveFocus()
  expect(itemB).toHaveFocus()

  prev()

  expect(itemA).toHaveFocus()
  expect(itemB).not.toHaveFocus()
})
