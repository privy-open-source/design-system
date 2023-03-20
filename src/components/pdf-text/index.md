---
title: PDF Text · Components
description: Generate text for Pdf Object
---

<script setup>
  import pPdfText from './PdfText.vue'
  import pPdfViewer from '../pdf-viewer/PdfViewer.vue'
  import pPdfObject from '../pdf-object/PdfObject.vue'
  import { reactive, ref } from 'vue-demi'
  import FILE from '../pdf-viewer/assets/Calibrator-v3.pdf?url'

  const result    = ref()
  const resultB64 = ref()

  const object1 = reactive({
    src   : undefined,
    page  : 1,
    x     : 100,
    y     : 200,
    width : undefined,
    height: undefined,
  })
</script>

# PDF Text

> Generate text for Pdf Object

## Usage

### Simple Usage

<preview class="flex-col">
  <p-pdf-text
    text="Lorem ipsum dolor sit amet consectetur adipisicing" />
</preview>

```vue
<template>
  <p-pdf-text
    text="Lorem ipsum dolor sit amet consectetur adipisicing" />
</template>
```

### Using with PDF Object

<preview>
  <p-pdf-viewer :src="FILE">
    <p-pdf-object
      v-model:page="object1.page"
      v-model:x="object1.x"
      v-model:y="object1.y"
      v-model:width="object1.width"
      v-model:height="object1.height">
      <p-pdf-text
        v-model.base64="object1.src"
        :width="object1.width"
        :height="object1.height"
        text="Lorem ipsum dolor sit amet consectetur adipisicing" />
    </p-pdf-object>
  </p-pdf-viewer>
</preview>

```vue
<template>
  <p-pdf-viewer :src="FILE">
    <p-pdf-object
      v-model:page="object.page"
      v-model:x="object.x"
      v-model:y="object.y"
      v-model:width="object.width"
      v-model:height="object.height">
      <p-pdf-text
        v-model="object.src"
        :width="object.width"
        :height="object.height">
        text="Lorem ipsum dolor sit amet consectetur adipisicing" />
    </p-pdf-object>
  </p-pdf-viewer>
</template>

<script lang="ts" setup>
  import FILE from '~/assets/Calibrator-v3.pdf?url'

  interface PdfObject {
    src?: File,
    page?: number,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
  }

  const object = reactive<PdfObject>({
    src   : undefined,
    page  : 1,
    x     : 100,
    y     : 200,
    width : undefined,
    height: undefined,
  })
</script>
```

## Change Font

You can the font using prop `font`, it importing font from [Google Font][google-font], default is `DM Sans`

<preview class="flex-col">
  <p-pdf-text font="Indie Flower" text="Lorem ipsum dolor sit amet consectetur adipisicing"/>
  <p-pdf-text font="Satisfy" text="Lorem ipsum dolor sit amet consectetur adipisicing"/>
</preview>

```vue
<template>
  <p-pdf-text font="Indie Flower" text="Lorem ipsum dolor sit amet consectetur adipisicing"/>
  <p-pdf-text font="Satisfy" text="Lorem ipsum dolor sit amet consectetur adipisicing"/>
</template>
```

## Change Color

<preview class="flex-col">
  <p-pdf-text color="#004C9D" text="Lorem ipsum dolor sit amet consectetur adipisicing" />
  <p-pdf-text color="#23B242" text="Lorem ipsum dolor sit amet consectetur adipisicing" />
  <p-pdf-text color="#E42E2C" text="Lorem ipsum dolor sit amet consectetur adipisicing" />
</preview>

```vue
<template>
  <p-pdf-text color="#004C9D" text="Lorem ipsum dolor sit amet consectetur adipisicing" />
  <p-pdf-text color="#23B242" text="Lorem ipsum dolor sit amet consectetur adipisicing" />
  <p-pdf-text color="#E42E2C" text="Lorem ipsum dolor sit amet consectetur adipisicing" />
</template>
```

## Label

You can add label text using prop `label`.

<preview class="flex-col">
  <p-pdf-text
    label="Noted from Tarjono (TR001)"
    text="Lorem ipsum dolor sit amet consectetur adipisicing" />
</preview>

```vue
<template>
  <p-pdf-text
    label="Noted from Tarjono (TR001)"
    text="Lorem ipsum dolor sit amet consectetur adipisicing" />
</template>
```

## Fixed Font Size

By default, font-size will automatically adjusted to fit the image size and text length.
If you want keep font-size fixed all time, add prop `fixed-size`.

<preview>
  <div class="grid grid-cols-2 grid-rows-2 gap-4">
    <p-pdf-text
      label="Fixed Size"
      text="Lorem ipsum dolor adipisicing"
      fixed-size />
    <p-pdf-text
      label="Default"
      text="Lorem ipsum dolor adipisicing"
    />
    <p-pdf-text
      label="Fixed Size (long text)"
      text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, maxime. Amet enim soluta?"
      fixed-size />
    <p-pdf-text
      label="Default (long text)"
      text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, maxime. Amet enim soluta?"
    />
  </div>
</preview>

```vue
<template>
  <div class="grid grid-cols-2 grid-rows-2 gap-4">
    <p-pdf-text
      label="Fixed Size"
      text="Lorem ipsum dolor adipisicing"
      fixed-size />
    <p-pdf-text
      label="Default"
      text="Lorem ipsum dolor adipisicing"
    />
    <p-pdf-text
      label="Fixed Size (long text)"
      text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, maxime. Amet enim soluta?"
      fixed-size />
    <p-pdf-text
      label="Default (long text)"
      text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, maxime. Amet enim soluta?"
    />
  </div>
</template>
```

## Binding v-model

You can bind the generated result with `v-model`.

<preview class="flex-col">
  <p-pdf-text text="Lorem ipsum dolor sit amet consectetur adipisicing" v-model="result" />
</preview>

```vue
<template>
  <p-pdf-text v-model="result" />
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
  <p-pdf-text text="Lorem ipsum dolor sit amet consectetur adipisicing" v-model.base64="resultB64" />
</preview>

**result**

<pre class="truncate"><code>{{ resultB64 }}</code></pre>

```vue
<template>
  <p-pdf-text text="Lorem ipsum dolor sit amet consectetur adipisicing" v-model.base64="result" />
</template>

<script lang="ts" setup>
const result = ref('')
</script>
```
## API

### Props

| Props        |   Type    |  Default  | Description                                                |
|--------------|:---------:|:---------:|------------------------------------------------------------|
| `width`      | `Number`  |   `198`   | Image's width                                              |
| `height`     | `Number`  |   `106`   | Image's width                                              |
| `text`       | `String`  |    `-`    | Image's text                                               |
| `font`       | `String`  | `DM Sans` | Text font family, imported from [Google Font][google-font] |
| `color`      | `Number`  | `#4a5362` | Text color                                                 |
| `minSize`    | `Number`  |   `11`    | Minimum font size when auto-resize                         |
| `maxSize`    | `Number`  |   `72`    | Maximum font size when auto-resize                         |
| `size`       | `Number`  |   `16`    | Text font size, only work on `fixed-size` mode             |
| `fixedSize`  | `Boolean` |  `false`  | Enable fixed-size mode                                     |
| `lineHeight` | `Number`  |   `1.5`   | Text line height                                           |
| `padding`    | `Number`  |   `12`    | Text padding                                               |
| `label`      | `String`  |    `-`    | Add label text                                             |
| `labelSize`  | `String`  |   `12`    | Label's font size                                          |
| `labelColor` | `String`  | `#9EA0A2` | Label's text color                                         |
| `labelFont`  | `String`  |    `-`    | Label's font family                                        |
| `modelValue` | `String`  |    `-`    | Result of generated image                                  |

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

[google-font]: https://fonts.google.com/
[data-uri]: https://en.wikipedia.org/wiki/Data_URI_scheme
