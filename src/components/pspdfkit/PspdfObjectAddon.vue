<template>
  <div
    data-testid="pdf-object-addon"
    class="pdf-object__addon"
    :class="classNames">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue-demi'
import { computed } from 'vue-demi'
import type { AddonPositionVariant } from '../pdf-object'

const props = defineProps({
  position: {
    type   : String as PropType<AddonPositionVariant>,
    default: 'right',
  },
})

const classNames = computed(() => {
  const result: string[] = []

  if (props.position)
    result.push(`pdf-object__addon--${props.position}`)

  return result
})
</script>
