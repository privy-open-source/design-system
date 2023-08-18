<template>
  <div
    data-testid="progressbar"
    role="progressbar"
    class="progressbar"
    :class="classNames"
    :data-value="percentage">
    <div
      class="progressbar__bar"
      :style="{ width }" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue-demi'
import { useProgressbar } from '.'

export default defineComponent({
  props: {
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
      default: 100,
    },
    success: {
      type   : Boolean,
      default: false,
    },
    error: {
      type   : Boolean,
      default: false,
    },
    indeterminate: {
      type   : Boolean,
      default: false,
    },
  },
  setup (props) {
    const percentage = useProgressbar(props)

    const width = computed(() => {
      if (props.success || props.error)
        return '100%'

      return `${percentage.value * 100}%`
    })

    const classNames = computed(() => {
      const result: string[] = []

      if (props.indeterminate)
        result.push('progressbar--indeterminate')

      if (props.error)
        result.push('progressbar--error')
      else if (props.success)
        result.push('progressbar--success')

      return result
    })

    return {
      width,
      percentage,
      classNames,
    }
  },
})
</script>

<style lang="postcss">
.progressbar {
  @apply bg-base w-full h-1 rounded-full overflow-hidden;
  @apply dark:bg-dark-base;

  &__bar {
    @apply bg-info-emphasis rounded-full h-full origin-center will-change-[width];
    @apply dark:bg-dark-info-emphasis;
  }

  &--indeterminate {
    .progressbar__bar {
      animation: 1s ease-in-out infinite alternate progressbar-bounce;
    }
  }

  &--success &__bar {
    @apply bg-success-emphasis;
    @apply dark:bg-dark-success-emphasis;
  }

  &--error &__bar {
    @apply bg-dark-danger-emphasis;
    @apply dark:bg-dark-danger-emphasis;
  }
}

@keyframes progressbar-bounce {
  0% {
    width: 40%;
    transform: translateX(-75%);
  }

  100% {
    width: 40%;
    transform: translateX(225%);
  }
}
</style>
