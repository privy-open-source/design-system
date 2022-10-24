<template>
  <Modal
    v-if="context"
    :key="id"
    v-model="modal"
    :title="context.title"
    :size="context.size"
    :centered="context.centered"
    :text="context.text"
    @close="onCancel">
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

<script lang="ts">
import {
  defineComponent,
  nextTick,
  ref,
} from 'vue-demi'
import Modal from '../modal/Modal.vue'
import DialogFooter from './DialogFooter.vue'
import { DialogContext } from '.'

export default defineComponent({
  components: { Modal, DialogFooter },
  setup () {
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

    return {
      id,
      modal,
      context,
      show,
      hide,
      onConfirm,
      onCancel,
    }
  },
})
</script>
