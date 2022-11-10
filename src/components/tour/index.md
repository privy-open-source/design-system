<script setup>
  import pButton from '../button/Button.vue'
  import { createTour } from '.'
  import { withBase } from 'vitepress'

  const tour = createTour()
    .show({
      target: '#sample',
      title : 'Step 1',
      text  : 'Hello I\'m a Tour Guide'
    })
    .visit(withBase('/components/avatar/'))
    .show({
      target: '.preview',
      title : 'Step 2',
      text  : 'This is Prev button'
    })
    .visit(withBase('/components/button/'))
    .show({
      target: '.pager-link.prev',
      title : 'Step 2',
      text  : 'This is Prev button'
    })
    .show({
      target: '.pager-link.next',
      title : 'Step 3',
      text  : 'This is Next button'
    })
</script>

# Tour
> Give the tour for new user.

## Usage

### Simple Usage

<p-button class="mt-3" @click="tour.start()">
  Try It
</p-button>

<input id="nganu" class="border" />

<preview class="flex-col space-y-2" label="sample">
  <div class="w-full max-w-xs overflow-y-auto h-52">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita explicabo necessitatibus eius architecto, similique quibusdam sed consequuntur? Esse, praesentium quidem. Dolorem repellendus numquam laudantium nisi labore animi. Iusto maxime exercitationem voluptatem molestias dolorum? Beatae minima deleniti tenetur quo ullam numquam, ab officiis id odio optio ipsam sed, <span id="sample" class="text-primary-100">sample text</span>, repellendus, voluptat.
  </div>
</preview>

```ts
import { createTour } from '@privyid/persona/core'

const tour = createTour()
  .show({
    target: '#sample',
    title : 'Step 1',
    text  : 'Hello World'
  })
  .show({
    target: '.pager-link.prev',
    title : 'Step 2',
    text  : 'Ini Prev button'
  })
  .show({
    target: '.pager-link.next',
    title : 'Step 3',
    text  : 'Ini Next button'
  })

// Start the tour
tour.start()
```
