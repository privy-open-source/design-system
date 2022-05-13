<template>
  <div
    data-testid="calendar"
    class="calendar">
    <div class="calendar__nav">
      <Button
        variant="outline"
        icon
        size="sm"
        :disabled="!canPrev"
        @click="prev">
        <IconBack />
      </Button>

      <Button
        class="calendar__navTitle"
        variant="outline"
        size="sm"
        @click="changeMode">
        {{ title }}
      </Button>

      <Button
        variant="outline"
        icon
        size="sm"
        :disabled="!canNext"
        @click="next">
        <IconNext />
      </Button>
    </div>

    <Transition :name="transition" mode="out-in">
      <div class="calendar__items" :mode="mode" :key="`${cursor}+${mode}`">
        <template v-for="item in items">
          <Button
            variant="outline"
            icon
            :readonly="item.readonly"
            :active="item.active"
            :disabled="item.disabled"
            @click="selectItem(item)">
            {{ item.text }}
          </Button>
        </template>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import Button from "../button/Button.vue"
import IconNext from "@carbon/icons-vue/lib/chevron--right/20"
import IconBack from "@carbon/icons-vue/lib/chevron--left/20"
import { defineComponent, ref, computed, watch, toRef } from "vue-demi"
import { CalendarAdapter, CalendarItem, CalendarMode } from "./adapter/adapter"
import DateAdapter from "./adapter/date"
import MonthAdapter from "./adapter/month"
import YearAdapter from "./adapter/year"
import { startOfMonth } from "date-fns"

const Adapters: Record<CalendarMode, CalendarAdapter> = {
  [CalendarMode.DATE] : DateAdapter,
  [CalendarMode.MONTH]: MonthAdapter,
  [CalendarMode.YEAR] : YearAdapter,
}

type TransitionMode = 'slide-left' | 'slide-right' | 'zoom-in' | 'zoom-out'

export default defineComponent({
  components: {
    Button,
    IconNext,
    IconBack,
  },
  props: {
    modelValue: {
      type: Date,
    },
    max: {
      type: Date,
    },
    min: {
      type: Date,
    },
  },
  emits: [
    'update:modelValue',
    'change',
  ],
  setup (props) {
    const mode       = ref<CalendarMode>(CalendarMode.DATE)
    const transition = ref<TransitionMode>('slide-left')
    const cursor     = ref(startOfMonth(props.modelValue ?? new Date()))
    const model      = ref(new Date())

    const context = {
      cursor: cursor,
      model : model,
      min   : toRef(props, 'min'),
      max   : toRef(props, 'max'),
    }

    const adapter = computed(() => {
      return Adapters[mode.value]
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

    function next () {
      cursor.value = adapter.value.getNextCursor(context)
    }

    function prev() {
      cursor.value = adapter.value.getPrevCursor(context)
    }

    function changeMode () {
      if (mode.value !== CalendarMode.YEAR)
        mode.value = mode.value + 1
    }

    function selectItem (item: CalendarItem) {
      if (mode.value !== CalendarMode.DATE) {
        cursor.value = item.value
        mode.value   = mode.value - 1
      } else {
        model.value = item.value
      }
    }

    watch(cursor, (value, oldValue) => {
      transition.value = value > oldValue
        ? 'slide-left'
        : 'slide-right'
    })

    watch(mode, (value, oldValue) => {
      transition.value = value > oldValue
        ? 'zoom-out'
        : 'zoom-in'
    })

    return {
      transition,
      title,
      items,
      mode,
      cursor,
      canNext,
      canPrev,
      next,
      prev,
      changeMode,
      selectItem,
    }
  }
})
</script>

<style lang="postcss">
.calendar {
  @apply p-4 bg-white flex flex-col gap-2 text-sm;

  &__nav {
    @apply flex justify-between gap-2;

    &Title {
      @apply flex-grow;
    }
  }

  .btn--outline {
    @apply border-0 justify-center;

    &[readonly] {
      @apply pointer-events-none;
    }

    &[active="true"]:not(:hover) {
      @apply bg-primary-100 text-white;
    }
  }


  .calendar__items {
    .btn--outline {
      @apply font-normal;
    }

    /* mode: date */
    &[mode="1"] {
      @apply grid grid-cols-7 gap-[1px];

      .btn--outline:nth-child(-n+7) {
        @apply font-medium;
      }
    }

    /* mode: month */
    /* mode: year */
    &[mode="2"],
    &[mode="3"] {
      @apply grid grid-cols-4 gap-1;
      .btn--md {
        @apply px-3;
      }
    }
  }
}
</style>
