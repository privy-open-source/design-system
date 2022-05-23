<template>
  <button
    data-testid="dropdown-item"
    class="dropdown__item">
    <slot />
  </button>
</template>

<style lang="postcss">
.dropdown__item {
  @apply px-3 py-2 cursor-pointer text-body-100 w-full select-none text-left;

  &:hover,
  &:focus-visible {
    @apply bg-secondary-25;
  }
}
</style>
