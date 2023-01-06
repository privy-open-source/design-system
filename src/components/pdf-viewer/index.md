---
title: Components > PDF Viewer
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
  import FILE from './assets/Calibrator-v3.pdf?url'
  import FILE_PROTECT from './assets/Calibrator-v3_protected.pdf?url'
  import { ref } from 'vue-demi'

  const password = ref('')
</script>

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
  import FILE from '~/assets/Calibrator-v3.pdf?url'
</script>
```

### With Navbar And Footer

<preview>
  <p-pdf-viewer :src="FILE">
    <template #navbar>
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

<preview>
  <p-pdf-viewer />
</preview>
