<template>
  <div class="input-group__addon">
    <slot />
  </div>
</template>

<style lang="postcss">
.input-group {
  &__addon {
    @apply flex px-3 items-center rounded border border-solid border-muted outline-none text-muted bg-default;
    @apply dark:border-dark-muted dark:text-dark-muted dark:bg-dark-default;

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
      @apply dark:border-dark-danger-emphasis focus:dark:ring-dark-danger focus:dark:border-dark-danger-emphasis;
    }

    .state--disabled &,
    .input-group--disabled & {
      @apply bg-subtle border-subtle pointer-events-none text-muted;
      @apply dark:bg-dark-subtle dark:border-dark-subtle  dark:text-dark-muted;
    }
  }
}
</style>
