<template>
  <li
    data-testid="breadcrumbs-dropdown"
    class="breadcrumbs__item"
    :class="classNames">
    <Dropdown
      :text="text"
      placement="bottom-end"
      size="xs">
      <slot />
    </Dropdown>
    <div
      v-if="!active"
      data-testid="breadcrumbs-divider"
      class="breadcrumbs__item__divider">
      <component :is="divider" />
    </div>
  </li>
</template>

<script lang="ts" setup>
import {
  computed,
  inject,
  h,
} from 'vue-demi'
import Dropdown from '../dropdown/Dropdown.vue'
import IconChevron from '@privyid/persona-icon/vue/chevron-right/20.vue'

const props = defineProps({
  text: {
    type   : String,
    default: '',
  },
  active: {
    type   : Boolean,
    default: false,
  },
})

const classNames = computed(() => {
  const result: string[] = ['breadcrumbs__item--dropdown']

  if (props.active)
    result.push('breadcrumbs__item--active')

  return result
})

const divider = inject('divider', () => h(IconChevron))
</script>

<style lang="postcss">
.breadcrumbs__item {
  &&--dropdown {
    .dropdown__activator {
      &.btn.btn--default.btn--variant-solid {
        @apply px-0 text-subtle bg-transparent border-transparent hover:shadow-none hover:border-transparent hover:bg-transparent focus:shadow-none focus:border-transparent focus:bg-transparent;
        @apply dark:text-dark-subtle dark:bg-transparent dark:border-transparent hover:dark:border-transparent hover:dark:bg-transparent focus:dark:border-transparent focus:dark:bg-transparent;
      }
    }
  }

  &&--active {
    .dropdown__activator {
      &.btn.btn--default.btn--variant-solid {
        @apply text-default;
        @apply dark:text-dark-default;
      }

      & > .dropdown__caret {
        @apply text-subtle;
        @apply dark:text-dark-subtle;
      }
    }
  }
}
</style>
