<template>
  <a
    :href="href"
    data-testid="navbar-brand"
    class="navbar__brand">
    <slot />
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  props: {
    href: {
      type   : String,
      default: undefined,
    },
  },
})

</script>

<style lang="postcss">
  a.navbar {
    &__brand {
      @apply inline-block mr-4 text-xl py-1 font-medium text-default no-underline cursor-pointer hover:no-underline;
      @apply dark:text-dark-default;

      img {
        @apply h-7 w-auto inline-block;
      }
    }
  }

</style>
