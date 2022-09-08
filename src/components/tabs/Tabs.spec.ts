import { fireEvent, render } from '@testing-library/vue'
import pTabs from './Tabs.vue'
import pTab from './Tab.vue'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { pTabs },
    template  : `
      <p-tabs>
      </p-tabs>
    `,
  })

  const tabs = screen.queryByTestId('tabs')

  expect(tabs).toBeInTheDocument()
  expect(tabs).toHaveClass('tabs')
})

it('should have style `fill` by setting the `fill` prop', () => {
  const screen = render({
    components: { pTabs },
    template  : `
      <p-tabs fill>
      </p-tabs>
    `,
  })

  const tabs = screen.queryByTestId('tabs-nav')

  expect(tabs).toBeInTheDocument()
  expect(tabs).toHaveClass('nav', 'nav--fill')
})

it('should have style `justified` by setting the `justified` prop', () => {
  const screen = render({
    components: { pTabs },
    template  : `
      <p-tabs justified>
      </p-tabs>
    `,
  })

  const tabs = screen.queryByTestId('tabs-nav')

  expect(tabs).toBeInTheDocument()
  expect(tabs).toHaveClass('nav', 'nav--justified')
})

it('should have style `vertical` by setting the `vertical` prop', () => {
  const screen = render({
    components: { pTabs },
    template  : `
      <p-tabs vertical>
      </p-tabs>
    `,
  })

  const tabs = screen.queryByTestId('tabs')
  const nav  = screen.queryByTestId('tabs-nav')

  expect(tabs).toBeInTheDocument()
  expect(tabs).toHaveClass('tabs', 'tabs--vertical-align-left')
  expect(nav).toBeInTheDocument()
  expect(nav).toHaveClass('nav', 'nav--vertical', 'nav--align-left')
})

it('should have style `pills` if variant props set to `pills`', () => {
  const screen = render({
    components: { pTabs },
    template  : `
      <p-tabs variant="pills">
      </p-tabs>
    `,
  })

  const tabs = screen.queryByTestId('tabs-nav')

  expect(tabs).toBeInTheDocument()
  expect(tabs).toHaveClass('nav--pills')
  expect(tabs).not.toHaveClass('nav--tabs')
})

it('should be able to change alignment via props `align`', () => {
  const screen = render({
    components: { pTabs },
    template  : `
      <p-tabs align="center">
      </p-tabs>
    `,
  })

  const tabs = screen.queryByTestId('tabs-nav')

  expect(tabs).toBeInTheDocument()
  expect(tabs).toHaveClass('nav', 'nav--tabs', 'nav--align-center')
})

it('should be able to change vertical tabs alignment via props `align`', () => {
  const screen = render({
    components: { pTabs },
    template  : `
      <p-tabs align="right" vertical>
      </p-tabs>
    `,
  })

  const tabs = screen.queryByTestId('tabs')

  expect(tabs).toBeInTheDocument()
  expect(tabs).toHaveClass('tabs', 'tabs--vertical-align-right')
})

it('should be able to add nav wrapper class title via props `nav-wrapper-class`', () => {
  const screen = render({
    components: { pTabs },
    template  : `
      <p-tabs nav-wrapper-class="w-64">
      </p-tabs>
    `,
  })

  const tabsNav = screen.queryByTestId('tabs-nav-wrapper')

  expect(tabsNav).toBeInTheDocument()
  expect(tabsNav).toHaveClass('tabs__nav', 'w-64')
})

it('should active when tab (except disable) is clicked', async () => {
  const screen = render({
    components: { pTabs, pTab },
    template  : `
    <p-tabs>
      <p-tab title="Home">Home page content</p-tab>
      <p-tab title="Profile">Profile page content</p-tab>
      <p-tab title="Setting" disabled>Setting page content</p-tab>
    </p-tabs>
    `,
  })

  const tabs = screen.queryByTestId('tabs')

  let tab = screen.queryAllByTestId('tab')

  expect(tabs).toBeInTheDocument()
  expect(tab.at(0)).toHaveClass('nav__item', 'nav__item--active')

  await fireEvent.click(tab.at(1))

  tab = screen.queryAllByTestId('tab')

  expect(tab.at(1)).toHaveClass('nav__item--active')
  expect(tab.at(0)).not.toHaveClass('nav__item--active')
})

it('should work properly with v-for', async () => {
  const screen = render({
    components: { pTabs, pTab },
    template  : `
      <p-tabs>
        <template v-for="i in 3">
          <p-tab :title="i.toString()">Home page content {{ i }}</p-tab>
        </template>
      </p-tabs>
    `,
  })

  const tabs = screen.queryByTestId('tabs')

  let tab = screen.queryAllByTestId('tab')

  expect(tabs).toBeInTheDocument()
  expect(tab).toHaveLength(3)
  expect(tab.at(0)).toHaveClass('nav__item', 'nav__item--active')

  await fireEvent.click(tab.at(1))

  tab = screen.queryAllByTestId('tab')

  expect(tab.at(1)).toHaveClass('nav__item--active')
  expect(tab.at(0)).not.toHaveClass('nav__item--active')
})
