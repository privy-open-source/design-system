<template>
  <div
    data-testid="pdf-helipad"
    class="pdf-helipad"
    :class="classNames">
    <div
      ref="object"
      data-testid="pdf-helipad-object"
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

<script lang="ts" setup>
import '../pdf-object/PdfObject.vue'
import {
  computed,
  ref,
  toRef,
  watch,
  watchEffect,
} from 'vue-demi'
import { getPosition } from '../pdf-object/utils/position'
import useDrag from '../pdf-helipad/utils/use-drag'
import type { PdfHelipadResult } from '../pdf-helipad'
import type { InteractEvent } from '@interactjs/types'
import type { Instance } from 'pspdfkit'
import { isInside } from './utils/position'

const props = defineProps({
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
})

const emit = defineEmits<{
  'landed': [PdfHelipadResult],
  'click': [InteractEvent],
}>()

const object = ref<HTMLDivElement>()
const scale  = toRef(props, 'scale')
const width  = toRef(props, 'width')
const height = toRef(props, 'height')

const isDragged = ref(false)
const x         = ref(0)
const y         = ref(0)

const classNames = computed(() => {
  const result: string[] = []

  if (props.disabled)
    result.push('pdf-helipad--disabled')

  return result
})

const draggable = useDrag(object, {
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
    if (event.relatedTarget && (event.target as any).instance) {
      const instance = (event.target as any).instance as Instance
      const elements = instance.contentDocument.querySelectorAll<HTMLDivElement>('.PSPDFKit-Spread')

      let reference: HTMLDivElement

      for (const page of elements) {
        if (isInside(object.value, page)) {
          reference = page

          break
        }
      }

      if (reference) {
        const page   = Number.parseInt(reference.dataset.spreadIndex) + 1
        const result = getPosition({
          reference: reference,
          object   : object.value,
          scale    : scale.value,
        })

        emit('landed', {
          ...result,
          page  : page,
          width : width.value,
          height: height.value,
        })
      }
    }

    isDragged.value = false
  },
  ontap (event) {
    emit('click', event)
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

watch(() => props.disabled, (isDisabled) => {
  draggable.value = !isDisabled
}, { immediate: true })
</script>

<style lang="postcss">
.pdf-helipad {
  @apply relative inline-block;

  &__ghost {
    @apply opacity-25 z-1 touch-none pointer-events-none;
  }

  &&--disabled {
    @apply opacity-50;
  }
}
</style>
