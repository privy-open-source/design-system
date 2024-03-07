import { render } from '@testing-library/vue'
import Avatar from './Avatar.vue'
import AvatarGroup from './AvatarGroup.vue'
import { expect } from 'vitest'

it('should render properly', () => {
  const screen = render({
    components: { AvatarGroup },
    template  : `
      <AvatarGroup />
    `,
  })

  const avatar = screen.queryByTestId('avatar-group')

  expect(avatar).toBeInTheDocument()
  expect(avatar).toHaveClass('avatar-group')
})

it('should render properly', () => {
  const screen = render({
    components: { AvatarGroup, Avatar },
    template  : `
      <AvatarGroup>
        <Avatar />
      </AvatarGroup>
    `,
  })

  const avatarGroup = screen.queryByTestId('avatar-group')
  const avatar      = screen.queryByTestId('avatar')

  expect(avatarGroup).toBeInTheDocument()
  expect(avatar).toBeInTheDocument()
  expect(avatar).toHaveClass('avatar--xs')
})

it('should render all items if less or equal the `length`', () => {
  const screen = render({
    components: { AvatarGroup, Avatar },
    template  : `
      <AvatarGroup>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGroup>
    `,
  })

  const avatarGroup = screen.queryByTestId('avatar-group')
  const avatars     = screen.queryAllByTestId('avatar')

  expect(avatarGroup).toBeInTheDocument()
  expect(avatars).toHaveLength(4)
})

it('should truncate the items if more than `length`', () => {
  const screen = render({
    components: { AvatarGroup, Avatar },
    template  : `
      <AvatarGroup length="3">
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGroup>
    `,
  })

  const avatarGroup = screen.queryByTestId('avatar-group')
  const avatars     = screen.queryAllByTestId('avatar')

  expect(avatarGroup).toBeInTheDocument()
  expect(avatars).toHaveLength(3)
})
