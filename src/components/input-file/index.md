<script setup>
  import pInputFile from "./InputFile.vue"
  import { ref } from "vue-demi"

  const result = ref()
  const resultB64 = ref()
</script>

# Input File

## Usage

### Simple Usage

<preview>
  <p-input-file multiple />
</preview>

```vue
<template>
  <p-input-file multiple />
</template>
```

## Sizing

There are 4 size variants that can be use: `xs`, `sm`, `md`, `lg`. default is `md`.

<preview class="flex-col space-y-3">
  <p-input-file size="xs" />
  <p-input-file size="sm" />
  <p-input-file size="md" />
  <p-input-file size="lg" />
</preview>

```vue
<template>
  <p-input-file size="xs" />
  <p-input-file size="sm" />
  <p-input-file size="md" />
  <p-input-file size="lg" />
</template>
```

## Disabled State

<preview class="flex-col space-y-3">
  <p-input-file disabled />
</preview>

```vue
<template>
  <p-input-file disabled />
</template>
```

## Readonly State

<preview class="flex-col space-y-3">
  <p-input-file readonly />
</preview>

```vue
<template>
  <p-input-file readonly />
</template>
```

## Error State

<preview class="flex-col space-y-3">
  <p-input-file error />
</preview>

```vue
<template>
  <p-input-file error />
</template>
```

## Clearable

<preview class="flex-col space-y-3">
  <p-input-file clearable />
</preview>

```vue
<template>
  <p-input-file clearable />
</template>
```

## Multiple upload

Add prop `multiple` to enable multi-selected upload.

<preview class="flex-col space-y-3">
  <p-input-file multiple />
</preview>

```vue
<template>
  <p-input-file multiple />
</template>
```

### Appending values

Inherit from [Dropzone](/components/dropzone/), when user selecting the files, and then selecting again, the old list of files is replaced with new ones. Set `multiple` prop to `'append'` if you want to keep the last ones.

<preview class="flex-col space-y-3">
  <p-input-file multiple="append" />
</preview>

```vue
<template>
  <p-input-file multiple="append" />
</template>
```

## Binding v-model

<preview class="flex-col space-y-3">
  <p-input-file v-model="result" />
</preview>

**result:**

<pre class="truncate"><code>{{ result }}</code></pre>

```vue
<template>
  <p-input-file v-model="result" />
</template>
```

### Encode to base64

By default, this component keep v-model value as [File][file] object.
If you need [base64-dataURI][data-uri] format, you can add modifier `base64` to your `v-model`.

<preview class="flex-col space-y-3">
  <p-input-file v-model.base64="resultB64" />
</preview>

**result:**

<pre class="truncate"><code>{{ resultB64 }}</code></pre>

```vue
<template>
  <p-input-file v-model.base64="result" />
</template>
```
## API

### Props

| Props          |        Type         | Default | Description                                                                    |
|----------------|:-------------------:|:-------:|--------------------------------------------------------------------------------|
| `size`         |      `String`       |  `md`   | Input size, valid value: `xs`, `sm`, `md`, `lg`                                |
| `disabled`     |      `Boolean`      | `false` | Disabled state                                                                 |
| `readonly`     |      `Boolean`      | `false` | Readonly state                                                                 |
| `error`        |      `Boolean`      | `false` | Error state                                                                    |
| `multiple`     | `Boolean`, `String` | `false` | Enable multiple mode, set to `append` to [appening values](#appending-values)  |
| `maxlength`    |      `Number`       |   `-`   | Maxlength selected files, only work on multiple mode                           |
| `accept`       |      `String`       |   `-`   | Limitting file type can be selected, see [HTML attribute: accept][attr-accept] |
| `clearOnCanel` |      `Boolean`      | `false` | Clear v-model when user cancel the browse file                                 |
| `modelValue`   |       `File`        |   `-`   | v-model value                                                                  |

### Slots

| Name      | Description                   |
|-----------|-------------------------------|
| `default` | Content to place for dropzone |

### Events

| Name     | Arguments | Description                           |
|----------|-----------|---------------------------------------|
| `change` | Files     | Event when value changed              |
| `cancel` | -         | Event when user cancel selecting file |

## See Also

- [Input](/components/input/)
- [Input Group](/components/input-group/)
- [Dropzone](/components/dropzone/)

[file]: https://developer.mozilla.org/en-US/docs/Web/API/File
[data-uri]: https://en.wikipedia.org/wiki/Data_URI_scheme
[attr-accept]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
