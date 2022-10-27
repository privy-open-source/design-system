import { render } from '@testing-library/vue'
import {
  markdown,
  pMd,
  vPMd,
} from '.'

describe('markdown', () => {
  it('should able render markdown', () => {
    const result = markdown('**Hello** _world_')

    expect(result).toBe('<p><strong>Hello</strong> <em>world</em></p>\n')
  })

  it('should sanitize result by default', () => {
    const result = markdown("123<a href='javascript:alert(1)'>I am a dolphin!</a>")

    expect(result).toBe('<p>123<a>I am a dolphin!</a></p>\n')
  })

  it('should render inline when options.inline set to true', () => {
    const result = markdown('**Hello** _world_', { inline: true })

    expect(result).toBe('<strong>Hello</strong> <em>world</em>')
  })

  it('should not sanitize when options.unsecure set to true', () => {
    const result = markdown("123<a href='javascript:alert(1)'>I am a dolphin!</a>", { unsecure: true })

    expect(result).toBe("<p>123<a href='javascript:alert(1)'>I am a dolphin!</a></p>\n")
  })

  it('should not thrown an error if text is undefined', () => {
    expect(() => {
      markdown()
    }).not.toThrow()
  })
})

describe('v-p-md', () => {
  it('should able render markdown', () => {
    const screen = render({
      directives: { pMd },
      template  : `
        <div
          data-testid="sample"
          v-p-md="'**Hello** _world_'"
        />
      `,
    })

    const sample = screen.getByTestId('sample')

    expect(sample.innerHTML).toBe('<p><strong>Hello</strong> <em>world</em></p>\n')
  })

  it('should sanitize result by default', () => {
    const screen = render({
      directives: { pMd },
      template  : `
        <div
          data-testid="sample"
          v-p-md="'123<a href=\\'javascript:alert(1)\\'>I am a dolphin!</a>'"
        />
      `,
    })

    const sample = screen.getByTestId('sample')

    expect(sample.innerHTML).toBe('<p>123<a>I am a dolphin!</a></p>\n')
  })

  it('should render inline when add modifiers `inline`', () => {
    const screen = render({
      directives: { pMd },
      template  : `
        <div
          data-testid="sample"
          v-p-md.inline="'**Hello** _world_'"
        />
      `,
    })

    const sample = screen.getByTestId('sample')

    expect(sample.innerHTML).toBe('<strong>Hello</strong> <em>world</em>')
  })

  it('should not sanitize when add modifiers `unsecure`', () => {
    const screen = render({
      directives: { pMd },
      template  : `
        <div
          data-testid="sample"
          v-p-md.unsecure="'123<a href=\\'javascript:alert(1)\\'>I am a dolphin!</a>'"
        />
      `,
    })

    const sample = screen.getByTestId('sample')

    expect(sample.innerHTML).toBe('<p>123<a href="javascript:alert(1)">I am a dolphin!</a></p>\n')
  })

  it('should export alias vPMd', () => {
    expect(pMd).toBe(vPMd)
  })
})
