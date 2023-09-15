import id from 'date-fns/locale/id/index'
import en from 'date-fns/locale/en-US/index'
import { getLang } from '../global/store'
import { format, Locale } from 'date-fns'
import defu from 'defu'

const localePacks = { en, id }

/**
 * Format date using date-fns/format,
 * Automatically switch local following global lang setting.
 * @param date Date
 * @param formatStr date format
 */
export function formatDate (...args: Parameters<typeof format>): string {
  return format(args[0], args[1], defu(args[2], { locale: getLocale() }))
}

/**
 * Install locale pack
 * @param name Language name, ex: `fr`
 * @param locale Language Pack Object
 */
export function installLocale (name: string, locale: Locale) {
  localePacks[name] = locale
}

/**
 * Get locale pack
 * @param name language name, ex: 'fr'
 */
export function getLocale (name = getLang()) {
  return localePacks[name]
}
