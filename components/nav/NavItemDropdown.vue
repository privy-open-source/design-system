<template>
  <li
    data-testid="nav-item-dropdown"
    class="nav__item nav__item--dropdown">
    <Dropdown
      :text="text"
      placement="bottom-end"
      variant="ghost"
      :icon="icon">
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
import { defineComponent } from 'vue-demi'
import Dropdown from '../dropdown/Dropdown.vue'

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
