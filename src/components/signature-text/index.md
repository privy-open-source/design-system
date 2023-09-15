---
title: Signature Text · Components
description: Generate text to signature image
---

<script setup>
  import pInput from '../input/Input.vue'
  import pSignatureText from './SignatureText.vue'
  import { ref } from 'vue-demi'

  const result    = ref()
  const resultB64 = ref()
</script>

# Signature Text

> Generate text to signature image

## Usage

### Simple Usage

<preview class="flex-col !bg-base-white">
  <p-signature-text text="Lorem Ipsum" />
</preview>

```vue
<template>
  <p-signature-text text="Lorem Ipsum" />
</template>
```

### for Initial

<preview class="flex-col !bg-base-white">
  <p-signature-text text="Lorem Ipsum" :width="230" :limit="1" />
</preview>

```vue
<template>
  <p-signature-text text="Lorem Ipsum" :width="230" :limit="1" />
</template>
```

## Change Font

You can the font using prop `font`, it importing font from [Google Font][google-font], default is `Herr Von Muellerhoff`

<preview class="flex-col !bg-base-white">
  <p-signature-text text="Lorem Ipsum" font="Herr Von Muellerhoff"/>
  <p-signature-text text="Lorem Ipsum" font="Satisfy"/>
</preview>

```vue
<template>
  <p-signature-text text="Lorem Ipsum" font="Herr Von Muellerhoff"/>
  <p-signature-text text="Lorem Ipsum" font="Satisfy"/>
</template>
```

## Max Words

Limit the text word using `maxwords`, default is `2`

<preview class="flex-col !bg-base-white">
  <p-signature-text text="Lorem ipsum dolor sit amet" maxwords="3" />
  <p-signature-text text="Lorem ipsum dolor sit amet" maxwords="2" />
  <p-signature-text text="Lorem ipsum dolor sit amet" maxwords="1" />
</preview>

```vue
<template>
  <p-signature-text text="Lorem ipsum dolor sit amet" maxwords="3" />
  <p-signature-text text="Lorem ipsum dolor sit amet" maxwords="2" />
  <p-signature-text text="Lorem ipsum dolor sit amet" maxwords="1" />
</template>
```

## Max Length

Limit the text length using `maxlength`, default is `50`

<preview class="flex-col !bg-base-white">
  <p-signature-text text="Lorem Aaaaaaaaaaaaaaaaaaaaaaaaaaaaa" maxlength="15" />
</preview>

```vue
<template>
  <p-signature-text text="Lorem Aaaaaaaaaaaaaaaaaaaaaaaaaaaaa" maxlength="15" />
</template>
```

## Color

<preview class="flex-col !bg-base-white">
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

You can bind the generated result with `v-model`.

<preview class="flex-col !bg-base-white">
  <p-signature-text text="Lorem ipsum" v-model="result" />
</preview>

```vue
<template>
  <p-signature-text v-model="result" />
</template>

<script lang="ts" setup>
const result = ref<File>()
</script>
```

**result**

<pre class="truncate"><code>{{ result }}</code></pre>

### Encode to base64

If you prefer [base64-dataURI][data-uri] format, add modifier `.base64` to your `v-model`.

<preview class="flex-col !bg-base-white">
  <p-signature-text text="Lorem ipsum" v-model.base64="resultB64" />
</preview>

**result**

<pre class="truncate"><code>{{ resultB64 }}</code></pre>

```vue
<template>
  <p-signature-text text="Lorem ipsum" v-model.base64="result" />
</template>

<script lang="ts" setup>
const result = ref('')
</script>
```

## API

### Props

| Props        |   Type   |        Default         | Description                                         |
|--------------|:--------:|:----------------------:|-----------------------------------------------------|
| `width`      | `Number` |         `430`          | Image's width                                       |
| `height`     | `Number` |         `230`          | Image's width                                       |
| `text`       | `String` |          `-`           | Image's text                                        |
| `maxlimit`   | `Number` |          `2`           | Maximal word to be generated                        |
| `maxlength`  | `Number` |          `50`          | Maximal text length                                 |
| `font`       | `String` | `Herr Von Muellerhoff` | Text font, imported from [Google Font][google-font] |
| `color`      | `String` |       `#000000`        | Text color                                          |
| `modelValue` | `String` |          `-`           | Result of generated image                           |

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
