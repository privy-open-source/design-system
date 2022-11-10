import { Tour } from './tour'
import { isString } from 'lodash-es'
import ShowStep from './step/show'
import StepDelay from './step/delay'
import StepAction from './step/action'
import StepVisit from './step/visit'
import type { ShowOptions } from './step/show'
import type { EventType, ParamsOf } from './step/action'

/**
 * Tour with additional function to build a tour stories
 */
export class TourStory extends Tour {
  /**
   * Show tour guide card
   * @param options options
   */
  show (options: ShowOptions): this
  /**
   * Show tour guide card
   * @param target target querySelector
   * @param text body text
   * @param title title text
   * @param image url image
   */
  show (target: string, text: string, title?: string, image?: string): this
  show (targetOrOption: string | ShowOptions, text = '', title?: string, image?: string): this {
    return !isString(targetOrOption)
      ? this.add(new ShowStep(targetOrOption))
      : this.add(new ShowStep({
        target: targetOrOption,
        text,
        title,
        image,
      }))
  }

  /**
   * Delay or Wait, setTimout equivalent
   * @param duration duration in milliseconds
   */
  delay (duration: number): this {
    return this.add(new StepDelay({ duration }))
  }

  /**
   * Trigger action to target element
   * @param target Target querySelector
   * @param action Action name, ex: 'click', 'type'
   * @param params Action parameters
   */
  action<E extends EventType> (target: string, action: E, ...params: ParamsOf<E>): this {
    return this.add(new StepAction({
      target,
      action,
      params,
    }))
  }

  /**
   * Trigger click to target element
   * @param target Target querySelector
   */
  click (target: string) {
    return this.action(target, 'click')
  }

  /**
   * Trigger double click to target element
   * @param target Target querySelector
   */
  dblClick (target: string) {
    return this.action(target, 'dblClick')
  }

  /**
   * Trigger triple click to target element
   * @param target Target querySelector
   */
  tripleClick (target: string) {
    return this.action(target, 'tripleClick')
  }

  /**
   * Trigger hover to target element
   * @param target Target querySelector
   */
  hover (target: string) {
    return this.action(target, 'hover')
  }

  /**
   * Trigger unhover (blur) to target element
   * @param target Target querySelector
   */
  unhover (target: string) {
    return this.action(target, 'unhover')
  }

  /**
   * Trigger blur (unhover) to target element
   * @param target Target querySelector
   */
  blur (target: string) {
    return this.unhover(target)
  }

  /**
   * Remotely typing target input
   * @param target Target querySelector
   */
  type (target: string, text: string) {
    return this.action(target, 'type', text)
  }

  /**
   * Redirect to url
   * @param url target url
   * @param backUrl target url when back button clicked
   */
  visit (url: string, backUrl?: string) {
    return this.add(new StepVisit({ url, backUrl }))
  }
}
