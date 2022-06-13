<script setup>
  import { ref } from 'vue-demi'
  import Button from '../button/Button.vue'
  import Modal from './Modal.vue'

  const basicModal = ref(true)
  const showModal = ref(false)
  const mdl = ref(false)

  function click () {
    showModal.value = true
  }

  function test () {
    console.log('test')
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
  <Modal v-model="showModal" title="Modal Title">
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

<Modal
  v-model="showModal" title="Modal Title">
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

<div class="flex mt-5">
  <Button @click="mdl = true">Show Modal</Button>
</div>

<Modal v-model="mdl" title="modal title" @dismissed="test">  
  <div>Modal Text</div>
</Modal>


