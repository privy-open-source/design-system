---
title: Signature Text · Components
description: Generate text to signature image
---

<script setup>
  import pInput from '../input/Input.vue'
  import pSignatureText from './SignatureText.vue'
  import { ref } from 'vue-demi'

  const result = ref('')
</script>

# Signature Text

> Generate text to signature image

## Usage

### Simple Usage

<preview class="flex-col">
  <p-signature-text text="Lorem Ipsum" />
</preview>

```vue
<template>
  <p-signature-text text="Lorem Ipsum" />
</template>
```

### for Initial

<preview class="flex-col">
  <p-signature-text text="Lorem Ipsum" :width="230" :limit="1" />
</preview>

```vue
<template>
  <p-signature-text text="Lorem Ipsum" :width="230" :limit="1" />
</template>
```

## Change Font

You can the font using prop `font`, it importing font from [Google Font][google-font], default is `Herr Von Muellerhoff`

<preview class="flex-col">
  <p-signature-text text="Lorem Ipsum" font="Herr Von Muellerhoff"/>
  <p-signature-text text="Lorem Ipsum" font="Satisfy"/>
</preview>

```vue
<template>
  <p-signature-text text="Lorem Ipsum" font="Herr Von Muellerhoff"/>
  <p-signature-text text="Lorem Ipsum" font="Satisfy"/>
</template>
```

## Limit Word

Truncate the text by word, default is `2`

<preview class="flex-col">
  <p-signature-text text="Lorem ipsum dolor sit amet" :limit="3" />
  <p-signature-text text="Lorem ipsum dolor sit amet" :limit="2" />
  <p-signature-text text="Lorem ipsum dolor sit amet" :limit="1" />
</preview>

```vue
<template>
  <p-signature-text text="Lorem ipsum dolor sit amet" :limit="3" />
  <p-signature-text text="Lorem ipsum dolor sit amet" :limit="2" />
  <p-signature-text text="Lorem ipsum dolor sit amet" :limit="1" />
</template>
```

## Color

<preview class="flex-col">
  <p-signature-text text="Lorem ipsum" color="#004C9D" />
  <p-signature-text text="Lorem ipsum" color="#23B242" />
  <p-signature-text text="Lorem ipsum" color="#E42E2C" />
</preview>

```vue
<template>
  <p-signature-text text="Lorem ipsum" color="#004C9D" />
  <p-signature-text text="Lorem ipsum" color="#23B242" />
  <p-signature-text text="Lorem ipsum" color="#E42E2C" />
</template>
```

## Binding v-model

Result of generated image is store in `v-model` value. It's encoded in [base64-dataURI][data-uri] format.

<preview class="flex-col">
  <p-signature-text text="Lorem ipsum" v-model="result" />
</preview>

**result**

<pre class="truncate"><code>{{ result }}</code></pre>

```vue
<template>
  <p-signature-text text="Lorem ipsum" v-model="result" />
</template>

<script setup>
const result = ref('')
</script>
```

## API

### Props

| Props        |   Type   |        Default         | Description                                              |
|--------------|:--------:|:----------------------:|----------------------------------------------------------|
| `width`      | `Number` |         `430`          | Image's width                                            |
| `height`     | `Number` |         `230`          | Image's width                                            |
| `text`       | `String` |          `-`           | Image's text                                             |
| `limit`      | `Number` |          `2`           | Maximal word to be generated                             |
| `font`       | `String` | `Herr Von Muellerhoff` | Text font, imported from [Google Font][google-font]      |
| `color`      | `String` |       `#000000`        | Text color                                               |
| `modelValue` | `String` |          `-`           | Result of generated image, in [base64-dataURI][data-uri] |

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
