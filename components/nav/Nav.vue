<template>
  <ul
    data-testid="nav"
    :class="classNames">
    <li
      v-if="title"
      class="nav__title">
      <Caption bold>
        {{ title }}
      </Caption>
    </li>
    <slot />
  </ul>
</template>

<script lang="ts">
import {
  computed, defineComponent, PropType,
} from 'vue-demi'
import Caption from '../caption/Caption.vue'
export type StyleVariant = 'tabs' | 'pills' | 'lines'
export type AlignVariant = 'left' | 'right' | 'center'

export default defineComponent({
  components: { Caption },
  props     : {
    fill: {
      type   : Boolean,
      default: false,
    },
    justified: {
      type   : Boolean,
      default: false,
    },
    variant: {
      type   : String as PropType<StyleVariant>,
      default: 'pills',
    },
    align: {
      type   : String as PropType<AlignVariant>,
      default: 'left',
    },
    vertical: {
      type   : Boolean,
      default: false,
    },
    title: {
      type   : String,
      default: undefined,
    },
  },

  setup (props) {
    const classNames = computed(() => {
      const result: string[] = ['nav']

      if (props.fill)
        result.push('nav--fill')

      if (props.justified)
        result.push('nav--justified')

      if (props.variant)
        result.push(`nav--${props.variant}`)

      if (props.align)
        result.push(`nav--align-${props.align}`)

      if (props.vertical)
        result.push('nav--vertical')

      if (props.title)
        result.push('nav--has-title')

      return result
    })

    return { classNames }
  },
})
</script>

<style lang="postcss">
/**
* Component Name: Navigation
* Component URI : https://www.figma.com/file/tVQNwXeQkMtZlX1x3qjJu8/B-A-S-E-%2F-Style-Guide?node-id=262%3A2160
* Date Created  : Aug 01, 2022
* Last Update   : Aug 03, 2022
*/
.nav {
  /**
  * Default navigation
  * is horizontal
  */
  @apply pl-2 list-none flex flex-wrap mb-0;

  /*
  * Navigation variant:
  * Lines
  */
  &&--lines {
    @apply text-center;

    /**
    * Set active state
    * with border-bottom
    */
    .nav__link {
      &--active {
        @apply border-b-body-100 border-x-0;
      }
    }

    /**
    * Active state of Lines
    * in vertical
    */
    &.nav--vertical {
      .nav__link {
        &--active {
          @apply border-r border-r-body-100 border-y-0 rounded-tr-none;
        }
      }

      &.nav--align-right {
        .nav__link {
          &--active {
            @apply border-l border-l-body-100 border-r-0 rounded-tl-none;
          }
        }
      }
    }
  }

  /*
  * Navigation variant:
  * Tabs
  */
  &&--tabs {
    /**
    * Set active state
    * with bordered item
    * except in bottom-side
    */
    .nav__link {
      &--active {
        @apply border-t-secondary-25/50 border-x-secondary-25/50 bg-white;
      }
    }

    /**
    * Active state of Tabs
    * in vertical
    */
    &.nav--vertical {
      .nav__link {
        &--active {
          @apply border-l-secondary-25/50 border-y-secondary-25/50 border-r-transparent bg-white rounded-l rounded-r-none;
        }
      }

      &.nav--align-right {
        .nav__link {
          &--active {
            @apply border-r-secondary-25/50 border-y-secondary-25/50 border-l-transparent rounded-r rounded-l-none;
          }
        }
      }
    }
  }

  /*
  * Navigation variant:
  * Tabs
  */
  &&--pills {
    @apply pb-2;

    /**
    * Set active state
    * with background
    */
    .nav__link {
      &--active {
        @apply bg-secondary-5 rounded-b;
      }
    }

    &.nav--vertical {
      @apply pb-0 pr-2;
    }
  }

  /*
  * Navigation alignment
  */
  &&--align {
    &-left {
      @apply justify-start;
    }

    &-right {
      @apply justify-end;
    }

    &-center {
      @apply justify-center;
    }
  }

  /*
  * Navigation fullwidth
  */
  &&--fill,
  &&--justified {
    .nav__item {
      .nav__link {
        @apply w-full;
      }
    }
  }

  /**
  * Proportionately fill
  */
  &&--fill {
    .nav {
      &__item {
        @apply flex-auto;
      }
    }
  }

  /**
  * Same width every item
  */
  &&--justified {
    .nav {
      &__item {
        @apply basis-0 flex-grow;
      }
    }
  }

  /**
  * Vertical Navigation
  */
  &&--vertical {
    @apply pt-2 flex-col;

    .nav {
      &__link {
        @apply mb-0 -mr-[1px];
      }
    }

    &.nav--align-right {
      @apply pl-0 ml-auto;

      .nav {
        &__link {
          @apply -ml-[1px] mr-0;
        }
      }

      &.nav--pills {
        @apply pl-2 pr-0;
      }
    }
  }

  /**
  * Navigation Title
  */
  &&--has-title {
    @apply relative pt-7 mt-5;
  }

  &__title {
    @apply absolute left-5 top-0 text-base inline-block;

    .caption {
      @apply text-body-75;
    }
  }
}
</style>
