<template>
  <Button
    class="filterbar__item filterbar--pinned"
    variant="input"
    size="sm"
    :class="{ 'filterbar--active': model }"
    @click="toggle">
    {{ schema.label }}
  </Button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue-demi'
import Button from '../../button/Button.vue'
import { useVModel } from '../../checkbox/use-checkbox'
import { FilterToggle } from '../use-filterbar'

export default defineComponent({
  components: { Button },
  props     : {
    schema: {
      type    : Object as PropType<FilterToggle>,
      required: true,
    },
    modelValue: {
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
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['update:modelValue', 'change'],
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
