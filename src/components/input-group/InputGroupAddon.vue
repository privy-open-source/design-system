<template>
  <div class="input-group__addon">
    <slot />
  </div>
</template>

<style lang="postcss">
.input-group {
  &__addon {
    @apply flex items-center text-muted rounded border border-solid border-muted outline-none bg-default;
  }

  &--xs > .input-group__addon {
    @apply text-xs px-3 py-2;
  }

  &--sm > .input-group__addon {
    @apply px-3 py-2;
  }

  &--md > .input-group__addon {
    @apply px-3 py-3;
  }

  &--lg > .input-group__addon {
    @apply px-3 py-4;
  }
}
</style>
