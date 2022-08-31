import { render } from '@testing-library/vue'
import Tabs from './Tabs.vue'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { Tabs },
    template  : `
      <Tabs>
      </Tabs>
    `,
  })

  const tabs = screen.queryByTestId('tabs')

  expect(tabs).toBeInTheDocument()
  expect(tabs).toHaveClass('tabs')
})

it('should have style `fill` by setting the `fill` prop', () => {
  const screen = render({
    components: { Tabs },
    template  : `
      <Tabs fill>
      </Tabs>
    `,
  })

  const tabs = screen.queryByTestId('tabs-nav')

  expect(tabs).toBeInTheDocument()
  expect(tabs).toHaveClass('nav', 'nav--fill')
})

it('should have style `justified` by setting the `justified` prop', () => {
  const screen = render({
    components: { Tabs },
    template  : `
      <Tabs justified>
      </Tabs>
    `,
  })

  const tabs = screen.queryByTestId('tabs-nav')

  expect(tabs).toBeInTheDocument()
  expect(tabs).toHaveClass('nav', 'nav--justified')
})

it('should have style `vertical` by setting the `vertical` prop', () => {
  const screen = render({
    components: { Tabs },
    template  : `
      <Tabs vertical>
      </Tabs>
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
    components: { Tabs },
    template  : `
      <Tabs variant="pills">
      </Tabs>
    `,
  })

  const tabs = screen.queryByTestId('tabs-nav')

  expect(tabs).toBeInTheDocument()
  expect(tabs).toHaveClass('nav--pills')
  expect(tabs).not.toHaveClass('nav--tabs')
})

it('should be able to change alignment via props `align`', () => {
  const screen = render({
    components: { Tabs },
    template  : `
      <Tabs align="center">
      </Tabs>
    `,
  })

  const tabs = screen.queryByTestId('tabs-nav')

  expect(tabs).toBeInTheDocument()
  expect(tabs).toHaveClass('nav', 'nav--tabs', 'nav--align-center')
})

it('should be able to change vertical tabs alignment via props `align`', () => {
  const screen = render({
    components: { Tabs },
    template  : `
      <Tabs align="right" vertical>
      </Tabs>
    `,
  })

  const tabs = screen.queryByTestId('tabs')

  expect(tabs).toBeInTheDocument()
  expect(tabs).toHaveClass('tabs', 'tabs--vertical-align-right')
})

it('should be able to add nav wrapper class title via props `nav-wrapper-class`', () => {
  const screen = render({
    components: { Tabs },
    template  : `
      <Tabs nav-wrapper-class="w-64">
      </Tabs>
    `,
  })

  const tabsNav = screen.queryByTestId('tabs-nav-wrapper')

  expect(tabsNav).toBeInTheDocument()
  expect(tabsNav).toHaveClass('tabs__nav', 'w-64')
})
