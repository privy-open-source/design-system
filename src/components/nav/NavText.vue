<template>
  <li
    data-testid="nav-text"
    class="nav__text">
    <slot />
  </li>
</template>
<style lang="postcss">
.nav {
  &__text {
    @apply text-base py-3 inline-block;
  }
}
</style>
