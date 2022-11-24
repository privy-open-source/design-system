<script setup>
  import pButton from '../button/Button.vue'
  import pInput from '../input/Input.vue'
  import pCheckbox from '../checkbox/Checkbox.vue'
  import { createTour } from '.'
  import { withBase } from 'vitepress'
  import { ref } from 'vue'
  import { useInterval } from '@vueuse/core'

  const simpleTour = createTour()
    .dialog({
      target: '#sample',
      title : 'Step 1',
      text  : 'Hello World',
    })
    .dialog({
      target: '.pager-link.prev',
      title : 'Step 2',
      text  : 'Ini Prev button',
    })
    .dialog({
      target: '.pager-link.next',
      title : 'Step 3',
      text  : 'Ini Next button',
    })

  const advanceTour = createTour()
    .visit(withBase('/docs/getting-started'))
    .click('[data-tour="theme-dashboard"] > summary')
    .dialog('[data-tour="theme-dashboard"]', 'This is tutorial for install persona dashboard theme')
    .click('[data-tour="theme-dashboard"] > summary')
    .delay(100)
    .click('[data-tour="theme-docs"] > summary')
    .dialog('[data-tour="theme-docs"]', 'This is tutorial for install persona docs theme')
    .click('[data-tour="theme-docs"] > summary')
    .delay(100)
    .visit(withBase('/components/tour/'))
    .delay(100)
    .runIf(() => window.matchMedia("(max-width: 700px)").matches, (tour) => {
      return tour
        .dialog('.VPLocalNav > .menu', 'Click this to show sidebar')
    })
    .dialog('[data-tour="start-advance"]', 'Click this to restart the tutorial')

  const tourDialog = createTour()
    .dialog({
      target: '[data-tour="sample-dialog"]',
      title : 'This is title',
      text  : 'This is text',
      image : 'https://picsum.photos/400/244',
    })

  const tourAction = createTour()
    .click('[data-tour="action-click"]')
    .dblClick('[data-tour="action-dblClick"]')
    .tripleClick('[data-tour="action-tripleClick"]')
    .clear('[data-tour="action-type"]')
    .type('[data-tour="action-type"]', 'Hello World')

  const counter1 = ref(0)
  const counter2 = ref(0)
  const counter3 = ref(0)
  const text     = ref('')

  const { counter, pause, resume } = useInterval(1000, { controls: true, immediate: false })

  const tourDelay = createTour()
    .click('[data-tour="delay-start"]')
    .delay(5000)
    .click('[data-tour="delay-stop"]')

  const tourVisit = createTour()
    .visit(withBase('/'))
    .dialog('[data-tour="github"]', 'Don\'t forget to hit the star on Github')

  const number = ref(5)

  const tourIf = createTour()
    .runIf(() => number.value >= 5, (tour) => {
      return tour
        .dialog('[data-tour="if-more-than-5"]', 'This only run if number >= 5')
    })
    .runElseIf(() => number.value >= 3, (tour) => {
      return tour
        .dialog('[data-tour="if-more-than-3"]', 'This only run if number >= 3 and <= 5')
    })
    .runElse((tour) => {
      return tour
        .dialog('[data-tour="if-less-than-3"]', 'This only run if number < 3')
    })
</script>

# Tour
> Give the tour for new user.

## Usage

### Simple Usage

<p-button class="mt-3" @click="simpleTour.start()">
  Try It
</p-button>

<preview class="flex-col space-y-2" label="sample">
  <div class="w-full max-w-xs overflow-y-auto h-52">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita explicabo necessitatibus eius architecto, similique quibusdam sed consequuntur? Esse, praesentium quidem. Dolorem repellendus numquam laudantium nisi labore animi. Iusto maxime exercitationem voluptatem molestias dolorum? Beatae minima deleniti tenetur quo ullam numquam, ab officiis id odio optio ipsam sed, <span id="sample" class="text-primary-100">sample text</span>, repellendus, voluptat.
  </div>
</preview>

```ts
import { createTour } from '@privyid/persona/core'

const tour = createTour()
  .dialog({
    target: '#sample',
    title : 'Step 1',
    text  : 'Hello World'
  })
  .dialog({
    target: '.pager-link.prev',
    title : 'Step 2',
    text  : 'Ini Prev button'
  })
  .dialog({
    target: '.pager-link.next',
    title : 'Step 3',
    text  : 'Ini Next button'
  })

// Start the tour
tour.start()
```

### Advance Usage

<p-button class="mt-3" @click="advanceTour.start()" data-tour="start-advance">
  Try It
</p-button>

```ts
const tour = createTour()
  .visit('/design-system/docs/getting-started')
  .click('[data-tour="theme-dashboard"] > summary')
  .dialog('[data-tour="theme-dashboard"]', 'This is tutorial for install persona dashboard theme')
  .click('[data-tour="theme-dashboard"] > summary')
  .delay(100)
  .click('[data-tour="theme-docs"] > summary')
  .dialog('[data-tour="theme-docs"]', 'This is tutorial for install persona docs theme')
  .click('[data-tour="theme-docs"] > summary')
  .delay(100)
  .visit('/design-system/components/tour/')
  .delay(100)
  .runIf(() => window.matchMedia("(max-width: 700px)").matches, (tour) => {
    return tour
      .dialog('.VPLocalNav > .menu', 'Click this to show sidebar')
  })
  .dialog('[data-tour="start-advance"]', 'Click this to restart the tutorial')

// Start the tour
tour.start()
```

## Defining Tour Stories

You need define stories before can run the tour. There many kind of step you can use to suit with your case.

### Show Dialog

Step for showing tour dialog to specific target.

<p-button class="mt-3" @click="tourDialog.start()" data-tour="sample-dialog">
  Try It
</p-button>

```ts
const tour = createTour()
  .dialog({
    target: '[data-tour="sample-dialog"]',
    title : 'This is title',
    text  : 'This is text',
    image : 'https://picsum.photos/400/225',
  })
  // This also can written like this (shortcut)
  .dialog('#sample', 'This is text', 'This is title', 'https://picsum.photos/400/225')
```

### User Action

Step for trigger event to target element. Available action `click`, `dblClick`, `tripleClick`, `type`, `hover`, `unhover`.

<p-button class="mt-3" @click="tourAction.start()">
  Try It
</p-button>

<preview class="flex-col space-y-2" label="sample">
  <div class="space-gap-2">
    <p-button data-tour="action-click" @click="counter1++">
      Click: {{ counter1 }}
    </p-button>
    <p-button data-tour="action-dblClick" @click="counter2++">
      Click: {{ counter2 }}
    </p-button>
    <p-button data-tour="action-tripleClick" @click="counter3++">
      Click: {{ counter3 }}
    </p-button>
  </div>

  <p-input data-tour="action-type" v-model="text" />
</preview>

```ts
const tour = createTour()
  .click('[data-tour="action-click"]')
  .dblClick('[data-tour="action-dblClick"]')
  .tripleClick('[data-tour="action-tripleClick"]')
  .clear('[data-tour="action-type"]')
  .type('[data-tour="action-type"]', 'Hello World')
```

### Delay

Add delay in millisecond before run to next step.

<p-button class="mt-3" @click="tourDelay.start()">
  Try It
</p-button>

<preview class="flex-col space-y-2" label="sample">
  <div>Timer: {{ counter }}s</div>
  <div class="space-x-2">
    <p-button data-tour="delay-start" @click="resume">
      Start
    </p-button>
    <p-button data-tour="delay-stop" @click="pause">
      Stop
    </p-button>
  </div>
</preview>

```ts
const tour = createTour()
  .click('[data-tour="delay-start"]')
  .delay(5000) // 5s
  .click('[data-tour="delay-stop"]')
```

### Visiting Page

Step for redirecting to some page.

<p-button class="mt-3" @click="tourVisit.start()">
  Try It
</p-button>

```ts
const tour = createTour()
  .visit('/design-system/')
  .dialog('[data-tour="github"]', 'Don\'t forget to hit the star on Github')
```

## Conditional Step

If you want run some steps only on some conditions, you can use `.runIf`, `runElseIf`, and `.runElse`

<p-button class="mt-3" @click="tourIf.start()">
  Try It
</p-button>

<preview class="flex-col space-y-2" label="sample">
  <div class="space-gap-3">
    <p-input v-model="number" />
    <span data-tour="if-more-than-5">&ge;5</span>
    <span data-tour="if-more-than-3">&ge;3</span>
    <span data-tour="if-less-than-3">&lt;3</span>
  </div>
</preview>

```ts
const number = ref(5)
const tour   = createTour()
  .runIf(() => number.value >= 5, (tour) => {
    return tour
      .dialog('[data-tour="if-more-than-5"]', 'This only run if number >= 5')
  })
  .runElseIf(() => number.value >= 3, (tour) => {
    return tour
      .dialog('[data-tour="if-more-than-3"]', 'This only run if number >= 3 and <= 5')
  })
  .runElse((tour) => {
    return tour
      .dialog('[data-tour="if-less-than-3"]', 'This only run if number < 3')
  })
```
