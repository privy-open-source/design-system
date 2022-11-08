import defu from 'defu'
import { removeSingleton, useSingleton } from '../../global/use-singleton'
import { AbstractStep } from '../core/step'
import Tour from '../Tour.vue'

export interface ShowOptions {
  target: string,
  title?: string,
  text: string,
  image?: string,
}

export default class BasicStep extends AbstractStep<ShowOptions> {
  protected async mount () {
    const options = this.getOptions()
    const tour    = await useSingleton(Tour)
    const target  = await this.waitElement(options.target, options.waitTimeout)

    tour.show(target, defu({
      step     : this.parent.getIndex() + 1,
      totalStep: this.parent.getTotal(),
      onNext   : this.next.bind(this),
      onPrev   : this.prev.bind(this),
      onDismiss: this.dismiss.bind(this),
    }, options))
  }

  protected async unmount () {
    await removeSingleton(Tour)
  }

  protected async dismiss () {
    await this.parent.stop()
  }
}
