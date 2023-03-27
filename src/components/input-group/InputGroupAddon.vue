<template>
  <div class="input-group__addon">
    <slot />
  </div>
</template>

<style lang="postcss">
.input-group {
  &__addon {
    @apply flex items-center text-muted rounded border border-solid border-muted outline-none bg-default;

    .input-group--xs > & {
      @apply text-xs px-3 py-2;
    }

    .input-group--sm > & {
      @apply px-3 py-2;
    }

    .input-group--md > & {
      @apply px-3 py-3;
    }

    .input-group--lg > & {
      @apply px-3 py-4;
    }

    .state--error &,
    .input-group--error & {
      @apply border-danger-emphasis;

      &:focus {
        @apply ring-danger border-danger-emphasis;
      }
    }

    .state--disabled &,
    .input-group--disabled & {
      @apply bg-subtle border-muted pointer-events-none text-muted;
    }
  }
}
</style>
