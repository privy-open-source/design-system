<script setup>
  import { ref } from 'vue-demi'
  import pButton from '../button/Button.vue'
  import pModal from './Modal.vue'
  import pHeading from '../heading/Heading.vue'

  const basicModal  = ref(true)
  const showModal   = ref(false)
  const banner1     = ref(true)
  const bannerSheet = ref(false)
  const banner2     = ref(true)
  const bottomSheet = ref(false)
  const scrollModal = ref(true)
  const bodyScroll  = ref(false)
  const modalSize   = ref(true)
  const size        = ref(false)

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

## Usage

### Simple Usage

<div class="flex mt-5">
  <p-button @click="click">Show Modal</p-button>
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
        <p-button @click="close">
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
        <p-button @click="close">
          Submit
        </p-button>
      </div>
    </template>
  </p-modal>
</template>
```

<p-modal
  v-model="showModal"
  title="Modal Title"
  scroll>
  <p>
    This is place holder text. The basic dialog for modals
    should contain only valuable and relevant information.
  </p>
  <template #footer="{ close }">
    <div class="flex items-center justify-end">
      <p-button @click="close">
        Submit
      </p-button>
    </div>
  </template>
</p-modal>

## Hide close button

You can hide close button with `dismissable` set to `false`

<div class="flex mt-5">
  <p-button @click="bottomSheet = true">Show Modal</p-button>
</div>

<preview>
  <p-modal
    no-close-on-esc
    no-close-on-backdrop
    v-model="banner2" class="modal--banner" :dismissable="false">
    <div class="px-16 text-center py-7">
      <p-heading element="h6">Give Me Title Here</p-heading>
      <p>
        Explain what this menu to do, <br>
        descriptive but as short as possible
      </p>
    </div>
    <div class="flex items-center justify-between px-16 pb-7">
      <p-button variant="ghost" @click="banner2 = false">
        Button Text
      </p-button>
      <p-button variant="ghost" @click="banner2 = false">
        Button Text
      </p-button>
    </div>
  </p-modal>
</preview>

```vue
<template>
  <p-modal v-model="bottomSheet" class="modal--banner" :dismissable="false">
    <div class="px-16 text-center py-7">
      <p-heading element="h6">Give Me Title Here</p-heading>
      <p>
        Explain what this menu to do, <br>
        descriptive but as short as possible
      </p>
    </div>
    <div class="flex items-center justify-between px-16 pb-7">
      <p-button variant="ghost">
        Button Text
      </p-button>
      <p-button variant="ghost">
        Button Text
      </p-button>
    </div>
  </p-modal>
</template>
```

<p-modal v-model="bottomSheet" class="modal--banner" :dismissable="false">
  <div class="px-16 text-center py-7">
    <p-heading element="h6">Give Me Title Here</p-heading>
    <p>
      Explain what this menu to do, <br>
      descriptive but as short as possible
    </p>
  </div>
  <div class="flex items-center justify-between px-16 pb-7">
    <p-button variant="ghost" @click="bottomSheet = false">
      Button Text
    </p-button>
    <p-button variant="ghost" @click="bottomSheet = false">
      Button Text
    </p-button>
  </div>
</p-modal>

## No Close Modal
Modal will not close while Escape button was pressed by props `no-close-on-esc`. Also you can make modal can't close while backdrop was clicked by props `no-close-on-backdrop`.

<div class="flex mt-5">
  <p-button @click="bannerSheet = true">Show Modal</p-button>
</div>

<preview class="banner">
  <p-modal v-model="banner1" class="modal--banner" :dismissable="false" no-close-on-esc no-close-on-backdrop>
    <img src="./assets/images/img-modal-banner-sheet.jpg">
    <div class="p-6 text-center">
      <p-heading element="h6">Give Me Title Here</p-heading>
      <p>
        Explain what this menu to do, <br>
        descriptive but as short as possible
      </p>
    </div>
    <template #footer="{ close }">
      <div class="flex items-center justify-center">
        <p-button variant="ghost" @click="close">
          Button Text
        </p-button>
      </div>
    </template>
  </p-modal>
</preview>

```vue
<template>
  <p-modal
    v-model="bannerSheet"
    class="modal--banner"
    :dismissable="false"
    no-close-on-esc
    no-close-on-backdrop>
    <img src="./assets/images/img-modal-banner-sheet.jpg">
    <div class="p-6 text-center">
      <p-heading element="h6">Give Me Title Here</p-heading>
      <p>
        Explain what this menu to do, <br>
        descriptive but as short as possible
      </p>
    </div>
    <template #footer="{ close }">
      <div class="flex items-center justify-center">
        <p-button variant="ghost" @click="close">
          Button Text
        </p-button>
      </div>
    </template>
  </p-modal>
</template>
```

<p-modal v-model="bannerSheet" class="modal--banner" :dismissable="false" no-close-on-esc no-close-on-backdrop>
  <img src="./assets/images/img-modal-banner-sheet.jpg">
  <div class="p-6 text-center">
    <p-heading element="h6">Give Me Title Here</p-heading>
    <p>
      Explain what this menu to do, <br>
      descriptive but as short as possible
    </p>
  </div>
  <template #footer="{ close }">
    <div class="flex items-center justify-center">
      <p-button variant="ghost" @click="close">
        Button Text
      </p-button>
    </div>
  </template>
</p-modal>

## Modal Scroll
When modals content become too long, modal body can scroll itself by adding props `modal-body-scrollable`.

<div class="flex mt-5">
  <p-button @click="bodyScroll = true">Show Modal</p-button>
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
    </div>
    <template #footer="{ close }">
      <p-button @click="close">
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
      <p-button @click="close">
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
    <p-button @click="close">
      Button Text
    </p-button>
  </template>
</p-modal>

## Sizing
Modal has 4 different sizing, there are `sm`, `md`, `lg` and `xl`. You can change the size via prop `size`. Default size are `md`.


<div class="flex mt-5">
  <p-button @click="size = true">Show Modal XL</p-button>
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
      <p-button @click="close">
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
    size="sm"
    no-close-on-esc
    no-close-on-backdrop>
    <div>
      <blockquote>
        A wonderful serenity has taken possession of my entire soul,
        like these sweet mornings of spring which I enjoy with my whole heart.
      </blockquote>
    </div>
    <template #footer="{ close }">
      <p-button @click="close">
        Button Text
      </p-button>
    </template>
  </p-modal>
</template>
```

<p-modal
  v-model="size"
  title="Modal Title"
  size="lg"
  no-close-on-esc
  no-close-on-backdrop>
  <div>
    <blockquote>
      A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
    </blockquote>
  </div>
  <template #footer="{ close }">
    <p-button @click="close">
      Button Text
    </p-button>
  </template>
</p-modal>


## API

### Props

| Props                      |   Type    | Default | Description                                     |
|----------------------------|:---------:|:-------:|-------------------------------------------------|
| `title`                    | `String`  | -       | Modal Title                                     |
| `text`                     | `String`  | -       | Text inside of Modal Body                       |
| `dismissable`              | `Boolean` | `true`  | Show / Hide dismiss button                      |
| `size`                     | `String`  | `md`    | Size of modal, valid value is `sm`, `md`, `lg` and `xl`  |
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

