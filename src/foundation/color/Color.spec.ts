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
        <template #subtitle>Title</template>
        <template #code>#FFFFFF</template>
      </Color>
    `,
  })

  const color = screen.queryByTestId('color')
  const title = screen.queryByText('Title')
  const code  = screen.queryByText('#FFFFFF')

  expect(color).toBeInTheDocument()
  expect(color).toHaveClass('color')
  expect(title).toBeInTheDocument()
  expect(code).toBeInTheDocument()
})

it('should show overlay background if color object has overlay data', () => {
  const screen = render({
    components: { Color },
    template  : `
      <Color :color="{ overlay: '#663399' }" />
    `,
  })

  const overlay = screen.queryByTestId('color-overlay')

  expect(overlay).toBeInTheDocument()
  expect(overlay).toHaveStyle({ background: '#663399' })
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
