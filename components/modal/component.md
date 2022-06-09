<script setup>
  import { ref } from 'vue-demi'
  import Button from '../button/Button.vue'
  import Modal from './Modal.vue'

  const basicModal = ref(true)
  const showModal = ref(false)

  function click () {
    showModal.value = true
  }

  function click2 () {
    model2.value = true
  }

  function cancelCallback () {
    console.log('cancel')
  }

  function confirmCallback () {
    console.log('confirm')
  }
</script>

<style scoped lang="postcss">
  .preview {
    @apply h-80 overflow-hidden;

    .modal {
      @apply absolute w-full h-full;
    }
  }
</style>

# Modal

## Usage

### Simple Usage

<div class="flex mt-5">
  <Button @click="click">Show Modal</Button>
</div>

<preview>
  <Modal v-model="basicModal" title="Modal Title">
    <p>
      This is place holder text. The basic dialog for modals
      should contain only valuable and relevant information.
    </p>
    <template #footer="{ close }">
      <div class="flex items-center justify-end">
        <Button @click="close">
          Submit
        </Button>
      </div>
    </template>
  </Modal>
</preview>

```vue
<template>
  <Modal v-model="basicModal" title="Modal Title">
    <p>
      This is place holder text. The basic dialog for modals
      should contain only valuable and relevant information.
    </p>
    <template #footer="{ close }">
      <div class="flex items-center justify-end">
        <Button @click="close">
          Submit
        </Button>
      </div>
    </template>
  </Modal>
</template>
```

<Modal v-model="showModal" title="Modal Title">
  <p>
    This is place holder text. The basic dialog for modals
    should contain only valuable and relevant information.
  </p>
  <template #footer>
    <div class="flex items-center justify-end">
      <Button>Button Text</Button>
    </div>
  </template>
</Modal>
