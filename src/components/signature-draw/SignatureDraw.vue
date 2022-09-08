<template>
  <component
    :is="view"
    v-model="model"
    :width="width"
    :height="height"
    :color="color"
    :placeholder="placeholder"
    :reset-label="resetLabel"
    :open-draw-label="openDrawLabel"
    :close-draw-label="closeDrawLabel" />
</template>

<script lang="ts">
import { useMediaQuery } from '@vueuse/core'
import { computed, defineComponent } from 'vue-demi'
import { useVModel } from '../input/use-input'
import SignatureDrawMobile from './SignatureDrawMobile.vue'
import SignatureDrawDesktop from './SignatureDrawDesktop.vue'

export default defineComponent({
  props: {
    modelValue: {
      type   : String,
      default: '',
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
  setup (props) {
    const model     = useVModel(props)
    const isDesktop = useMediaQuery('(min-width: 768px)')
    const view      = computed(() => {
      return isDesktop.value
        ? SignatureDrawDesktop
        : SignatureDrawMobile
    })

    return { view, model }
  },
})
</script>
