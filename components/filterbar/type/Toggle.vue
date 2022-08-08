<template>
  <Button
    class="filterbar__toggle"
    :class="{'filterbar__toggle--active': model }"
    variant="input"
    @click="toggle">
    {{ schema.label }}
  </Button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue-demi'
import { useVModel } from '../../checkbox/use-checkbox'
import { FilterSelect } from '../use-filterbar'
import Button from '../../button/Button.vue'

export default defineComponent({
  components: { Button },
  props     : {
    schema: {
      type    : Object as PropType<FilterSelect>,
      required: true,
    },
    modelValue: {
      type   : Boolean,
      default: undefined,
    },
    value: {
      type: [
        String,
        Number,
        Boolean,
        Array,
        Object,
        Date,
      ],
      default: true,
    },
    uncheckedValue: {
      type: [
        String,
        Number,
        Boolean,
        Array,
        Object,
        Date,
      ],
      default: false,
    },
    checked: {
      type   : Boolean,
      default: false,
    },
  },
  setup (props) {
    const model = useVModel(props)

    function toggle () {
      model.value = !model.value
    }

    return {
      model,
      toggle,
    }
  },
})
</script>

<style lang="postcss">
.filterbar__toggle {
  &.filterbar__toggle--active {
    @apply bg-body-100 text-white;
  }
}
</style>
