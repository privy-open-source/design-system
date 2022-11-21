import { TourStory } from './story'
import StepAction from './step/action'
import StepDelay from './step/delay'
import StepShow from './step/show'
import StepVisit from './step/visit'

it('should able to add show step instance using `.show()` (option way)', () => {
  const tour = new TourStory()

  tour.show({ target: '#target', text: 'Hello' })

  const step   = tour.getSteps().at(0)
  const option = step.getOptions()

  expect(step).toBeInstanceOf(StepShow)
  expect(option).toMatchObject({ target: '#target', text: 'Hello' })
})

it('should able to add show step instance using `.show()` (shortcut)', () => {
  const tour = new TourStory()

  tour.show('#target', 'This is text', 'This is title', 'http://image.com')

  const step   = tour.getSteps().at(0)
  const option = step.getOptions()

  expect(step).toBeInstanceOf(StepShow)
  expect(option).toMatchObject({
    target: '#target',
    text  : 'This is text',
    title : 'This is title',
    image : 'http://image.com',
  })
})

it('should able to add delay step using `.delay()`', () => {
  const tour = new TourStory()

  tour.delay(500)

  const step   = tour.getSteps().at(0)
  const option = step.getOptions()

  expect(step).toBeInstanceOf(StepDelay)
  expect(option).toMatchObject({ duration: 500 })
})

it('should able to add action step using `.action()`', () => {
  const tour = new TourStory()

  tour.action('#target', 'type', 'Hello World')

  const step   = tour.getSteps().at(0)
  const option = step.getOptions()

  expect(step).toBeInstanceOf(StepAction)
  expect(option).toMatchObject({
    target: '#target',
    action: 'type',
    params: ['Hello World'],
  })
})

it('should able to add action step type `click` using `.click()`', () => {
  const tour = new TourStory()

  tour.click('#target')

  const step   = tour.getSteps().at(0)
  const option = step.getOptions()

  expect(step).toBeInstanceOf(StepAction)
  expect(option).toMatchObject({
    target: '#target',
    action: 'click',
    params: [],
  })
})

it('should able to add action step type `dblClick` using `.dblClick()`', () => {
  const tour = new TourStory()

  tour.dblClick('#target')

  const step   = tour.getSteps().at(0)
  const option = step.getOptions()

  expect(step).toBeInstanceOf(StepAction)
  expect(option).toMatchObject({
    target: '#target',
    action: 'dblClick',
    params: [],
  })
})

it('should able to add action step type `tripleClick` using `.tripleClick()`', () => {
  const tour = new TourStory()

  tour.tripleClick('#target')

  const step   = tour.getSteps().at(0)
  const option = step.getOptions()

  expect(step).toBeInstanceOf(StepAction)
  expect(option).toMatchObject({
    target: '#target',
    action: 'tripleClick',
    params: [],
  })
})

it('should able to add action step type `hover` using `.hover()`', () => {
  const tour = new TourStory()

  tour.hover('#target')

  const step   = tour.getSteps().at(0)
  const option = step.getOptions()

  expect(step).toBeInstanceOf(StepAction)
  expect(option).toMatchObject({
    target: '#target',
    action: 'hover',
    params: [],
  })
})

it('should able to add action step type `unhover` using `.unhover()`', () => {
  const tour = new TourStory()

  tour.unhover('#target')

  const step   = tour.getSteps().at(0)
  const option = step.getOptions()

  expect(step).toBeInstanceOf(StepAction)
  expect(option).toMatchObject({
    target: '#target',
    action: 'unhover',
    params: [],
  })
})

it('should able to add action step type `unhover` using `.blur()`', () => {
  const tour = new TourStory()

  tour.blur('#target')

  const step   = tour.getSteps().at(0)
  const option = step.getOptions()

  expect(step).toBeInstanceOf(StepAction)
  expect(option).toMatchObject({
    target: '#target',
    action: 'unhover',
    params: [],
  })
})

it('should able to add action step type `type` using `.type()`', () => {
  const tour = new TourStory()

  tour.type('#target', 'Hello Guys')

  const step   = tour.getSteps().at(0)
  const option = step.getOptions()

  expect(step).toBeInstanceOf(StepAction)
  expect(option).toMatchObject({
    target: '#target',
    action: 'type',
    params: ['Hello Guys'],
  })
})

it('should able to add action step type `visit` using `.visit()`', () => {
  const tour = new TourStory()

  tour.visit('/redirect-to')

  const step   = tour.getSteps().at(0)
  const option = step.getOptions()

  expect(step).toBeInstanceOf(StepVisit)
  expect(option).toMatchObject({ url: '/redirect-to' })
})
