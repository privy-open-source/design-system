<template>
  <component
    :is="elementNames"
    data-testid="list-group-item"
    class="list-group__item"
    :aria-current="active"
    :aria-disabled="disabled"
    :class="classNames">
    <slot />
  </component>
</template>
<script lang="ts">
import {
  defineComponent, computed, PropType, ref,
} from 'vue-demi'
import IconCheck from '@privyid/persona-icon/vue/checkmark-circle/20.vue'
import pCaption from '../caption/Caption.vue'
import { ElementVariant } from '.'

export default defineComponent({
  components: { pCaption, IconCheck },
  props     : {
    active: {
      type   : Boolean,
      default: undefined,
    },
    disabled: {
      type   : Boolean,
      default: undefined,
    },
    element: {
      type   : String as PropType<ElementVariant>,
      default: 'span',
    },
  },
  setup (props) {
    const classNames = computed(() => {
      const result: string[] = ['']

      if (props.active)
        result.push('list-group__item--active')
      if (props.disabled)
        result.push('list-group__item--disabled')

      return result
    })

    const elementNames = computed(() => {
      const el = ref<string>('')
      el.value = props.element === 'link' ? 'a' : props.element

      return el.value
    })

    return {
      classNames,
      elementNames,
    }
  },
})
</script>
<style lang="postcss">
.list-group {
  &__item {
    --p-list-item-bg: theme(backgroundColor.default.DEFAULT);
    --p-list-item-bg-dark: theme(backgroundColor.dark.default.DEFAULT);
    --p-list-item-bg-active: theme(backgroundColor.default.alpha);
    --p-list-item-bg-active-dark: theme(backgroundColor.dark.default.alpha);
    --p-list-item-padding-x: theme(spacing.4);
    --p-list-item-padding-y: theme(spacing.2);

    @apply relative block px-[var(--p-list-item-padding-x)] py-[--p-list-item-padding-y] bg-[color:var(--p-list-item-bg)] first:rounded-t-md last:rounded-b-md text-default;
    @apply dark:bg-[color:var(--p-list-item-bg-dark)] dark:text-dark-default;

    .list-group--flush & {
      @apply first:rounded-none last:rounded-none;
    }

    .list-group--horizontal & {
      @apply first:rounded-l-md last:rounded-r-md first:rounded-tr-none last:rounded-bl-none;
    }

    a& {
      @apply cursor-pointer text-default hover:bg-default-alpha;
      @apply dark:text-dark-default dark:hover:bg-dark-default-alpha;
    }

    &:is(&--active) {
      @apply bg-[color:var(--p-list-item-bg-active)] cursor-default;
      @apply dark:bg-[color:var(--p-list-item-bg-active-dark)];
    }

    &:is(&--disabled) {
      @apply cursor-default bg-[color:var(--p-list-item-bg)/50] hover:bg-[color:var(--p-list-item-bg)/50] text-default/50 hover:text-default/50;
      @apply dark:bg-[color:var(--p-list-item-bg-dark)/50] dark:hover:bg-[color:var(--p-list-item-bg-dark)/50] dark:text-dark-default/50 dark:hover:text-dark-default/50;
    }
  }
}
</style>
