<template>
  <button data-testid="btn" :class="classNames">
    <slot />

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
      const result: string[] = ['btn']

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
.btn {
  @apply p-2;
}

.btn-primary {
  @apply bg-primary-100 text-white;
}
</style>
