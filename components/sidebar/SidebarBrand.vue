<template>
  <a
    :href="href"
    data-testid="sidebar-brand"
    class="sidebar__brand">
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
.sidebar {
  &__brand {
    @apply block text-center mx-auto font-semibold hover:no-underline pb-4;

    img {
      @apply max-w-full h-auto;
    }
  }

  &&--tabs,
  &&--lines {
    .sidebar__brand {
      @apply pr-2;
    }
  }

  &&--lines {
    .sidebar__brand {
      @apply pl-2;
    }
  }
}
</style>
