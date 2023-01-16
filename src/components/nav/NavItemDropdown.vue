<template>
  <li
    data-testid="nav-item-dropdown"
    class="nav__item nav__item--dropdown">
    <Dropdown
      :text="text"
      :icon="icon"
      :variant="variant"
      :size="size"
      placement="bottom-end"
      :no-caret="noCaret">
      <template #button-content>
        <slot name="button-content">
          {{ text }}
        </slot>
      </template>

      <slot />
    </Dropdown>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue-demi'
import Dropdown from '../dropdown/Dropdown.vue'
import type {
  SizeVariant,
  StyleVariant,
} from '../button'

export default defineComponent({
  components: { Dropdown },
  props     : {
    text: {
      type   : String,
      default: '',
    },
    icon: {
      type   : Boolean,
      default: false,
    },
    size: {
      type   : String as PropType<SizeVariant>,
      default: 'md',
    },
    variant: {
      type   : String as PropType<StyleVariant>,
      default: 'ghost',
    },
    noCaret: {
      type   : Boolean,
      default: false,
    },
  },
})
</script>

<style lang="postcss">
.nav {
  &__item {
    &--dropdown {
      @apply ml-auto;
    }
  }

  &--fill {
    .nav__item {
      &--dropdown {
        @apply text-right;
      }
    }
  }
}
</style>
