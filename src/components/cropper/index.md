---
title: Cropper · Components
description: Preview and crop image
---

<script setup>
import pButton from '../button/Button.vue'
import pCropper from './Cropper.vue'
import { ref } from 'vue-demi'
import { withBase } from 'vitepress'

const SAMPLE_IMG = withBase('/assets/images/img-sample-crop.jpg')
const EMPTY_IMG  = withBase('/assets/images/empty-img.png')

const result    = ref()
const resultB64 = ref()
const result2   = ref()

const cropper = ref()

function doCrop () {
  if (cropper.value)
    cropper.value.crop()
}
</script>

# Cropper

> Preview and crop image

## Usage

### Simple Usage

<preview class="flex-col">
  <p-cropper :src="SAMPLE_IMG" />
</preview>

```vue
<template>
  <p-cropper src="./assets/sample-1.jpg" />
</template>
```

## Crop Size

You can adjust crop size using `width`, `height` or `ratio`.

### Using `width` and `height`

<preview>
  <p-cropper :src="SAMPLE_IMG" width="500" height="200" />
</preview>

```vue
<template>
  <p-cropper src="./assets/sample-1.jpg" width="500" height="200" />
</template>
```

### Using Ratio

<preview>
  <p-cropper :src="SAMPLE_IMG" :ratio="16/9" />
</preview>

```vue
<template>
  <p-cropper src="./assets/sample-1.jpg" :ratio="16/9" />
</template>
```

## Rounded Crop
Add prop `rounded` to enable circular cropping.

<preview>
  <p-cropper :src="SAMPLE_IMG" rounded />
</preview>

```vue
<template>
  <p-cropper src="./assets/sample-1.jpg" rounded />
</template>
```

## Viewer Mode

If you want to use this component for previewing image only, you can add prop `no-crop` to disabled cropping.

<preview>
  <p-cropper :src="SAMPLE_IMG" no-crop />
</preview>

```vue
<template>
  <p-cropper src="./assets/sample-1.jpg" no-crop />
</template>
```


## Binding v-model

You can bind the result of cropped image using `v-model`.

<preview>
  <p-cropper :src="SAMPLE_IMG" v-model="result" />
</preview>

```vue
<template>
  <p-cropper src="./assets/sample-1.jpg" v-model="result" />
</template>
```

**result:**

<pre class="truncate"><code>{{ result }}</code></pre>

### Encode to base64

You can add modifier `base64` to your `v-model`, it's enforce result to [base64-dataURI](https://en.wikipedia.org/wiki/Data_URI_scheme).

<preview class="flex-col">
  <p-cropper :src="SAMPLE_IMG" v-model.base64="resultB64" />
</preview>

```vue
<template>
  <p-cropper src="./assets/sample-1.jpg" v-model.base64="result" />
</template>
```

**result:**

<pre class="truncate"><code>{{ resultB64 }}</code></pre>

<img class="mt-2 border" :src="resultB64 || EMPTY_IMG" alt="Result Image" />

### Disabling Autocrop

By default, cropping process was ran every movement (drag, zoom, & rotate). It can be exhausting the resource on some device.
You can disabled it using prop `no-autocrop`. And to trigger the cropping, you can use `templateRef` on `<p-cropper>` component, and call `.crop()` function.

<preview class="flex-col">
  <p-cropper ref="cropper" :src="SAMPLE_IMG" v-model.base64="result2" no-autocrop />
  <div class="mt-4">
    <p-button @click="doCrop">Do Crop</p-button>
  </div>
</preview>

**result:**

<pre class="truncate"><code>{{ result2 }}</code></pre>
<img class="mt-2 border" :src="result2 || EMPTY_IMG" alt="Result Image" />

```vue
<template>
  <p-cropper
    ref="cropper"
    v-model.base64="result2"
    src="./assets/sample-1.jpg"
    no-autocrop />
  <p-button @click="doCrop">Do Crop</p-button>
</template>

<script setup lang="ts">
  const cropper = ref<InstanceType<typeof PCropper>>()

  function doCrop () {
    if (cropper.value)
      cropper.value.crop()
  }
</script>
```

## API

### Props

| Props         |       Type       | Default | Description                     |
|---------------|:----------------:|:-------:|---------------------------------|
| `src`         | `String`, `File` |   `-`   | Image source                    |
| `width`       |     `Number`     |   `-`   | Crop width, in pixel            |
| `height`      |     `Number`     |   `-`   | Crop height, in pixel           |
| `ratio`       |     `Number`     |  `1/1`  | Crop ratio                      |
| `img-width`   |     `Number`     |   `-`   | Add attribute width on img tag  |
| `img-height`  |     `Number`     |   `-`   | Add attribute height on img tag |
| `img-class`   |     `String`     |   `-`   | Additional class to img tag     |
| `rounded`     |    `Boolean`     | `false` | Enabling rounded crop           |
| `no-crop`     |    `Boolean`     | `false` | Disabling crop mode             |
| `no-autocrop` |    `Boolean`     | `false` | Disabling autocrop              |
| `modelValue`  |      `File`      |   `-`   | `v-model` value binding         |

### Slots

| Name      | Description                            |
|-----------|----------------------------------------|
| `control` | Content for placing additional control |

### Events

| Name     | Arguments | Description                      |
|----------|:---------:|----------------------------------|
| `load`   |     -     | Event when image finished loaded |
| `result` |     -     | Event when cropped done          |


## See Also

- [Camera](/components/camera/)
- [Dropzone](/components/dropzone/)
