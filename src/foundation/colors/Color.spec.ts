import { vi } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import type * as VueUse from '@vueuse/core'
import { useClipboard, copy } from './__mocks__/use-clipboard'
import Colors from './Colors.vue'
import Color from './Color.vue'

vi.mock('@vueuse/core', async () => {
  const vueuse = await vi.importActual('@vueuse/core')

  return {
    ...vueuse as typeof VueUse,
    useClipboard,
  }
})
it('should render Colors', () => {
  const screen = render({
    components: { Colors },
    template  : `
      <Colors>
        Black
      </Colors>
    `,
  })

  const colors = screen.queryByTestId('colors')
  const title  = screen.queryByText('Black')

  expect(colors).toBeInTheDocument()
  expect(colors).toHaveClass('colors')
  expect(title).toBeInTheDocument()
})

it('should render color', () => {
  const screen = render({
    components: { Color },
    template  : `
      <Color>
        <template #token>blue.50</template>
        <template #figma>main/blue/50</template>
        <template #hex>#0065D1</template>
      </Color>
    `,
  })

  const color = screen.queryByTestId('color')
  const token = screen.queryByText('blue.50')
  const figma = screen.queryByText('main/blue/50')
  const hex   = screen.queryByText('#0065D1')

  expect(color).toBeInTheDocument()
  expect(color).toHaveClass('color')
  expect(token).toBeInTheDocument()
  expect(figma).toBeInTheDocument()
  expect(hex).toBeInTheDocument()
})

it('should copy color code when color clicked', async () => {
  const screen = render({
    components: { Color },
    template  : `
      <Color :color="{ overlay: '#663399' }" />
    `,
  })

  const area = screen.queryByTestId('color-copy')

  await fireEvent.click(area)

  expect(copy).toBeCalled()
})
