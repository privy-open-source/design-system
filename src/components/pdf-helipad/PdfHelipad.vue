<template>
  <div
    ref="root"
    class="pdf-helipad">
    <div
      ref="object"
      class="pdf-object pdf-object--external"
      :style="{ width: `${width}px`, height: `${height}px` }">
      <slot />
    </div>
    <div
      class="pdf-helipad__shadow"
      :style="{ width: `${width}px`, height: `${height}px` }">
      <slot />
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
  },
  emits: ['landed'],
  setup (props, { emit }) {
    const object = templateRef<HTMLDivElement>('object')
    const scale  = toRef(props, 'scale')

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
        x.value += event.dx
        y.value += event.dy
      },
      onend (event) {
        isDragged.value = false

        if (event.relatedTarget) {
          const reference = event.relatedTarget
          const container = reference.closest('.pdf__container')
          const result    = getPosition({
            reference: reference as HTMLDivElement,
            container: container as HTMLDivElement,
            object   : object.value,
            scale    : scale.value,
          })

          emit('landed', result)
        }
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
          object.value.style.transform = ''
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
  @apply relative;

  .pdf-object {
    @apply top-0 left-0 border-2 border-dashed border-subtle rounded;
  }

  &__shadow {
    @apply opacity-25 z-1;
  }
}
</style>
