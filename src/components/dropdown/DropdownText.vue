<template>
  <div
    data-testid="dropdown-text"
    class="dropdown__item dropdown__item--text">
    <slot />
  </div>
</template>
<style lang="postcss">
.dropdown__item {
  &--text {
    @apply cursor-text text-subtle hover:text-subtle;
    @apply dark:text-dark-subtle dark:hover:text-dark-subtle;

    &:has(.checkbox, .radio) {
      @apply py-0 px-0;

      .checkbox,
      .radio {
        @apply py-2 px-4;
      }
    }

    &:not(:has(.checkbox, .radio)) {
      @apply hover:bg-transparent;
      @apply dark:hover:bg-transparent;
    }

    .checkbox,
    .radio {
      @apply flex;
    }
  }
}
</style>
