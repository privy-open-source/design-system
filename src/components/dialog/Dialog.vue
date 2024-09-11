<template>
  <Modal
    v-if="context"
    :key="id"
    v-model="modal"
    v-bind="context.attrs"
    class="modal-dialog"
    :title="context.title"
    :size="context.size"
    :centered="context.centered"
    :dismissable="context.dismissable"
    :no-close-on-backdrop="context.noCloseOnBackdrop"
    @show="onModalShow"
    @hide="onModalHide"
    @close="onCancel">
    <template #header>
      <template v-if="dialogIcon">
        <div class="modal-dialog__icon">
          <component
            :is="dialogIcon"
            :class="context.iconClass"
            v-bind="context.iconAttrs" />
        </div>
      </template>
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
        :cancel-attrs="context.cancel.attrs"
        :confirm-class="context.confirm.className"
        :confirm-visible="context.confirm.visible"
        :confirm-color="context.confirm.color"
        :confirm-variant="context.confirm.variant"
        :confirm-text="context.confirm.text"
        :confirm-attrs="context.confirm.attrs"
        @confirm="onConfirm"
        @cancel="onCancel" />
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import {
  h,
  ref,
  computed,
  nextTick,
  shallowRef,
} from 'vue-demi'
import Modal from '../modal/Modal.vue'
import Heading from '../heading/Heading.vue'
import DialogFooter from './DialogFooter.vue'
import type { DialogContext } from '.'
import { vPMd } from '../markdown'
import { until } from '@vueuse/core'

const id         = ref<symbol>()
const modal      = ref(false)
const processing = ref(false)
const context    = shallowRef<DialogContext>()

const dialogIcon = computed(() => {
  if (context.value.icon) {
    if (typeof context.value.icon === 'string') {
      return () => h('img', {
        'src'        : context.value.icon,
        'width'      : 20,
        'height'     : 20,
        'data-testid': 'dialog-icon-image',
      })
    }

    return context.value.icon
  }
})

async function show (options: DialogContext) {
  id.value      = Symbol('DialogId')
  context.value = options

  await nextTick()

  modal.value      = true
  processing.value = true

  // Wait animation done
  await until(processing).toBe(false)
}

async function hide () {
  modal.value      = false
  processing.value = true

  // Wait animation done
  await until(processing).toBe(false)
}

async function onConfirm () {
  await hide()

  context.value.onConfirm()
}

async function onCancel () {
  await hide()

  context.value.onCancel()
}

function onModalHide () {
  processing.value = false
}

function onModalShow () {
  processing.value = false
}

defineExpose({
  show,
  hide,
})
</script>

<style lang="postcss">
.modal-dialog {
  --p-modal-z-index: theme(zIndex.dialog);

  &__icon {
    @apply mt-1 mr-2;
  }
}
</style>
