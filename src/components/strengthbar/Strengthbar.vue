<template>
  <div
    class="strengthbar"
    :data-status="status">
    <div
      v-for="(active, i) in items"
      :key="i"
      class="strengthbar__bar"
      :class="{ 'strengthbar--active': active }" />
  </div>
</template>

<script lang="ts">
import { useToNumber } from '@vueuse/core'
import {
  computed,
  defineComponent,
  toRef,
} from 'vue-demi'

export default defineComponent({
  props: {
    length: {
      type   : [Number, String],
      default: 6,
    },
    value: {
      type   : [Number, String],
      default: 0,
    },
    min: {
      type   : [Number, String],
      default: 0,
    },
    max: {
      type   : [Number, String],
      default: 6,
    },
  },
  setup (props) {
    const min    = useToNumber(toRef(props, 'min'), { nanToZero: true })
    const max    = useToNumber(toRef(props, 'max'), { nanToZero: true })
    const value  = useToNumber(toRef(props, 'value'), { nanToZero: true })
    const length = useToNumber(toRef(props, 'length'), { nanToZero: true })

    const strength = computed(() => {
      return (value.value - min.value) / (max.value - min.value)
    })

    const items = computed(() => {
      return Array.from({ length: length.value })
        .map((_, i) => {
          return Math.round(strength.value * length.value) >= (i + 1)
        })
    })

    const status = computed(() => {
      const val = strength.value * 3

      if (val > 2)
        return 'high'
      else if (val > 1)
        return 'mid'
      else
        return 'low'
    })

    return {
      strength,
      items,
      status,
    }
  },
})
</script>

<style lang="postcss">
.strengthbar {
  @apply flex w-full space-x-4;

  &__bar {
    @apply rounded-full h-1 bg-subtle-alpha grow transition-colors duration-150;
    @apply dark:bg-dark-subtle-alpha;
  }

  &&[data-status="low"] {
    .strengthbar--active {
      @apply bg-danger-emphasis;
      @apply dark:bg-dark-danger-emphasis;
    }
  }

  &&[data-status="mid"] {
    .strengthbar--active {
      @apply bg-warning-emphasis;
      @apply dark:bg-dark-warning-emphasis;
    }
  }

  &&[data-status="high"] {
    .strengthbar--active {
      @apply bg-success-emphasis;
      @apply dark:bg-dark-success-emphasis;
    }
  }
}
</style>
