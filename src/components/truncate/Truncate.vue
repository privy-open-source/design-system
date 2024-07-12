<template>
  <transition
    name="fade"
    mode="out-in">
    <span
      :key="`${expand}`"
      v-p-tooltip.long="tooltip && !expandable && text.length > maxLength"
      class="truncated"
      data-testid="truncate"
      :title="text">
      {{ viewText }}
      <template v-if="expandable && text.length > maxLength">
        <a
          data-testid="truncate-expand"
          href="javascript:void"
          @click.stop.prevent="toggle">
          {{ expand ? showLessText : showMoreText }}
        </a>
      </template>
    </span>
  </transition>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue-demi'
import { vPTooltip } from '../tooltip'

const props = defineProps({
  text: {
    type   : String,
    default: '',
  },
  length: {
    type   : [Number, String],
    default: 100,
  },
  omission: {
    type   : String,
    default: '...',
  },
  expandable: {
    type   : Boolean,
    default: false,
  },
  showMoreText: {
    type   : String,
    default: 'Show More',
  },
  showLessText: {
    type   : String,
    default: 'Show Less',
  },
  tooltip: {
    type   : Boolean,
    default: true,
  },
})

const expand = ref(false)

const maxLength = computed(() => {
  return Number.parseInt(`${props.length}`)
})

const viewText = computed(() => {
  if (expand.value || Number.isNaN(maxLength.value) || props.text.length <= maxLength.value)
    return props.text

  return `${props.text.slice(0, maxLength.value - props.omission.length)}${props.omission}`
})

function toggle () {
  expand.value = !expand.value
}
</script>
