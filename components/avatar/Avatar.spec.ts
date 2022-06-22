import { fireEvent, render } from '@testing-library/vue'
import Avatar from './Avatar.vue'
import IconUser from '@carbon/icons-vue/lib/events/20'
import MockImage from './__mocks__/image'
import { vi } from 'vitest'
import { delay } from 'nanodelay'

vi.stubGlobal('Image', MockImage)

it('should render properly', () => {
  const screen = render({
    components: { Avatar },
    template  : `
      <Avatar />
    `,
  })

  const avatar = screen.queryByTestId('avatar')
  const image  = screen.queryByTestId('avatar-image')

  expect(avatar).toBeInTheDocument()
  expect(avatar).toHaveClass('avatar', 'avatar--md')
  expect(image).toBeInTheDocument()
})

it('should have type "alias" if variant set to alias', () => {
  const screen = render({
    components: { Avatar },
    template  : `
      <Avatar variant="alias" name="Tarjono" />
    `,
  })

  const image = screen.queryByTestId('avatar-image')

  expect(image).toHaveAttribute('data-type', 'alias')
})

it('should have type "alias" if no src but name was provided', () => {
  const screen = render({
    components: { Avatar },
    template  : `
      <Avatar name="Tarjono" />
    `,
  })

  const image = screen.queryByTestId('avatar-image')

  expect(image).toHaveAttribute('data-type', 'alias')
})

it('should have type "image" if src is present', async () => {
  const screen = render({
    components: { Avatar },
    template  : `
      <Avatar src="/imageA.jpg" />
    `,
  })

  const image = screen.queryByTestId('avatar-image')

  expect(image).toHaveAttribute('data-type', 'image')
})

it('should use fallback url if src invalid', async () => {
  const screen = render({
    components: { Avatar },
    template  : `
      <Avatar
        src="/broken-link.jpg"
        fallback-src="/fallback.jpg" />
    `,
  })

  const image = screen.queryByTestId('avatar-image')

  await delay(1)

  expect(image).toHaveAttribute('src', '/fallback.jpg')
})

it('should re-init if src changed', async () => {
  const screen = render({
    components: { Avatar },
    template  : `
      <Avatar
        :src="url" />
      <button @click="changeUrl">Change URL</button>
    `,
    data   : () => ({ url: '/imageA.jpg' }),
    methods: {
      changeUrl () {
        this.url = '/imageB.jpg'
      },
    },
  })

  const image  = screen.queryByTestId('avatar-image')
  const button = screen.queryByText('Change URL')

  await delay(1)

  expect(image).toHaveAttribute('src', '/imageA.jpg')

  await fireEvent.click(button)
  await delay(1)

  expect(image).toHaveAttribute('src', '/imageB.jpg')
})

it('should have style "lg" if size prop set to "lg"', () => {
  const screen = render({
    components: { Avatar },
    template  : `
      <Avatar size="lg" />
    `,
  })

  const avatar = screen.queryByTestId('avatar')

  expect(avatar).toBeInTheDocument()
  expect(avatar).toHaveClass('avatar--lg')
  expect(avatar).not.toHaveClass('avatar--md')
})

it('should replace image if slot is used', () => {
  const screen = render({
    components: {
      Avatar,
      IconUser,
    },
    template: `
      <Avatar>
        <IconUser data-testid="icon" />
      </Avatar>
    `,
  })

  const avatar = screen.queryByTestId('avatar')
  const image  = screen.queryByTestId('avatar-image')
  const icon   = screen.queryByTestId('icon')

  expect(avatar).toBeInTheDocument()
  expect(icon).toBeInTheDocument()
  expect(image).not.toBeInTheDocument()
})

it('should emit event "imgloaded" when image sucess to load', async () => {
  const spy    = vi.fn()
  const screen = render({
    components: {
      Avatar,
      IconUser,
    },
    template: `
      <Avatar src="/imageA.jpg" @imgloaded="onLoaded" />
    `,
    methods: { onLoaded: spy },
  })

  const image = screen.queryByTestId('avatar-image')

  await delay(1)

  expect(image).toBeInTheDocument()
  expect(spy).toBeCalled()
  expect(spy).toBeCalledWith('/imageA.jpg')
})

it('should emit event "imgerror" when image fail to load', async () => {
  const spy    = vi.fn()
  const screen = render({
    components: {
      Avatar,
      IconUser,
    },
    template: `
      <Avatar src="/broken-link.jpg" @imgerror="onFailed" />
    `,
    methods: { onFailed: spy },
  })

  const image = screen.queryByTestId('avatar-image')

  await delay(1)

  expect(image).toBeInTheDocument()
  expect(spy).toBeCalled()
  expect(spy).toHaveBeenCalledWith(
    expect.objectContaining({ message: 'ERR_FAILED_LOAD_IMAGE' }),
  )
})

it('should have addiotional class if prop imgClass if provided', () => {
  const screen = render({
    components: { Avatar },
    template  : `
      <Avatar img-class="custom-class" />
    `,
  })

  const avatar = screen.queryByTestId('avatar')
  const image  = screen.queryByTestId('avatar-image')

  expect(avatar).toBeInTheDocument()
  expect(image).toHaveClass('custom-class')
  expect(avatar).not.toHaveClass('custom-class')
})
