import { describe } from 'vitest'
import { initStore, setLang } from '../global/store'
import {
  formatDate,
  getLocale,
  installLocale,
} from './date'
import fr from 'date-fns/locale/fr/index'

beforeEach(() => {
  initStore()
})

describe('formatDate', () => {
  it('should able to format date using global lang setting', () => {
    const date = new Date(2022, 4, 1)

    expect(formatDate(date, 'EEEE')).toBe('Sunday')

    setLang('id')

    expect(formatDate(date, 'EEEE')).toBe('Minggu')
  })
})

describe('installLocale', () => {
  it('should able to install new lang pack', () => {
    installLocale('fr', fr)
    setLang('fr')

    const date = new Date(2022, 4, 1)

    expect(formatDate(date, 'EEEE')).toBe('dimanche')
    expect(getLocale('fr')).toBe(fr)
  })
})
