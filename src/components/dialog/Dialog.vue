<template>
  <Modal
    v-if="context"
    :key="id"
    v-model="modal"
    class="dialog"
    :title="context.title"
    :size="context.size"
    :centered="context.centered"
    :dismissable="context.dismissable"
    :no-close-on-backdrop="context.noCloseOnBackdrop"
    @close="onCancel">
    <template #header>
      <Heading
        v-p-md.inline="context.title"
        class="modal__title"
        element="h6" />
    </template>
    <template #default>
      <template v-if="(typeof context.content === 'function')">
        <component :is="context.content" />
      </template>
      <template v-else>
        <span v-p-md.inline="context.text" />
      </template>
    </template>
    <template #footer>
      <dialog-footer
        :align="context.footerAlign"
        :cancel-class="context.cancel.className"
        :cancel-visible="context.cancel.visible"
        :cancel-color="context.cancel.color"
        :cancel-variant="context.cancel.variant"
        :cancel-text="context.cancel.text"
        :confirm-class="context.confirm.className"
        :confirm-visible="context.confirm.visible"
        :confirm-color="context.confirm.color"
        :confirm-variant="context.confirm.variant"
        :confirm-text="context.confirm.text"
        @confirm="onConfirm"
        @cancel="onCancel" />
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue-demi'
import Modal from '../modal/Modal.vue'
import Heading from '../heading/Heading.vue'
import DialogFooter from './DialogFooter.vue'
import type { DialogContext } from '.'
import { vPMd } from '../markdown'

const id      = ref<symbol>()
const modal   = ref(false)
const context = ref<DialogContext>()

function show (options: DialogContext) {
  id.value      = Symbol('DialogId')
  context.value = options

  nextTick(() => {
    modal.value = true
  })
}

function hide () {
  modal.value = false
}

function onConfirm () {
  hide()

  // Wait animation done
  setTimeout(() => {
    context.value.onConfirm()
  }, 150)
}

function onCancel () {
  hide()

  // Wait animation done
  setTimeout(() => {
    context.value.onCancel()
  }, 150)
}

defineExpose({
  show,
  hide,
})
</script>

<style lang="postcss">
.dialog {
  --p-modal-z-index: theme(zIndex.dialog);
}
</style>
