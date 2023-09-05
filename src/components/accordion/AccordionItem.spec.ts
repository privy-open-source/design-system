import { render, fireEvent } from '@testing-library/vue'
import { vi } from 'vitest'
import pAccordionItem from './AccordionItem.vue'

it('should render properly without any props', () => {
  const screen = render({
    components: { pAccordionItem },
    template  : `
      <p-accordion-item />
    `,
  })

  const accordion = screen.queryByTestId('accordion-item')

  expect(accordion).toBeInTheDocument()
  expect(accordion).toHaveClass('accordion__item')
})

it('should be disable when accordion item has `disabled` props', async () => {
  const screen = render({
    components: { pAccordionItem },
    template  : `
      <p-accordion-item disabled />
    `,
  })

  const accordion = screen.queryByTestId('accordion-item')
  const activator = screen.queryByTestId('accordion-item-activator')

  expect(accordion).toBeInTheDocument()
  expect(accordion).toHaveClass('accordion__item--disabled')

  await fireEvent.click(activator)

  expect(accordion).toHaveClass('collapsed')
})

it('should be render title text if props `title` is provided', async () => {
  const screen = render({
    components: { pAccordionItem },
    template  : `
      <p-accordion-item title="Item Title 1" />
    `,
  })

  const accordion = screen.queryByTestId('accordion-item')
  const titleEl   = screen.queryByTestId('subheading')
  expect(accordion).toBeInTheDocument()
  expect(titleEl).toBeInTheDocument()
  expect(titleEl).toHaveClass('subheading')

  const title = screen.queryByText('Item Title 1')

  expect(title).toBeInTheDocument()
})

it('should toggle expand accordion content if activator clicked', async () => {
  const screen = render({
    components: { pAccordionItem },
    template  : `
      <p-accordion-item />
    `,
  })

  const accordion = screen.queryByTestId('accordion-item')
  const activator = screen.queryByTestId('accordion-item-activator')
  const content   = screen.queryByTestId('accordion-item-content')

  expect(accordion).toBeInTheDocument()
  expect(activator).toBeInTheDocument()
  expect(accordion).toHaveClass('collapsed')
  expect(content).toHaveAttribute('data-collapse', 'collapsed')

  await fireEvent.click(activator)
  expect(accordion).toHaveClass('expanded')
  expect(content).not.toHaveAttribute('data-collapse', 'collapsed')
})

it('should trigger event `expand` and `collapse` when toggle accordion item', async () => {
  const spyExpand   = vi.fn()
  const spyCollapse = vi.fn()

  const screen = render({
    components: { pAccordionItem },
    template  : `
      <p-accordion-item @expand="onExpand" @collapse="onCollapse" />
    `,
    setup () {
      return { onExpand: spyExpand, onCollapse: spyCollapse }
    },
  })

  const accordion = screen.queryByTestId('accordion-item')
  const activator = screen.queryByTestId('accordion-item-activator')
  expect(accordion).toBeInTheDocument()
  expect(activator).toBeInTheDocument()

  await fireEvent.click(activator)

  expect(spyExpand).toBeCalled()

  await fireEvent.click(activator)

  expect(spyCollapse).toBeCalled()
})

it('should hide caret icon if props `no-caret` is provided', () => {
  const screen = render({
    components: { pAccordionItem },
    template  : `
      <p-accordion-item no-caret />
    `,
  })

  const accordion = screen.queryByTestId('accordion-item')
  const caret     = screen.queryByTestId('accordion-item-caret')

  expect(accordion).toBeInTheDocument()
  expect(caret).not.toBeInTheDocument()
})
