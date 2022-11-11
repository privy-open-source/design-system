<template>
  <div
    class="tour__card"
    :class="{ 'tour--image': !!image }"
    data-testid="tour-card">
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
      width="400"
      height="225">
    <div class="tour__body">
      <p-subheading
        v-if="title"
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
            variant="ghost"
            color="primary"
            @click="$emit('dismiss', $event)">
            {{ dismissLabel }}
          </p-button>
          <span class="tour__divider">•</span>
        </template>

        <p-button
          data-testid="tour-control-prev"
          size="xs"
          variant="ghost"
          :disabled="step < 2"
          @click="$emit('prev', $event)">
          {{ prevLabel }}
        </p-button>

        <p-button
          v-if="step === totalStep"
          data-testid="tour-control-finish"
          size="xs"
          variant="solid"
          @click="$emit('next', $event)">
          {{ finishLabel }}
        </p-button>
        <p-button
          v-else
          data-testid="tour-control-next"
          size="xs"
          variant="solid"
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
import IconClose from '@carbon/icons-vue/lib/close/16'

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
  &__card {
    @apply rounded bg-blackWhite-95 text-white w-full max-w-xs z-50 overflow-hidden relative shadow-sm;
  }

  &__image {
    @apply max-w-full h-auto object-cover bg-white;
  }

  &__body {
    @apply p-4 space-y-3;
  }

  &__footer {
    @apply p-4 pt-2 space-x-3 flex items-center;
  }

  &__meta {
    @apply text-xs text-blackWhite-75 flex-shrink-0;
  }

  &__controls {
    @apply flex-grow flex space-x-2 justify-end items-center;

    /* TODO: Change this when color token was released */
    > .btn--ghost {
      @apply text-white hover:text-opacity-50;
    }
  }

  &__dismiss {
    @apply absolute top-3 right-3 hover:cursor-pointer text-white text-opacity-50 hover:text-opacity-100;

    .tour--image & {
      @apply text-black hover:text-opacity-50;
    }
  }
}
</style>
