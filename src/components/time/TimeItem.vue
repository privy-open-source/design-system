<template>
  <div
    ref="container"
    class="time__items splide"
    :class="`time__times--${timeType}`">
    <div class="splide__track">
      <div class="splide__list">
        <div
          v-for="option in options"
          :key="option"
          class="time__item splide__slide">
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  watch,
  computed,
} from 'vue-demi'
import { watchDebounced } from '@vueuse/core'
import type {
  PropType,
  Ref,
} from 'vue-demi'
import { useTime } from './index'
import { useVModel } from '../input'
import type { Options } from '@splidejs/splide'
import '@splidejs/splide/css/core'

type TimeType = 'hour' | 'minute' | 'ampm'

const props = defineProps({
  modelValue: {
    type   : String,
    default: '00',
  },
  timeType: {
    type   : String as PropType<TimeType>,
    default: 'hour',
  },
  options: {
    type   : Array<string>,
    default: () => [],
  },
})

const { splide, activeSplide, initSplide } = useTime()

const model     = useVModel(props)
const container = ref<HTMLDivElement>()

const timeOptions = computed(() => props.options)

watch(activeSplide, (value) => {
  model.value = props.options[value]
})

watchDebounced(timeOptions, (value) => {
  if (!splide.value)
    return

  const splideOptions: Options = {
    ...splide.value.options,
    clones: value.length === 1 ? 0 : undefined,
  }

  splide.value.options = splideOptions
  splide.value.refresh()

  if (!value.includes(model.value))
    model.value = value[0]
}, { flush: 'post', debounce: 50 })

onMounted(async () => {
  if (container.value) {
    const splideOptions: Options = {
      start: timeOptions.value.indexOf(model.value),
      type : props.timeType === 'ampm' ? 'slide' : 'loop',
    }

    await initSplide(container as Ref<HTMLDivElement>, splideOptions)
  }

  splide.value?.on('refresh', () => {
    const index = timeOptions.value.indexOf(model.value)

    splide.value?.go(index === -1 ? 0 : index)
  })
})

</script>

<style lang="postcss">
.time {
  &__items {
    &:before {
      @apply absolute content-[''] w-[42px] h-12 border-default dark:border-dark-default border-y;
      @apply top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%];
    }
  }

  &__item {
    @apply text-center px-2.5 py-3 text-subtle dark:text-dark-subtle cursor-pointer;
    @apply transition-[color] duration-[50ms];

    &.is-active {
      @apply text-default dark:text-dark-default font-medium cursor-default;
    }
  }
}
</style>
