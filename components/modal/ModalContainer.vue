<template>
  <Transition
    name="fade"
    data-testid="modal-container">
    <Modal
      v-if="modal"
      v-model="modal"
      :title="items.title"
      :text="items.text">
      <template #footer>
        <modal-footer
          :align="items.footerAlign"
          :cancel-class="items.cancel.className"
          :cancel-visible="items.cancel.visible"
          :cancel-color="items.cancel.color"
          :cancel-variant="items.cancel.variant"
          :cancel-text="items.cancel.text"
          :confirm-class="items.confirm.className"
          :confirm-visible="items.confirm.visible"
          :confirm-color="items.confirm.color"
          :confirm-variant="items.confirm.variant"
          :confirm-text="items.confirm.text"
          @cancel="cancel"
          @confirm="confirm" />
      </template>
    </Modal>
  </Transition>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue-demi'
import { ModalOptions } from './use-modal'
import Button from '../button/Button.vue'
import Modal from './Modal.vue'
import ModalFooter from './ModalFooter.vue'
import defu from 'defu'

export default defineComponent({
  components: {
    Modal, Button, ModalFooter,
  },
  emits: ['cancel', 'confirm'],
  setup () {
    const items = ref<ModalOptions>({})
    const modal = ref(false)

    function show (options: ModalOptions) {
      items.value = defu(options, {
        cancel : {},
        confirm: {},
      })

      modal.value = true
    }

    function close () {
      modal.value = false
    }

    function confirm () {
      close()
    }

    function cancel () {
      close()
    }

    return {
      items,
      show,
      modal,
      cancel,
      confirm,
    }
  },
})

</script>

<style lang="postcss">

</style>
