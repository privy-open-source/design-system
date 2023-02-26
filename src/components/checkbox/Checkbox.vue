<template>
  <label
    data-testid="checkbox"
    class="checkbox"
    :class="classNames"
    @click.prevent="toggle">
    <span class="checkbox__icon">
      <!-- checked icon -->
      <template v-if="indeterminate">
        <svg
          width="10"
          height="10"
          viewBox="0 0 14 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <rect
            width="14"
            height="2" />
        </svg>
      </template>
      <template v-else>
        <svg
          width="10"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.81581 8.48528L5.23002 9.8995L6.64423 8.48528L13.7153 1.41421L12.3011 0L5.23002 7.07107L1.69449 3.53553L0.280273 4.94975L3.81581 8.48528Z" />
        </svg>
      </template>
    </span>
    <span class="checkbox__label">
      <slot />
    </span>
    <input
      type="checkbox"
      :checked="model"
      :name="name"
      :disabled="disabled || readonly"
      :value="value">
  </label>
</template>

<script lang="ts">
import { useVModel } from '.'
import { computed, defineComponent } from 'vue-demi'

export default defineComponent({
  props: {
    name: {
      type   : String,
      default: undefined,
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
    readonly: {
      type   : Boolean,
      default: false,
    },
    disabled: {
      type   : Boolean,
      default: false,
    },
    indeterminate: {
      type   : Boolean,
      default: false,
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['change', 'update:modelValue'],
  setup (props) {
    const model = useVModel(props)

    const classNames = computed(() => {
      const result: string[] = []

      if (model.value)
        result.push('checkbox--checked')

      if (props.indeterminate)
        result.push('checkbox--indeterminate')

      if (props.disabled)
        result.push('checkbox--disabled')

      if (props.readonly)
        result.push('checkbox--readonly')

      return result
    })

    function toggle () {
      if (!props.readonly && !props.disabled)
        model.value = !model.value
    }

    return {
      model,
      classNames,
      toggle,
    }
  },
})
</script>

<style lang="postcss">
.checkbox {
  @apply inline-flex space-x-2 relative cursor-pointer select-none items-baseline;

  /**
  * hide default appearance
  * checkbox
  */
  > input[type="checkbox"] {
    @apply appearance-none w-0 h-0 opacity-0 absolute;
  }

  /**
  * replace default appearance
  * with custom icon
  */
  &__icon {
    @apply w-5 h-5 border rounded-tn border-subtle inline-flex items-center justify-center bg-default;

    > svg {
      @apply w-3 fill-default;
    }
  }

  /**
  * active checkbox with
  * wtf-you-want custom appearance
  */
  &[appearance="none"] {
    &.checkbox {
      &--checked {
        .card {
          @apply border-accent-emphasis;
        }
      }
    }

    > .checkbox__icon {
      @apply hidden;
    }

    > .checkbox__label {
      @apply ml-0;
    }
  }

  /**
  * give color of checkbox label
  */
  &__label {
    @apply text-default;
  }

  /**
  * give accent background and
  * white checked icon
  */
  &--checked,
  &--indeterminate {
    .checkbox__icon {
      @apply bg-accent-emphasis border-accent-emphasis;

      > svg {
        @apply fill-default;
      }
    }
  }

  /**
  * disable checkbox
  */
  &--disabled {
    @apply opacity-50;

    &:not(.checkbox--checked, .checkbox--indeterminate) {
      .checkbox__icon {
        @apply bg-inactive border-subtle;

        > svg {
          @apply fill-inactive;
        }
      }
    }
  }

  /**
  * checkbox in dropdown menu
  */
  .dropdown__menu > .dropdown__subitem > .dropdown__item > &,
  .dropdown__menu > .dropdown__subitem > & {
    @apply w-full select-none;
  }

  .dropdown__menu > .dropdown__subitem > .dropdown__item > & {
    @apply py-[2px];
  }

  .dropdown__menu > .dropdown__subitem > & {
    @apply px-4 py-[10px];

    .checkbox__label {
      @apply ml-4;
    }

    &:hover,
    &:focus-visible {
      @apply bg-subtle;
    }
  }
}
</style>
