<template>
  <component 
    data-testid="card"
    v-if="show"
    :is="elementNames"
    :class="classNames">
    <header data-testid="card-header" class="card__header" v-if="$slots.header">
      <slot name="header" />
    </header>

    <header class="card__header card__header--default" v-else-if="title">
      <Heading element="h6">
        {{ title }}
      </Heading>

      <span data-testid="card-header-action" class="card__header__action" v-if="$slots.action && !callout">
        <slot name="action" />
      </span>

      <span 
        data-testid="card-callout-dismiss"
        v-if="dismissable && callout"
        class="card__header__dismiss"
        @click="close()">
        <IconClose />
      </span>
    </header>
    
    <div class="card__body" v-if="!sectioned">
      <slot />
    </div>
    <slot v-else />

    <footer data-testid="card-footer" class="card__footer" v-if="$slots.footer">
      <slot name="footer" />
    </footer>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue-demi'
import IconClose from "@carbon/icons-vue/lib/close/16"
import Heading from '../heading/Heading.vue'

type ElementVariant = 'div' | 'section' | 'article'

export default defineComponent ({
  components: { Heading, IconClose },
  props: {
    element: {
      type: String as PropType<ElementVariant>,
      default: 'section'
    },
    title: {
      type: String,
      default: null
    },
    sectioned: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    callout: {
      type: Boolean,
      default: false,
    },
    dismissable: {
      type: Boolean,
      default: true,
    }
  },
  emits:['dismissed'],
  setup (props, { emit }) {
    const show = ref(true)

    const classNames = computed(() => {
      const result: string[] = ['card']

      if (props.sectioned)
        result.push('card--sectioned')

      if (props.disabled)
        result.push('card--disabled')

      if (props.callout)
        result.push('card--callout')

      return result
    })

    const elementNames = computed(() => {
      return props.element
    })

    function close(): void {
      show.value = false
      emit('dismissed')
    }

    return {
      classNames,
      elementNames,
      show,
      close
    }
  }
})
</script>

<style lang="postcss">
/**
* Component Name		: Card
* Component URI		  : https://www.figma.com/file/JIYmbyRYZHc9bnVp6Npm9K/B-A-S-E-%2F-Components?node-id=294%3A5079
* Date Created			: May 22, 2022
* Last Update			  : May 23, 2022
*/
.card {
  @apply border bg-white border-secondary-5 rounded-md;

  /* 
  * Card Body & Card Header
  * by default have 24px (1.5rem) padding
  */
  &__header,
  &__body {
    @apply pt-6 px-6;
  }

  &__body {
    @apply pb-6;

    > .card__section {
      @apply pt-0;
    }

    .card__section {
      @apply border-b border-black border-opacity-10;

      /**
      * Adding border-top in the first element
      * of Card Sub-Section and provide 24px (1.5rem)
      * of margin-top
      */
      &:first-child {
        @apply border-t mt-6;
      }

      &:last-child {
        /**
        * Remove padding-bottom of Card Body
        * from the last element of Card Sub-Section
        */
        .card__body {
          @apply pb-0;
        }
      }

      /**
      * Remove padding-left-right Card Body
      * in Card Sub-Section
      */
      .card__body {
        @apply px-0;
      }
    }
  }

  /**
  * If Card have Section,
  * padding of card-body-top-parent set to 0
  */
  &&--sectioned {
    > .card__body {
      @apply p-0;
    }
  }

  /** 
  * Give background background-100 (#f5f5f5)
  * If Card disabled
  */
  &&--disabled {
    @apply bg-background-100;
  }

  /** 
  * Provide box-shadow when
  * Card Callout is enable
  */
  &&--callout {
    @apply shadow;
  }

  &__header {
    &&--default {
      @apply flex justify-between items-center;
    }

    &,
    &__action {
      a {
        &:not(.btn) {
          @apply text-xs;
        }

        + a {
          @apply pl-3;
        }
      }
    }

    &__dismiss {
      @apply text-secondary-50 hover:text-secondary-100 hover:cursor-pointer;
    }
  }

  &__section {
    @apply border-b border-black border-opacity-10;

    &:last-child {
      @apply border-b-0;
    }

    &&--disabled,
    &.card--disabled {
      @apply bg-background-100;
    }

    &.card--disabled {
      @apply px-6 pb-6;
    }
  }

  &__footer {
    @apply pb-6 px-6 pt-3;
  }
}
</style>
