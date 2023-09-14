---
title: Variables · Foundation
description: Collections of foundation rules
---

<script lang="ts" setup>
  import { ref, reactive } from 'vue-demi'
  import pCaption from '../../components/caption/Caption.vue'
  import IconSun from '@privyid/persona-icon/vue/sun/16.vue'
  import pButton from '../../components/button/Button.vue'
  import pLabel from '../../components/label/Label.vue'
  import pBadge from '../../components/badge/Badge.vue'
  import pCard from '../../components/card/Card.vue'
  import pAvatar from '../../components/avatar/Avatar.vue'
  import pModal from '../../components/modal/Modal.vue'
  import pInput from '../../components/input/Input.vue'
  import pTextarea from '../../components/textarea/Textarea.vue'

  const model = ref(false)

  interface MBody {
    size: string,
    body: string,
  }

  const attr: MBody = reactive({
    size: 'md',
    body: 'Modal size md'
  })

  function showModal (size: string) {
    model.value = true
    attr.size = size
    attr.body = `Modal size ${size}`
  }
</script>

<style lang='postcss'>
  .modal-container {
    @apply relative h-[12rem];

    .modal {
      @apply absolute;
    }
  }
</style>

# Variables
Table-list regarding the use of foundation

## Radius

### Button Radius Rules
Button has 3 radius variant. `default` radius is used for button size `lg` and `md`. `sm` radius is used for button size `sm` and `xs` radius is for button size `xs`.

<preview class="flex-col space-y-4">
  <p-button color="info" size="lg">default</p-button>
  <p-button color="info">default</p-button>
  <p-button color="info" size="sm">sm</p-button>
  <p-button color="info" size="xs">xs</p-button>
</preview>

<div class="w-2/4 table-list">

| Size   | Default | Pills |
|--------|---------|-------|
| large  | default | full  |
| normal | default | full  |
| small  | sm      | full  |
| xsmall | xs      | full  |

</div>


### Label Radius Rules
Label has 4 radius variant. `default` radius is used form label size `lg`, `sm` radius is used for label size `md`, `xs` radius is used for label size `sm` and `tn` radius is for label size `tn`.

<preview class="flex-col space-y-4">
  <p-label variant="dot" color="info" size="lg">default</p-label>
  <p-label variant="dot" color="info">sm</p-label>
  <p-label variant="dot" color="info" size="sm">xs</p-label>
  <p-label variant="dot" color="info" size="xs">tn</p-label>
</preview>

<div class="w-2/3 table-list">

| Size   | None | Default | Pills |
|--------|------|---------|-------|
| large  | none | default | full  |
| medium | none | sm      | full  |
| small  | none | xs      | full  |
| tiny   | none | tn      | full  |

</div>

### Badge Radius Rules
Badge use `full` radius.

<preview class="flex-col">
  <p-badge color="info">full</p-badge>
</preview>

<div class="w-1/3 table-list">

| Size   | Pills |
|--------|-------|
| normal | full  |

</div>

### Card Radius Rules
Card use `md` radius.

<preview class="!block">
  <p-card>md</p-card>
</preview>

<div class="w-1/3 table-list">

| Size   | Default |
|--------|---------|
| normal | md      |

</div>

### Other Radius Rules
Normal size of some component are use `none` (no-radius) or `default` radius.

<div class="w-2/4 table-list">

| Size   | None | Default |
|--------|------|---------|
| normal | none | default |

</div>


## Component Sizing

### Avatar
Avatar has 5 size variant, there are `xl`, `lg`, `md`, `sm` and `xs`. Default size is `md`

<preview class="flex-row space-x-4">
  <p-avatar size="xl" name="xavier line"></p-avatar>
  <p-avatar size="lg" name="long garage"></p-avatar>
  <p-avatar name="meta debugging"></p-avatar>
  <p-avatar size="sm" name="sosio mitigasi"></p-avatar>
  <p-avatar size="xs" name="xenia senia"></p-avatar>
</preview>

<div class="w-1/3 table-list">

| Size   | Default State |
|--------|---------------|
| Xlarge |               |
| Large  |               |
| Medium | `Default`     |
| Small  |               |
| Xsmall |               |

</div>

### Button
Button has 4 size variant, there are `lg`, `md`, `sm` and `xs`. Default button size is `md`

<preview class="flex-row space-x-4">
  <p-button color="info" size="lg">lg</p-button>
  <p-button color="info" size="md">md</p-button>
  <p-button color="info" size="sm">sm</p-button>
  <p-button color="info" size="xs">xs</p-button>
</preview>

<div class="w-1/3 table-list">

| Size   | Default State |
|--------|---------------|
| Large  |               |
| Medium | `Default`     |
| Small  |               |
| Xsmall |               |

</div>

### Label
Label has 4 size variant, there are `lg`, `md`, `sm` and `xs`. The default size of label is `md`

<preview class="flex-row space-x-4">
  <p-label variant="dot" color="info" size="lg">lg</p-label>
  <p-label variant="dot" color="info" size="md">md</p-label>
  <p-label variant="dot" color="info" size="sm">sm</p-label>
  <p-label variant="dot" color="info" size="xs">xs</p-label>
</preview>

<div class="w-1/3 table-list">

| Size   | Default State |
|--------|---------------|
| Large  |               |
| Medium | `Default`     |
| Small  |               |
| Xsmall |               |

</div>

### Modal Dialog
Modal has 4 different size, namely `lg`, `md`, `sm` and `xs`. Default modal size is `md`

<preview class="flex-row space-x-4 modal-container">
  <p-button color="info" @click="showModal('lg')">Modal Large</p-button>
  <p-button color="info" @click="showModal('md')">Modal Medium</p-button>
  <p-button color="info" @click="showModal('sm')">Modal Small</p-button>
  <p-button color="info" @click="showModal('xs')">Modal Xsmall</p-button>
</preview>

<p-modal
  :size="attr.size"
  v-model="model"
  title="modal title"
  :text="attr.body"
  no-close-on-esc>
</p-modal>

<div class="w-1/3 table-list">

| Size   | Default State |
|--------|---------------|
| Large  |               |
| Medium | `Default`     |
| Small  |               |
| Xsmall |               |

</div>

### Input
Input has 4 size variant, there are `lg`, `md`, `sm` and `xs`. The default size of input is `md`

<preview class="flex-col space-y-4">
  <p-input size="lg" placeholder="Input lg" />
  <p-input size="md" placeholder="Input md (default)" />
  <p-input size="sm" placeholder="Input sm" />
  <p-input size="xs" placeholder="Input xs" />
</preview>

<div class="w-1/3 table-list">

| Size   | Default State |
|--------|---------------|
| Large  |               |
| Medium | `Default`     |
| Small  |               |
| Xsmall |               |

</div>


## Box Shadow

<div class="w-full table-list">

| Type     | sm | md | lg | xl | 2xl |
|----------|:--:|:--:|:--:|:--:|:---:|
| Button   |    |    | v  |    |     |
| Card     | v  |    |    | v  |     |
| Dropdown |    |    |    | v  |     |
| Modal    |    |    |    |    |  v  |
| Toast    |    |    |    | v  |     |
| Tooltip  | v  |    |    |    |     |
| Tour     | v  |    |    |    |     |


</div>

### Button
Button is using shadow `lg` for `hover` state.

### Card
Default Card is no-shadow, then in `callout` variant is using shadow `sm`. Card in `Calendar` is using shadow `xl`.

### Dropdown
Dropdown is using shadow `xl`

### Modal
Modal use shadow `2xl`

### Toast
Toast is using shadow `xl`

### Tooltip
Tooltip use shadow `sm`

### Tour
Tour is using shadow `sm`

## Z-Index
Some components that have fixed and absolute positions are given z-index values to sort their layer hierarchies.

<div class="w-full table-list">

| Name            | Value | Component        |
|-----------------|-------|------------------|
| z-dropdown      | 1020  | Dropdown         |
| z-sticky        | 1030  | Navbar & Sidebar |
| z-fixed         | 1040  | Navbar & Sidebar |
| z-modal         | 1050  | Modal & Sheet    |
| z-overlay       | 1060  | Overlay          |
| z-tooltip       | 1070  | Tooltip          |
| z-tour-backdrop | 1080  | Tour backdrop    |
| z-tour          | 1085  | Tour             |
| z-toast         | 1090  | Toast            |

</div>
