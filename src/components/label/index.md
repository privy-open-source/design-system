---
title: Label · Components
description: Label for status and state of something.
---

<script setup>
  import pLabel from './Label.vue'
  import pBanner from '../banner/Banner.vue'
  import IconCheck from '@privyid/persona-icon/vue/checkmark-circle-solid/16.vue'
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

<preview class="flex-col space-y-4">
  <p-label>Label</p-label>
  <p-label>
    <span>Label</span>
    <IconCheck />
  </p-label>
</preview>

```vue
<template>
  <p-label>Label</p-label>
  <p-label>
    <span>Label</span>
    <pi-checkmark-circle-solid-16 />
  </p-label>
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
<p-banner>
  It's possible to make customizable and or optional color refers to what state the user is in or objects being tagged by using default color Badge with variables or class
</p-banner>

### Custom Color

<preview>
  <div class="flex flex-wrap space-gap-3">
    <p-label class="bg-gold-40">label</p-label>
    <p-label class="text-yellow-30">label</p-label>
    <p-label class="bg-purple-0 text-purple-40 dark:bg-purple-50 dark:text-purple-20">label</p-label>
  </div>
</preview>

```vue
<template>
  <p-label class="bg-gold-40">label</p-label>
  <p-label class="text-yellow-30">label</p-label>
  <p-label 
    class="bg-purple-0 text-purple-40 dark:bg-purple-50 dark:text-purple-20">
    label
  </p-label>
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

## Variables
Label use local CSS variables for enhanced real-time customization.
Use this variable for level color (like badge) customization.

### `.label.label--default`
```sass
--p-label-bg-variant-default: theme(backgroundColor.inverse);
--p-label-bg-dark-variant-default: theme(backgroundColor.dark.inverse);
--p-label-text-variant-default: theme(textColor.state-emphasis);
--p-label-text-dark-variant-default: theme(textColor.dark.on-emphasis);
```

### `.label.label--variant-dot`
```sass
--p-label-dot-default: theme(backgroundColor.inverse);
--p-label-dot-dark-default: theme(backgroundColor.dark.inverse);
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
