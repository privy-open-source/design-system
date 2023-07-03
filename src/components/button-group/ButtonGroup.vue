<template>
  <div
    data-testid="btn-group"
    :class="classNames">
    <slot />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  provide,
  toRef,
} from 'vue-demi'
import { BUTTONGROUP_SETTING } from '.'
import type { SizeVariant } from '../button'

export default defineComponent({
  props: {
    size: {
      type   : String as PropType<SizeVariant>,
      default: 'md',
    },
    pill: {
      type   : Boolean,
      default: false,
    },
  },

  setup (props) {
    provide(BUTTONGROUP_SETTING, { size: toRef(props, 'size') })

    const classNames = computed(() => {
      const result: string[] = ['btn-group']

      // eslint-disable-next-line unicorn/explicit-length-check
      if (props.size)
        result.push(`btn-group--${props.size}`)

      if (props.pill)
        result.push('btn-group--pill')

      return result
    })

    return { classNames }
  },
})

</script>

<style lang="postcss">
.btn-group {
  @apply relative inline-flex items-center;

  > .btn {
    @apply relative flex-auto;

    /**
    * Set right radius to 0 when button is
    * not the last child
    */
    &:not(:last-child) {
      @apply rounded-r-none;
    }

    /**
    * Set left radius to 0 when button is:
    * - the third or more child
    * - not the first child
    * - the next button are dropdown
    */
    &:nth-child(n + 3),
    &:not(:first-child),
    + .dropdown > .btn {
      @apply rounded-l-none;
    }

    /**
    * Bring the hover, focus, and active button
    * to the front to overlay borders
    */
    &:is(:hover, :focus, :active, .active) {
      @apply z-1;
    }

    /**
    * Prevent double borders
    * when buttons are next to each other
    * and give darken color of left border
    * to separate each other
    */
    &:not(:first-child) {
      @apply -ml-[1px];

      &.btn--primary,
      &.btn--info,
      &.btn--success,
      &.btn--warning,
      &.btn--danger {
        @apply border-l-subtle-alpha;
        @apply dark:border-l-dark-subtle-alpha;
      }
    }
  }

  /**
  * Right radius should be 0 when dropdown
  * is not the last child
  * Left radius should be 0 if dropdown is
  * not the first child
  */
  > .dropdown {
    &:not(:last-child) {
      .btn {
        @apply rounded-r-none;
      }
    }

    /**
    * Prevent double borders
    * when dropdowns are next to each other
    * Give darken color of left border
    * to separate each other
    */
    &:not(:first-child) {
      .btn {
        @apply -ml-[1px] rounded-l-none border-l-subtle-alpha;
        @apply dark:border-l-dark-subtle-alpha;
      }
    }
  }

  /**
  * Sizing the button group,
  * and set rounded of first
  * & last button in each size
  */
  &&--xs:not(&--pill) {
    .btn {
      &:not(.btn--icon),
      .dropdown .btn {
        &:first-child {
          @apply rounded-l-xs;
        }

        &:last-child {
          @apply rounded-r-xs;
        }
      }

      &:is(.btn--icon) {
        @apply p-[.1rem];
      }
    }
  }

  &&--sm:not(&--pill) {
    .btn {
      &:not(.btn--icon),
      .dropdown .btn {
        &:first-child {
          @apply rounded-l-sm;
        }

        &:last-child {
          @apply rounded-r-sm;
        }
      }

      &:is(.btn--icon) {
        @apply p-[6px];
      }
    }
  }

  &&--md:not(&--pill),
  &&--lg:not(&--pill) {
    .btn {
      &:not(.btn--icon),
      .dropdown .btn {
        &:first-child {
          @apply rounded-l;
        }

        &:last-child {
          @apply rounded-r;
        }
      }
    }
  }

  &&--md {
    .btn {
      &:is(.btn--icon) {
        @apply p-[12px];
      }
    }
  }

  &&--lg:not(&--pill) {
    .btn {
      &:is(.btn--icon) {
        @apply p-[18px];
      }
    }
  }

  /**
  * The left radius of first child and
  * the right radius of the last child
  * should be fully rounded in pill variant
  */
  &&--pill {
    > .btn {
      &:first-child {
        @apply rounded-l-full;
      }

      &:last-child {
        @apply rounded-r-full;
      }
    }
  }
}
</style>
