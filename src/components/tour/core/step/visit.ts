import { useRouter } from '../../../global/router'
import { TourDirection } from '../base'
import { AbstractStep } from '../step'

export interface VisitOptions {
  url: string,
  backUrl?: string,
}

export default class StepVisit extends AbstractStep<VisitOptions> {
  protected lastURL = ''

  protected async run () {
    const router    = useRouter()
    const options   = this.getOptions()
    const lastURL   = this.lastURL
    const targetURL = this.direction === TourDirection.FORWARD
      ? options.url
      : options.backUrl ?? lastURL

    this.lastURL = router.getURL()

    await router.toURL(targetURL)
    await this.ahead()
  }
}
