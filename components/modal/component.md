<script setup>
  import { ref } from 'vue-demi'
  import Button from '../button/Button.vue'
  import Modal from './Modal.vue'
  import Heading from '../heading/Heading.vue'

  const basicModal = ref(true)
  const showModal = ref(false)
  const banner1 = ref(true)
  const bannerSheet = ref(false)
  const banner2 = ref(true)
  const bottomSheet = ref(false)

  function click () {
    showModal.value = true
  }
</script>

<style scoped lang="postcss">
  .preview {
    @apply h-80 overflow-hidden;

    &.banner {
      @apply h-[48rem];
    }

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
  <Modal
    no-close-on-esc
    no-close-on-backdrop
    v-model="basicModal" 
    title="Modal Title" 
    text="This is place holder text. The basic dialog for modals
      should contain only valuable and relevant information.">
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
  <Modal v-model="showModal" 
    title="Modal Title" 
    text="This is place holder text. The basic dialog for modals
      should contain only valuable and relevant information.">
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
  v-model="showModal"
  title="Modal Title">
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

## Hide close button

You can hide close button with `dismissable` set to `false`

<div class="flex mt-5">
  <Button @click="bottomSheet = true">Show Modal</Button>
</div>

<preview>
  <Modal 
    no-close-on-esc
    no-close-on-backdrop
    v-model="banner2" class="modal--banner" :dismissable="false">
    <div class="text-center px-16 py-7">
      <Heading element="h6">Give Me Title Here</Heading>
      <p>
        Explain what this menu to do, <br>
        descriptive but as short as possible
      </p>
    </div>
    <div class="flex items-center px-16 pb-7 justify-between">
      <Button variant="ghost" @click="banner2 = false">
        Button Text
      </Button>
      <Button variant="ghost" @click="banner2 = false">
        Button Text
      </Button>
    </div>
  </Modal>
</preview>

```vue
<template>
  <Modal v-model="bottomSheet" class="modal--banner" :dismissable="false">
    <div class="text-center px-16 py-7">
      <Heading element="h6">Give Me Title Here</Heading>
      <p>
        Explain what this menu to do, <br>
        descriptive but as short as possible
      </p>
    </div>
    <div class="flex items-center px-16 pb-7 justify-between">
      <Button variant="ghost">
        Button Text
      </Button>
      <Button variant="ghost">
        Button Text
      </Button>
    </div>
  </Modal>
</template>
```

<Modal v-model="bottomSheet" class="modal--banner" :dismissable="false">
  <div class="text-center px-16 py-7">
    <Heading element="h6">Give Me Title Here</Heading>
    <p>
      Explain what this menu to do, <br>
      descriptive but as short as possible
    </p>
  </div>
  <div class="flex items-center px-16 pb-7 justify-between">
    <Button variant="ghost" @click="bottomSheet = false">
      Button Text
    </Button>
    <Button variant="ghost" @click="bottomSheet = false">
      Button Text
    </Button>
  </div>
</Modal>

## No Close Modal
Modal will not close while Escape button was pressed by props `no-close-on-esc`. Also you can make modal can't close while backdrop was clicked by props `no-close-on-backdrop`.

<div class="flex mt-5">
  <Button @click="bannerSheet = true">Show Modal</Button>
</div>

<preview class="banner">
  <Modal v-model="banner1" class="modal--banner" :dismissable="false" no-close-on-esc no-close-on-backdrop>
    <img src="./assets/images/img-modal-banner-sheet.jpg">
    <div class="text-center p-6">
      <Heading element="h6">Give Me Title Here</Heading>
      <p>
        Explain what this menu to do, <br>
        descriptive but as short as possible
      </p>
    </div>
    <template #footer="{ close }">
      <div class="flex items-center justify-center">
        <Button variant="ghost" @click="close">
          Button Text
        </Button>
      </div>
    </template>
  </Modal>
</preview>

```vue
<template>
  <Modal 
    v-model="bannerSheet" 
    class="modal--banner" 
    :dismissable="false" 
    no-close-on-esc 
    no-close-on-backdrop>
    <img src="./assets/images/img-modal-banner-sheet.jpg">
    <div class="text-center p-6">
      <Heading element="h6">Give Me Title Here</Heading>
      <p>
        Explain what this menu to do, <br>
        descriptive but as short as possible
      </p>
    </div>
    <template #footer="{ close }">
      <div class="flex items-center justify-center">
        <Button variant="ghost" @click="close">
          Button Text
        </Button>
      </div>
    </template>
  </Modal>
</template>
```

<Modal v-model="bannerSheet" class="modal--banner" :dismissable="false" no-close-on-esc no-close-on-backdrop>
  <img src="./assets/images/img-modal-banner-sheet.jpg">
  <div class="text-center p-6">
    <Heading element="h6">Give Me Title Here</Heading>
    <p>
      Explain what this menu to do, <br>
      descriptive but as short as possible
    </p>
  </div>
  <template #footer="{ close }">
    <div class="flex items-center justify-center">
      <Button variant="ghost" @click="close">
        Button Text
      </Button>
    </div>
  </template>
</Modal>

## API

### Props

| Props                      |   Type    | Default | Description                                     |
|----------------------------|:---------:|:-------:|-------------------------------------------------|
| `title`                    | `String`  | -       | Modal Title                                     |
| `text`                     | `String`  | -       | Text inside of Modal Body                       |
| `dismissable`              | `Boolean` | `true`  | Show / Hide dismiss button                      |
| `no-close-on-esc`          | `Boolean` | `false` | No close modal while Escape was pressed         |
| `no-close-on-backdrop`     | `Boolean` | `false` | No close modal while Modal Backdrop was clicked |

### Slots
| Name      | Description                                                                                      |
|-----------|--------------------------------------------------------------------------------------------------|
| `header ` | Content (in the form of— permalink or button) to place in Modal Header                           |
| `footer ` | Content (in the form of— permalink or button) to place in Modal Footer                           |

### Events

| Name        | Arguments | Description                     |
|-------------|-----------|---------------------------------|
| `close`     | -         | Event when close button clicked |

