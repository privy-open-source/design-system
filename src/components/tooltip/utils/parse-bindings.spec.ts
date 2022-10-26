import { DirectiveBinding } from 'vue'
import {
  parseAction, parseColor, parsePlacement, parseText,
} from './parse-bindings'

function createModifiers (modifiers: DirectiveBinding['modifiers']): DirectiveBinding {
  const bindings: DirectiveBinding = {
    modifiers: modifiers,
    instance : undefined,
    value    : undefined,
    oldValue : undefined,
    dir      : undefined,
  }

  return bindings
}

describe('parsePlacement', () => {
  it('should return `top` if no modifiers given', () => {
    const placement = parsePlacement(undefined, createModifiers({}))

    expect(placement).toBe('top')
  })

  it('should return `top` if modifiers `top` is true', () => {
    const placement = parsePlacement(undefined, createModifiers({ top: true }))

    expect(placement).toBe('top')
  })

  it('should return `left` if modifiers `left` is true', () => {
    const placement = parsePlacement(undefined, createModifiers({ left: true }))

    expect(placement).toBe('left')
  })

  it('should return `right` if modifiers `right` is true', () => {
    const placement = parsePlacement(undefined, createModifiers({ right: true }))

    expect(placement).toBe('right')
  })

  it('should return `bottom` if modifiers `bottom` is true', () => {
    const placement = parsePlacement(undefined, createModifiers({ bottom: true }))

    expect(placement).toBe('bottom')
  })

  it('should add suffic `-start` if modifiers `start` is true', () => {
    const non    = parsePlacement(undefined, createModifiers({ start: true }))
    const top    = parsePlacement(undefined, createModifiers({ top: true, start: true }))
    const left   = parsePlacement(undefined, createModifiers({ left: true, start: true }))
    const right  = parsePlacement(undefined, createModifiers({ right: true, start: true }))
    const bottom = parsePlacement(undefined, createModifiers({ bottom: true, start: true }))

    expect(non).toBe('top-start')
    expect(top).toBe('top-start')
    expect(left).toBe('left-start')
    expect(right).toBe('right-start')
    expect(bottom).toBe('bottom-start')
  })

  it('should add suffic `-end` if modifiers `end` is true', () => {
    const non    = parsePlacement(undefined, createModifiers({ end: true }))
    const top    = parsePlacement(undefined, createModifiers({ top: true, end: true }))
    const left   = parsePlacement(undefined, createModifiers({ left: true, end: true }))
    const right  = parsePlacement(undefined, createModifiers({ right: true, end: true }))
    const bottom = parsePlacement(undefined, createModifiers({ bottom: true, end: true }))

    expect(non).toBe('top-end')
    expect(top).toBe('top-end')
    expect(left).toBe('left-end')
    expect(right).toBe('right-end')
    expect(bottom).toBe('bottom-end')
  })

  it('should return `top-start` if modifiers `top` and `left` is true', () => {
    const placement = parsePlacement(undefined, createModifiers({ top: true, left: true }))

    expect(placement).toBe('top-start')
  })

  it('should return `top-end` if modifiers `top` and `right` is true', () => {
    const placement = parsePlacement(undefined, createModifiers({ top: true, right: true }))

    expect(placement).toBe('top-end')
  })

  it('should return `bottom-start` if modifiers `bottom` and `left` is true', () => {
    const placement = parsePlacement(undefined, createModifiers({ bottom: true, left: true }))

    expect(placement).toBe('bottom-start')
  })

  it('should return `bottom-end` if modifiers `bottom` and `right` is true', () => {
    const placement = parsePlacement(undefined, createModifiers({ bottom: true, right: true }))

    expect(placement).toBe('bottom-end')
  })
})

describe('parseAction', () => {
  it('should return `focus-hover` if has no modifiers', () => {
    const action = parseAction(undefined, createModifiers({}))

    expect(action).toBe('focus-hover')
  })

  it('should return `click` if modifiers `click` is true', () => {
    const action = parseAction(undefined, createModifiers({ click: true }))

    expect(action).toBe('click')
  })

  it('should return `hover` if modifiers `hover` is true', () => {
    const action = parseAction(undefined, createModifiers({ hover: true }))

    expect(action).toBe('hover')
  })

  it('should return `focus` if modifiers `focus` is true', () => {
    const action = parseAction(undefined, createModifiers({ focus: true }))

    expect(action).toBe('focus')
  })

  it('should able to use more than one action', () => {
    const action = parseAction(undefined, createModifiers({
      focus: true,
      click: true,
      hover: true,
    }))

    expect(action).toInclude('focus')
    expect(action).toInclude('click')
    expect(action).toInclude('hover')
  })
})

describe('parseText', () => {
  it('should return text from value', () => {
    const text = parseText(undefined, {
      value    : 'Hello World',
      oldValue : '',
      instance : undefined,
      modifiers: undefined,
      dir      : undefined,
    })

    expect(text).toBe('Hello World')
  })

  it('should return text from attribute title if value not present', () => {
    const el = document.createElement('div')

    el.setAttribute('title', 'Hello World')

    const text = parseText(el, {
      value    : '',
      oldValue : '',
      instance : undefined,
      modifiers: undefined,
      dir      : undefined,
    })

    expect(text).toBe('Hello World')
  })

  it('should return text from attribute title if value is not string', () => {
    const el = document.createElement('div')

    el.setAttribute('title', 'Hello World')

    const text = parseText(el, {
      value    : false,
      oldValue : '',
      instance : undefined,
      modifiers: undefined,
      dir      : undefined,
    })

    expect(text).toBe('Hello World')
  })

  it('should return text from dataset TooltipText (attribute `data-tooltip-text`) if value nor attr title present', () => {
    const el = document.createElement('div')

    el.setAttribute('title', '')
    el.dataset.tooltipText = 'Hello World'

    const text = parseText(el, {
      value    : '',
      oldValue : '',
      instance : undefined,
      modifiers: undefined,
      dir      : undefined,
    })

    expect(text).toBe('Hello World')
  })
})

describe('parseColor', () => {
  it('should return `black` if no modifiers', () => {
    const color = parseColor(undefined, createModifiers({}))

    expect(color).toBe('black')
  })

  it('should return `black` if modifiers `black` is true', () => {
    const color = parseColor(undefined, createModifiers({ black: true }))

    expect(color).toBe('black')
  })

  it('should return `white` if modifiers `white` is true', () => {
    const color = parseColor(undefined, createModifiers({ white: true }))

    expect(color).toBe('white')
  })
})
