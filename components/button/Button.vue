<template>
  <button data-testid="button" class="btn" :class="classNames">
    <slot></slot>

  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue-demi'

export default defineComponent({
  props: {
    variant: {
      type    : String,
      default : 'primary'
    },
  },
  setup (props) {
    const classNames = computed(() => {
      const result = []

      if (props.variant)
        result.push(`btn-${props.variant}`)

      return result
    })

    return {
      classNames
    }
  }
})
</script>

<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

.btn {
  @apply p-1 rounded bg-red-500 text-white;
}
</style>
