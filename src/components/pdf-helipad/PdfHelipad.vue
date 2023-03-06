<template>
  <div
    ref="root"
    class="pdf-helipad">
    <div
      ref="object"
      class="pdf-object pdf-object--external"
      :style="{ width: `${width}px`, height: `${height}px` }">
      <div class="pdf-object__container">
        <slot />
      </div>
    </div>
    <div
      class="pdf-object pdf-object--external pdf-helipad__ghost"
      :style="{ width: `${width}px`, height: `${height}px` }">
      <div class="pdf-object__container">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { templateRef } from '@vueuse/core'
import {
  defineComponent,
  ref,
  toRef,
  watchEffect,
} from 'vue-demi'
import { getPosition } from '../pdf-object/utils/position'
import useDrag from './utils/use-drag'

export default defineComponent({
  props: {
    scale: {
      type   : Number,
      default: 1,
    },
    width: {
      type   : Number,
      default: 198,
    },
    height: {
      type   : Number,
      default: 106,
    },
    disabled: {
      type   : Boolean,
      default: false,
    },
  },
  emits: ['landed'],
  setup (props, { emit }) {
    const object = templateRef<HTMLDivElement>('object')
    const scale  = toRef(props, 'scale')
    const width  = toRef(props, 'width')
    const height = toRef(props, 'height')

    const isDragged = ref(false)
    const x         = ref(0)
    const y         = ref(0)

    useDrag(object, {
      onstart () {
        const { left, top } = object.value.getBoundingClientRect()

        isDragged.value = true
        x.value         = left
        y.value         = top
      },
      onmove (event) {
        x.value = event.clientX - (event.rect.width * scale.value / 2)
        y.value = event.clientY - (event.rect.height * scale.value / 2)
      },
      onend (event) {
        if (event.relatedTarget) {
          const reference = event.relatedTarget
          const container = reference.closest('.pdf__container')
          const result    = getPosition({
            reference: reference as HTMLDivElement,
            container: container as HTMLDivElement,
            object   : object.value,
            scale    : scale.value,
          })

          emit('landed', {
            ...result,
            witdh : width.value,
            height: height.value,
          })
        }

        isDragged.value = false
      },
    })

    watchEffect(() => {
      if (object.value) {
        if (isDragged.value) {
          object.value.style.position  = 'fixed'
          object.value.style.transform = `translate(${x.value}px, ${y.value}px) scale(${scale.value})`
          object.value.style.zIndex    = '50'
        } else {
          object.value.style.position  = 'absolute'
          object.value.style.transform = 'translate(0px, 0px)'
          object.value.style.zIndex    = '2'
        }
      }
    })

    return {}
  },
})
</script>

<style lang="postcss">
.pdf-helipad {
  @apply relative inline-block;

  &__ghost {
    @apply opacity-25 z-1 touch-none pointer-events-none;
  }
}
</style>
