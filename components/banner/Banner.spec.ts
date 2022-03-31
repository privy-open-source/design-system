import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { fireEvent, render } from "@testing-library/vue"
import Banner from './Banner.vue'


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
    methods: {
      onDismissed: spy
    }
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
