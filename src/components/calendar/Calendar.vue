<template>
  <p-card
    data-testid="calendar"
    class="calendar"
    element="div"
    :viewmode="viewmode"
    :class="classNames">
    <div class="calendar__nav">
      <p-button
        data-testid="calendar-prev"
        variant="solid"
        icon
        type="button"
        :disabled="!canPrev"
        :readonly="disabled || readonly"
        @click="prev">
        <IconBack />
      </p-button>

      <p-button
        data-testid="calendar-title"
        class="calendar__nav-title"
        variant="solid"
        type="button"
        :readonly="disabled || readonly"
        @click="changeMode(1)">
        {{ title }}
      </p-button>

      <p-button
        data-testid="calendar-next"
        variant="solid"
        icon
        type="button"
        :readonly="disabled || readonly"
        :disabled="!canNext"
        @click="next">
        <IconNext />
      </p-button>
    </div>

    <Transition
      :name="transition"
      mode="out-in">
      <div
        :key="`${cursor.toISOString()}+${viewmode}`"
        data-testid="calendar-items"
        class="calendar__items"
        :viewmode="viewmode">
        <template
          v-for="(item, i) in items"
          :key="i">
          <p-button
            variant="solid"
            type="button"
            data-testid="calendar-item"
            :readonly="item.readonly || disabled || readonly"
            :active="item.active"
            :disabled="item.disabled"
            :class="{
              'calendar__item--in-range': isInRange(item),
              'calendar__item--head': item.head,
              'calendar__item--tail': item.tail,
            }"
            @click="selectItem(item)"
            @mouseover="setHover(item)">
            {{ item.text }}
          </p-button>
        </template>
      </div>
    </Transition>
  </p-card>
</template>

<script lang="ts" setup>
import pButton from '../button/Button.vue'
import pCard from '../card/Card.vue'
import IconNext from '@privyid/persona-icon/vue/chevron-right/20.vue'
import IconBack from '@privyid/persona-icon/vue/chevron-left/20.vue'
import type { PropType } from 'vue-demi'
import {
  ref,
  computed,
  watch,
} from 'vue-demi'
import type {
  CalendarAdapter,
  CalendarContext,
  CalendarItem,
  CalendarMode,
} from './adapter/adapter'
import {
  CalendarFormat,
  validateDuration,
  parseDuration,
} from './adapter/adapter'
import DateAdapter from './adapter/date'
import MonthAdapter from './adapter/month'
import YearAdapter from './adapter/year'
import {
  isWithinInterval,
  startOfMonth,
  min as minDate,
  max as maxDate,
  minTime as MIN_TIME,
  maxTime as MAX_TIME,
  add,
  sub,
} from 'date-fns'
import { syncRef } from '@vueuse/core'

const Adapters: Record<CalendarMode, CalendarAdapter> = {
  date : DateAdapter,
  month: MonthAdapter,
  year : YearAdapter,
}

type TransitionMode = 'slide-left' | 'slide-right' | 'zoom-in' | 'zoom-out'

const props = defineProps({
  modelValue: {
    type   : [Date, Array] as PropType<Date | [Date, Date]>,
    default: undefined,
  },
  start: {
    type   : Date,
    default: undefined,
  },
  end: {
    type   : Date,
    default: undefined,
  },
  disabled: {
    type   : Boolean,
    default: undefined,
  },
  readonly: {
    type   : Boolean,
    default: undefined,
  },
  min: {
    type   : Date,
    default: () => new Date(MIN_TIME),
  },
  max: {
    type   : Date,
    default: () => new Date(MAX_TIME),
  },
  mode: {
    type   : String as PropType<CalendarMode>,
    default: 'date',
  },
  range: {
    type   : Boolean,
    default: false,
  },
  minRange: {
    type   : String,
    default: undefined,
    validator (value: string) {
      return validateDuration(value)
    },
  },
  maxRange: {
    type   : String,
    default: undefined,
    validator (value: string) {
      return validateDuration(value)
    },
  },
})

const emit = defineEmits<{
  'update:modelValue': [unknown],
  'update:start': [Date],
  'update:end': [Date],
  'change': [unknown],
}>()

const viewmode   = ref<CalendarMode>(props.mode)
const transition = ref<TransitionMode>('slide-left')

const localStart = ref(Array.isArray(props.modelValue) ? props.modelValue[0] : (props.start ?? props.modelValue))
const localEnd   = ref(Array.isArray(props.modelValue) ? props.modelValue[1] : (props.end ?? props.modelValue))

/**
     * v-model:start
     */
const vStart = computed({
  get () {
    return Array.isArray(props.modelValue)
      ? props.modelValue?.[0]
      : (props.start ?? props.modelValue)
  },
  set (value: Date) {
    emit('update:start', value)
  },
})

/**
     * v-model:end
     */
const vEnd = computed({
  get () {
    return Array.isArray(props.modelValue)
      ? props.modelValue?.[1]
      : (props.end ?? props.modelValue)
  },
  set (value: Date) {
    emit('update:end', value)
  },
})

const cursor = ref(startOfMonth(localStart.value ?? new Date()))
const hover  = ref<Date>()

const minRange   = computed(() => parseDuration(props.minRange))
const maxRange   = computed(() => parseDuration(props.maxRange))
const isTempLock = computed(() => props.range && localStart.value && !localEnd.value)

const min = computed(() => {
  return isTempLock.value
    ? maxDate([add(localStart.value, minRange.value ?? {}), props.min])
    : props.min
})

const max = computed(() => {
  return isTempLock.value && maxRange.value
    ? minDate([add(localStart.value, maxRange.value), props.max])
    : sub(props.max, minRange.value ?? {})
})

const context: CalendarContext = {
  cursor: cursor,
  start : localStart,
  end   : localEnd,
  min   : min,
  max   : max,
}

const adapter = computed(() => {
  return Adapters[viewmode.value]
})

const title = computed(() => {
  return adapter.value.getTitle(context)
})

const items = computed(() => {
  return adapter.value.getItems(context)
})

const canNext = computed(() => {
  return adapter.value.canNext(context)
})

const canPrev = computed(() => {
  return adapter.value.canPrev(context)
})

const classNames = computed(() => {
  const result = []

  if (props.disabled)
    result.push('calendar--disabled')

  if (props.readonly)
    result.push('calendar--readonly')

  if (props.range)
    result.push('calendar--range')

  return result
})

function next () {
  if (!props.disabled && !props.readonly)
    cursor.value = adapter.value.getNextCursor(context)
}

function prev () {
  if (!props.disabled && !props.readonly)
    cursor.value = adapter.value.getPrevCursor(context)
}

function changeMode (step = 1) {
  if (!props.disabled && !props.readonly) {
    const index   = CalendarFormat.indexOf(viewmode.value)
    const newMode = CalendarFormat[index + step]

    if (newMode)
      viewmode.value = newMode
  }
}

function selectItem (item: CalendarItem) {
  if (viewmode.value === props.mode) {
    if (props.range && (localStart.value && !localEnd.value)) {
      localEnd.value   = maxDate([localStart.value, item.value])
      localStart.value = minDate([localStart.value, item.value])
    } else {
      localStart.value = item.value
      localEnd.value   = undefined
    }
  } else {
    cursor.value = item.value

    changeMode(-1)
  }
}

function setHover (item: CalendarItem) {
  if (props.range && !item.readonly && !item.disabled)
    hover.value = item.value
}

function isInRange (item: CalendarItem) {
  if (props.range && localStart.value && (localEnd.value || hover.value) && !item.readonly && !item.active) {
    return isWithinInterval(item.value, {
      start: minDate([localStart.value, localEnd.value ?? hover.value]),
      end  : maxDate([localStart.value, localEnd.value ?? hover.value]),
    })
  }

  return false
}

syncRef(localStart, vStart, { immediate: false })
syncRef(localEnd, vEnd, { immediate: false })

watch([localStart, localEnd], ([startVal, endVal]) => {
  if (props.range) {
    if (startVal && endVal) {
      emit('update:modelValue', [startVal, endVal])
      emit('change', [startVal, endVal])
    }
  } else {
    emit('update:modelValue', startVal)
    emit('change', startVal)
  }
})

watch(() => props.mode, (value) => {
  const newIndex     = CalendarFormat.indexOf(value)
  const currentIndex = CalendarFormat.indexOf(viewmode.value)

  if (newIndex > currentIndex)
    viewmode.value = value
})

watch([viewmode, cursor], ([vm, cursor], [vmOld, cursorOld]) => {
  const mode = CalendarFormat.indexOf(vm) - CalendarFormat.indexOf(vmOld)

  if (mode === 0)
    transition.value = cursor > cursorOld ? 'slide-left' : 'slide-right'
  else
    transition.value = mode > 0 ? 'zoom-out' : 'zoom-in'
})
</script>

<style lang="postcss">
.calendar {
  @apply flex flex-col space-y-2 text-sm shadow-xl;

  &.card {
    @apply border-transparent;
    @apply dark:border-transparent;
  }

  &__nav {
    @apply flex justify-between space-x-2 mb-2;

    &-title {
      @apply grow;
    }
  }

  .btn.btn--variant-solid {
    @apply justify-center;

    &.btn--default {
      @apply border-transparent bg-transparent text-default font-normal;
      @apply dark:border-transparent dark:bg-transparent dark:text-dark-subtle hover:dark:text-dark-default;

      &.calendar__nav-title {
        @apply font-medium;
      }

      &[active="true"] {
        @apply bg-info-emphasis border-info-emphasis text-state-emphasis cursor-default;
        @apply dark:bg-dark-info-emphasis dark:border-dark-info-emphasis dark:text-dark-state-emphasis;
      }

      &[disabled][active="false"] {
        @apply text-muted;
        @apply dark:text-dark-muted;
      }

      &.calendar__item--in-range {
        @apply bg-info rounded-none;
        @apply dark:bg-dark-info;
      }
    }

    &[readonly] {
      @apply pointer-events-none font-medium;
    }
  }

  .calendar__items {
    &[viewmode="date"] {
      @apply grid grid-cols-7 gap-y-1;

      .btn--md {
        @apply p-1 md:p-2;
      }

      .btn--outline:nth-child(-n+7) {
        @apply font-medium;
      }
    }

    &[viewmode="month"],
    &[viewmode="year"] {
      @apply grid grid-cols-4 gap-y-1;
      .btn--md {
        @apply px-3;
      }
    }
  }

  &--range {
    .calendar__item--head:not(.calendar__item--tail) {
      @apply rounded-r-none;
    }

    .calendar__item--tail:not(.calendar__item--head) {
      @apply rounded-l-none;
    }
  }

  &--disabled {
    @apply opacity-50;
  }

  .dropdown__subitem & {
    @apply shadow-none;
  }
}
</style>
