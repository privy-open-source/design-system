import { computePosition, hide } from '@floating-ui/dom'
import * as scrollIntoView from 'scroll-into-view'

export async function isVisible (target: HTMLElement) {
  const div = document.createElement('div')

  const { middlewareData } = await computePosition(target, div, {
    strategy  : 'fixed',
    middleware: [hide()],
  })

  div.remove()

  return !middlewareData.hide.referenceHidden
}

export async function focus (target: HTMLElement, duration = 330): Promise<unknown> {
  return await new Promise((resolve) => {
    scrollIntoView(target, { time: duration }, resolve)
  })
}
