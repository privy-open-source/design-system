import { TourOptions } from './core/tour'
import { TourStory } from './core/story'

export function createTour (options?: TourOptions) {
  return new TourStory(options)
}
