---
title: Modal · Components
description: ase component for modal dialog.
---

<script setup>
  import { ref } from 'vue-demi'
  import pText from '../text/Text.vue'
  import pButton from '../button/Button.vue'
  import pModal from './Modal.vue'
  import pHeading from '../heading/Heading.vue'
  import pLabel from '../label/Label.vue'
  import pBanner from '../banner/Banner.vue'
  import pSubheading from '../subheading/Subheading.vue'
  import pCheckbox from '../checkbox/Checkbox.vue'
  import pFormGroup from '../form-group/FormGroup.vue'
  import pDatepicker from '../datepicker/Datepicker.vue'

  import IconNext from '@privyid/persona-icon/vue/chevron-right/20.vue'
  import IconPrev from '@privyid/persona-icon/vue/chevron-left/20.vue'
  import IconDocument from '@privyid/persona-icon/vue/document-empty/20.vue'
  import IconClose from '@privyid/persona-icon/vue/close/20.vue'

  const basicModal      = ref(true)
  const showModal       = ref(false)
  const advanceModal    = ref(true)
  const previewAdvance  = ref(false)
  const banner1         = ref(true)
  const bannerSheet     = ref(false)
  const banner2         = ref(true)
  const bottomSheet     = ref(false)
  const scrollModal     = ref(true)
  const bodyScroll      = ref(false)
  const modalBanner     = ref(true)
  const previewBanner   = ref(false)
  const modalSize       = ref(true)
  const size            = ref(false)
  const modalCenter     = ref(true)
  const centered        = ref(false)
  const modalFull       = ref(true)
  const fullscreen      = ref(false)
  const modalFullHead   = ref(true)
  const fullscreenHead  = ref(false)
  const modalFullBody   = ref(true)
  const fullscreenBody  = ref(false)
  const modalFree       = ref(true)
  const freedistraction = ref(false)

  const flscrn = ref(false)

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
  <p-button @click="showModal = true" color="info">Show Modal</p-button>
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
Modal has 5 different sizing, there are `sm`, `md`, `lg`, `xl` and `full`. You can change the size via prop `size`. Default size are `md`.

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

## Modal Fullscreen
Modal fullscreen is configured by prop `size` with `full` value. There are two type of modal fullscreen, `default` and `free-distraction`.

### Default Fullscreen
<div class="flex mt-5">
  <p-button @click="fullscreen = true" color="info">Show Modal</p-button>
</div>

<preview>
  <p-modal
    v-model="modalFull"
    title="Modal Title"
    text="This is place holder text. The basic dialog for modals
      should contain only valuable and relevant information."
    size="full"
    header-class="px-6"
    body-class="p-6"
    no-close-on-esc
    no-close-on-backdrop>
  </p-modal>
</preview>

```vue
<template>
  <p-modal
    v-model="modal"
    title="Modal Title"
    text="This is place holder text. The basic dialog for modals
      should contain only valuable and relevant information."
    size="full"
    header-class="px-6"
    body-class="p-6">
  </p-modal>
</template>
```

<p-modal
  v-model="fullscreen"
  title="Modal Title"
  text="This is place holder text. The basic dialog for modals
    should contain only valuable and relevant information."
  size="full"
  header-class="px-6"
  body-class="p-6"
  no-close-on-esc
  no-close-on-backdrop>
</p-modal>

#### Modal Fullscreen With Custom Slot `header`
<div class="flex mt-5">
  <p-button @click="fullscreenHead = true" color="info">Show Modal</p-button>
</div>

<preview>
  <p-modal
    v-model="modalFullHead"
    text="This is place holder text. The basic dialog for modals
      should contain only valuable and relevant information."
    size="full"
    header-class="px-6"
    body-class="p-6"
    no-close-on-esc
    no-close-on-backdrop>
    <template #header>
      <div class="space-x-3 modal__title">
        <IconDocument />
        <p-text class="text-subtle dark:text-dark-subtle">Letter of agreement</p-text>
        <p-label color="warning" variant="dot">Waiting</p-label>
      </div>
    </template>
  </p-modal>
</preview>

```vue
<script setup>
  import IconDocument from '@privyid/persona-icon/vue/document-empty/20.vue'
</script>

<template>
  <p-modal
    v-model="modal"
    text="This is place holder text. The basic dialog for modals
      should contain only valuable and relevant information."
    size="full"
    header-class="px-6"
    body-class="p-6">
    <template #header>
      <div class="space-x-3 modal__title">
        <IconDocument />
        <p-text class="text-subtle">Letter of agreement</p-text>
        <p-label color="warning" variant="dot">Waiting</p-label>
      </div>
    </template>
  </p-modal>
</template>
```

<p-modal
  v-model="fullscreenHead"
  text="This is place holder text. The basic dialog for modals
    should contain only valuable and relevant information."
  size="full"
  header-class="px-6"
  body-class="p-6"
  no-close-on-esc
  no-close-on-backdrop>
  <template #header>
    <div class="space-x-3 modal__title">
      <IconDocument />
      <p-text class="text-subtle dark:text-dark-subtle">Letter of agreement</p-text>
      <p-label color="warning" variant="dot">Waiting</p-label>
    </div>
  </template>
</p-modal>


#### Modal Fullscreen With Custom Slot `header` and `body`
<div class="flex mt-5">
  <p-button @click="fullscreenBody = true" color="info">Show Modal</p-button>
</div>

<preview>
  <p-modal
    v-model="modalFullBody"
    size="full"
    body-class="grid h-full grid-cols-8"
    no-close-on-esc
    no-close-on-backdrop>
    <template #header>
      <div class="overflow-y-auto modal--full__header__content bg-default-alpha dark:bg-dark-default-alpha">
        <div class="flex items-center p-3 space-x-3 bg-default dark:bg-dark-default">
          <IconDocument />
          <p-text>Letter of Agreement..</p-text>
          <IconClose class="cursor-pointer text-muted dark:text-dark-muted hover:text-subtle dark:hover:text-dark-subtle" />
        </div>
      </div>
      <div class="modal--full__header__navigation">
        <p-button style="--p-button-md-padding-x:6px;" variant="ghost"><IconPrev /></p-button>
        <p-button style="--p-button-md-padding-x:6px;" variant="ghost"><IconNext /></p-button>
      </div>
    </template>
    <template #body>
        <div class="col-span-2 bg-default dark:bg-dark-default p-7">
          <p-subheading weight="bold">Document properties</p-subheading>
        </div>
        <div class="col-span-4 px-4 pt-4 bg-base dark:bg-dark-base">
          <div class="h-full p-6 rounded-t-lg shadow-sm bg-default">
            This is place holder text. The basic dialog for modals
            should contain only valuable and relevant information.
          </div>
        </div>
        <div class="col-span-2 bg-default dark:bg-dark-default p-7">
          <p-subheading weight="bold">Set e-Meterai</p-subheading>
        </div>
    </template>
  </p-modal>
</preview>

```vue
<script setup>
  import IconNext from '@privyid/persona-icon/vue/chevron-right/20.vue'
  import IconPrev from '@privyid/persona-icon/vue/chevron-left/20.vue'
  import IconDocument from '@privyid/persona-icon/vue/document-empty/20.vue'
  import IconClose from '@privyid/persona-icon/vue/close/20.vue'
</script>

<template>
  <p-modal
    v-model="modal"
    body-class="grid h-full grid-cols-8"
    size="full">
    <template #header>
      <div class="overflow-y-auto modal--full__header__content bg-default-alpha">
        <div class="flex items-center p-3 space-x-3 bg-default">
          <IconDocument />
          <p-text>Letter of Agreement..</p-text>
          <IconClose class="cursor-pointer text-muted hover:text-subtle" />
        </div>
      </div>
      <div class="modal--full__header__navigation">
        <p-button icon variant="ghost"><IconPrev /></p-button>
        <p-button icon variant="ghost"><IconNext /></p-button>
      </div>
    </template>
    <template #body>
        <div class="col-span-2 bg-default p-7">
          <p-subheading weight="bold">Document properties</p-subheading>
        </div>
        <div class="col-span-4 px-4 pt-4 bg-base">
          <div class="h-full p-6 rounded-t-lg shadow-sm bg-default">
            This is place holder text. The basic dialog for modals
            should contain only valuable and relevant information.
          </div>
        </div>
        <div class="col-span-2 p-7 bg-default">
          <p-subheading weight="bold">Set e-Meterai</p-subheading>
        </div>
    </template>
  </p-modal>
</template>
```

<p-modal
  v-model="fullscreenBody"
  size="full"
  body-class="grid h-full grid-cols-8"
  no-close-on-esc
  no-close-on-backdrop>
  <template #header>
    <div class="overflow-y-auto modal--full__header__content bg-default-alpha dark:bg-dark-default-alpha">
      <div class="flex items-center p-3 space-x-3 bg-default dark:bg-dark-default">
        <IconDocument />
        <p-text>Letter of Agreement..</p-text>
        <IconClose class="cursor-pointer text-muted dark:text-dark-muted hover:text-subtle dark:hover:text-dark-subtle" />
      </div>
    </div>
    <div class="modal--full__header__navigation">
      <p-button style="--p-button-md-padding-x:6px;" variant="ghost"><IconPrev /></p-button>
      <p-button style="--p-button-md-padding-x:6px;" variant="ghost"><IconNext /></p-button>
    </div>
  </template>
  <template #body>
      <div class="col-span-2 bg-default dark:bg-dark-default p-7">
        <p-subheading weight="bold">Document properties</p-subheading>
      </div>
      <div class="col-span-4 px-4 pt-4 bg-base dark:bg-dark-base">
        <div class="h-full p-6 rounded-t-lg shadow-sm bg-default dark:bg-dark-default">
          This is place holder text. The basic dialog for modals
          should contain only valuable and relevant information.
        </div>
      </div>
      <div class="col-span-2 bg-default dark:bg-dark-default p-7">
        <p-subheading weight="bold">Set e-Meterai</p-subheading>
      </div>
  </template>
</p-modal>

### Free Distraction
Activate modal free distraction type is by adding `free-distraction` prop in the modal size `full`.
Slot `body` cannot be used in this modal type.
<div class="flex mt-5">
  <p-button @click="freedistraction = true" color="info">Show Modal</p-button>
</div>

<preview>
  <p-modal
    v-model="modalFree"
    title="Modal Title"
    text="This is place holder text. The basic dialog for modals
      should contain only valuable and relevant information."
    size="full"
    header-class="px-6"
    body-class="p-6"
    no-close-on-esc
    no-close-on-backdrop
    free-distraction>
  </p-modal>
</preview>

```vue
<template>
  <p-modal
    v-model="modal"
    title="Modal Title"
    text="This is place holder text. The basic dialog for modals
      should contain only valuable and relevant information."
    size="full"
    free-distraction>
  </p-modal>
</template>
```

<p-modal
  v-model="freedistraction"
  title="Modal Title"
  text="This is place holder text. The basic dialog for modals
    should contain only valuable and relevant information."
  size="full"
  no-close-on-esc
  no-close-on-backdrop
  free-distraction>
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

| Props                 |              Type               | Default | Description                                               |
|-----------------------|:-------------------------------:|:-------:|-----------------------------------------------------------|
| `modelValue`          |            `Boolean`            | `false` | `v-model` value for show / hide modal                     |
| `title`               |            `String`             |    -    | Modal Title                                               |
| `text`                |            `String`             |    -    | Text inside of Modal Body                                 |
| `dismissable`         |            `Boolean`            | `true`  | Show / Hide dismiss button                                |
| `size`                |            `String`             |  `md`   | Size of modal, valid value is `sm`, `md`, `lg` and `xl`   |
| `banner`              |            `Boolean`            | `false` | Give modal no-padding to place image for specific purpose |
| `noCloseOnEsc`        |            `Boolean`            | `false` | No close modal while Escape was pressed                   |
| `noCloseOnBackdrop`   |            `Boolean`            | `false` | No close modal while Modal Backdrop was clicked           |
| `modalBodyScrollable` |            `Boolean`            | `false` | Scrollable modal body when content is to long             |
| `centered`            |            `Boolean`            | `false` | Handle center vertically of the viewport                  |
| `freeDistraction`     |            `Boolean`            | `false` | Activate modal free distraction type when size are `full` |
| `headerClass`         | `String` or `Array` or `Object` |   `-`   | CSS class to add in the modal header                      |
| `dialogClass`         | `String` or `Array` or `Object` |   `-`   | CSS class to add in the modal dialog                      |
| `contentClass`        | `String` or `Array` or `Object` |   `-`   | CSS class to add in the modal content                     |
| `bodyClass`           | `String` or `Array` or `Object` |   `-`   | CSS class to add in the modal body                        |
| `footerClass`         | `String` or `Array` or `Object` |   `-`   | CSS class to add in the modal footer                      |

### Slots
| Name      | Description                                                                                                                            |
|-----------|----------------------------------------------------------------------------------------------------------------------------------------|
| `header ` | Content (in the form of— permalink or button) to place in Modal Header                                                                 |
| `body `   | Content to place in Modal body of size full with default type only                                                                     |
| `footer ` | Content (in the form of— permalink or button) to place in Modal Footer. Modal size full with default type **not supported** this slot. |

### Events

| Name    | Arguments | Description                     |
|---------|-----------|---------------------------------|
| `close` | -         | Event when close button clicked |
| `hide`  | -         | Event when modal hidden         |
| `show`  | -         | Event when modal shown          |

