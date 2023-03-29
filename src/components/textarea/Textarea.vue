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
import { useVModel } from '../input'
import {
  defineComponent,
  computed,
  onMounted,
  watch,
} from 'vue-demi'
import { templateRef } from '@vueuse/core'

export default defineComponent({
  inheritAttrs: false,
  props       : {
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
    error: {
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

      if (props.error)
        results.push('textarea--error', 'state--error')

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
    @apply p-3 rounded border border-solid border-muted hover:border-subtle focus:border-subtle placeholder:text-muted w-full outline-none text-default bg-default resize-none min-h-[46px] focus:ring-4 focus:ring-subtle/10 focus:z-[1];

    .textarea--readonly & {
      @apply hover:border-muted focus:border-muted focus:ring-0 focus:z-0;
    }

    .textarea--disabled & {
      @apply bg-subtle border-subtle pointer-events-none text-muted;
    }

    .textarea--resize & {
      @apply resize-y;
    }

    .textarea--autogrow & {
      @apply overflow-hidden;
    }

    .state--error &,
    .textarea--error & {
      @apply border-danger-emphasis hover:border-danger-emphasis focus:ring-danger focus:border-danger-emphasis;
    }
  }

  &__counter {
    @apply text-right text-muted text-xs absolute bottom-1 right-1 pointer-events-none z-1;
  }
}

</style>
