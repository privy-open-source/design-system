<template>
  <li
    data-testid="breadcrumbs-item"
    class="breadcrumbs__item"
    :class="classNames">
    <component
      :is="tagName"
      :href="permalink"
      :class="{ 'breadcrumbs__item__link' : permalink }">
      <slot />
    </component>
    <div
      v-if="!active"
      data-testid="breadcrumbs-divider"
      class="breadcrumbs__item__divider">
      <component :is="divider" />
    </div>
  </li>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue-demi'
import {
  computed,
  inject,
  h,
  resolveComponent,
} from 'vue-demi'
import IconChevron from '@privyid/persona-icon/vue/chevron-right/20.vue'
import type { RouteLocationRaw } from 'vue-router'

const props = defineProps({
  href: {
    type   : [String, Object] as PropType<RouteLocationRaw>,
    default: '#' as RouteLocationRaw,
  },
  active: {
    type   : Boolean,
    default: false,
  },
})

const classNames = computed(() => {
  const result: string[] = ['']

  if (props.active)
    result.push('breadcrumbs__item--active')

  return result
})

const tagName = computed(() => {
  return props.active
    ? 'span'
    : resolveComponent('nuxt-link')
})

const permalink = computed(() => {
  if (props.active)
    return

  return props.href
})

const divider = inject('divider', () => h(IconChevron))
</script>

<style lang="postcss">
.breadcrumbs {
  &__item {
    @apply inline-flex text-sm items-center;

    &:last-child {
      & > .breadcrumbs__item__divider {
        @apply hidden;
      }
    }

    &:not(:last-child) {
      & > .breadcrumbs__item__divider {
        @apply inline-flex ml-3;
      }
    }

    & > .breadcrumbs__item__link {
      @apply text-subtle cursor-pointer underline decoration-solid hover:no-underline;
      @apply dark:text-dark-subtle;
    }

    & > span {
      @apply font-bold cursor-default;
    }
  }
}
</style>
