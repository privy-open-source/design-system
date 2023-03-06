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
    <IconChevron
      v-if="!active"
      data-testid="breadcrumbs-icon"
      class="breadcrumbs__item__icon" />
  </li>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue-demi'
import Dropdown from '../dropdown/Dropdown.vue'
import IconChevron from '@carbon/icons-vue/lib/chevron--right/16'

export default defineComponent({
  components: { Dropdown, IconChevron },
  props     : {
    text: {
      type   : String,
      default: '',
    },
    active: {
      type   : Boolean,
      default: false,
    },
  },

  setup (props) {
    const classNames = computed(() => {
      const result: string[] = ['breadcrumbs__item--dropdown']

      if (props.active)
        result.push('breadcrumbs__item--active')

      return result
    })

    return { classNames }
  },
})
</script>

<style lang="postcss">
.breadcrumbs__item {
  &&--dropdown {
    .dropdown__activator {
      @apply px-0 text-subtle bg-transparent border-transparent hover:shadow-none hover:border-transparent hover:bg-transparent focus:shadow-none focus:border-transparent focus:bg-transparent;
    }
  }

  &&--active {
    .dropdown__activator {
      @apply text-default;

      & > .dropdown__caret {
        @apply text-subtle;
      }
    }
  }
}
</style>
