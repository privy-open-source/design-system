<template>
  <li
    data-testid="breadcrumbs-item"
    class="breadcrumbs__item"
    :class="classNames">
    <span v-if="active">
      <slot />
    </span>
    <a
      v-else
      :href="href">
      <slot />
    </a>
    <IconChevron
      v-if="!active"
      class="breadcrumbs__icon" />
  </li>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue-demi'
import IconChevron from '@carbon/icons-vue/lib/chevron--right/16'

export default defineComponent({
  components: { IconChevron },
  props     : {
    href: {
      type   : String,
      default: undefined,
    },
    active: {
      type   : Boolean,
      default: false,
    },
  },

  setup (props) {
    const classNames = computed(() => {
      const result: string[] = ['']

      if (props.active)
        result.push('breadcrumbs__item--active')

      return result
    })

    return { classNames }
  },
})
</script>

<style lang="postcss">
.breadcrumbs {
  &__item {
    @apply inline-flex text-sm items-center;

    &:not(:last-child) {
      .breadcrumbs__icon {
        @apply inline-flex ml-3;
      }
    }

    & > a {
      @apply text-subtle cursor-pointer underline decoration-solid hover:no-underline;
    }

    & > span {
      @apply font-bold cursor-default;
    }
  }
}
</style>
