<template>
  <Dropdown
    v-model="isOpen"
    class="timepicker"
    data-testid="timepicker"
    aria-label="timepicker"
    :class="classNames"
    :disabled="disabled">
    <template #activator>
      <Input
        :value="value"
        :model-value="value"
        data-testid="timepicker-input"
        class="timepicker__input"
        :placeholder="placeholder"
        :disabled="disabled"
        :error="error"
        :size="size"
        readonly
        @focus="onFocus">
        <template #append>
          <IconTime
            class="timepicker__icon" />
        </template>
      </Input>
    </template>

    <Time
      v-if="isOpen"
      v-slot="{ confirm }"
      v-model="model"
      :time-separator="timeSeparator"
      :is12-hour="is12Hour"
      :hour-interval="hourInterval"
      :minute-interval="minuteInterval"
      :min="min"
      :max="max"
      @context="onTimeContext"
      @change="(context) => emit('change', context)">
      <slot
        name="footer"
        :confirm="confirm"
        :close="onClose">
        <Button
          v-if="dismissable"
          variant="ghost"
          class="time__action--cancel"
          @click="onClose">
          {{ dimissLabel }}
        </Button>
        <Button
          variant="solid"
          color="info"
          @click="confirm">
          {{ confirmLabel }}
        </Button>
      </slot>
    </Time>
  </Dropdown>
</template>

<script setup lang="ts">
import Dropdown from '../dropdown/Dropdown.vue'
import Input from '../input/Input.vue'
import Button from '../button/Button.vue'
import IconTime from '@privyid/persona-icon/vue/time/16.vue'
import Time from '../time/Time.vue'
import type { SizeVariant } from '../button'
import { useVModel } from '../input'
import type { TimeContext, TimeModel } from '../time'
import { validateInterval } from '../time/utils'
import type { PropType, VNode } from 'vue-demi'
import {
  ref, computed, onMounted,
} from 'vue-demi'
import { format, isDate } from 'date-fns'

const props = defineProps({
  modelValue: {
    type   : [Date, Object] as PropType<Date | TimeModel>,
    default: undefined,
  },
  size: {
    type   : String as PropType<SizeVariant>,
    default: 'md',
  },
  placeholder: {
    type   : String,
    default: '',
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
  dismissable: {
    type   : Boolean,
    default: false,
  },
  dimissLabel: {
    type   : String,
    default: 'Cancel',
  },
  confirmLabel: {
    type   : String,
    default: 'Set',
  },
  timeSeparator: {
    type   : String,
    default: ':',
  },
  is12Hour: {
    type   : Boolean,
    default: false,
  },
  hourInterval: {
    type     : Number,
    default  : 1,
    validator: (value: number, prop) => {
      return validateInterval('hour', value, prop.is12Hour as boolean)
    },
  },
  minuteInterval: {
    type     : Number,
    default  : 1,
    validator: (value: number) => {
      return validateInterval('minute', value)
    },
  },
  min: {
    type   : Date,
    default: undefined,
  },
  max: {
    type   : Date,
    default: undefined,
  },
})

const emit = defineEmits<{
  'update:modelValue': [unknown],
  'context': [TimeContext],
  'change': [TimeContext],
}>()

const model  = useVModel(props)
const isOpen = ref(false)
const value  = ref('')

const classNames = computed(() => {
  const result: string[] = []

  if (isOpen.value)
    result.push('timepicker--open')

  if (props.disabled)
    result.push('timepicker--disabled')

  if (props.readonly)
    result.push('timepicker--readonly')

  if (props.error)
    result.push('timepicker--error', 'state--error')

  return result
})

onMounted(() => {
  if (!model.value)
    return

  if (isDate(model.value))
    value.value = format(model.value as Date, props.is12Hour ? 'hh:mm a' : 'HH:mm')
  else {
    const { hh, mm, a } = model.value as TimeModel
    const time          = `${hh}:${mm}`

    value.value = props.is12Hour ? `${time} ${a || ''}` : time
  }
})

function onFocus () {
  if (!props.disabled && !props.readonly)
    isOpen.value = true
}

function onTimeContext (context: TimeContext) {
  onClose()

  value.value = context.time
  emit('context', context)
}

function onClose () {
  isOpen.value = false
}

defineSlots<{
  'footer'(props: {
    confirm: () => void,
    close: () => void,
  }): VNode[], }>()
</script>

<style lang="postcss">
.timepicker {
  &__input {
    @apply pr-8 truncate;
  }

  &__icon {
    @apply transition-transform duration-150 text-muted pointer-events-none;
    @apply dark:text-dark-muted;
  }

  > .dropdown__menu {
    --p-dropdown-size: auto;
    --p-dropdown-max-height: 100%;

    @apply min-w-max max-h-min;
  }
}
</style>
