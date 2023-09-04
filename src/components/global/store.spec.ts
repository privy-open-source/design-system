import { describe } from 'vitest'
import {
  setLang,
  useStore,
  useLang,
  createStore,
  initStore,
  setStore,
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

describe('setStore', () => {
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
