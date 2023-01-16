<template>
  <li
    class="nav__form"
    data-testid="nav-form">
    <slot />
  </li>
</template>

<style lang="postcss">
.nav {
  &__form {
    @apply flex items-center ml-3 flex-wrap gap-2 h-[45px];

    input {
      @apply inline-block align-middle w-auto;
    }

    .navbar--collapse.collapse--show & {
      @apply ml-0;
    }
  }
}
</style>
