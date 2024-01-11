<template>
  <Subheading
    overline
    data-testid="dropdown-header"
    weight="medium"
    class="dropdown__header">
    <span>
      <slot />
    </span>
    <span
      v-if="$slots.action"
      data-testid="dropdown-header-action"
      class="dropdown__header__action">
      <slot name="action" />
    </span>
  </Subheading>
</template>

<script lang="ts" setup>
import Subheading from '../subheading/Subheading.vue'
</script>

<style lang="postcss">
.dropdown {
  &__header {
    @apply px-4 pt-3 pb-1 flex items-center justify-between;

    &__action {
      @apply normal-case font-medium;
    }
  }
}
</style>
