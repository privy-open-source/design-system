import { queryByTestId } from '@testing-library/dom'
import { useSelector } from './use-selector'

it('should able to select all element using querySelector', () => {
  document.body.innerHTML = `
    <div data-testid="target">
      <div class="item" data-testid="item-1"/>
      <div class="item" data-testid="item-2"/>
      <div class="item" data-testid="item-3"/>
    </div>
  `

  const items = useSelector('[data-testid="item-1"]', document.body)
  const item1 = queryByTestId(document.body, 'item-1')

  expect(items.value).toBe(item1)
})

it('should able to select all element using querySelector', () => {
  document.body.innerHTML = `
    <div data-testid="target">
      <div class="item" data-testid="item-1"/>
      <div class="item" data-testid="item-2"/>
      <div class="item" data-testid="item-3"/>
    </div>
  `

  const items = useSelector('.item', document.body, true)
  const item1 = queryByTestId(document.body, 'item-1')
  const item2 = queryByTestId(document.body, 'item-2')
  const item3 = queryByTestId(document.body, 'item-3')

  expect(items.value[0]).toBe(item1)
  expect(items.value[1]).toBe(item2)
  expect(items.value[2]).toBe(item3)
})
