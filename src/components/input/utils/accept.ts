import type { LiteralUnion } from 'type-fest'

const ALPHA   = 'A-Za-z'
const NUMERIC = '\\d'
const SPACE   = '\\s'
const SYMBOL  = '!"#$%&\'()*+,./:;<=>?@[\\\\\\]^_`{|}~-'

const REGEX_ALPHA                      = `${ALPHA}`
const REGEX_NUMERIC                    = `${NUMERIC}`
const REGEX_ALPHA_NUMERIC              = `${ALPHA}${NUMERIC}`
const REGEX_ALPHA_NUMERIC_SPACE        = `${ALPHA}${NUMERIC}${SPACE}`
const REGEX_ALPHA_NUMERIC_SPACE_SYMBOL = `${ALPHA}${NUMERIC}${SPACE}${SYMBOL}`
const REGEX_ALPHA_SPACE                = `${ALPHA}${SPACE}`
const REGEX_ALPHA_SPACE_SYMBOL         = `${ALPHA}${SPACE}${SYMBOL}`
const REGEX_NUMERIC_SPACE              = `${NUMERIC}${SPACE}`
const REGEX_NUMERIC_SPACE_SYMBOL       = `${NUMERIC}${SPACE}${SYMBOL}`

export const AcceptPresets = {
  'num'                       : REGEX_NUMERIC,
  'numeric'                   : REGEX_NUMERIC,
  'digit'                     : REGEX_NUMERIC,
  'alpha'                     : REGEX_ALPHA,
  'alpha-num'                 : REGEX_ALPHA_NUMERIC,
  'alpha-num-space'           : REGEX_ALPHA_NUMERIC_SPACE,
  'alpha-num-space-symbol'    : REGEX_ALPHA_NUMERIC_SPACE_SYMBOL,
  'alpha-numeric'             : REGEX_ALPHA_NUMERIC,
  'alpha-numeric-space'       : REGEX_ALPHA_NUMERIC_SPACE,
  'alpha-numeric-space-symbol': REGEX_ALPHA_NUMERIC_SPACE_SYMBOL,
  'alpha-space'               : REGEX_ALPHA_SPACE,
  'alpha-space-symbol'        : REGEX_ALPHA_SPACE_SYMBOL,
  'num-space'                 : REGEX_NUMERIC_SPACE,
  'num-space-symbol'          : REGEX_NUMERIC_SPACE_SYMBOL,
  'numeric-space'             : REGEX_NUMERIC_SPACE,
  'numeric-space-symbol'      : REGEX_NUMERIC_SPACE_SYMBOL,
  'non-numeric'               : REGEX_ALPHA_SPACE_SYMBOL,
  'non-alpha'                 : REGEX_NUMERIC_SPACE_SYMBOL,
  'text'                      : REGEX_ALPHA_NUMERIC_SPACE_SYMBOL,
} as const

export type AcceptVariant = LiteralUnion<keyof typeof AcceptPresets, string>

export function isAccepted (accept: AcceptVariant | undefined, text: string): boolean {
  if (!accept)
    return true

  try {
    const regexStr = AcceptPresets[accept.toLowerCase()] as string ?? accept
    const regex    = new RegExp(`^[${regexStr}]+$`)

    return regex.test(text)
  } catch (error) {
    if (import.meta.env.DEV)
      console.error(error)
    // Bypass validation if regexp not valid
    return true
  }
}

export function removeUnaccepted (accept: AcceptVariant | undefined, text: string): string {
  if (!accept)
    return text

  try {
    const regexStr = AcceptPresets[accept.toLowerCase()] as string ?? accept
    const regex    = new RegExp(`[^${regexStr}]+`, 'g')

    return text.replaceAll(regex, '')
  } catch (error) {
    if (import.meta.env.DEV)
      console.error(error)
    // Bypass validation if regexp not valid
    return text
  }
}

export function checkOnInput (accept: AcceptVariant | undefined, event: Event) {
  if ((event as InputEvent).data && !isAccepted(accept, (event as InputEvent).data)) {
    (event as InputEvent).preventDefault()

    if ((event as InputEvent).inputType === 'insertFromPaste') {
      const target    = (event as InputEvent).target as HTMLTextAreaElement
      const oldValue  = target.value
      const value     = removeUnaccepted(accept, (event as InputEvent).data)
      const ss        = target.selectionStart
      const se        = target.selectionEnd
      const nextValue = `${oldValue.slice(0, ss)}${value}${oldValue.slice(se)}`

      try {
        target.value = nextValue

        target.dispatchEvent(new InputEvent('input'))
        target.setSelectionRange(value.length + ss, value.length + ss)
      } catch (error) {
        if (import.meta.env.DEV)
          console.error(error)
      }
    }
  }
}
