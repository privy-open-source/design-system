<template>
  <div class="app">
    <slot />
  </div>
</template>

<style lang="postcss">
/**
* Global Styling
*
*
 */
.app {
  /**
  * Hyperlink
  */
  a {
    --p-color-primary-hover: darken(theme(backgroundColor.accent.emphasis), 5%);
    @apply underline text-accent hover:bg-[color:var(--p-color-primary-hover)];
  }

  /**
  * Caption
  */
  caption {
    @apply text-xs text-muted;
  }

}
</style>
