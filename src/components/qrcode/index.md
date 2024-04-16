---
title: QR Code · Components
description: QRCode Image Generator
---

<script setup>
  import pQrcode from './Qrcode.vue'
  import { withBase } from 'vitepress'
  import { ref } from 'vue-demi'

  const Logo      = withBase('/assets/images/logo.svg')
  const result    = ref()
  const resultB64 = ref()
</script>

# QR Code

> QRCode Image Generator

## Usage

### Simple Usage

<preview>
  <p-qrcode data="https://persona.privyid.dev" />
</preview>

```vue
<template>
  <p-qrcode data="https://persona.privyid.dev" />
</template>
```

## Sizing

Adjust QR size using prop `size`. Default is `200`

<preview class="space-x-3">
  <p-qrcode size="50" data="Hello World" />
  <p-qrcode size="100" data="Hello World" />
  <p-qrcode size="150" data="Hello World" />
</preview>

```vue
<template>
  <p-qrcode size="50" data="Hello World" />
  <p-qrcode size="100" data="Hello World" />
  <p-qrcode size="150" data="Hello World" />
</template>
```

## Variant

There are 3 style variants: `square`, `rounded` and `dots`. Default value is `square`

<preview>
  <div class="grid grid-cols-3 gap-4">
    <p-qrcode variant="square" data="Hello World" />
    <p-qrcode variant="rounded" data="Hello World" />
    <p-qrcode variant="dots" data="Hello World" />
  </div>
</preview>

```vue
<template>
  <p-qrcode variant="square" data="Hello World" />
  <p-qrcode variant="rounded" data="Hello World" />
  <p-qrcode variant="dots" data="Hello World" />
</template>

```

## Logo

<preview class="space-x-3">
  <!-- From local assets -->
  <p-qrcode data="https://persona.privyid.dev" :logo="Logo" />
  <!-- From URL -->
  <p-qrcode data="https://persona.privyid.dev" logo="https://privy-open-source.github.io/design-system/assets/images/icon-privy.svg" />
</preview>

```vue
<template>
  <!-- From local assets -->
  <p-qrcode data="https://persona.privyid.dev" :logo="Logo" />
  <!-- From URL -->
  <p-qrcode data="https://persona.privyid.dev" logo="https://privy-open-source.github.io/design-system/assets/images/icon-privy.svg" />
</template>

<script lang="ts" setup>
import Logo from '../assets/logo.svg'
</script>
```

## Color

<preview>
  <p-qrcode data="https://persona.privyid.dev" color="#0065D1" />
</preview>

```vue
<template>
  <p-qrcode
    data="https://persona.privyid.dev"
    color="#0065D1" />
</template>

```

## Background Color

<preview>
  <p-qrcode data="https://persona.privyid.dev" color="#3887DB" bg-color="#14181E" />
</preview>

```vue
<template>
  <p-qrcode
    data="https://persona.privyid.dev"
    color="#3887DB"
    bg-color="#14181E" />
</template>

```

## Binding v-model

You can binding the generated result with `v-model`.

<preview class="flex-col">
  <p-qrcode data="Lorem ipsum" v-model="result" />
</preview>

```vue
<template>
  <p-qrcode data="Lorem ipsum" v-model="result" />
</template>

<script lang="ts" setup>
const result = ref<File>()
</script>
```

**result**

<pre class="truncate"><code>{{ result }}</code></pre>

### Encode to base64

If you prefer [base64-dataURI][data-uri] format, add modifier `.base64` to your `v-model`.

<preview class="flex-col">
  <p-qrcode data="Lorem ipsum" v-model.base64="resultB64" />
</preview>

**result**

<pre class="truncate"><code>{{ resultB64 }}</code></pre>

```vue
<template>
  <p-qrcode data="Lorem ipsum" v-model.base64="result" />
</template>

<script lang="ts" setup>
const result = ref('')
</script>
```

## API

### Props

| Props        |   Type   |  Default  | Description                                                                      |
|--------------|:--------:|:---------:|----------------------------------------------------------------------------------|
| `data`       |  `Any`   |    `-`    | QRCode contains data                                                             |
| `size`       | `Number` |   `200`   | QRCode image's width and height                                                  |
| `variant`    | `String` | `square`  | Style variant.<br/> valid value: `square`, `rounded`, `dots`                     |
| `logo`       | `String` |    `-`    | QRCode logo url                                                                  |
| `logoSize`   | `Number` |   `0.8`   | QRCode logo size                                                                 |
| `logoMargin` | `Number` |    `8`    | QRCode logo margin                                                               |
| `color`      | `String` | `#000000` | QRCode color                                                                     |
| `bgColor`    | `String` | `#FFFFFF` | QRCode background color                                                          |
| `ecc`        | `String` |    `M`    | QRCode error correction level.<br/> valid value: `L`, `M`, `H`, `Q`              |
| `typeNumber` | `Number` |    `-`    | QRCode type number                                                               |
| `mode`       | `String` |    `-`    | QRCode mode                                                                      |
| `options`    | `Object` |    `-`    | Extends [Qr Code Styling](https://github.com/kozakdenys/qr-code-styling) options |
| `modelValue` | `String` |    `-`    | Result of generated image                                                        |

### Slots

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="2" class="text-center">There no slots here</td>
    </tr>
  </tbody>
</table>

### Events

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Arguments</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="3" class="text-center">There no props here</td>
    </tr>
  </tbody>
</table>

[data-uri]: https://en.wikipedia.org/wiki/Data_URI_scheme
