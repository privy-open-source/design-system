<template>
  <Dropdown
    v-model="isOpen"
    class="datepicker"
    data-testid="datepicker"
    aria-label="datepicker"
    :class="classNames"
    :disabled="disabled">
    <template #activator>
      <Input
        :value="value"
        :model-value="value"
        data-testid="datepicker-input"
        class="datepicker__input"
        :placeholder="placeholder"
        :disabled="disabled"
        readonly
        @focus="onFocus">
        <template #append>
          <IconCalendar
            class="datepicker__icon" />
        </template>
      </Input>
    </template>

    <Calendar
      v-model="model"
      :disabled="disabled"
      :readonly="readonly"
      :max="max"
      :min="min"
      :mode="mode"
      class="datepicker__calendar"
      @change="onSelected" />
  </Dropdown>
</template>

<script lang="ts">
import Dropdown from '../dropdown/Dropdown.vue'
import Input from '../input/Input.vue'
import Calendar from '../calendar/Calendar.vue'
import { format as formatDate, isDate } from 'date-fns'
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from 'vue-demi'
import { CalendarMode } from '../calendar/adapter/adapter'
import { useVModel } from '../input'
import IconCalendar from '@carbon/icons-vue/lib/calendar/16'

export default defineComponent({
  components: {
    Dropdown,
    Input,
    Calendar,
    IconCalendar,
  },
  props: {
    modelValue: {
      type   : Date,
      default: undefined,
    },
    placeholder: {
      type   : String,
      default: '',
    },
    format: {
      type   : String,
      default: 'dd/MM/yyyy',
    },
    disabled: {
      type   : Boolean,
      default: undefined,
    },
    readonly: {
      type   : Boolean,
      default: undefined,
    },
    error: {
      type   : Boolean,
      default: undefined,
    },
    max: {
      type   : Date,
      default: undefined,
    },
    min: {
      type   : Date,
      default: undefined,
    },
    mode: {
      type   : String as PropType<CalendarMode>,
      default: 'date',
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['change', 'update:modelValue'],
  setup (props, { emit }) {
    const model  = useVModel(props)
    const isOpen = ref(false)

    const value = computed(() => {
      return isDate(model.value)
        ? formatDate(model.value, props.format)
        : ''
    })

    const classNames = computed(() => {
      const result: string[] = []

      if (isOpen.value)
        result.push('datepicker--open')

      if (props.disabled)
        result.push('datepicker--disabled')

      if (props.readonly)
        result.push('datepicker--readonly')

      if (props.error)
        result.push('datepicker--error', 'state--error')

      return result
    })

    function onFocus () {
      if (!props.disabled && !props.readonly)
        isOpen.value = true
    }

    function onSelected (event: Event) {
      isOpen.value = false

      emit('change', event)
    }

    return {
      isOpen,
      classNames,
      model,
      value,
      onFocus,
      onSelected,
    }
  },
})
</script>

<style lang="postcss">
.datepicker {
  &__input {
    @apply pr-8 truncate;
  }

  &__icon {
    @apply absolute right-3 top-0 bottom-0 my-auto transition-transform duration-150 text-muted pointer-events-none;
  }

  > .dropdown__menu {
    @apply min-w-max max-h-min;
  }
}
</style>
