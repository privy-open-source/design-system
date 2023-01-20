import scrollIntoView from 'scroll-into-view'

export async function focus (target: HTMLElement, duration = 330): Promise<unknown> {
  return await new Promise((resolve) => {
    scrollIntoView(target, { time: duration }, resolve)
  })
}
