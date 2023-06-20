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
        :disabled="!canPrev"
        :readonly="disabled || readonly"
        @click="prev">
        <IconBack />
      </p-button>

      <p-button
        data-testid="calendar-title"
        class="calendar__nav-title"
        variant="solid"
        :readonly="disabled || readonly"
        @click="changeMode(1)">
        {{ title }}
      </p-button>

      <p-button
        data-testid="calendar-next"
        variant="solid"
        icon
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

<script lang="ts">
import pButton from '../button/Button.vue'
import pCard from '../card/Card.vue'
import IconNext from '@carbon/icons-vue/lib/chevron--right/20'
import IconBack from '@carbon/icons-vue/lib/chevron--left/20'
import {
  defineComponent,
  ref,
  computed,
  watch,
  toRef,
  PropType,
} from 'vue-demi'
import {
  CalendarAdapter,
  CalendarFormat,
  CalendarItem,
  CalendarMode,
} from './adapter/adapter'
import DateAdapter from './adapter/date'
import MonthAdapter from './adapter/month'
import YearAdapter from './adapter/year'
import {
  isWithinInterval,
  startOfMonth,
  min as minDate,
  max as maxDate,
} from 'date-fns'
import { syncRef } from '@vueuse/core'

const Adapters: Record<CalendarMode, CalendarAdapter> = {
  date : DateAdapter,
  month: MonthAdapter,
  year : YearAdapter,
}

type TransitionMode = 'slide-left' | 'slide-right' | 'zoom-in' | 'zoom-out'

export default defineComponent({
  components: {
    pButton,
    pCard,
    IconNext,
    IconBack,
  },
  props: {
    modelValue: {
      type   : [Date, Array] as PropType<Date | [Date, Date]>,
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
    start: {
      type   : Date,
      default: undefined,
    },
    end: {
      type   : Date,
      default: undefined,
    },
    range: {
      type   : Boolean,
      default: false,
    },
  },
  emits: [
    'update:modelValue',
    'update:start',
    'update:end',
    'change',
  ],
  setup (props, { emit }) {
    const viewmode   = ref<CalendarMode>(props.mode)
    const transition = ref<TransitionMode>('slide-left')

    const localStart = ref(Array.isArray(props.modelValue) ? props.modelValue[0] : (props.start ?? props.modelValue))
    const localEnd   = ref(Array.isArray(props.modelValue) ? props.modelValue[1] : (props.end ?? props.modelValue))

    const cursor = ref(startOfMonth(localStart.value ?? new Date()))
    const hover  = ref<Date>()

    const context = {
      cursor: cursor,
      start : localStart,
      end   : localEnd,
      min   : toRef(props, 'min'),
      max   : toRef(props, 'max'),
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

    /**
     * v-model:start
     */
    const vStart = computed({
      get () {
        return Array.isArray(props.modelValue)
          ? props.modelValue[0]
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
          ? props.modelValue[1]
          : (props.start ?? props.modelValue)
      },
      set (value: Date) {
        emit('update:end', value)
      },
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

    syncRef(localStart, vStart)
    syncRef(localEnd, vEnd)

    watch([localStart, localEnd], ([startVal, endVal]) => {
      if (props.range && startVal && endVal) {
        emit('update:modelValue', [startVal, endVal])
        emit('change', [startVal, endVal])
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

    return {
      transition,
      title,
      items,
      viewmode,
      cursor,
      canNext,
      canPrev,
      classNames,
      next,
      prev,
      changeMode,
      selectItem,
      isInRange,
      setHover,
    }
  },
})
</script>

<style lang="postcss">
.calendar {
  @apply flex flex-col space-y-2 text-sm shadow-xl border-transparent;
  @apply dark:border-transparent;

  &__nav {
    @apply flex justify-between space-x-2 mb-2;

    &-title {
      @apply flex-grow;
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
