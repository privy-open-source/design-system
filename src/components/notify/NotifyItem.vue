<template>
  <component
    :is="option.component"
    v-bind="option.props" />
</template>

<script setup lang="ts">
import type { PropType } from 'vue-demi'
import { provide, watchEffect } from 'vue-demi'
import { NOTIFY_CONTEXT, type NotifyOption } from '.'

const props = defineProps({
  option: {
    type   : Object as PropType<NotifyOption>,
    default: () => ({}),
  },
})

const emit = defineEmits<{
  'dismissed': [],
  'update:option': [Partial<NotifyOption>],
}>()

function close () {
  emit('dismissed')
}

function update (option: Partial<NotifyOption>) {
  emit('update:option', option)
}

watchEffect((onCleanup) => {
  const duration = props.option.duration ?? 3000

  if (Number.isFinite(duration) && duration > 0) {
    const timer = setTimeout(close, duration)

    onCleanup(() => {
      clearTimeout(timer)
    })
  }
})

provide(NOTIFY_CONTEXT, { close, update })
</script>
