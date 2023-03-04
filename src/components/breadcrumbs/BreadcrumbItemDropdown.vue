<template>
  <li
    data-testid="breadcrumbs-dropdown"
    class="breadcrumbs__item breadcrumbs__item--dropdown"
    :class="classNames">
    <Dropdown
      :text="text"
      placement="bottom-end"
      size="xs">
      <slot />
    </Dropdown>
  </li>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue-demi'
import Dropdown from '../dropdown/Dropdown.vue'

export default defineComponent({
  components: { Dropdown },
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
.breadcrumbs__item {
  &&--dropdown {
    .dropdown__activator {
      @apply text-subtle bg-transparent border-transparent hover:shadow-none hover:border-transparent hover:bg-transparent focus:shadow-none focus:border-transparent focus:bg-transparent;
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
