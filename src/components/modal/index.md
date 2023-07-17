---
title: Modal · Components
description: ase component for modal dialog.
---

<script setup>
  import { ref } from 'vue-demi'
  import pButton from '../button/Button.vue'
  import pModal from './Modal.vue'
  import pHeading from '../heading/Heading.vue'
  import pBanner from '../banner/Banner.vue'
  import pCheckbox from '../checkbox/Checkbox.vue'
  import pFormGroup from '../form-group/FormGroup.vue'
  import pDatepicker from '../datepicker/Datepicker.vue'

  const basicModal  = ref(true)
  const showModal   = ref(false)
  const advanceModal = ref(true)
  const previewAdvance = ref(false)
  const banner1     = ref(true)
  const bannerSheet = ref(false)
  const banner2     = ref(true)
  const bottomSheet = ref(false)
  const scrollModal = ref(true)
  const bodyScroll  = ref(false)
  const modalBanner = ref(true)
  const previewBanner = ref(false)
  const modalSize   = ref(true)
  const size        = ref(false)
  const modalCenter   = ref(true)
  const centered        = ref(false)

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

    &.scroll {
      @apply h-[31rem];
    }

    .modal {
      @apply absolute w-full h-full z-10;
    }

    img {
      @apply max-w-full;
    }
  }
</style>

# Modal

> Base component for modal dialog.

## Usage
Modal are using `z-modal` for z-index value. It posible to change z-index value using CSS variable `--p-modal-z-index`. But don't forget to see the all [z-index](/foundation/variables/#z-index) variant for layer-ordering component.

### Simple Usage

<div class="flex mt-5">
  <p-button @click="click" color="info">Show Modal</p-button>
</div>

<preview>
  <p-modal
    no-close-on-esc
    no-close-on-backdrop
    v-model="basicModal"
    title="Modal Title"
    text="This is place holder text. The basic dialog for modals
      should contain only valuable and relevant information.">
    <template #footer="{ close }">
      <div class="flex items-center justify-end">
        <p-button @click="close" color="info">
          Submit
        </p-button>
      </div>
    </template>
  </p-modal>
</preview>

```vue
<template>
  <p-modal v-model="showModal"
    title="Modal Title"
    text="This is place holder text. The basic dialog for modals
      should contain only valuable and relevant information.">
    <template #footer="{ close }">
      <div class="flex items-center justify-end">
        <p-button @click="close" color="info">
          Submit
        </p-button>
      </div>
    </template>
  </p-modal>
</template>
```

<p-modal
  v-model="showModal"
  title="Modal Title">
  <p>
    This is place holder text. The basic dialog for modals
    should contain only valuable and relevant information.
  </p>
  <template #footer="{ close }">
    <div class="flex items-center justify-end">
      <p-button @click="close" color="info">
        Submit
      </p-button>
    </div>
  </template>
</p-modal>

### Combine with additional component

<div class="flex mt-5">
  <p-button @click="previewAdvance = true" color="info">Show Modal</p-button>
</div>

<preview>
  <p-modal
    no-close-on-esc
    no-close-on-backdrop
    v-model="advanceModal"
    title="Modal Title">
    <p>
      This is place holder text. The basic dialog for modals
      should contain only valuable and relevant information.
    </p>
    <p-banner>
      Your enterprise Privy Balance is running out. Please topup now.
    </p-banner>
    <template #footer="{ close }">
      <div class="flex items-center justify-between">
        <div>
          <p-checkbox>
            This is additional checbox for the modal
          </p-checkbox>
        </div>
        <div>
          <p-button @click="close" color="info">
            Button text
          </p-button>
        </div>
      </div>
    </template>
  </p-modal>
</preview>

```vue
<template>
  <p-modal
    v-model="advanceModal"
    title="Modal Title">
    <p>
      This is place holder text. The basic dialog for modals
      should contain only valuable and relevant information.
    </p>
    <p-banner>
      Your enterprise Privy Balance is running out. Please topup now.
    </p-banner>
    <template #footer="{ close }">
      <div class="flex items-center justify-between">
        <div>
          <p-checkbox>
            This is additional checbox for the modal
          </p-checkbox>
        </div>
        <div>
          <p-button @click="close" color="info">
            Button text
          </p-button>
        </div>
      </div>
    </template>
  </p-modal>
</template>
```

<p-modal
  v-model="previewAdvance"
  title="Modal Title">
  <p>
    This is place holder text. The basic dialog for modals
    should contain only valuable and relevant information.
  </p>
  <p-banner>
    Your enterprise Privy Balance is running out. Please topup now.
  </p-banner>
  <template #footer="{ close }">
    <div class="flex items-center justify-between">
      <div>
        <p-checkbox>
          This is additional checbox for the modal
        </p-checkbox>
      </div>
      <div>
        <p-button @click="close" color="info">
          Button text
        </p-button>
      </div>
    </div>
  </template>
</p-modal>

## Hide close button

You can hide close button with `dismissable` set to `false`

<div class="flex mt-5">
  <p-button @click="bottomSheet = true" color="info">Show Modal</p-button>
</div>

<preview>
  <p-modal
    title="Give Me Title Here"
    no-close-on-esc
    no-close-on-backdrop
    v-model="banner2" :dismissable="false">
    <p>
      Explain what this menu to do, <br>
      descriptive but as short as possible
    </p>
    <template #footer>
      <div class="flex justify-end">
        <p-button color="info" @click="banner2 = false">
          Button Text
        </p-button>
      </div>
    </template>
  </p-modal>
</preview>

```vue
<template>
  <p-modal
    title="Give Me Title Here"
    v-model="bottomSheet"
    :dismissable="false">
    <p>
      Explain what this menu to do, <br>
      descriptive but as short as possible
    </p>
    <template #footer>
      <div class="flex justify-end">
        <p-button color="info" @click="bottomSheet = false">
          Button Text
        </p-button>
      </div>
    </template>
  </p-modal>
</template>
```

<p-modal
  title="Give Me Title Here"
  v-model="bottomSheet" :dismissable="false">
  <p>
    Explain what this menu to do, <br>
    descriptive but as short as possible
  </p>
  <template #footer>
    <div class="flex justify-end">
      <p-button color="info" @click="bottomSheet = false">
        Button Text
      </p-button>
    </div>
  </template>
</p-modal>

## No Close Modal
Modal will not close while Escape button was pressed by props `no-close-on-esc`. Also you can make modal can't close while backdrop was clicked by props `no-close-on-backdrop`.

<div class="flex mt-5">
  <p-button @click="bannerSheet = true" color="info">Show Modal</p-button>
</div>

<preview>
  <p-modal
    title="Modal Title"
    no-close-on-esc
    no-close-on-backdrop
    v-model="banner1" :dismissable="false">
    <p>
      This is place holder text. <br>
      The basic dialog for modals should <br>
      contain only valuable and relevant information.
    </p>
    <template #footer>
      <div class="flex justify-end">
        <p-button color="info" @click="bottomSheet = false">
          Button Text
        </p-button>
      </div>
    </template>
  </p-modal>
</preview>

```vue
<template>
  <p-modal
    title="Modal Title"
    no-close-on-esc
    no-close-on-backdrop
    v-model="bannerSheet" :dismissable="false">
    <p>
      This is place holder text. <br>
      The basic dialog for modals should <br>
      contain only valuable and relevant information.
    </p>
    <template #footer="{ close }">
      <div class="flex justify-end">
        <p-button color="info" @click="close">
          Button Text
        </p-button>
      </div>
    </template>
  </p-modal>
</template>
```

<p-modal
  title="Modal Title"
  no-close-on-esc
  no-close-on-backdrop
  v-model="bannerSheet" :dismissable="false">
  <p>
    This is place holder text. <br>
    The basic dialog for modals should <br>
    contain only valuable and relevant information.
  </p>
  <template #footer="{ close }">
    <div class="flex justify-end">
      <p-button color="info" @click="close">
        Button Text
      </p-button>
    </div>
  </template>
</p-modal>

## Modal Scroll
When modals content become too long, modal body can scroll itself by adding props `modal-body-scrollable`.

<div class="flex mt-5">
  <p-button @click="bodyScroll = true" color="info">Show Modal</p-button>
</div>

<preview class="scroll">
  <p-modal
    v-model="scrollModal"
    title="Modal Title"
    no-close-on-esc
    no-close-on-backdrop
    modal-body-scrollable>
    <div>
      <p>
        This is place holder text. The basic dialog for modals should contain only valuable and relevant information. Simplify dialogs by removing unnecessary elements or content that does not support user tasks. If you find that the number of required elements for your design are making the dialog excessively large, then try a different design solution.
      </p>
      <blockquote>
        A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
      </blockquote>
      <p>
        I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents.
      </p>
      <p-form-group label="Select Date">
        <p-datepicker />
      </p-form-group>
    </div>
    <template #footer="{ close }">
      <p-button @click="close" color="info">
        Button Text
      </p-button>
    </template>
  </p-modal>
</preview>

```vue
<template>
  <p-modal
    v-model="scrollModal"
    title="Modal Title"
    no-close-on-esc
    no-close-on-backdrop
    modal-body-scrollable>
    <div>
      <p>
        This is place holder text. The basic dialog for modals should contain only valuable and relevant information. Simplify dialogs by removing unnecessary elements or content that does not support user tasks. If you find that the number of required elements for your design are making the dialog excessively large, then try a different design solution.
      </p>
      <blockquote>
        A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
      </blockquote>
      <p>
        I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents.
      </p>
    </div>
    <template #footer="{ close }">
      <p-button @click="close" color="info">
        Button Text
      </p-button>
    </template>
  </p-modal>
</template>
```

<p-modal
  v-model="bodyScroll"
  title="Modal Title"
  no-close-on-esc
  no-close-on-backdrop
  modal-body-scrollable>
  <div>
    <p>
      This is place holder text. The basic dialog for modals should contain only valuable and relevant information. Simplify dialogs by removing unnecessary elements or content that does not support user tasks. If you find that the number of required elements for your design are making the dialog excessively large, then try a different design solution.
    </p>
    <blockquote>
      A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
    </blockquote>
    <p>
      I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents.
    </p>
  </div>
  <template #footer="{ close }">
    <p-button @click="close" color="info">
      Button Text
    </p-button>
  </template>
</p-modal>

## Modal Banner
Modal can be set look like banner with prop `banner`. For example, it can be used for promotional purposes, events and others.

<div class="flex mt-5">
  <p-button @click="previewBanner = true" color="info">Show Modal</p-button>
</div>

<preview class="banner">
  <p-modal
    v-model="modalBanner"
    size="sm"
    no-close-on-esc
    no-close-on-backdrop
    banner>
    <img src="/assets/images/img-modal-banner-sheet.jpg">
    <div class="p-6">
      <p-heading element="h6">Give Me Title Here</p-heading>
      <p>
        Explain what this menu to do, <br>
        descriptive but as short as possible
      </p>
    </div>
    <template #footer="{ close }">
      <div class="flex items-center justify-end">
        <p-button variant="link" @click="close">
          Button Text
        </p-button>
        <p-button color="info" @click="close">
          Button Text
        </p-button>
      </div>
    </template>
  </p-modal>
</preview>

```vue
<template>
  <p-modal
    v-model="modalBanner"
    :dismissable="false"
    banner>
    <img src="/assets/images/img-modal-banner-sheet.jpg">
    <div class="p-6 text-center">
      <p-heading element="h6">Give Me Title Here</p-heading>
      <p>
        Explain what this menu to do, <br>
        descriptive but as short as possible
      </p>
    </div>
    <template #footer="{ close }">
      <div class="flex items-center justify-end">
        <p-button variant="link" @click="close">
          Button Text
        </p-button>
        <p-button color="info" @click="close">
          Button Text
        </p-button>
      </div>
    </template>
  </p-modal>
</template>
```

<p-modal
  v-model="previewBanner"
  size="sm"
  banner>
  <img src="/assets/images/img-modal-banner-sheet.jpg">
    <div class="p-6">
      <p-heading element="h6">Modal Title</p-heading>
      <p>
        Explain what this menu to do, <br>
        descriptive but as short as possible
      </p>
    </div>
  <template #footer="{ close }">
    <div class="flex items-center justify-end">
      <p-button variant="link" @click="close">
        Button Text
      </p-button>
      <p-button color="info" @click="close">
        Button Text
      </p-button>
    </div>
  </template>
</p-modal>

## Sizing
Modal has 4 different sizing, there are `sm`, `md`, `lg` and `xl`. You can change the size via prop `size`. Default size are `md`.

<div class="flex mt-5">
  <p-button @click="size = true" color="info">Show Modal XL</p-button>
</div>

<preview>
  <p-modal
    v-model="modalSize"
    title="Modal Title"
    size="sm"
    no-close-on-esc
    no-close-on-backdrop>
    <div>
      <blockquote>
        A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
      </blockquote>
    </div>
    <template #footer="{ close }">
      <p-button @click="close" color="info">
        Button Text
      </p-button>
    </template>
  </p-modal>
</preview>

```vue
<template>
  <p-modal
    v-model="modalSize"
    title="Modal Title"
    size="sm">
    <div>
      <blockquote>
        A wonderful serenity has taken possession of my entire soul,
        like these sweet mornings of spring which I enjoy with my whole heart.
      </blockquote>
    </div>
    <template #footer="{ close }">
      <p-button @click="close" color="info">
        Button Text
      </p-button>
    </template>
  </p-modal>
</template>
```

<p-modal
  v-model="size"
  title="Modal Title"
  size="lg">
  <div>
    <blockquote>
      A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
    </blockquote>
  </div>
  <template #footer="{ close }">
    <p-button @click="close" color="info">
      Button Text
    </p-button>
  </template>
</p-modal>

## Centered Modal
Modal can be vertically center in the viewport by setting `centered` prop.


<div class="flex mt-5">
  <p-button @click="centered = true" color="info">Show Modal</p-button>
</div>

<preview>
  <p-modal
    v-model="modalCenter"
    title="Modal Title"
    size="sm"
    no-close-on-esc
    no-close-on-backdrop
    centered>
    <div>
      This is place holder text. The basic dialog for modals
      should contain only valuable and relevant information.
    </div>
    <template #footer="{ close }">
      <p-button @click="close" color="info">
        Button Text
      </p-button>
    </template>
  </p-modal>
</preview>

```vue
<template>
  <p-modal
    v-model="modalCenter"
    title="Modal Title"
    size="sm"
    centered>
    <div>
      This is place holder text. The basic dialog for modals
      should contain only valuable and relevant information.
    </div>
    <template #footer="{ close }">
      <p-button @click="close" color="info">
        Button Text
      </p-button>
    </template>
  </p-modal>
</template>
```

<p-modal
  v-model="centered"
  title="Modal Title"
  size="sm"
  centered>
    <div>
      This is place holder text. The basic dialog for modals
      should contain only valuable and relevant information.
    </div>
  <template #footer="{ close }">
    <p-button @click="close" color="info">
      Button Text
    </p-button>
  </template>
</p-modal>

## Variables
Modal use local CSS variables on `.modal` for enhanced real-time customization.

```sass
--p-modal-size-xl: 960px;
--p-modal-size-lg: 800px;
--p-modal-size-md: 600px;
--p-modal-size-sm: 400px;
--p-modal-z-index: theme(zIndex.modal);
--p-modal-body-scrollable-max-height: theme(spacing.64);
--p-modal-body-scrollable-min-height: 0;
--p-modal-content-margin-y: theme(spacing.8);
```

## API

### Props

| Props                      |   Type    | Default | Description                                     |
|----------------------------|:---------:|:-------:|-------------------------------------------------|
| `title`                    | `String`  | -       | Modal Title                                     |
| `text`                     | `String`  | -       | Text inside of Modal Body                       |
| `dismissable`              | `Boolean` | `true`  | Show / Hide dismiss button                      |
| `size`                     | `String`  | `md`    | Size of modal, valid value is `sm`, `md`, `lg` and `xl`  |
| `banner`                   | `Boolean` | `false` | Give modal no-padding to place image for specific purpose |
| `no-close-on-esc`          | `Boolean` | `false` | No close modal while Escape was pressed         |
| `no-close-on-backdrop`     | `Boolean` | `false` | No close modal while Modal Backdrop was clicked |
| `modal-body-scrollable`    | `Boolean` | `false` | Scrollable modal body when content is to long   |

### Slots
| Name      | Description                                                                                      |
|-----------|--------------------------------------------------------------------------------------------------|
| `header ` | Content (in the form of— permalink or button) to place in Modal Header                           |
| `footer ` | Content (in the form of— permalink or button) to place in Modal Footer                           |

### Events

| Name        | Arguments | Description                     |
|-------------|-----------|---------------------------------|
| `close`     | -         | Event when close button clicked |

