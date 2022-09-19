<template>
  <Steps
    v-bind="$attrs"
    :model-value="modelValue"
    @update:model-value="(value) => $emit('update:modelValue', value)">
    <Step
      v-for="(item, i) in steps"
      :key="i"
      v-bind="item.props">
      <template #default="slotData">
        <component
          :is="item.children.default"
          v-bind="slotData" />
      </template>
    </step>
  </Steps>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  Slots,
  VNode,
} from 'vue-demi'
import { findAllChildren } from '../utils/vnode'
import Steps from '../steps/Steps.vue'
import Step from '../steps/Step.vue'

export default defineComponent({
  components: { Steps, Step },
  props     : {
    modelValue: {
      type   : Number,
      default: 1,
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['update:modelValue'],
  setup (props, { slots }) {
    const steps = computed(() => {
      return findAllChildren(slots.default(), 'WizardStep') as Array<VNode & { children: Slots }>
    })

    return { steps }
  },
})
</script>
