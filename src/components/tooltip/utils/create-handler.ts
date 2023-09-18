import { useSingleton } from '../../global/use-singleton'

type EventAction = 'toggle' | 'show' | 'hide'

/**
 *
 * @param eventName Event name, only run when attr data-tooltip-action match this name
 * @param tooltipAction Action applied to the tooltip
 * @param prevent If true, it's will prevent default action.
 */
export default function createHandler (eventName: string, tooltipAction: EventAction, prevent = false) {
  return async function handler (event: MouseEvent) {
    const { default: TooltipContainer } = await import('../TooltipContainer.vue')
    const tooltip                       = await useSingleton(TooltipContainer)
    const target                        = (event.target as HTMLElement)
    const id                            = target.dataset.tooltipId
    const enable                        = target.dataset.tooltipEnable !== 'false'
    const action                        = target.dataset.tooltipAction

    if (id && enable && action.includes(eventName)) {
      tooltip[tooltipAction](id)

      if (prevent)
        event.preventDefault()
    }
  }
}
