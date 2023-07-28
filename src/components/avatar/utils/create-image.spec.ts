import {
  createAlias,
  createSpinner,
  createText,
  dummyAvatar,
  getAlias,
} from './create-image'
import DEFAULT_IMAGE from '../assets/avatar.png'

describe('createText', () => {
  it('should be able to generate image text', () => {
    const image = createText('BL', 50, '#000000', '#FFFFFF')

    expect(image).toContain('data:image/svg+xml')
    expect(image).toContain('BL')
    expect(image).toContain('width="50"')
    expect(image).toContain('height="50"')
    expect(image).toContain('rect fill="%23000000"')
    expect(image).toContain('text fill="%23FFFFFF"')
  })
})

describe('createSpinner', () => {
  it('should be able to generate spinner', () => {
    const image = createSpinner(50, 100)

    expect(image).toContain('data:image/svg+xml')
    expect(image).toContain('class="spinner')
    expect(image).toContain('width="50"')
    expect(image).toContain('height="100"')
  })

  it('should have height equal to width if height not to be set', () => {
    const image = createSpinner(50)

    expect(image).toContain('width="50"')
    expect(image).toContain('height="50"')
  })
})

describe('getAlias', () => {
  it('should return first char of name if name only contains one word', () => {
    const alias = getAlias('tarjono')

    expect(alias).toBe('T')
  })

  it('should return first char of each word if name contains two word', () => {
    const alias = getAlias('tarjono smith')

    expect(alias).toBe('TS')
  })

  it('should return only 2 char if name more then two word', () => {
    const alias = getAlias('tarjono smith wicaksono')

    expect(alias).toBe('TS')
  })
})

describe('createAlias', () => {
  it('should be able generate image alias', () => {
    const name  = 'tarjono smith'
    const alias = getAlias(name)
    const image = createAlias(name, 75)

    expect(image).toContain('data:image/svg+xml')
    expect(image).toContain(alias)
    expect(image).toContain('width="75"')
    expect(image).toContain('height="75"')
  })

  it('should generate "･ᴗ･" if name not provided', () => {
    const image = createAlias()

    expect(image).toContain('data:image/svg+xml')
    expect(image).toContain(encodeURIComponent('･ᴗ･'))
  })
})

describe('dummyImage', () => {
  it('should return dummy image', () => {
    const image = dummyAvatar()

    expect(image).toBe(DEFAULT_IMAGE)
  })
})
