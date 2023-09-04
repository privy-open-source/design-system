<template>
  <div class="preview">
    <slot />
    <span class="preview__label">{{ label }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  props: {
    label: {
      type   : String,
      default: 'preview',
    },
  },
})
</script>

<style lang="postcss">
.preview {
  @apply bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAnIGhlaWdodD0nMTAwJyB2aWV3Qm94PScwIDAgMTAwIDEwMCc+PGcgZmlsbC1ydWxlPSdldmVub2RkJz48ZyBmaWxsPScjMDA2NWQxJyBmaWxsLW9wYWNpdHk9JzAuMSc+PHBhdGggb3BhY2l0eT0nLjUnIGQ9J005NiA5NWg0djFoLTR2NGgtMXYtNGgtOXY0aC0xdi00aC05djRoLTF2LTRoLTl2NGgtMXYtNGgtOXY0aC0xdi00aC05djRoLTF2LTRoLTl2NGgtMXYtNGgtOXY0aC0xdi00aC05djRoLTF2LTRIMHYtMWgxNXYtOUgwdi0xaDE1di05SDB2LTFoMTV2LTlIMHYtMWgxNXYtOUgwdi0xaDE1di05SDB2LTFoMTV2LTlIMHYtMWgxNXYtOUgwdi0xaDE1di05SDB2LTFoMTVWMGgxdjE1aDlWMGgxdjE1aDlWMGgxdjE1aDlWMGgxdjE1aDlWMGgxdjE1aDlWMGgxdjE1aDlWMGgxdjE1aDlWMGgxdjE1aDlWMGgxdjE1aDR2MWgtNHY5aDR2MWgtNHY5aDR2MWgtNHY5aDR2MWgtNHY5aDR2MWgtNHY5aDR2MWgtNHY5aDR2MWgtNHY5aDR2MWgtNHY5em0tMSAwdi05aC05djloOXptLTEwIDB2LTloLTl2OWg5em0tMTAgMHYtOWgtOXY5aDl6bS0xMCAwdi05aC05djloOXptLTEwIDB2LTloLTl2OWg5em0tMTAgMHYtOWgtOXY5aDl6bS0xMCAwdi05aC05djloOXptLTEwIDB2LTloLTl2OWg5em0tOS0xMGg5di05aC05djl6bTEwIDBoOXYtOWgtOXY5em0xMCAwaDl2LTloLTl2OXptMTAgMGg5di05aC05djl6bTEwIDBoOXYtOWgtOXY5em0xMCAwaDl2LTloLTl2OXptMTAgMGg5di05aC05djl6bTEwIDBoOXYtOWgtOXY5em05LTEwdi05aC05djloOXptLTEwIDB2LTloLTl2OWg5em0tMTAgMHYtOWgtOXY5aDl6bS0xMCAwdi05aC05djloOXptLTEwIDB2LTloLTl2OWg5em0tMTAgMHYtOWgtOXY5aDl6bS0xMCAwdi05aC05djloOXptLTEwIDB2LTloLTl2OWg5em0tOS0xMGg5di05aC05djl6bTEwIDBoOXYtOWgtOXY5em0xMCAwaDl2LTloLTl2OXptMTAgMGg5di05aC05djl6bTEwIDBoOXYtOWgtOXY5em0xMCAwaDl2LTloLTl2OXptMTAgMGg5di05aC05djl6bTEwIDBoOXYtOWgtOXY5em05LTEwdi05aC05djloOXptLTEwIDB2LTloLTl2OWg5em0tMTAgMHYtOWgtOXY5aDl6bS0xMCAwdi05aC05djloOXptLTEwIDB2LTloLTl2OWg5em0tMTAgMHYtOWgtOXY5aDl6bS0xMCAwdi05aC05djloOXptLTEwIDB2LTloLTl2OWg5em0tOS0xMGg5di05aC05djl6bTEwIDBoOXYtOWgtOXY5em0xMCAwaDl2LTloLTl2OXptMTAgMGg5di05aC05djl6bTEwIDBoOXYtOWgtOXY5em0xMCAwaDl2LTloLTl2OXptMTAgMGg5di05aC05djl6bTEwIDBoOXYtOWgtOXY5em05LTEwdi05aC05djloOXptLTEwIDB2LTloLTl2OWg5em0tMTAgMHYtOWgtOXY5aDl6bS0xMCAwdi05aC05djloOXptLTEwIDB2LTloLTl2OWg5em0tMTAgMHYtOWgtOXY5aDl6bS0xMCAwdi05aC05djloOXptLTEwIDB2LTloLTl2OWg5em0tOS0xMGg5di05aC05djl6bTEwIDBoOXYtOWgtOXY5em0xMCAwaDl2LTloLTl2OXptMTAgMGg5di05aC05djl6bTEwIDBoOXYtOWgtOXY5em0xMCAwaDl2LTloLTl2OXptMTAgMGg5di05aC05djl6bTEwIDBoOXYtOWgtOXY5eicvPjxwYXRoIGQ9J002IDVWMEg1djVIMHYxaDV2OTRoMVY2aDk0VjVINnonLz48L2c+PC9nPjwvc3ZnPg==")];
  @apply flex justify-center items-center w-full p-5 mt-3 border-2 rounded border-info-emphasis/30 relative bg-transparent dark:border-dark-info-emphasis/30 text-default;

  a {
    &:not(.freetext-btn, .freetext-btn2, .freetext-caption2, .freetext-formlabel, .freetext-formlabel2, .freetext-overline, .freetext-subheading, .freetext-subheading2, .breadcrumbs__item__link) {
      @apply font-inherit text-inherit hover:text-inherit;
    }
  }

  p {
    @apply my-0;
  }

  h2 {
    @apply border-t-0;
  }

  &__label {
    @apply absolute top-[0.6em] right-[1em] text-[0.8rem] text-muted select-none pointer-events-none;
  }

  ul {
    @apply list-none m-0 p-0;

    li + li {
      @apply mt-0;
    }
  }

  /**
  * Content
  */
  .vp-doc {
    ul, ol {
      @apply p-0 m-0;
    }
  }

  /**
  * Navigation
  */
  .nav {
    &__link {
      @apply text-subtle hover:text-default;

      &--active {
        @apply text-default;
      }

      &--disabled {
        @apply text-muted hover:text-muted;
      }
    }
  }

  /**
  * Heading
  */
  .h {
  &1 {
    @apply text-7xl;
  }
  &2 {
    @apply text-6xl;
  }
  &3 {
    @apply text-5xl;
  }
  &4 {
    @apply text-4xl;
  }
  &5 {
    @apply text-2xl;
  }
  &6 {
    @apply text-xl;
  }
}
}
</style>
