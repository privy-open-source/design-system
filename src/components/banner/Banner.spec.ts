import { vi } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import Banner from './Banner.vue'
import IconCheck from '@carbon/icons-vue/lib/checkmark--filled/20'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { Banner },
    template  : `
      <Banner>
        Hello
      </Banner>
    `,
  })

  const banner = screen.queryByTestId('banner')
  const text   = screen.queryByText('Hello')

  expect(banner).toBeInTheDocument()
  expect(banner).toHaveClass('banner', 'banner--info')
  expect(text).toBeInTheDocument()
})

it('should have "danger" style if variant set to "danger"', () => {
  const screen = render({
    components: { Banner },
    template  : `
      <Banner variant="danger">
        Hello
      </Banner>
    `,
  })

  const banner = screen.queryByTestId('banner')

  expect(banner).toBeInTheDocument()
  expect(banner).toHaveClass('banner', 'banner--danger')
  expect(banner).not.toHaveClass('banner--info')
})

it('should dismissed when close button clicked', async () => {
  const screen = render({
    components: { Banner },
    template  : `
      <Banner>
        Hello
      </Banner>
    `,
  })

  const banner = screen.queryByTestId('banner')
  const text   = screen.queryByText('Hello')
  const close  = screen.queryByTestId('banner-close')

  expect(banner).toBeInTheDocument()
  expect(text).toBeInTheDocument()

  await fireEvent.click(close)

  expect(banner).not.toBeInTheDocument()
  expect(text).not.toBeInTheDocument()
})

it('should emit event "dismissed" if close button clicked', async () => {
  const spy    = vi.fn()
  const screen = render({
    components: { Banner },
    template  : `
      <Banner @dismissed="onDismissed">
        Hello
      </Banner>
    `,
    methods: { onDismissed: spy },
  })

  const banner = screen.queryByTestId('banner')
  const text   = screen.queryByText('Hello')
  const close  = screen.queryByTestId('banner-close')

  expect(banner).toBeInTheDocument()
  expect(text).toBeInTheDocument()

  await fireEvent.click(close)

  expect(spy).toBeCalled()
})

it('should have no close button if props "dismissable" set to false', () => {
  const screen = render({
    components: { Banner },
    template  : `
      <Banner :dismissable="false">
        Hello
      </Banner>
    `,
  })

  const close = screen.queryByTestId('banner-close')

  expect(close).not.toBeInTheDocument()
})

it('sould be able to dimissed via slot-scope "close" function', async () => {
  const screen = render({
    components: { Banner },
    template  : `
      <Banner :dismissable="false">
        <template #default="{ close }">
          Hello

          <span @click="close()">
            Click Me
          </span>
        </template>
      </Banner>
    `,
  })

  const banner  = screen.queryByTestId('banner')
  const text    = screen.queryByText('Hello')
  const close   = screen.queryByTestId('banner-close')
  const clickMe = screen.queryByText('Click Me')

  expect(banner).toBeInTheDocument()
  expect(text).toBeInTheDocument()
  expect(close).not.toBeInTheDocument()

  await fireEvent.click(clickMe)

  expect(banner).not.toBeInTheDocument()
  expect(text).not.toBeInTheDocument()
})

it('should be able to add custom icon via slot `icon`', () => {
  const screen = render({
    components: { Banner, IconCheck },
    template  : `
    <Banner>
      <template #icon>
        <IconCheck class="text-success" />
      </template>
    </Banner>
    `,
  })

  const banner = screen.queryByTestId('banner')
  const icon   = screen.queryByTestId('banner-icon')

  expect(banner).toBeInTheDocument()
  expect(icon).toBeInTheDocument()
  expect(icon).toHaveClass('banner__icon--custom')
})
