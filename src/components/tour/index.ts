import type { TourOptions } from './core/tour'
import { TourStory } from './core/story'

export function createTour (options?: Partial<TourOptions>) {
  return new TourStory(options)
}
