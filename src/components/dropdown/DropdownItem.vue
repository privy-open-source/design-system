<template>
  <component
    :is="tagName"
    data-testid="dropdown-item"
    class="dropdown__item"
    :class="classNames"
    :href="href"
    :disabled="disabled"
    @click="handleOnClick">
    <slot>
      {{ text }}
    </slot>
  </component>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue-demi'
import {
  inject,
  computed,
} from 'vue-demi'
import { DROPDOWN_CONTEXT } from '.'
import type { TagVariant } from '../button'
import type { RouteLocationRaw } from 'vue-router'

const props = defineProps({
  text: {
    type   : String,
    default: '',
  },
  href: {
    type   : [String, Object] as PropType<RouteLocationRaw>,
    default: undefined,
  },
  active: {
    type   : Boolean,
    default: false,
  },
  disabled: {
    type   : Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  'click': [Event],
}>()

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
</script>

<style lang="postcss">
.dropdown__item {
  @apply px-4 py-2 block cursor-pointer text-default w-full select-none text-left;
  @apply dark:text-dark-default;

  &:is(a) {
    @apply no-underline hover:no-underline hover:text-default;
    @apply hover:dark:text-dark-default;
  }

  &:hover,
  &:focus-visible {
    @apply bg-default-alpha text-default;
    @apply dark:bg-dark-default-alpha dark:text-dark-default;
  }

  &&--active,
  &.selected {
    @apply bg-default-alpha text-default;
    @apply dark:bg-dark-default-alpha cursor-default dark:text-dark-default;
  }

  &:disabled {
    @apply opacity-50 pointer-events-none;
  }
}
</style>
