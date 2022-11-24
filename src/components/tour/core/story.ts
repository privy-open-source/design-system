import { Tour } from './tour'
import { isString } from 'lodash-es'
import StepDialog from './step/dialog'
import StepDelay from './step/delay'
import StepAction from './step/action'
import StepVisit from './step/visit'
import StepCondition, { ConditionalType } from './step/conditional'
import type { ConditionalOptions } from './step/conditional'
import type { DialogOptions } from './step/dialog'
import type { EventType, ParamsOf } from './step/action'

type TourBuilderCallback = ((tour: TourStory) => TourStory) | ((tour: TourStory) => void)

/**
 * Tour with additional function to build a tour stories
 */
export class TourStory extends Tour {
  /**
   * Show tour guide dialog
   * @param options options
   */
  dialog (options: DialogOptions): this
  /**
   * Show tour guide dialog
   * @param target target querySelector
   * @param text body text
   * @param title title text
   * @param image url image
   */
  dialog (target: string, text: string, title?: string, image?: string): this
  dialog (targetOrOption: string | DialogOptions, text = '', title?: string, image?: string): this {
    return !isString(targetOrOption)
      ? this.add(new StepDialog(targetOrOption))
      : this.add(new StepDialog({
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
   * Clear input text
   * @param target Target querySelector
   */
  clear (target: string) {
    return this.action(target, 'clear')
  }

  /**
   * Redirect to url
   * @param url target url
   * @param backUrl target url when back button clicked
   */
  visit (url: string, backUrl?: string) {
    return this.add(new StepVisit({ url, backUrl }))
  }

  /**
   * Run steps only when condition meet, skip if not
   * @param condition Ref or Function to check
   * @param buildTour
   * @example
   * tour.runIf(() => window.matchMedia("(max-width: 700px)").matches, (tour) => {
   *    return tour
   *      .click('#mobile-only')
   *      .dialog('#mobile-only', 'Hello World')
   * })
   */
  runIf (condition: ConditionalOptions['condition'], buildTour: TourBuilderCallback) {
    const tour = new TourStory()

    return this.add(new StepCondition({
      condition: condition,
      tour     : buildTour(tour) ?? tour,
    }))
  }

  runElseIf (condition: ConditionalOptions['condition'], buildTour: TourBuilderCallback) {
    const step = this.steps.at(-1)

    if (!(step instanceof StepCondition) || !step.canChain())
      throw new Error('.runElseIf only can be use after .runIf or .runElseIf')

    const tour = new TourStory()

    step.chain({
      type     : ConditionalType.ELSE_IF,
      condition: condition,
      tour     : buildTour(tour) ?? tour,
    })

    return this
  }

  runElse (buildTour: (tour: TourStory) => TourStory | undefined) {
    const step = this.steps.at(-1)

    if (!(step instanceof StepCondition) || !step.canChain())
      throw new Error('.runElse only can be use after .runIf or .runElseIf')

    const tour = new TourStory()

    step.chain({
      type     : ConditionalType.ELSE,
      condition: true,
      tour     : buildTour(tour) ?? tour,
    })

    return this
  }
}
