import defu from 'defu'
import { removeSingleton, useSingleton } from '../../../global/use-singleton'
import { AbstractStep } from '../step'
import { waitElement } from '../../utils/dom'

export interface ShowOptions {
  target: string,
  title?: string,
  text: string,
  image?: string,
}

export default class StepShow extends AbstractStep<ShowOptions> {
  protected async dismiss () {
    await this.parent.stop()
  }

  protected async run () {
    const options           = this.getOptions()
    const { default: Tour } = await import('../../Tour.vue')
    const tour              = await useSingleton(Tour)
    const target            = await waitElement(options.target, options.waitTimeout)

    tour.show(target, defu({
      step     : this.parent.getIndex() + 1,
      totalStep: this.parent.getTotal(),
      onNext   : this.next.bind(this),
      onPrev   : this.prev.bind(this),
      onDismiss: this.dismiss.bind(this),
    }, options))

    this.onCleanup(async () => {
      await removeSingleton(Tour)
    })
  }
}
