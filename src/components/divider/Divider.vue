<template>
  <div class="divider" />
</template>

<style lang="postcss">
.divider {
  @apply bg-subtle-alpha my-2 w-[1px];

  .input-group > & {
    @apply flex items-center my-0 py-3 border-subtle bg-transparent z-1;

    &::before {
      @apply content-[''] bg-subtle-alpha w-[1px] h-full;
    }
  }

  .state--error & {
    @apply border-danger-emphasis;

    &::before {
      @apply bg-danger-emphasis;
    }
  }

  .state--disabled & {
    @apply bg-muted border-muted pointer-events-none text-muted;
  }
}
</style>
