<template>
  <component
    :is="tagName"
    data-testid="dropdown-item"
    class="dropdown__item"
    :class="classNames"
    :href="href"
    @click="handleOnClick">
    <slot>
      {{ text }}
    </slot>
  </component>
</template>

<script lang="ts">
import {
  defineComponent, inject, computed,
} from 'vue-demi'
import { DROPDOWN_CONTEXT } from '.'
import { TagVariant } from '../button'

export default defineComponent({
  props: {
    text: {
      type   : String,
      default: '',
    },
    href: {
      type   : String,
      default: undefined,
    },
    active: {
      type   : Boolean,
      default: false,
    },
  },
  emits: ['click'],
  setup (props, { emit }) {
    const context = inject(DROPDOWN_CONTEXT, undefined, true)

    function handleOnClick (event: Event) {
      emit('click', event)

      if ((context?.close && !event.defaultPrevented) || (event.defaultPrevented && props.href))
        context.close()
    }

    const classNames = computed(() => {
      const result: string[] = ['']

      if (props.active)
        result.push('dropdown__item--active')

      return result
    })

    const tagName = computed(() => {
      let tag: TagVariant = 'button'

      if (props.href)
        tag = 'a'

      return tag
    })

    return {
      handleOnClick, classNames, tagName,
    }
  },
})
</script>

<style lang="postcss">
.dropdown__item {
  @apply px-4 py-2 block cursor-pointer text-default w-full select-none text-left;
  @apply dark:text-dark-default;

  &:is(a) {
    @apply hover:text-default;
    @apply hover:dark:text-dark-default;
  }

  &:hover,
  &:focus-visible {
    @apply bg-default-alpha;
    @apply dark:bg-dark-default-alpha;
  }

  &&--active {
    @apply bg-default-alpha;
    @apply dark:bg-dark-default-alpha cursor-default;
  }
}
</style>
