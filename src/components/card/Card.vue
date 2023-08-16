<template>
  <component
    :is="elementNames"
    v-if="show"
    data-testid="card"
    :class="classNames">
    <header
      v-if="$slots.header"
      data-testid="card-header"
      class="card__header">
      <slot name="header" />
    </header>

    <header
      v-else-if="title"
      class="card__header card__header--default">
      <Heading element="h6">
        {{ title }}
      </Heading>

      <span
        v-if="$slots.action && !callout"
        data-testid="card-header-action"
        class="card__header__action">
        <slot name="action" />
      </span>

      <span
        v-if="dismissable && callout"
        data-testid="card-callout-dismiss"
        class="card__header__dismiss"
        @click="close()">
        <IconClose />
      </span>
    </header>

    <div
      v-if="!sectioned"
      data-testid="card-body"
      class="card__body"
      :class="bodyClass">
      <slot />
    </div>
    <slot v-else />

    <footer
      v-if="$slots.footer"
      data-testid="card-footer"
      class="card__footer">
      <slot name="footer" />
    </footer>
  </component>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from 'vue-demi'
import IconClose from '@privyid/persona-icon/vue/close/16.vue'
import Heading from '../heading/Heading.vue'
import { ElementVariant } from '.'

export default defineComponent({
  components: { Heading, IconClose },
  props     : {
    element: {
      type   : String as PropType<ElementVariant>,
      default: 'section',
    },
    title: {
      type   : String,
      default: undefined,
    },
    sectioned: {
      type   : Boolean,
      default: false,
    },
    disabled: {
      type   : Boolean,
      default: false,
    },
    callout: {
      type   : Boolean,
      default: false,
    },
    dismissable: {
      type   : Boolean,
      default: true,
    },
    bodyClass: {
      type   : [String, Array],
      default: undefined,
    },
  },
  emits: ['dismissed'],
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

    function close (): void {
      show.value = false
      emit('dismissed')
    }

    return {
      classNames,
      elementNames,
      show,
      close,
    }
  },
})
</script>

<style lang="postcss">
/**
* Component Name: Card
* Component URI : https : //www.figma.com/file/JIYmbyRYZHc9bnVp6Npm9K/B-A-S-E-%2F-Components?node-id=294%3A5079
* Date Created  : May 22, 2022
* Last Update   : May 23, 2022
*/
.card {
  --p-card-padding-x: theme(spacing.6);
  --p-card-padding-y: theme(spacing.6);
  --p-card-bg: theme(backgroundColor.default.DEFAULT);
  --p-card-bg-dark: theme(backgroundColor.dark.default.DEFAULT);
  --p-card-border: theme(borderColor.default.DEFAULT);
  --p-card-border-dark: theme(borderColor.dark.default.DEFAULT);
  --p-card-color: theme(textColor.default);
  --p-card-color-dark: theme(textColor.dark.default);

  @apply border bg-[color:var(--p-card-bg)] border-[color:var(--p-card-border)] text-[color:var(--p-card-color)] rounded-md;
  @apply dark:bg-[color:var(--p-card-bg-dark)] dark:border-[color:var(--p-card-border-dark)] dark:text-[color:var(--p-card-color-dark)];

  /**
  * Card inside card
  * has 8px rounded
  */
  .card {
    @apply rounded;
  }

  /*
  * Card Body & Card Header
  * by default have 24px (1.5rem) padding
  */
  &__header,
  &__body {
    @apply pt-[var(--p-card-padding-y)] px-[var(--p-card-padding-x)];
  }

  &__body {
    @apply pb-[var(--p-card-padding-y)];

    > .card__section {
      @apply pt-0;
    }

    .card__section {
      @apply border-b border-subtle-alpha;
      @apply dark:border-dark-subtle-alpha;

      /**
      * Adding border-top in the first element
      * of Card Sub-Section and provide 24px (1.5rem)
      * of margin-top
      */
      &:first-child {
        @apply border-t mt-[var(--p-card-padding-y)];
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
  * Give background muted
  * If Card disabled
  */
  &&--disabled {
    @apply bg-subtle;
    @apply dark:bg-dark-subtle;
  }

  /**
  * Provide box-shadow when
  * Card Callout is enable
  */
  &&--callout {
    @apply shadow-sm;
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
      @apply text-default/30 hover:text-default/50 hover:cursor-pointer;
      @apply dark:text-dark-default/30 hover:dark:text-dark-default/50;
    }
  }

  &__section {
    @apply border-b border-subtle-alpha;
    @apply dark:border-dark-subtle-alpha;

    &:last-child {
      @apply border-b-0;
    }

    &&--disabled,
    &.card--disabled {
      @apply bg-subtle;
      @apply dark:bg-dark-subtle;
    }

    &.card--disabled {
      @apply px-[var(--p-card-padding-x)] pb-[var(--p-card-padding-y)];
    }
  }

  &__footer {
    @apply pb-[var(--p-card-padding-y)] px-[var(--p-card-padding-x)] pt-3;
  }
}
</style>
