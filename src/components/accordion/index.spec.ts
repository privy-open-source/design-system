import { defineAccordion, type AccordionItem } from '.'

describe('accordion', () => {
  it('should return data with strict equals value', () => {
    const items: AccordionItem[] = [
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
    ]

    const definedItems = defineAccordion(items)

    expect(definedItems).toStrictEqual(items)
  })
})
