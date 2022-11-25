import { TourStory } from './story'
import StepAction from './step/action'
import StepDelay from './step/delay'
import StepDialog from './step/dialog'
import StepVisit from './step/visit'
import StepCondition, { ConditionalOptions } from './step/conditional'

it('should able to add show step instance using `.dialog()`', () => {
  const tour = new TourStory()

  tour.dialog({ target: '#target', text: 'Hello' })

  const step   = tour.getSteps().at(0)
  const option = step.getOptions()

  expect(step).toBeInstanceOf(StepDialog)
  expect(option).toMatchObject({ target: '#target', text: 'Hello' })
})

it('should able to add show step instance using `.dialog()` (shortcut)', () => {
  const tour = new TourStory()

  tour.dialog('#target', 'This is text', 'This is title', 'http://image.com')

  const step   = tour.getSteps().at(0)
  const option = step.getOptions()

  expect(step).toBeInstanceOf(StepDialog)
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

it('should able to add action step type `clear` using `.clear()`', () => {
  const tour = new TourStory()

  tour.clear('#target')

  const step   = tour.getSteps().at(0)
  const option = step.getOptions()

  expect(step).toBeInstanceOf(StepAction)
  expect(option).toMatchObject({
    target: '#target',
    action: 'clear',
    params: [],
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

it('should able to add conditional step using `.runIf()`', () => {
  const tour      = new TourStory()
  const condition = () => true

  tour.runIf(condition, (tour: TourStory) => {
    tour.dialog('#target', 'message')
  })

  const step      = tour.getSteps().at(0)
  const option    = step.getOptions() as ConditionalOptions
  const subStep   = option.tour.getSteps().at(0)
  const subOption = subStep.getOptions()

  expect(step).toBeInstanceOf(StepCondition)
  expect(option).toMatchObject({ condition })
  expect(subStep).toBeInstanceOf(StepDialog)
  expect(subOption).toMatchObject({ target: '#target', text: 'message' })
})

it('should able to add else-if condition using `.runElseIf()`', () => {
  const tour       = new TourStory()
  const condition  = () => true
  const condition2 = () => false

  tour
    .runIf(condition, (tour) => {
      tour.dialog('#target', 'message')
    })
    .runElseIf(condition2, (tour) => {
      tour.dialog('#target-else-if', 'message')
    })

  const step      = tour.getSteps().at(0) as StepCondition
  const option    = step.getRoutines().at(-1)
  const subStep   = option.tour.getSteps().at(0)
  const subOption = subStep.getOptions()

  expect(step).toBeInstanceOf(StepCondition)
  expect(option).toMatchObject({ condition: condition2 })
  expect(subStep).toBeInstanceOf(StepDialog)
  expect(subOption).toMatchObject({ target: '#target-else-if', text: 'message' })
})

it('should able to add else condition using `.runElse()`', () => {
  const tour      = new TourStory()
  const condition = () => true

  tour
    .runIf(condition, (tour) => {
      tour.dialog('#target', 'message')
    })
    .runElse((tour) => {
      tour.dialog('#target-else', 'message')
    })

  const step      = tour.getSteps().at(0) as StepCondition
  const option    = step.getRoutines().at(-1)
  const subStep   = option.tour.getSteps().at(0)
  const subOption = subStep.getOptions()

  expect(step).toBeInstanceOf(StepCondition)
  expect(option).toMatchObject({ condition: true })
  expect(subStep).toBeInstanceOf(StepDialog)
  expect(subOption).toMatchObject({ target: '#target-else', text: 'message' })
})

it('should thrown a error if called `.runElseIf` before `.runIf`', () => {
  const tour = new TourStory()

  expect(() => {
    tour.runElseIf(true, (tour) => {
      tour.dialog('#target', 'message')
    })
  }).toThrowError('.runElseIf only can be use after .runIf or .runElseIf')
})

it('should thrown a error if called `.runElseIf` after `.runElse`', () => {
  const tour = new TourStory()

  expect(() => {
    tour
      .runIf(true, (tour) => tour)
      .runElse((tour) => tour)
      .runElseIf(true, (tour) => {
        tour.dialog('#target', 'message')
      })
  }).toThrowError('.runElseIf only can be use after .runIf or .runElseIf')
})

it('should thrown a error if called `.runElse` before `.runIf`', () => {
  const tour = new TourStory()

  expect(() => {
    tour.runElse((tour) => {
      tour.dialog('#target', 'message')
    })
  }).toThrowError('.runElse only can be use after .runIf or .runElseIf')
})

it('should thrown a error if called `.runElse` after `.runElse`', () => {
  const tour = new TourStory()

  expect(() => {
    tour
      .runIf(true, (tour) => tour)
      .runElse((tour) => tour)
      .runElse((tour) => {
        tour.dialog('#target', 'message')
      })
  }).toThrowError('.runElse only can be use after .runIf or .runElseIf')
})
