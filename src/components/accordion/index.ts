export interface AccordionItem {
  title: string,
  content: string,
  disabled?: boolean,
  noCaret?: boolean,
}

export function defineAccordion (items: AccordionItem[]): AccordionItem[] {
  return items
}
