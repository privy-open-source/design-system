<template>
  <div data-testid="sample">
    <p data-testid="sample-text">
      {{ text }}
    </p>
    <a
      data-testid="sample-update"
      href="#"
      @click="update({ props: { text: 'New Text' } })">
      update
    </a>
    <a
      data-testid="sample-close"
      href="#"
      @click="close()">
      close
    </a>
  </div>
</template>

<script lang="ts" setup>
import { useNotifyItem } from '..'

defineProps({
  text: {
    type   : String,
    default: 'This is message body',
  },
})

const {
  close,
  update,
} = useNotifyItem()
</script>
