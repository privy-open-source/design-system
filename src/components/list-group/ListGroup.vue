<template>
  <span
    class="list-group"
    data-testid="list-group"
    :class="classNames">
    <slot />
  </span>
</template>
<script lang="ts" setup>
import { computed } from 'vue-demi'

const props = defineProps({
  flush: {
    type   : Boolean,
    default: false,
  },
  horizontal: {
    type   : Boolean,
    default: false,
  },
  borderless: {
    type   : Boolean,
    default: false,
  },
  rounded: {
    type   : Boolean,
    default: false,
  },
})

const classNames = computed(() => {
  const result: string[] = ['']

  if (props.flush)
    result.push('list-group--flush')
  if (props.horizontal)
    result.push('list-group--horizontal')
  if (props.borderless)
    result.push('list-group--borderless')
  if (props.rounded)
    result.push('list-group--rounded')

  return result
})
</script>
<style lang="postcss">
.list-group {
  --p-list-group-bg: theme(backgroundColor.default.DEFAULT);
  --p-list-group-bg-dark: theme(backgroundColor.dark.default.DEFAULT);

  @apply flex flex-col max-w-full divide-y divide-default border border-default rounded-md bg-[color:var(--p-list-group-bg)];
  @apply dark:border-dark-default dark:divide-dark-default dark:bg-[color:var(--p-list-group-bg-dark)];

  &--flush {
    @apply border-0 rounded-none;
  }

  &--horizontal {
    @apply flex-row divide-x divide-y-0;
  }

  &--borderless {
    @apply border-0 divide-y-0;
  }

  &--rounded {
    @apply divide-y-0;

    > :not([hidden]) ~ :not([hidden]),
    > :first-child {
      @apply rounded-md;
    }
  }
}
</style>
