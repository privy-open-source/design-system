<template>
  <div
    class="tour">
    <TransitionGroup name="fade">
      <TourHighlight
        v-if="isShow"
        :target="target" />
      <TourCard
        v-if="isShow"
        ref="card"
        v-bind="config" />
    </transitiongroup>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  shallowRef,
  watchEffect,
} from 'vue-demi'
import TourCard from './TourCard.vue'
import TourHighlight from './TourHighlight.vue'
import {
  autoUpdate,
  computePosition,
  shift,
  autoPlacement,
  inline,
  offset,
  hide as hidden,
} from '@floating-ui/dom'

type TourCardProps = Partial<InstanceType<typeof TourCard>['$props']>

export default defineComponent({
  components: {
    TourCard,
    TourHighlight,
  },
  setup () {
    const isShow = ref(false)
    const card   = shallowRef<InstanceType<typeof TourCard>>()
    const target = shallowRef<HTMLElement>()
    const config = shallowRef<TourCardProps>()
    const tour   = computed(() => card.value?.$el)

    watchEffect((onCleanup) => {
      if (target.value && tour.value) {
        const cleanup = autoUpdate(target.value, tour.value, async () => {
          computePosition(target.value, tour.value, {
            strategy  : 'fixed',
            middleware: [
              autoPlacement(),
              shift({ padding: 16 }),
              inline(),
              hidden(),
              offset(16),
            ],
          }).then(({ x, y, middlewareData }) => {
            if (tour.value) {
              tour.value.style.left = `${x || 0}px`
              tour.value.style.top  = `${y || 0}px`

              tour.value.style.visibility = middlewareData.hide.referenceHidden
                ? 'hidden'
                : 'visible'
            }
          })
        })

        onCleanup(cleanup)
      }
    })

    function show (targetEl: HTMLElement, options: TourCardProps) {
      target.value = targetEl
      config.value = options
      isShow.value = true
    }

    function hide () {
      isShow.value = false
    }

    return {
      isShow,
      card,
      target,
      show,
      hide,
      config,
    }
  },
})
</script>

<style lang="postcss">
.tour {
  & > &__card {
    @apply fixed;
  }
}
</style>
