<template>
  <p-card
    data-testid="time"
    class="time"
    element="div">
    <div class="time__container">
      <TimeItem
        v-model="hour"
        :options="hourOptions"
        time-type="hour"
        class="time__items--hour" />

      <div class="time__separator">
        {{ timeSeparator }}
      </div>

      <TimeItem
        v-model="minute"
        :options="minuteOptions"
        time-type="minute"
        class="time__items--minute" />

      <TimeItem
        v-if="is12Hour"
        v-model="ampm"
        :options="periodOptions"
        time-type="ampm"
        class="time__items--ampm" />
    </div>
    <template
      v-if="$slots.default"
      #footer>
      <div class="time__action">
        <slot :confirm="confirm" />
      </div>
    </template>
  </p-card>
</template>

<script setup lang="ts">
import pCard from '../card/Card.vue'
import TimeItem from './TimeItem.vue'
import type { PropType } from 'vue-demi'
import {
  watch,
  computed,
  nextTick,
  onBeforeMount,
  ref,
} from 'vue-demi'
import { watchDebounced } from '@vueuse/core'
import { useVModel } from '../input'
import {
  format, formatISO, isDate, parse, startOfDay,
} from 'date-fns'
import type { TimeModel, TimeContext } from './index'
import {
  getHourUnits, getMinuteUnits, parseTime, validateInterval,
} from './utils'

const props = defineProps({
  modelValue: {
    type   : [Date, Object] as PropType<Date | TimeModel>,
    default: undefined,
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

const model      = useVModel(props)
const localModel = ref<Date>(startOfDay(new Date()))

const hour   = ref('00')
const minute = ref('00')
const ampm   = ref<'AM' | 'PM' | '-'>('AM')

const timeLabel = computed(() => {
  const time = `${hour.value}:${minute.value}`

  return props.is12Hour ? `${time} ${ampm.value}` : time
})

const timeFormat = computed(() => props.is12Hour ? 'hh:mm a' : 'HH:mm')

const hourOptions = computed(() => {
  return getHourUnits(localModel.value, props.is12Hour, props.hourInterval, props.min, props.max)
})

const minuteOptions = computed(() => {
  return getMinuteUnits(localModel.value, Number(hour.value), props.minuteInterval, props.min, props.max)
})

const periodOptions = computed(() => {
  return ['AM', 'PM'] // TODO: should handle for period within time range
})

watchDebounced([
  hour,
  minute,
  ampm,
], () => {
  const date = parse(timeLabel.value, timeFormat.value, localModel.value)

  emit('change', getContext(date))
}, { flush: 'post', debounce: 300 })

watch(model, init)

onBeforeMount(init)

function init () {
  try {
    if (!model.value)
      return

    if (isDate(model.value)) {
      localModel.value = new Date(model.value as Date)

      const { hh, mm, a } = parseTime(localModel.value, timeFormat.value)

      assignTime(hh, mm, a)
    } else {
      const { hh, mm, a } = (model.value as TimeModel)

      assignTime(hh, mm, a)

      localModel.value = parse(timeLabel.value, timeFormat.value, new Date())

      !props.is12Hour && a && console.warn('Please provide is12Hour props to parse time to 12 Hour Format')
    }
  } catch (error) {
    console.warn(error)
  }
}

function confirm (): void {
  try {
    localModel.value = parse(timeLabel.value, timeFormat.value, localModel.value)

    model.value = isDate(model.value)
      ? new Date(localModel.value)
      : {
          hh: hour.value,
          mm: minute.value,
          a : props.is12Hour ? ampm.value : undefined,
        }

    emit('context', getContext(localModel.value))
  } catch (error) {
    console.warn(error)
  }
}

async function assignTime (hh: string, mm: string, a?: 'AM' | 'PM' | '-') {
  hour.value   = hh ?? '00'
  minute.value = mm ?? '00'
  ampm.value   = a ?? 'AM'

  await nextTick()
}

function getContext (date: Date): TimeContext {
  return {
    time   : format(date, timeFormat.value),
    date   : date,
    dateISO: formatISO(date),
  }
}
</script>

<style lang="postcss">
.time {
  --p-card-padding-x: 2rem;
  --p-card-padding-y: 2rem;

  @apply flex flex-col shadow-xl;
  @apply max-w-[320px] overflow-hidden;

  &.card {
    @apply border-transparent dark:border-transparent;
  }

  &__container {
    @apply flex items-center justify-center w-full min-h-[144px] space-x-2;
  }

  &__separator {
    @apply px-2.5 py-3;
  }

  &__action {
    @apply grid grid-flow-col auto-cols-fr;

    &--cancel,
    &--confirm {
      @apply mx-2;
    }
  }

  .card__body {
    @apply pb-6;
  }

  .card__footer {
    @apply pt-0;
  }

  .splide__track {
    @apply px-2;
  }

  .dropdown__subitem & {
    @apply shadow-none;
  }
}
</style>
