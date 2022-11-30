<template>
  <div
    class="input-group"
    data-testid="input-group">
    <slot />
  </div>
</template>

<style lang="postcss">
.input-group {
  @apply flex w-full;

  > .input,
  > .btn,
  > .select > .input {
    &:not(:first-child) {
      @apply rounded-l-none border-l-0;
    }

    &:not(:last-child) {
      @apply rounded-r-none border-r-0;
    }
  }

  > .divider {
    @apply block my-0 py-3 border-y border-secondary-25;

    &::before {
      @apply content-[''] bg-secondary-25 w-[1px] h-full;
    }
  }
}
</style>
