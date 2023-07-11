<template>
  <Subheading
    overline
    data-testid="dropdown-header"
    weight="medium"
    class="dropdown__header">
    <slot />
  </Subheading>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import Subheading from '../subheading/Subheading.vue'

export default defineComponent({ components: { Subheading } })
</script>

<style lang="postcss">
.dropdown {
  &__header {
    @apply px-4 pt-3 pb-1;
  }
}
</style>
