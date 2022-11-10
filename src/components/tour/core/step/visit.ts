import { useAppContext } from '../../../global/context'
import { TourDirection } from '../base'
import { AbstractStep } from '../step'

export interface VisitOptions {
  url: string,
  backUrl?: string,
}

export default class StepVisit extends AbstractStep<VisitOptions> {
  protected lastURL: string

  protected async run () {
    const app       = useAppContext()
    const options   = this.getOptions()
    const lastURL   = this.lastURL
    const targetURL = this.direction === TourDirection.FORWARD
      ? options.url
      : options.backUrl ?? lastURL

    this.lastURL = app.getURL()

    await app.toURL(targetURL)
    await (this.direction === TourDirection.BACKWARD ? this.prev() : this.next())
  }
}
