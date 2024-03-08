import { render, fireEvent } from '@testing-library/vue'
import { vi } from 'vitest'
import pAccordionItem from './AccordionItem.vue'
import iconPrivy from '@privyid/persona-icon/vue/privy-alt/24.vue'
import { markRaw } from 'vue-demi'

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

it('Should be able to add custom title class from `titleClass` props', () => {
  const screen = render({
    components: { pAccordionItem },
    template  : `
      <p-accordion-item 
        title="custom title class" 
        titleClass="custom-title-class">
        content
      </p-accordion-item>
    `,
  })

  const title = screen.queryByTestId('accordion-item-title')

  expect(title).toBeInTheDocument()
  expect(title).toHaveClass('custom-title-class')
})

it('Should be able to add custom content class from `contentClass` props', () => {
  const screen = render({
    components: { pAccordionItem },
    template  : `
      <p-accordion-item 
        title="custom content class"
        contentClass="custom-content-class">
        content
      </p-accordion-item>
    `,
  })

  const title = screen.queryByTestId('accordion-item-content')

  expect(title).toBeInTheDocument()
  expect(title).toHaveClass('custom-content-class')
})

it('should be able to add accordion title via slot `title`', () => {
  const screen = render({
    components: { pAccordionItem },
    template  : `
      <p-accordion-item>
        <template #title>
          Accordion Title
        </template>
        Accordion Text
      </p-accordion-item>
    `,
  })

  const title = screen.queryByTestId('accordion-item-title')
  const text  = screen.queryByText('Accordion Title')

  expect(title).toBeInTheDocument()
  expect(title).toHaveClass('accordion__item__title')
  expect(text).toBeInTheDocument()
})

it('Should be able to custom icon via `icon` props', () => {
  const screen = render({
    components: { pAccordionItem },
    template  : `
      <p-accordion-item 
        title="custom icon class"
        icon="http://lorem-picsum.com">
        content
      </p-accordion-item>
    `,
  })

  const icon    = screen.queryByTestId('accordion-item-icon')
  const iconImg = screen.queryByTestId('accordion-item-icon-image')

  expect(icon).toBeInTheDocument()
  expect(icon).toHaveClass('accordion__item__icon')

  expect(iconImg).toBeInTheDocument()
  expect(iconImg).toBeInstanceOf(HTMLImageElement)
  expect(iconImg).toHaveAttribute('src', 'http://lorem-picsum.com')
})

it('should be able to custom icon with Component and add custom icon class via `icon` & `iconClass` props', () => {
  const screen = render({
    components: {
      pAccordionItem,
      iconPrivy,
    },
    template: `
      <p-accordion-item 
        title="custom icon"
        :icon="icon"
        iconClass="custom-icon-class">
        content
      </p-accordion-item>
    `,
    setup () {
      return { icon: markRaw(iconPrivy) }
    },
  })

  const icon = screen.queryByTestId('accordion-item-icon')

  expect(icon).toBeInTheDocument()
  expect(icon).toHaveClass('custom-icon-class')
})
