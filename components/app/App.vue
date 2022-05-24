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
    @apply underline text-primary-100 hover:text-primary-hovered;
  }

  /**
  * Caption
  */
  caption {
    @apply text-xs text-subtext-100;
  }


}
</style>
