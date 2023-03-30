---
title: Label · Components
description: Label for status and state of something.
---

<script setup>
  import pLabel from './Label.vue'
</script>

<style scoped lang="postcss">
  .preview {
    .label {
      @apply mr-4;

      &:last-child {
        @apply mr-0;
      }
    }
  }
</style>

# Label

> Label for status and state of something.

## Usage

### Basic Usage

Default color of label is `black`

<preview>
  <p-label>Label</p-label>
</preview>

```vue
<template>
  <p-label>Label</p-label>
</template>
```

## Colors
Label available in 4 different colors. There are `primary`, `info`, `success`, `warning`, and `danger`.

<preview>
  <p-label color="primary">Label</p-label>
  <p-label color="info">Label</p-label>
  <p-label color="success">Label</p-label>
  <p-label color="warning">Label</p-label>
  <p-label color="danger">Label</p-label>
</preview>

```vue
<template>
  <p-label color="primary">Label</p-label>
  <p-label color="info">Label</p-label>
  <p-label color="success">Label</p-label>
  <p-label color="warning">Label</p-label>
  <p-label color="danger">Label</p-label>
</template>
```

## Variants
Label has 3 variants namely `default`, `light` and `dot`. When variant is not set, label will looks as a `default`

<preview>
  <p-label>Label</p-label>
  <p-label variant="light">Label</p-label>
  <p-label variant="dot">Label</p-label>
</preview>

```vue
<template>
  <p-label>Label</p-label>
  <p-label variant="light">Label</p-label>
  <p-label variant="dot">Label</p-label>
</template>
```

### Sample Light Variant

<preview>
  <p-label color="primary" variant="light">Label</p-label>
  <p-label color="info" variant="light">Label</p-label>
  <p-label color="warning" variant="light">Label</p-label>
  <p-label color="success" variant="light">Label</p-label>
  <p-label color="danger" variant="light">Label</p-label>
</preview>

```vue
<template>
  <p-label color="primary" variant="light">Label</p-label>
  <p-label color="info" variant="light">Label</p-label>
  <p-label color="warning" variant="light">Label</p-label>
  <p-label color="success" variant="light">Label</p-label>
  <p-label color="danger" variant="light">Label</p-label>
</template>
```

### Sample Dot Variant

<preview>
  <p-label color="primary" variant="dot">Label</p-label>
  <p-label color="info" variant="dot">Label</p-label>
  <p-label color="warning" variant="dot">Label</p-label>
  <p-label color="success" variant="dot">Label</p-label>
  <p-label color="danger" variant="dot">Label</p-label>
</preview>

```vue
<template>
  <p-label color="primary" variant="dot">Label</p-label>
  <p-label color="info" variant="dot">Label</p-label>
  <p-label color="warning" variant="dot">Label</p-label>
  <p-label color="success" variant="dot">Label</p-label>
  <p-label color="danger" variant="dot">Label</p-label>
</template>
```

## Sizing
Label has 4 size, namely `lg`, `md`, `sm` and `xs`. When size is not set, default label is `md`

<preview>
  <p-label color="info" size="lg">Label</p-label>
  <p-label color="info" size="md">Label</p-label>
  <p-label color="info" size="sm">Label</p-label>
  <p-label color="info" size="xs">Label</p-label>
</preview>

```vue
<template>
  <p-label color="info" size="lg">Label</p-label>
  <p-label color="info" size="md">Label</p-label>
  <p-label color="info" size="sm">Label</p-label>
  <p-label color="info" size="xs">Label</p-label>
</template>
```

## Dismissible
Label has dismiss feature. It can be show or hide by `dismissable` props. If `dismissable` set to `true`, dismiss button will show.

<preview>
  <p-label color="info" :dismissable="true">Label</p-label>
  <p-label color="info" variant="light" :dismissable="true">Label</p-label>
  <p-label color="info" variant="dot" :dismissable="true">Label</p-label>
</preview>

```vue
<template>
  <p-label color="info" :dismissable="true">Label</p-label>
  <p-label color="info" variant="light" :dismissable="true">Label</p-label>
  <p-label color="info" variant="dot" :dismissable="true">Label</p-label>
</template>
```

## API

### Props

| Props         |   Type    |  Default  | Description                                                                                                |
|---------------|:---------:|:---------:|---------------------------------------------------------------------------------------------------------------------|
| `color`       | `String`  | `-` | Label color variant, valid value is `primary`, `info`, `success`, `warning` and `danger` |
| `variant`     | `String`  | `default` | Label variant, valid value is `default`, `light` and `dot`.                |
| `size`        | `String`  |   `md`    | Label variant, valid value is `lg`, `md`, `sm` and `xs`.                   |
| `dismissable` | `Boolean` |  `false`  | Show / Hide dismiss button                                                 |

### Slots

| Name      | Description               |
|-----------|---------------------------|
| `default` | Content to place in badge |

### Events

| Name        | Arguments | Description                     |
|-------------|-----------|---------------------------------|
| `dismissed` | -         | Event when close button clicked |
