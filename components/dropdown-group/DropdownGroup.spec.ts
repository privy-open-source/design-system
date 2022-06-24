import { fireEvent, render } from '@testing-library/vue'
import DropdownGroup from './DropdownGroup.vue'
import DropdownItem from '../dropdown/DropdownItem.vue'

it('should be able to render child', () => {
  const screen = render({
    components: { DropdownGroup, DropdownItem },
    template  : `
      <DropdownGroup>
        <DropdownItem>Item 1</DropdownItem>
        <DropdownItem>Item 2</DropdownItem>
      </DropdownGroup>
    `,
  })

  const dropdown = screen.queryByTestId('dropdown-group')
  const item1    = screen.queryByText('Item 1')
  const item2    = screen.queryByText('Item 2')

  expect(dropdown).toBeInTheDocument()
  expect(item1).toBeInTheDocument()
  expect(item2).toBeInTheDocument()
})

it('should able to render sub item', async () => {
  const screen = render({
    components: { DropdownGroup, DropdownItem },
    template  : `
      <DropdownGroup>
        <DropdownItem>Item 1</DropdownItem>
        <DropdownItem>Item 2</DropdownItem>

        <DropdownGroup text="Subitem">
          <DropdownItem>Item 3</DropdownItem>
          <DropdownItem>Item 4</DropdownItem>
        </DropdownGroup>
      </DropdownGroup>
    `,
  })

  const subitem = screen.queryByText('Subitem')

  expect(subitem).toBeInTheDocument()

  await fireEvent.click(subitem)

  const item1 = screen.queryByText('Item 1')
  const item2 = screen.queryByText('Item 2')
  const item3 = screen.queryByText('Item 3')
  const item4 = screen.queryByText('Item 4')

  expect(item3).toBeInTheDocument()
  expect(item4).toBeInTheDocument()

  expect(item1).not.toBeInTheDocument()
  expect(item2).not.toBeInTheDocument()
})

it('should able to back main menu after click sub menu', async () => {
  const screen = render({
    components: { DropdownGroup, DropdownItem },
    template  : `
      <DropdownGroup>
        <DropdownItem>Item 1</DropdownItem>
        <DropdownItem>Item 2</DropdownItem>

        <DropdownGroup text="Subitem">
          <DropdownItem>Item 3</DropdownItem>
          <DropdownItem>Item 4</DropdownItem>
        </DropdownGroup>
      </DropdownGroup>
    `,
  })

  const subitem = screen.queryByText('Subitem')

  expect(subitem).toBeInTheDocument()

  await fireEvent.click(subitem)

  const item3 = screen.queryByText('Item 3')
  const item4 = screen.queryByText('Item 4')
  const back  = screen.queryByText('Back')

  expect(back).toBeInTheDocument()
  expect(item3).toBeInTheDocument()
  expect(item4).toBeInTheDocument()

  await fireEvent.click(back)

  const item1 = screen.queryByText('Item 1')
  const item2 = screen.queryByText('Item 2')

  expect(item1).toBeInTheDocument()
  expect(item2).toBeInTheDocument()
})

it('should able to change back button text via prop `backText`', async () => {
  const screen = render({
    components: { DropdownGroup, DropdownItem },
    template  : `
      <DropdownGroup backText="Kembali">
        <DropdownItem>Item 1</DropdownItem>
        <DropdownItem>Item 2</DropdownItem>

        <DropdownGroup text="Subitem">
          <DropdownItem>Item 3</DropdownItem>
          <DropdownItem>Item 4</DropdownItem>
        </DropdownGroup>
      </DropdownGroup>
    `,
  })

  const subitem = screen.queryByText('Subitem')

  await fireEvent.click(subitem)

  const back = screen.queryByText('Kembali')

  expect(back).toBeInTheDocument()
})

it('should able to modify button content via slot `button-content`', async () => {
  const screen = render({
    components: { DropdownGroup, DropdownItem },
    template  : `
      <DropdownGroup>
        <DropdownItem>Item 1</DropdownItem>
        <DropdownItem>Item 2</DropdownItem>

        <DropdownGroup>
          <template #button-content>
            <span data-testid="custom-button">
              Coba
            </span>
          </template>
          <DropdownItem>Item 3</DropdownItem>
          <DropdownItem>Item 4</DropdownItem>
        </DropdownGroup>
      </DropdownGroup>
    `,
  })

  const subitem = screen.queryByTestId('custom-button')

  await fireEvent.click(subitem)

  const item3 = screen.queryByText('Item 3')
  const item4 = screen.queryByText('Item 4')
  const back  = screen.queryByText('Back')

  expect(back).toBeInTheDocument()
  expect(item3).toBeInTheDocument()
  expect(item4).toBeInTheDocument()
})
