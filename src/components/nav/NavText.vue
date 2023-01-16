<template>
  <li
    class="nav__text"
    data-testid="nav-text">
    <slot />
  </li>
</template>

<style lang="postcss">
.nav {
  &__text {
    @apply inline-block ml-3;

    .navbar--collapse.collapse--show & {
      @apply ml-0;
    }
  }
}
</style>
