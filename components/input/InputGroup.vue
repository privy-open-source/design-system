<template>
  <div class="input-group" data-testid="input-group">
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
      @apply rounded-r-none;
    }
  }
}
</style>
