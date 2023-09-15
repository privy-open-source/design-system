import { render, fireEvent } from '@testing-library/vue'
import { ref } from 'vue-demi'
import pAccordion from './Accordion.vue'
import pAccordionItem from './AccordionItem.vue'
import { defineAccordion } from '.'

it('should render properly without any props', () => {
  const screen = render({
    components: { pAccordion },
    template  : `
      <p-accordion />
    `,
  })

  const accordion = screen.queryByTestId('accordion')

  expect(accordion).toBeInTheDocument()
})

it('should be able to make accordion without borderdered-container via `flush` props', () => {
  const screen = render({
    components: { pAccordion },
    template  : '<p-accordion flush />',
  })

  const accordion = screen.getByTestId('accordion')

  expect(accordion).toBeInTheDocument()
  expect(accordion).toHaveClass('accordion', 'accordion--flush')
})

it('should be able to make accordion space on each item via `pill` props', () => {
  const screen = render({
    components: { pAccordion },
    template  : '<p-accordion pill />',
  })

  const accordion = screen.getByTestId('accordion')

  expect(accordion).toBeInTheDocument()
  expect(accordion).toHaveClass('accordion', 'accordion--pills')
})

it('should hide caret icon if props `no-caret` is provided', () => {
  const screen = render({
    components: { pAccordion, pAccordionItem },
    template  : `
      <p-accordion no-caret>
        <p-accordion-item title="Item 1">
          Content Item 1
        </p-accordion-item>
        <p-accordion-item title="Item 2">
          Content Item 2
        </p-accordion-item>
      </p-accordion>
    `,
  })

  const accordion = screen.getByTestId('accordion')
  expect(accordion).toBeInTheDocument()

  const items = screen.queryAllByTestId('accordion-item')
  for (const item of items) {
    const caret = item.querySelector('.accordion__item__caret')

    expect(caret).not.toBeInTheDocument()
  }
})

it('should collapse other items if expanding one', async () => {
  const model = ref('')

  const screen = render({
    components: { pAccordion, pAccordionItem },
    template  : `
      <p-accordion v-model="model">
        <p-accordion-item title="Item 1">
          Content Item 1
        </p-accordion-item>
        <p-accordion-item title="Item 2">
          Content Item 2
        </p-accordion-item>
      </p-accordion>
    `,
    setup () {
      return { model }
    },
  })

  const accordion  = screen.getByTestId('accordion')
  const items      = screen.queryAllByTestId('accordion-item')
  const activators = screen.queryAllByTestId('accordion-item-activator')

  const id0 = items.at(0).dataset.accordionItemId
  const id1 = items.at(1).dataset.accordionItemId

  expect(accordion).toBeInTheDocument()

  await fireEvent.click(activators.at(0))

  expect(model.value).toBe(id0)
  expect(items.at(0)).toHaveClass('expanded')
  expect(items.at(1)).toHaveClass('collapsed')

  await fireEvent.click(activators.at(1))

  expect(model.value).toBe(id1)
  expect(items.at(0)).toHaveClass('collapsed')
  expect(items.at(1)).toHaveClass('expanded')
})

it('should be support expand multiple accordion items if props `multiple` is provided', async () => {
  const screen = render({
    components: { pAccordion, pAccordionItem },
    template  : `
      <p-accordion multiple>
        <p-accordion-item title="Item 1">
          Content Item 1
        </p-accordion-item>
        <p-accordion-item title="Item 2">
          Content Item 2
        </p-accordion-item>
      </p-accordion>
    `,
  })

  const accordion = screen.getByTestId('accordion')
  expect(accordion).toBeInTheDocument()

  const items      = screen.queryAllByTestId('accordion-item')
  const activators = screen.queryAllByTestId('accordion-item-activator')

  await fireEvent.click(activators.at(0))
  await fireEvent.click(activators.at(1))

  expect(items.at(0)).toHaveClass('expanded')
  expect(items.at(1)).toHaveClass('expanded')
})

it('should be render accordion items with same length if props `items` is provided', async () => {
  const items = defineAccordion([
    {
      title  : 'Item Title 1',
      content: 'Content Item 1',
    },
    {
      title  : 'Item Title 2',
      content: 'Content Item 2',
    },
    {
      title   : 'Item Title 3',
      content : 'Content Item 3',
      disabled: true,
    },
    {
      title  : 'Item Title 4',
      content: 'Content Item 4',
    },
  ])

  const screen = render({
    components: { pAccordion },
    template  : `
      <p-accordion :items="items" />
    `,
    setup () {
      return { items }
    },
  })

  const accordion = screen.getByTestId('accordion')
  const accItems  = screen.queryAllByTestId('accordion-item')

  expect(accordion).toBeInTheDocument()
  expect(accItems.length).toBe(items.length)
})

it('should be unset v-model value if no expanded accordion items', async () => {
  const model = ref('')

  const screen = render({
    components: { pAccordion, pAccordionItem },
    template  : `
      <p-accordion v-model="model">
        <p-accordion-item title="Item 1">
          Content Item 1
        </p-accordion-item>
      </p-accordion>
    `,
    setup () {
      return { model }
    },
  })

  const accordion  = screen.getByTestId('accordion')
  const items      = screen.queryAllByTestId('accordion-item')
  const activators = screen.queryAllByTestId('accordion-item-activator')

  const id0 = items.at(0).dataset.accordionItemId

  expect(accordion).toBeInTheDocument()

  await fireEvent.click(activators.at(0))

  expect(model.value).toBe(id0)

  await fireEvent.click(activators.at(0))

  expect(model.value).not.toBe(id0)
})
