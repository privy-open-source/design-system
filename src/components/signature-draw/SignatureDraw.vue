<template>
  <component
    :is="view"
    :model-value="modelValue"
    :model-modifiers="modelModifiers"
    :width="width"
    :height="height"
    :color="color"
    :placeholder="placeholder"
    :reset-label="resetLabel"
    :open-draw-label="openDrawLabel"
    :close-draw-label="closeDrawLabel"
    @update:model-value="$emit('update:modelValue', $event)" />
</template>

<script lang="ts">
import { useMediaQuery } from '@vueuse/core'
import {
  computed,
  defineComponent,
  PropType,
} from 'vue-demi'
import SignatureDrawMobile from './SignatureDrawMobile.vue'
import SignatureDrawDesktop from './SignatureDrawDesktop.vue'
import { ModelModifier } from '../dropzone'

export default defineComponent({
  props: {
    modelValue: {
      type   : [String, globalThis.File],
      default: '',
    },
    modelModifiers: {
      type   : Object as PropType<ModelModifier>,
      default: () => ({} as ModelModifier),
    },
    width: {
      type   : Number,
      default: 430,
    },
    height: {
      type   : Number,
      default: 230,
    },
    color: {
      type   : String,
      default: '#000000',
    },
    placeholder: {
      type   : String,
      default: '',
    },
    resetLabel: {
      type   : String,
      default: 'Reset',
    },
    openDrawLabel: {
      type   : String,
      default: 'Click to Draw',
    },
    closeDrawLabel: {
      type   : String,
      default: 'Save',
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['update:modelValue'],
  setup () {
    const isDesktop = useMediaQuery('(min-width: 768px)')
    const view      = computed(() => {
      return isDesktop.value
        ? SignatureDrawDesktop
        : SignatureDrawMobile
    })

    return { view }
  },
})
</script>
