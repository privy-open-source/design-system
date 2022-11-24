<template>
  <button
    data-testid="dropdown-item"
    class="dropdown__item"
    @click="handleOnClick">
    <slot>
      {{ text }}
    </slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue-demi'
import { DROPDOWN_CONTEXT } from './Dropdown.vue'

export default defineComponent({
  props: {
    text: {
      type   : String,
      default: '',
    },
  },
  emits: ['click'],
  setup (props, { emit }) {
    const context = inject(DROPDOWN_CONTEXT, undefined, true)

    function handleOnClick (event: Event) {
      emit('click', event)

      if (context?.close && !event.defaultPrevented)
        context.close()
    }

    return { handleOnClick }
  },
})
</script>

<style lang="postcss">
.dropdown__item {
  @apply px-3 py-2 cursor-pointer text-default w-full select-none text-left;

  .caption {
    @apply text-muted;
  }

  &:hover,
  &:focus-visible {
    @apply bg-default-alpha;
  }
}
</style>
