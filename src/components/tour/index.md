<script setup>
  import pTour from './TourCard.vue'
  import { useSelector } from './utils/use-selector'
  import { Tour } from './core/tour'
  import Basic from './step/basic'
  import Click from './step/click'
  import Delay from './step/delay'
  import { onMounted } from 'vue-demi'

  const target = useSelector('#sample')

  const tour       = new Tour({ skipOnError: true })
  const subTour    = new Tour()
  const extraTour  = new Tour()
  const extraTourB = new Tour()

  subTour
    .add(new Basic({
      target: '#sample',
      title : 'HEllo World',
      text  : 'Tour 1',
      name  : 'Tour 1',
    }))
    .add(new Basic({
      target: '.VPNavBar',
      text  : 'Tour 2',
      name  : 'Tour 2',
    }))

  extraTour
    .add(new Basic({
      target: '.pager-link.prev',
      title : 'Prev',
      text  : 'Ini Prev',
    }))
    .add(new Basic({
      target: '.pager-link.next',
      title : 'Next',
      text  : 'Ini Next',
    }))
    .add(new Click({ target: '.pager-link.next', action: 'click' }))
    .add(new Delay())
    .add(new Basic({
      target: '.dropzone',
      title : 'Dropzone',
      text  : 'Ini Dropzone',
    }))
    .add(new Click({ target: '.pager-link.prev', action: 'click' }))
    .add(new Delay())

  extraTourB
    .add(new Basic({
      target: '.VPSidebar .link[href="/design-system/components/tooltip/"]',
      title : 'Tooltip',
      text  : 'Ini Tooltip',
    }))
    .add(new Basic({
      target: '.VPSidebar .link[href="/design-system/components/avatar/"]',
      title : 'Avatar',
      text  : 'Ini Avatar',
    }))

  tour
    .add(new Click({ target: '#nganu', action: 'clear', params: [] }))
    .add(new Click({ target: '#nganu', action: 'type', params: ['ABCCCSS'] }))
    .add(subTour)
    .add(extraTour)
    .add(new Click({ target: '.VPLocalNav > .menu', action: 'click' }))
    .add(extraTourB)
    .add(new Click({ target: '.VPBackdrop', action: 'click' }))
    .add(new Basic({ target: '#tour-start', text: 'Click this to re-start the tour' }))
</script>

# Tour
> Give the tour for new user.

## Usage

### Simple Usage

<a href="#" id="tour-start" @click.prevent="tour.start()">Start</a>

<input id="nganu" class="border" />

<preview class="flex-col space-y-2">
  <div class="w-full max-w-xs overflow-y-auto h-52">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita explicabo necessitatibus eius architecto, similique quibusdam sed consequuntur? Esse, praesentium quidem. Dolorem repellendus numquam laudantium nisi labore animi. Iusto maxime exercitationem voluptatem molestias dolorum? Beatae minima deleniti tenetur quo ullam numquam, ab officiis id odio optio ipsam sed, repellendus, voluptate <span id="sample">saepe</span>.
  </div>
</preview>
