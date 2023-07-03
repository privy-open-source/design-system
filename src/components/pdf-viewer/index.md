---
title: PDF Viewer · Components
description: Open and View PDF Document
---
<script setup>
  import pPdfViewer from './PdfViewer.vue'
  import pNavbar from '../navbar/Navbar.vue'
  import pNavbarBrand from '../navbar/NavbarBrand.vue'
  import pNavbarNav from '../navbar/NavbarNav.vue'
  import pNavItem from '../nav/NavItem.vue'
  import pButton from '../button/Button.vue'
  import pFormGroup from '../form-group/FormGroup.vue'
  import pInputPassword from '../input-password/InputPassword.vue'
  import pBanner from '../banner/Banner.vue'
  import pToggle from '../toggle/Toggle.vue'
  import FILE from '../../public/assets/pdf/Calibrator-v3.pdf?url'
  import FILE_PROTECT from '../../public/assets/pdf/Calibrator-v3_protected.pdf?url'
  import IMG_FIXED_FIT from '../../public/assets/images/fixed-vs-fit.svg'
  import { ref } from 'vue-demi'

  const password = ref('')
  const layout   = ref('fixed')
</script>

<style lang="postcss">
  .preview > .pdf {
    @apply z-[2];
  }
</style>

# PDF Viewer
> Open and View PDF Document

## Usage

### Simple Usage

<preview>
  <p-pdf-viewer :src="FILE" />
</preview>

```vue
<template>
  <p-pdf-viewer :src="FILE" />
</template>

<script setup>
  import FILE from '~/assets/Calibrator-v3.pdf'
</script>
```

### With Header And Footer

<preview>
  <p-pdf-viewer :src="FILE">
    <template #header>
      <p-navbar>
        <p-navbar-brand>
          <img src="../../public/assets/images/icon-privy.svg" />
        </p-navbar-brand>
        <p-navbar-nav>
          <p-nav-item active>Label</p-nav-item>
          <p-nav-item>Label</p-nav-item>
          <p-nav-item>Label</p-nav-item>
        </p-navbar-nav>
      </p-navbar>
    </template>
    <template #footer>
      <div class="p-4 text-center">
        <p-button color="primary">
          Action Button
        </p-button>
      </div>
    </template>
  </p-pdf-viewer>
</preview>

```vue
<template>
  <p-pdf-viewer :src="FILE">
    <template #header>
      <p-navbar>
        <p-navbar-brand>
          <img src="../../public/assets/images/icon-privy.svg" />
        </p-navbar-brand>
        <p-navbar-nav>
          <p-nav-item active>Label</p-nav-item>
          <p-nav-item>Label</p-nav-item>
          <p-nav-item>Label</p-nav-item>
        </p-navbar-nav>
      </p-navbar>
    </template>
    <template #footer>
      <div class="p-4 text-center">
        <p-button color="primary">
          Action Button
        </p-button>
      </div>
    </template>
  </p-pdf-viewer>
</template>
```

## Handle Document with Password

If your document is require a password to open, you can pass the password to prop `password`.

<p-banner :dismissable="false">
  This component doesn't provide any UI for handling input password. You have to do it yourself.
</p-banner>

<preview class="flex-col">
  <p-form-group
    label="Password"
    description="The password is: 123456">
    <p-input-password
      v-model="password" />
  </p-form-group>
  <p-pdf-viewer
    :src="FILE_PROTECT"
    :password="password" />
</preview>

```vue
<template>
  <p-form-group
    label="Password"
    description="The password is: 123456">
    <p-input-password
      v-model="password" />
  </p-form-group>
  <p-pdf-viewer
    :src="FILE_PROTECT"
    :password="password" />
</template>

<script setup>
  import FILE_PROTECT from '~/assets/Calibrator-v3_protected.pdf?url'

  const password = ref('')
</script>
```

## Layout Fit Mode

Set `layout` prop to `fit` to enable layout fit mode. It will adapt the viewer height with viewport, best for combining with [PDFObject](/components/pdf-object/).

<a :href="IMG_FIXED_FIT" target="_blank">
  <img class="w-full" :src="IMG_FIXED_FIT" alt="fixed-vs-fit-ilustration" />
</a>

**Try it**

<div class="mb-4">
  <p-toggle value="fit" unchecked-value="fixed" v-model="layout">
    Enable Layout fit
  </p-toggle>
</div>

<preview>
  <p-pdf-viewer
    :src="FILE"
    :layout="layout"
    offset-top="72" />
</preview>

```vue
<template>
  <p-pdf-viewer
    :src="FILE"
    layout="fit"
    offset-top="72" />
</template>
```

## API

### Props

| Props       |   Type   | Default | Description                                       |
|-------------|:--------:|:-------:|---------------------------------------------------|
| `src`       | `String` |   `-`   | Document source URL                               |
| `password`  | `String` |   `-`   | Document password                                 |
| `layout`    | `String` | `fixed` | Viewer layout sizing, valid value: `fixed`, `fit` |
| `offsetTop` | `Number` |   `0`   | Margin top when using layout `fit`                |
| `page`      | `Number` |   `1`   | `v-model:page` value                              |
| `scale`     | `Number` |   `1`   | `v-model:scale` value                             |

### Slots

| Name      | Description                                            |
|-----------|--------------------------------------------------------|
| `default` | Content to place [PDF Object](/components/pdf-object/) |
| `header`  | Content to place as header                             |
| `footer`  | Content to place as footer                             |

### Events

| Name             | Arguments | Description                                                |
|------------------|-----------|------------------------------------------------------------|
| `loaded`         | -         | Event when document loaded                                 |
| `error`          | Error     | Event when got error when loading the document             |
| `error-password` | Error     | Event when document require a password or password invalid |

## See Also

- [PDF Object](/components/pdf-object/)
- <a :href="FILE" target="_blank" download>Download Calibrator v3.0.0</a>
