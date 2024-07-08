import { describe } from 'vitest'
import {
  setLang,
  useStore,
  useLang,
  createStore,
  initStore,
  setStore,
  getCDN,
  setCDN,
  destroyStore,
  setPSPDFLicenseKey,
  getPSPDFLicenseKey,
} from './store'

beforeEach(() => {
  initStore()
})

describe('setLang', () => {
  it('should able to set global lang', () => {
    const lang    = useLang()
    const context = useStore()

    setLang('id')

    expect(context.value.lang).toBe('id')
    expect(lang.value).toBe('id')
  })
})

describe('createStore', () => {
  it('should create new store instance', () => {
    const a = useStore()
    const b = createStore()

    expect(a).not.toBe(b)
  })
})

describe('useStore', () => {
  it('should create new store instance', () => {
    const a = useStore()
    const b = createStore()

    expect(a).not.toBe(b)
  })
})

describe('setStore', () => {
  it('should able to set store instance to global', () => {
    const a = useStore()
    const b = createStore()

    expect(a).not.toBe(b)

    setStore(b)

    const c = useStore()

    expect(c).toBe(b)
  })
})

describe('setCDN', () => {
  it('should able to set global cdnURL', () => {
    const context = useStore()

    expect(context.value.cdnURL).toBe('https://unpkg.com/')
    expect(getCDN()).toBe('https://unpkg.com/')

    setCDN('https://www.jsdelivr.com/package/npm/')

    expect(context.value.cdnURL).toBe('https://www.jsdelivr.com/package/npm/')
    expect(getCDN()).toBe('https://www.jsdelivr.com/package/npm/')
  })
})

describe('getCDN', () => {
  it('should return default if globalState not defined', () => {
    destroyStore()

    expect(getCDN()).toBe('https://unpkg.com/')
  })
})

describe('setPSPDFLicenseKey', () => {
  it('should able to set PSPDFKit Licensekey', () => {
    setPSPDFLicenseKey('ABCDEFG')

    expect(getPSPDFLicenseKey()).toBe('ABCDEFG')
  })
})
