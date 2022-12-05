import { createTour } from '.'
import { TourStory } from './core/story'

it('should able to create TourStory instance', () => {
  const tour = createTour()

  expect(tour).toBeInstanceOf(TourStory)
})
