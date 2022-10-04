<template>
  <div
    class="camera__mask-container"
    :class="classNames">
    <div
      class="camera__mask" />
  </div>
</template>

<script lang="ts">import {
  computed,
  defineComponent,
  PropType,
} from 'vue-demi'

export type TypeVariant = 'none' | 'circle' | 'square' | 'ektp'

export default defineComponent({
  props: {
    variant: {
      type   : String as PropType<TypeVariant>,
      default: 'none',
    },
  },
  setup (props) {
    const classNames = computed(() => {
      const result: string[] = []

      if (props.variant)
        result.push(`camera__mask--${props.variant}`)

      return result
    })

    return { classNames }
  },
})
</script>

<style lang="postcss">
.camera {
  &__mask-container {
    @apply absolute top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden pointer-events-none;
  }

  &__mask {
    @apply absolute top-1/2 left-1/2 shadow-[0_0_0_999px_rgba(0,0,0,0.5)] -translate-x-1/2 -translate-y-1/2;

    &--square & {
      @apply aspect-square w-1/2;
    }

    &--circle & {
      @apply aspect-square rounded-full w-1/2;
    }

    &--ektp & {
      @apply aspect-[8.56/5.98] w-2/3 rounded-md;
    }
  }
}
</style>
