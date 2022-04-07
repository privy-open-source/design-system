import { fireEvent, render } from '@testing-library/vue'
import Avatar from './Avatar.vue'
import IconUser from '@carbon/icons-vue/lib/events/20'
import MockImage from './__mocks__/image'
import IMG from './avatar.png'
import { vi } from 'vitest'

vi.stubGlobal('Image', MockImage)

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

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
      <Avatar :src="image" />
    `,
    data: () => {
      return {
        image: IMG
      }
    }
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
    data: () => ({
      url: '/imageA.jpg',
    }),
    methods: {
      changeUrl () {
        this.url = '/imageB.jpg'
      }
    }
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
    components: { Avatar, IconUser },
    template  : `
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
