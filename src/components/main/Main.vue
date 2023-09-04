<template>
  <main class="main">
    <slot />
  </main>
</template>

<style lang="postcss">
.main {
  --p-spacer: 1rem;

  /**
  * Heading
  */
  h1, h2, h3, h4, h5, h6 {
    --p-heading-margin-bottom: calc(var(--p-spacer) * .5);
    @apply mb-[var(--p-heading-margin-bottom)];
  }

  /**
  * Permalink
  */
  a {
    &:not(.navbar__brand, .sidebar__brand, .dropdown__item, .list-group__item, .btn, .nav__link, .breadcrumbs__item__link) {
      --p-color-link-hover: darken(theme(textColor.link), 5%);
      --p-color-dark-link-hover: darken(theme(textColor.link), 5%);
      @apply underline text-link hover:text-[color:var(--p-color-link-hover)];
      @apply dark:text-dark-link hover:dark:text-[color:var(--p-color-dark-link-hover)];
    }
  }

  /**
  * Paragraph
  */
  p {
    --p-paragraph-margin-bottom: var(--p-spacer);
    @apply mt-0 mb-[var(--p-paragraph-margin-bottom)] text-base text-default;
    @apply dark:text-dark-default;
  }

  /**
  * Small
  */
  small {
    @apply text-tn;
  }

  /**
  * Strong
  */
  strong {
    @apply font-bold;
  }

  /**
  * Caption
  */
  caption {
    @apply text-xs text-muted;
    @apply dark:text-dark-muted;
  }
}

</style>
