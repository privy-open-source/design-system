<template>
  <div class="input-group__addon">
    <slot />
  </div>
</template>

<style lang="postcss">
.input-group {
  &__addon {
    @apply flex px-3 items-center rounded border border-solid border-muted outline-none text-muted bg-default;

    .input-group--xs > & {
      @apply text-sm py-[2px];
    }

    .input-group--sm > & {
      @apply py-1;
    }

    .input-group--md > & {
      @apply py-[10px];
    }

    .input-group--lg > & {
      @apply py-4;
    }

    .state--error &,
    .input-group--error & {
      @apply border-danger-emphasis focus:ring-danger focus:border-danger-emphasis;
    }

    .state--disabled &,
    .input-group--disabled & {
      @apply bg-subtle border-subtle pointer-events-none text-muted;
    }
  }
}
</style>
