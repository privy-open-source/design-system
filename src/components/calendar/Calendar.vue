<template>
  <Card
    data-testid="calendar"
    class="calendar"
    element="div"
    :viewmode="viewmode"
    :class="classNames">
    <div class="calendar__nav">
      <Button
        data-testid="calendar-prev"
        variant="solid"
        icon
        :disabled="!canPrev"
        :readonly="disabled || readonly"
        @click="prev">
        <IconBack />
      </Button>

      <Button
        data-testid="calendar-title"
        class="calendar__nav-title"
        variant="solid"
        :readonly="disabled || readonly"
        @click="changeMode(1)">
        {{ title }}
      </Button>

      <Button
        data-testid="calendar-next"
        variant="solid"
        icon
        :readonly="disabled || readonly"
        :disabled="!canNext"
        @click="next">
        <IconNext />
      </Button>
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
          <Button
            variant="solid"
            data-testid="calendar-item"
            :readonly="item.readonly || disabled || readonly"
            :active="item.active"
            :disabled="item.disabled"
            @click="selectItem(item)">
            {{ item.text }}
          </Button>
        </template>
      </div>
    </Transition>
  </Card>
</template>

<script lang="ts">
import Button from '../button/Button.vue'
import Card from '../card/Card.vue'
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
import { startOfMonth } from 'date-fns'
import { useVModel } from '../input'

const Adapters: Record<CalendarMode, CalendarAdapter> = {
  date : DateAdapter,
  month: MonthAdapter,
  year : YearAdapter,
}

type TransitionMode = 'slide-left' | 'slide-right' | 'zoom-in' | 'zoom-out'

export default defineComponent({
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Button,
    Card,
    IconNext,
    IconBack,
  },
  props: {
    modelValue: {
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
  emits: ['update:modelValue', 'change'],
  setup (props, { emit }) {
    const viewmode   = ref<CalendarMode>(props.mode)
    const transition = ref<TransitionMode>('slide-left')
    const cursor     = ref(startOfMonth(props.modelValue ?? new Date()))
    const model      = useVModel(props)

    const context = {
      cursor: cursor,
      model : model,
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
        model.value = item.value

        emit('change', item.value)
      } else {
        cursor.value = item.value

        changeMode(-1)
      }
    }

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
    }
  },
})
</script>

<style lang="postcss">
.calendar {
  @apply flex flex-col space-y-2 text-sm shadow-xl border-transparent;

  &__nav {
    @apply flex justify-between space-x-2 mb-2;

    &-title {
      @apply flex-grow;
    }
  }

  .btn--variant-solid {
    @apply justify-center;

    &.btn--default {
      @apply border-transparent bg-transparent text-default font-normal;

      &.calendar__nav-title {
        @apply font-medium;
      }

      &[active="true"] {
        @apply bg-accent-emphasis border-accent-emphasis text-on-emphasis cursor-default;
      }

      &[disabled][active="false"] {
        @apply text-muted;
      }
    }

    &[readonly] {
      @apply pointer-events-none font-medium;
    }
  }

  .calendar__items {
    &[viewmode="date"] {
      @apply grid grid-cols-7 gap-1;

      .btn--md {
        @apply p-1 md:p-2;
      }

      .btn--outline:nth-child(-n+7) {
        @apply font-medium;
      }
    }

    &[viewmode="month"],
    &[viewmode="year"] {
      @apply grid grid-cols-4 gap-1;
      .btn--md {
        @apply px-3;
      }
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
