import { describe } from 'vitest'
import {
  initAppContext,
  setLang,
  useAppContext,
  useLang,
} from './context'

beforeEach(() => {
  initAppContext()
})

describe('setLang', () => {
  it('should able to set global lang', () => {
    const lang    = useLang()
    const context = useAppContext()

    setLang('id')

    expect(context.lang).toBe('id')
    expect(lang.value).toBe('id')
  })
})
