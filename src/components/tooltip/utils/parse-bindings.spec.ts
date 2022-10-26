import { DirectiveBinding } from 'vue'
import { parsePlacement } from './parse-bindings'

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
