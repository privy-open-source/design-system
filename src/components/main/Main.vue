<template>
  <main class="main">
    <slot />
  </main>
</template>

<style lang="postcss">
.main {
  /**
  * Permalink
  */
  a {
    --p-color-link-hover: darken(theme(textColor.link), 5%);
    --p-color-dark-link-hover: darken(theme(textColor.link), 5%);
    @apply underline text-link hover:text-[color:var(--p-color-info-hover)];
    @apply dark:text-dark-link hover:dark:text-[color:var(--p-color-dark-info-hover)];
  }

  /**
  * Paragraph
  */
  p {
    @apply text-base text-default;
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
