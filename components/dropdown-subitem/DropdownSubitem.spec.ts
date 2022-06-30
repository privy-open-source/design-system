import { fireEvent, render } from '@testing-library/vue'
import DropdownSubitem from './DropdownSubitem.vue'
import DropdownItem from '../dropdown/DropdownItem.vue'

it('should be able to render child', () => {
  const screen = render({
    components: { DropdownSubitem, DropdownItem },
    template  : `
      <DropdownSubitem>
        <DropdownItem>Item 1</DropdownItem>
        <DropdownItem>Item 2</DropdownItem>
      </DropdownSubitem>
    `,
  })

  const dropdown = screen.queryByTestId('dropdown-subitem')
  const item1    = screen.queryByText('Item 1')
  const item2    = screen.queryByText('Item 2')

  expect(dropdown).toBeInTheDocument()
  expect(item1).toBeInTheDocument()
  expect(item2).toBeInTheDocument()
})

it('should able to render subitem', async () => {
  const screen = render({
    components: { DropdownSubitem, DropdownItem },
    template  : `
      <DropdownSubitem>
        <DropdownItem>Item 1</DropdownItem>
        <DropdownItem>Item 2</DropdownItem>

        <DropdownSubitem text="Subitem">
          <DropdownItem>Item 3</DropdownItem>
          <DropdownItem>Item 4</DropdownItem>
        </DropdownSubitem>
      </DropdownSubitem>
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
    components: { DropdownSubitem, DropdownItem },
    template  : `
      <DropdownSubitem>
        <DropdownItem>Item 1</DropdownItem>
        <DropdownItem>Item 2</DropdownItem>

        <DropdownSubitem text="Subitem">
          <DropdownItem>Item 3</DropdownItem>
          <DropdownItem>Item 4</DropdownItem>
        </DropdownSubitem>
      </DropdownSubitem>
    `,
  })

  const subitem = screen.queryByText('Subitem')

  expect(subitem).toBeInTheDocument()

  await fireEvent.click(subitem)

  const item3 = screen.queryByText('Item 3')
  const item4 = screen.queryByText('Item 4')
  const back  = screen.queryByTestId('dropdown-back')

  expect(back).toBeInTheDocument()
  expect(item3).toBeInTheDocument()
  expect(item4).toBeInTheDocument()

  await fireEvent.click(back)

  const item1 = screen.queryByText('Item 1')
  const item2 = screen.queryByText('Item 2')

  expect(item1).toBeInTheDocument()
  expect(item2).toBeInTheDocument()
})

it('should able to modify button content via slot `button-content`', async () => {
  const screen = render({
    components: { DropdownSubitem, DropdownItem },
    template  : `
      <DropdownSubitem>
        <DropdownItem>Item 1</DropdownItem>
        <DropdownItem>Item 2</DropdownItem>

        <DropdownSubitem>
          <template #button-content>
            <span data-testid="custom-button">
              Coba
            </span>
          </template>
          <DropdownItem>Item 3</DropdownItem>
          <DropdownItem>Item 4</DropdownItem>
        </DropdownSubitem>
      </DropdownSubitem>
    `,
  })

  const subitem = screen.queryByTestId('custom-button')

  await fireEvent.click(subitem)

  const item3 = screen.queryByText('Item 3')
  const item4 = screen.queryByText('Item 4')
  const back  = screen.queryByTestId('dropdown-back')

  expect(back).toBeInTheDocument()
  expect(item3).toBeInTheDocument()
  expect(item4).toBeInTheDocument()
})
