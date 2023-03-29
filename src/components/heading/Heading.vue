<template>
  <component
    :is="elementNames"
    data-testid="heading"
    :class="classNames">
    <slot />
  </component>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  PropType,
} from 'vue-demi'
import {
  ElementVariant,
  TransformVariant,
  WeightVariant,
} from '.'

export default defineComponent({
  props: {
    element: {
      type   : String as PropType<ElementVariant>,
      default: 'h3',
    },
    weight: {
      type   : String as PropType<WeightVariant>,
      default: 'normal',
    },
    transform: {
      type   : String as PropType<TransformVariant>,
      default: 'normalcase',
    },
  },

  setup (props) {
    const elementNames = computed(() => {
      return props.element
    })

    const classNames = computed(() => {
      const result: string[] = [`${props.element}`]

      if (props.transform)
        result.push(`heading--${props.transform}`)

      if (props.weight)
        result.push(`heading--${props.weight}`)

      return result
    })

    return {
      elementNames,
      classNames,
    }
  },

})
</script>

<style lang="postcss">
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

  &eading {
    /**
    * Weight variant
    * of heading
    */

    :where(&--normal, &--medium, &--bold) {
      @apply text-default;
    }

    &--normal {
      @apply font-normal;
    }

    &--medium {
      @apply font-medium;
    }

    &--bold {
      @apply font-bold;
    }

    /**
    * Text transform
    * of heading
    */
    &--normalcase {
      @apply normal-case;
    }

    &--lowercase {
      @apply lowercase;
    }

    &--capitalize {
      @apply capitalize;
    }

    &--uppercase {
      @apply uppercase;
    }
  }
}
</style>
