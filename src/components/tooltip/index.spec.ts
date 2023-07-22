import { render, fireEvent } from '@testing-library/vue'
import { delay } from 'nanodelay'
import { ref } from 'vue-demi'
import {
  pTooltip,
  vPTooltip,
  hideTooltip,
  toggleTooltip,
  showTooltip,
} from '.'

beforeAll(async () => {
  /* pre-load module TooltipContainer */
  await import('./TooltipContainer.vue')
})

it('should able render the tooltip', async () => {
  const screen = render({
    directives: { PTooltip: pTooltip },
    template  : `
      <div
        data-testid="sample"
        v-p-tooltip="'Hello World'" />
    `,
  })

  await delay(0)

  const sample  = screen.queryByTestId('sample')
  const tooltip = screen.queryByTestId('tooltip')

  await fireEvent.mouseEnter(sample)
  await delay(0)

  expect(tooltip).toBeInTheDocument()
  expect(tooltip).toBeVisible()
  expect(tooltip).toHaveClass('tooltip')
  expect(tooltip).toHaveTextContent('Hello World')

  await fireEvent.mouseLeave(sample)
  await delay(0)

  expect(tooltip).not.toBeVisible()
})

it('should able to change color using color modifiers (.white)', async () => {
  const screen = render({
    directives: { PTooltip: pTooltip },
    template  : `
      <div
        data-testid="sample"
        v-p-tooltip.white="'Hello World'" />
    `,
  })

  await delay(0)

  const tooltip = screen.queryByTestId('tooltip')

  expect(tooltip).toBeInTheDocument()
  expect(tooltip).toHaveClass('tooltip--white')
  expect(tooltip).not.toHaveClass('tooltip--black')
})

it('should able to change tooltip placement using placement modifiers (.top, .left, .right, .bottom)', async () => {
  const screen = render({
    directives: { PTooltip: pTooltip },
    template  : `
      <div
        data-testid="sample"
        v-p-tooltip.bottom.end="'Hello World'" />
    `,
  })

  await delay(0)

  const tooltip = screen.queryByTestId('tooltip')

  expect(tooltip).toBeInTheDocument()
  expect(tooltip).toHaveAttribute('data-popper-placement', 'bottom-end')
})

it('should able to change tooltip trigger using trigger modifiers (.click, .focus, .hover)', async () => {
  const screen = render({
    directives: { PTooltip: pTooltip },
    template  : `
      <div
        data-testid="sample"
        v-p-tooltip.click="'Hello World'" />
    `,
  })

  await delay(0)

  const sample  = screen.queryByTestId('sample')
  const tooltip = screen.queryByTestId('tooltip')

  await fireEvent.mouseEnter(sample)
  await delay(0)

  expect(tooltip).toBeInTheDocument()
  expect(tooltip).not.toBeVisible()

  await fireEvent.click(sample)
  await delay(0)

  expect(tooltip).toBeVisible()

  await fireEvent.click(sample)
  await delay(0)

  expect(tooltip).not.toBeVisible()
})

it('should able to use text from attribute title', async () => {
  const screen = render({
    directives: { PTooltip: pTooltip },
    template  : `
      <div
        data-testid="sample"
        v-p-tooltip
        title="Hello World" />
    `,
  })

  await delay(0)

  const tooltip = screen.queryByTestId('tooltip')

  expect(tooltip).toHaveTextContent('Hello World')
  expect(tooltip).not.toHaveAttribute('title')
})

it('should reactive when title changed', async () => {
  const title  = ref('Hello World')
  const screen = render({
    directives: { PTooltip: pTooltip },
    template  : `
      <div
        data-testid="sample"
        v-p-tooltip
        :title="title" />
    `,
    setup () {
      return { title }
    },
  })

  await delay(0)

  const tooltip = screen.queryByTestId('tooltip')

  expect(tooltip).toHaveTextContent('Hello World')
  expect(tooltip).not.toHaveAttribute('title')

  title.value = 'Hello Reyhan'
  await delay(0)

  expect(tooltip).toHaveTextContent('Hello Reyhan')
})

it('should not shown the tooltip if text not provided', async () => {
  const screen = render({
    directives: { PTooltip: pTooltip },
    template  : `
      <div
        data-testid="sample"
        v-p-tooltip />
    `,
  })

  await delay(0)

  const sample  = screen.queryByTestId('sample')
  const tooltip = screen.queryByTestId('tooltip')

  await fireEvent.mouseEnter(sample)
  await delay(0)

  expect(tooltip).toBeInTheDocument()
  expect(tooltip).not.toBeVisible()
})

it('should not shown the tooltip if v-p-tooltip set to `false`', async () => {
  const active = ref(false)
  const screen = render({
    directives: { PTooltip: pTooltip },
    template  : `
      <div
        data-testid="sample"
        v-p-tooltip="active"
        title="Hello" />
    `,
    setup () {
      return { active }
    },
  })

  await delay(0)

  const sample  = screen.queryByTestId('sample')
  const tooltip = screen.queryByTestId('tooltip')

  await fireEvent.mouseEnter(sample)
  await delay(0)

  expect(tooltip).toBeInTheDocument()
  expect(tooltip).not.toBeVisible()

  active.value = true
  await delay(0)

  await fireEvent.mouseEnter(sample)
  await delay(0)

  expect(tooltip).toBeVisible()
})

it('should hide the tooltip if v-p-tooltip set to `false` when it\'s shown before', async () => {
  const active = ref(true)
  const screen = render({
    directives: { PTooltip: pTooltip },
    template  : `
      <div
        data-testid="sample"
        v-p-tooltip="active"
        title="Hello" />
    `,
    setup () {
      return { active }
    },
  })

  await delay(0)

  const sample  = screen.queryByTestId('sample')
  const tooltip = screen.queryByTestId('tooltip')

  await fireEvent.mouseEnter(sample)
  await delay(0)

  expect(tooltip).toBeInTheDocument()
  expect(tooltip).toBeVisible()

  active.value = false
  await delay(0)

  expect(tooltip).not.toBeVisible()
})

it('should able to manual show/hide tooltip using `showTooltip` and `hideTooltip`', async () => {
  const screen = render({
    directives: { PTooltip: pTooltip },
    template  : `
      <div
        id="sample"
        data-testid="sample"
        v-p-tooltip.manual
        title="Hello" />
    `,
  })

  await delay(0)

  const tooltip = screen.queryByTestId('tooltip')

  await showTooltip('#sample')

  expect(tooltip).toBeVisible()

  await hideTooltip('#sample')

  expect(tooltip).not.toBeVisible()
})

it('should able to manual show/hide tooltip using `toggleTooltip`', async () => {
  const screen = render({
    directives: { PTooltip: pTooltip },
    template  : `
      <div
        data-testid="sample"
        v-p-tooltip.manual
        title="Hello" />
    `,
  })

  await delay(0)

  const sample  = screen.queryByTestId('sample')
  const tooltip = screen.queryByTestId('tooltip')

  await toggleTooltip(sample)

  expect(tooltip).toBeVisible()

  await toggleTooltip(sample)

  expect(tooltip).not.toBeVisible()
})

it('should export alias vPTooltip', () => {
  expect(pTooltip).toBe(vPTooltip)
})
