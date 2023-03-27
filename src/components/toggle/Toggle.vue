<template>
  <label
    data-testid="toggle"
    class="toggle"
    :class="classNames"
    @click.prevent="toggle">
    <div class="toggle__switch">
      <span
        v-if="noLabel === false"
        class="toggle__label toggle__checked-label">
        <slot name="checked">
          {{ checkedLabel }}
        </slot>
      </span>
      <input
        type="checkbox"
        class="toggle__pointer"
        :disabled="disabled || readonly"
        :value="value"
        :checked="model">
      <span
        v-if="noLabel === false"
        class="toggle__label toggle__unchecked-label">
        <slot name="unchecked">
          {{ uncheckedLabel }}
        </slot>
      </span>
    </div>
    <slot />
  </label>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
} from 'vue-demi'
import { useVModel } from '../checkbox'

type StyleVariant = 'pill' | 'flat'

export default defineComponent({
  props: {
    variant: {
      type   : String as PropType<StyleVariant>,
      default: 'pill',
    },
    modelValue: {
      type: [
        String,
        Number,
        Boolean,
        Array,
        Object,
        Date,
      ],
      default: false,
    },
    value: {
      type: [
        String,
        Number,
        Boolean,
        Array,
        Object,
        Date,
      ],
      default: true,
    },
    uncheckedValue: {
      type: [
        String,
        Number,
        Boolean,
        Array,
        Object,
        Date,
      ],
      default: false,
    },
    checked: {
      type   : Boolean,
      default: false,
    },
    checkedLabel: {
      type   : String,
      default: 'on',
    },
    uncheckedLabel: {
      type   : String,
      default: 'off',
    },
    noLabel: {
      type   : Boolean,
      default: false,
    },
    readonly: {
      type   : Boolean,
      default: false,
    },
    disabled: {
      type   : Boolean,
      default: false,
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['update:modelValue', 'change'],
  setup (props, { slots }) {
    const model = useVModel(props)

    const classNames = computed(() => {
      const result: string[] = []

      if (props.variant)
        result.push(`toggle--${props.variant}`)

      if (model.value)
        result.push('toggle--checked')

      if (props.disabled)
        result.push('toggle--disabled')

      if (props.readonly)
        result.push('toggle--readonly')

      if (slots.default)
        result.push('toggle--labeled')

      return result
    })

    function toggle () {
      if (!props.readonly && !props.disabled)
        model.value = !model.value
    }

    return {
      classNames,
      model,
      toggle,
    }
  },
})
</script>

<style lang="postcss">
.toggle {
  @apply inline-flex cursor-pointer relative items-center select-none;

  &__switch {
    @apply flex items-center justify-center relative bg-inactive border-subtle;
  }

  &__pointer {
    @apply block absolute appearance-none cursor-pointer will-change-transform transition-transform -translate-x-1/2 bg-default;
  }

  &--disabled {
    @apply opacity-50 pointer-events-none;
  }

  &&--pill {
    .toggle__switch {
      @apply w-9 h-5 rounded-full text-[0.5rem] text-on-emphasis border;
    }

    .toggle__label {
      @apply w-1/2 flex justify-center items-center;
    }

    .toggle__pointer {
      @apply w-4 h-4 rounded-full shadow-md;
    }

    &.toggle--checked {
      .toggle__switch {
        @apply bg-info-emphasis border-info-emphasis;
      }

      .toggle__pointer {
        @apply translate-x-1/2;
      }
    }
  }

  &&--flat {
    .toggle__switch {
      @apply flex-row-reverse border-2 rounded-xs min-h-[1.5rem] min-w-[2.5rem];
    }

    .toggle__label {
      @apply px-1 z-[2] relative text-sm rounded-none;
    }

    .toggle__checked-label {
      @apply text-muted;
    }

    .toggle__pointer {
      @apply w-1/2 h-full rounded-sm z-[1];
    }

    &.toggle--checked {
      .toggle__checked-label {
        @apply text-default;
      }

      .toggle__unchecked-label {
        @apply text-muted;
      }

      .toggle__pointer {
        @apply translate-x-1/2;
      }
    }
  }

  .dropdown__menu & {
    @apply px-3 py-2 cursor-pointer text-default w-full select-none text-left flex justify-between items-center flex-row-reverse;

    &:hover,
    &:focus-visible {
      @apply bg-subtle;
    }
  }

  &&--labeled {
    .toggle__switch {
      @apply mr-4;
    }
  }
}
</style>
