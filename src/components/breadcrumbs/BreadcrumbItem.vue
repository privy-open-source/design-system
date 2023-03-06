<template>
  <li
    data-testid="breadcrumbs-item"
    class="breadcrumbs__item"
    :class="classNames">
    <component
      :is="tagName"
      :href="permalink">
      <slot />
    </component>
    <IconChevron
      v-if="!active"
      data-testid="breadcrumbs-icon"
      class="breadcrumbs__item__icon" />
  </li>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue-demi'
import IconChevron from '@carbon/icons-vue/lib/chevron--right/16'
import { TagVariant } from '.'

export default defineComponent({
  components: { IconChevron },
  props     : {
    href: {
      type   : String,
      default: '#',
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

    const tagName = computed(() => {
      let tag: TagVariant = 'a'

      if (props.active)
        tag = 'span'

      return tag
    })

    const permalink = computed(() => {
      if (props.active)
        return

      return props.href
    })

    return {
      classNames, tagName, permalink,
    }
  },
})
</script>

<style lang="postcss">
.breadcrumbs {
  &__item {
    @apply inline-flex text-sm items-center;

    &:last-child {
      & > .breadcrumbs__item__icon {
        @apply hidden;
      }
    }

    &:not(:last-child) {
      & > .breadcrumbs__item__icon {
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
