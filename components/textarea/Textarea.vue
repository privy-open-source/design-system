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
      :readonly="readonly"
      :rows="rows"
      :maxlength="maxlength"
      :aria-valuemax="maxlength"
      @input="handleInput" />
    <div
      v-if="showCounter"
      data-testid="calendar-counter"
      class="textarea__counter">
      {{ charactersLength }}<span v-if="maxlength">/{{ maxlength }}</span>
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
      default: 3,
    },
    maxlength: {
      type   : [Number, String],
      default: undefined,
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['input', 'update:modelValue'],
  setup (props) {
    const textarea = templateRef<HTMLTextAreaElement>('textarea')
    const model    = useVModel(props)

    /** define computed property */
    const classNames = computed(() => {
      const results: string[] = ['textarea']

      if (props.resize)
        results.push('textarea--resize')

      if (props.disabled)
        results.push('textarea--disabled')

      if (props.autoGrow)
        results.push('textarea--autogrow')

      if (props.readonly)
        results.push('textarea--readonly')

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
      if (props.autoGrow && textarea.value)
        calculateRowHeight()
    })

    /** define functions */
    function calculateRowHeight () {
      // reset height and max height to zero
      textarea.value.style.height = 'auto'
      textarea.value.style.height = `${textarea.value.scrollHeight}px`
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
    @apply p-3 rounded-sm border border-secondary-25 placeholder:text-subtext-75 w-full outline-none bg-white resize-none min-h-[46px];

    &:focus {
      @apply border-secondary-75 ring ring-secondary-25 ring-opacity-30;
    }
  }

  &__counter {
    @apply text-right text-subtext-50 text-xs absolute bottom-1 right-1 pointer-events-none;
  }

  &--autogrow {
    .textarea__input {
      @apply overflow-hidden;
    }
  }

  &--resize {
    .textarea__input {
      @apply resize-y;
    }
  }

  &--disabled {
    @apply bg-secondary-5 pointer-events-none text-body-50;
  }
}

</style>
