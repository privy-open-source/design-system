<template>
  <div
    data-testid="divider"
    class="divider"
    :class="classNames" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue-demi'

export default defineComponent({
  props: {
    vertical: {
      type   : Boolean,
      default: false,
    },
  },
  setup (props) {
    const classNames = computed(() => {
      const result: string[] = []

      if (props.vertical)
        result.push('divider--vertical')
      else
        result.push('divider--horizontal')

      return result
    })

    return { classNames }
  },
})
</script>

<style lang="postcss">
.divider {
  @apply bg-subtle-alpha my-2 w-[1px];

  &&--vertical,
  .input-group > & {
    @apply flex items-center my-0 py-3 border-subtle bg-transparent z-1;

    &::before {
      @apply content-[''] bg-subtle-alpha w-[1px] h-full;
    }
  }

  .state--error & {
    @apply border-danger-emphasis;

    &::before {
      @apply bg-danger-emphasis;
    }
  }

  .state--disabled & {
    @apply bg-subtle border-muted pointer-events-none text-muted;
  }
}
</style>
