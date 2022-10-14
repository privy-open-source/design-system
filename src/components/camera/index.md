<script setup>
  import pCamera from './Camera.vue'
  import pBanner from '../banner/Banner.vue'
  import LivenessAdapter from './adapter/liveness'
  import QrCodeAdapter from './adapter/qr-code'
  import { ref } from 'vue-demi'

  const result    = ref()
  const resultB64 = ref()
</script>

# Camera

> Take picture from user's camera

## Usage

### Simple Usage

<preview class="flex-col">
  <p-camera />
</preview>

```vue
<template>
  <p-camera />
</template>
```

## Mirror Mode

Add prop `mirror` to enable mirror mode.

<preview class="flex-col">
  <p-camera mirror />
</preview>

```vue
<template>
  <p-camera mirror />
</template>
```

### Preview-only mirror mode

If you want to keep image result un-mirrored. set prop `mirror` to `preview`. It will revert back when you take the picture.

<preview class="flex-col">
  <p-camera mirror="preview" />
</preview>

```vue
<template>
  <p-camera mirror="preview" />
</template>
```

## Masking

Add mask overlay using prop `mask`. There are 3 available masks `square`, `round`, `card`.

<preview class="flex-col gap-2">
  <p-camera mask="square" />
  <p-camera mask="round" />
  <p-camera mask="card" />
</preview>

```vue
<template>
  <p-camera mask="square" />
  <p-camera mask="round" />
  <p-camera mask="card" />
</template>
```

## Silent

Add prop `silent` to disabled shutter sound.

<preview class="flex-col">
  <p-camera silent />
</preview>

```vue
<template>
  <p-camera silent />
</template>
```

## Liveness

Change adapter to Liveness to perform liveness capture.

<preview class="flex-col gap-2">
  <p-camera :adapter="LivenessAdapter" />
</preview>

```vue
<template>
  <p-camera :adapter="LivenessAdapter" />
</template>

<script setup>
  import { LivenessAdapter } from '@privyid/persona/core'
</script>

```

## QR Scanner

This component has built-in adapter for QR Code Scanning, powered by [ZXing](https://github.com/zxing-js/library).

<preview class="flex-col gap-2">
  <p-camera :adapter="QrCodeAdapter" />
</preview>

```vue
<template>
  <p-camera :adapter="QrCodeAdapter" />
</template>

<script setup>
  import { QrCodeAdapter } from '@privyid/persona/core'
</script>
```

## Binding v-model

You can bind the result of image using `v-model`. The result is variant depend on adapter do you use.

<preview class="flex-col">
  <p-camera v-model="result" />
</preview>

```vue
<template>
  <p-camera v-model="result" />
</template>
```

**result:**

<pre class="truncate"><code>{{ result }}</code></pre>

### Encode to base64

You can add modifier `base64` to your `v-model`, it's enforce result to [base64-dataURI](https://en.wikipedia.org/wiki/Data_URI_scheme).

<p-banner :dismissable="false">
  <b>Note!</b> <code>v-model.base64</code> on QRCodeAdapter has no effect, the result will always original scanned text.
</p-banner>

<preview class="flex-col">
  <p-camera v-model.base64="resultB64" />
</preview>

```vue
<template>
  <p-camera v-model.base64="resultB64" />
</template>
```

**result:**

<pre class="truncate"><code>{{ resultB64 }}</code></pre>

## API

### Props

| Props        |        Type         |     Default      | Description                                                                        |
|--------------|:-------------------:|:----------------:|------------------------------------------------------------------------------------|
| `mirror`     | `Boolean`, `String` |       `-`        | Enable mirror mode, set to `preview` for [Preview Only](#preview-only-mirror-mode) |
| `mask`       |      `String`       |       `-`        | Enable mask overlay, valid value is `square`, `round`, `card`, `none`              |
| `silent`     |      `Boolean`      |     `false`      | Mute shutter sound                                                                 |
| `adapter`    |      `Adapter`      | `CaptureAdapter` | Camera Adapter                                                                     |
| `modelValue` |       `File`        |       `-`        | v-model value                                                                      |

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

| Name     | Arguments | Description                      |
|----------|:---------:|----------------------------------|
| `start`  |     -     | Event when camera started        |
| `result` |     -     | Event when camera captured image |
