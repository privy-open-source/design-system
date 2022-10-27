<template>
  <Dropdown
    v-model="isOpen"
    variant="input"
    class="filterbar__date"
    :class="{'filterbar--active': !!value }"
    caret>
    <template #button-content>
      {{ value ? value : schema.label }}
    </template>
    <Caption
      class="px-3 py-2"
      bold>
      {{ schema.label }}
    </Caption>

    <Calendar
      v-model="model"
      :min="min"
      :max="max"
      :mode="mode"
      @change="close" />
  </Dropdown>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from 'vue-demi'
import Caption from '../../caption/Caption.vue'
import Calendar from '../../calendar/Calendar.vue'
import Dropdown from '../../dropdown/Dropdown.vue'
import { useVModel } from '../../input'
import { FilterDate } from '..'
import { CalendarMode } from '../../calendar/adapter/adapter'
import { isDate, format as formatDate } from 'date-fns'

export default defineComponent({
  components: {
    Caption,
    Dropdown,
    Calendar,
  },
  props: {
    schema: {
      type    : Object as PropType<FilterDate>,
      required: true,
    },
    modelValue: {
      type   : Date,
      default: undefined,
    },
    format: {
      type   : String,
      default: 'dd/MM/yyyy',
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
  emits: ['update:modelValue'],
  setup (props) {
    const isOpen = ref(false)
    const model  = useVModel(props)

    const value = computed(() => {
      return isDate(model.value)
        ? formatDate(model.value, props.format)
        : ''
    })

    function close () {
      isOpen.value = false
    }

    return {
      model,
      value,
      isOpen,
      close,
    }
  },
})
</script>

<style lang="postcss">
.filterbar__date {
  > .dropdown__menu {
    @apply min-w-max max-h-min;
  }
}
</style>
