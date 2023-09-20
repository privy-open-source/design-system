<template>
  <div
    class="tour__dialog"
    :class="{ 'tour--image': !!image }"
    data-testid="tour-dialog">
    <span
      v-if="dismissable"
      data-testid="tour-dismiss"
      class="tour__dismiss"
      @click="$emit('dismiss', $event)">
      <IconClose />
    </span>
    <img
      v-if="image"
      class="tour__image"
      data-testid="tour-image"
      :src="image"
      alt="tour-image"
      width="320"
      height="195">
    <div class="tour__body">
      <p-subheading
        v-if="title"
        class="tour__title"
        size="sm">
        <span
          v-p-md.inline="title"
          data-testid="tour-title" />
      </p-subheading>
      <p-caption>
        <span
          v-p-md.inline="text"
          data-testid="tour-text" />
      </p-caption>
    </div>
    <div class="tour__footer">
      <div
        v-if="totalStep > 2"
        class="tour__meta"
        data-testid="tour-meta">
        {{ step }} / {{ totalStep }}
      </div>
      <div class="tour__controls">
        <template v-if="dismissable && step < totalStep">
          <p-button
            data-testid="tour-control-dismiss"
            size="xs"
            variant="link"
            @click="$emit('dismiss', $event)">
            {{ dismissLabel }}
          </p-button>
          <span class="tour__divider">•</span>
        </template>

        <p-button
          data-testid="tour-control-prev"
          size="xs"
          variant="link"
          :disabled="step < 2"
          @click="$emit('prev', $event)">
          {{ prevLabel }}
        </p-button>

        <p-button
          v-if="step === totalStep"
          data-testid="tour-control-finish"
          size="xs"
          variant="solid"
          color="info"
          @click="$emit('next', $event)">
          {{ finishLabel }}
        </p-button>
        <p-button
          v-else
          data-testid="tour-control-next"
          size="xs"
          variant="solid"
          color="info"
          @click="$emit('next', $event)">
          {{ nextLabel }}
        </p-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import pSubheading from '../subheading/Subheading.vue'
import pCaption from '../caption/Caption.vue'
import pButton from '../button/Button.vue'
import { pMd } from '../markdown'
import IconClose from '@privyid/persona-icon/vue/close/16.vue'

export default defineComponent({
  components: {
    pSubheading,
    pCaption,
    pButton,
    IconClose,
  },
  directives: { pMd },
  props     : {
    title: {
      type   : String,
      default: undefined,
    },
    text: {
      type   : String,
      default: '',
    },
    image: {
      type   : String,
      default: undefined,
    },
    highlight: {
      type   : Boolean,
      default: true,
    },
    step: {
      type   : Number,
      default: 0,
    },
    totalStep: {
      type   : Number,
      default: 0,
    },
    dismissable: {
      type   : Boolean,
      default: true,
    },
    prevLabel: {
      type   : String,
      default: 'Previous',
    },
    nextLabel: {
      type   : String,
      default: 'Next',
    },
    dismissLabel: {
      type   : String,
      default: 'Dismiss',
    },
    finishLabel: {
      type   : String,
      default: 'Finish',
    },
  },
  emits: [
    'prev',
    'next',
    'dismiss',
  ],
  setup () {
    return {}
  },
})
</script>

<style lang="postcss">
.tour {
  &__dialog {
    @apply z-[var(--p-tour-z-index)] rounded bg-inverse w-full max-w-xs overflow-hidden relative shadow-sm;
    @apply dark:bg-dark-inverse;
  }

  &__image {
    @apply max-w-full h-auto object-cover bg-default;
    @apply dark:bg-dark-default;
  }

  &__body {
    @apply p-4 space-y-3;

    .tour__title {
      @apply text-on-emphasis;
      @apply dark:text-dark-on-emphasis;
    }

    > * {
      @apply text-on-emphasis;
      @apply dark:text-dark-on-emphasis;
    }
  }

  &__footer {
    @apply p-4 pt-2 space-x-3 flex items-center;
  }

  &__meta {
    @apply text-xs text-muted flex-shrink-0;
    @apply dark:text-dark-muted;
  }

  &__controls {
    @apply flex-grow flex space-x-2 justify-end items-center;

    > .btn--variant-link.btn--default {
      @apply text-on-emphasis hover:text-on-emphasis focus:text-on-emphasis;
      @apply dark:text-dark-on-emphasis hover:dark:text-dark-on-emphasis focus:dark:text-dark-on-emphasis;
    }

    > .tour__divider {
      @apply text-on-emphasis;
      @apply dark:text-dark-on-emphasis;
    }
  }

  &__dismiss {
    @apply absolute top-3 right-3 hover:cursor-pointer text-on-emphasis/30 hover:text-on-emphasis/50;
    @apply dark:text-dark-on-emphasis/30 hover:dark:text-dark-on-emphasis/50;

    .tour--image & {
      @apply text-default/30 hover:text-default/50;
      @apply dark:text-dark-default/30 hover:dark:text-dark-default/50;
    }
  }
}
</style>
