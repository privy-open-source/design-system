import { useSingleton } from '../../global/use-singleton'
import TooltipContainer from '../TooltipContainer.vue'

type EventAction = 'toggle' | 'show' | 'hide'

export default function createHandler (eventName: string, eventAction: EventAction, prevent = false) {
  return async function handler (event: MouseEvent) {
    const tooltip = await useSingleton(TooltipContainer)
    const target  = (event.target as HTMLElement)
    const id      = target.dataset.tooltipId
    const enable  = target.dataset.tooltipEnable !== 'false'
    const action  = target.dataset.tooltipAction

    if (enable && action.includes(eventName)) {
      tooltip[eventAction](id)

      if (prevent)
        event.preventDefault()
    }
  }
}
