<template>
  <div
    data-testid="textarea"
    :class="classNames">
    <textarea
      ref="textarea"
      v-model="model"
      data-testid="textarea-input"
      class="textarea__input"
      v-bind="$attrs"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :maxlength="maxlength"
      @input="handleInput" />
    <div
      v-if="showCounter"
      data-testid="calendar-counter"
      class="textarea__counter">
      {{ charactersLength }}{{ maxlength ? `/${maxlength}` : '' }}
    </div>
  </div>
</template>

<script lang="ts">
import { useVModel } from '../input/use-input'
import {
  defineComponent,
  computed,
  onMounted,
  watch,
} from 'vue-demi'
import { templateRef } from '@vueuse/core'

export const DEFAULT_ROW_HEIGHT = 24

export default defineComponent({
  props: {
    modelValue: {
      type   : String,
      default: '',
    },
    placeholder: {
      type   : String,
      default: '',
    },
    readonly: {
      type   : Boolean,
      default: false,
    },
    disabled: {
      type   : Boolean,
      default: false,
    },
    autoGrow: {
      type   : Boolean,
      default: false,
    },
    resize: {
      type   : Boolean,
      default: false,
    },
    showCounter: {
      type   : Boolean,
      default: false,
    },
    rows: {
      type   : [Number, String],
      default: 4,
    },
    maxlength: {
      type   : [Number, String],
      default: undefined,
    },
  },
  setup (props) {
    const textarea = templateRef<HTMLTextAreaElement>('textarea')
    const model    = useVModel(props)

    /** define computed property */
    const classNames = computed(() => {
      const results: string[] = ['textarea']

      if (props.resize)
        results.push('textarea--resizeable')

      if (props.disabled)
        results.push('textarea--disabled')

      if (props.autoGrow)
        results.push('textarea--autogrow')

      return results
    })

    const charactersLength = computed(() => model.value ? model.value.length : '0')

    /** define lifecycle hooks */
    watch(() => props.autoGrow, (value) => {
      if (value)
        calculateRowHeight()
      else
        textarea.value.style.removeProperty('height')
    }, { flush: 'post' })

    onMounted(() => {
      setTimeout(() => {
        if (props.autoGrow && textarea.value)
          calculateRowHeight()
      }, 0)
    })

    /** define functions */
    function calculateRowHeight () {
      // reset height and max height to zero
      textarea.value.style.height = 'auto'

      const height    = textarea.value.scrollHeight
      const minHeight = Number.parseInt(props.rows.toString(), 10) * DEFAULT_ROW_HEIGHT

      textarea.value.style.height = `${Math.max(minHeight, height)}px`
    }

    function handleInput () {
      if (props.autoGrow)
        calculateRowHeight()
    }

    return {
      model,
      classNames,
      handleInput,
      charactersLength,
      calculateRowHeight,
    }
  },
})
</script>

<style lang="postcss">
.textarea {
  @apply flex flex-auto relative;

  &__input {
    @apply p-3 rounded-sm border border-secondary-25 placeholder:text-subtext-75 w-full outline-none bg-white resize-none;

    &:focus {
      @apply border-secondary-75 ring ring-secondary-25 ring-opacity-30;
    }
  }

  &__counter {
    @apply text-right text-subtext-50 text-xs absolute bottom-1 right-1;
  }

  &--autogrow {
    .textarea__input {
      @apply overflow-hidden;
    }
  }

  &--resizeable {
    .textarea__input {
      @apply resize-y;
    }
  }

  &--disabled {
    @apply bg-secondary-5 pointer-events-none text-body-50;
  }
}

</style>
