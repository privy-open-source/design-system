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
    --p-color-info-hover: darken(theme(backgroundColor.accent.emphasis), 5%);
    @apply underline text-info hover:bg-[color:var(--p-color-info-hover)];
  }

  /**
  * Paragraph
  */
  p {
    @apply text-base;
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
  }
}
</style>
