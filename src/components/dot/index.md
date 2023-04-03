---
title: Dot · Components
description: Sub-component used for Badge and Label
---

<script setup>
  import pDot from './Dot.vue'
</script>

<style scoped lang="postcss">
  .preview {
    .dot {
      @apply mr-4;

      &:last-child {
        @apply mr-0;
      }
    }
  }
</style>

# Dot

> Sub-component used for [Badge][badge] and Label

Dot is a sub-component used for [Badge][badge] and Label

## Usage

### Basic Usage
The default color of dot are black.

<preview>
  <p-dot />
</preview>

```vue
<template>
  <p-dot />
</template>
```

## Colors
Dot available in 4 different colors: `primary`, `info`, `success`, `warning` and `danger`.

<preview>
  <p-dot color="primary" />
  <p-dot color="info" />
  <p-dot color="success" />
  <p-dot color="warning" />
  <p-dot color="danger" />
</preview>

```vue
<template>
  <p-dot color="primary" />
  <p-dot color="info" />
  <p-dot color="success" />
  <p-dot color="warning" />
  <p-dot color="danger" />
</template>
```

## Variant
Dot also available with variant `pills`. When variant is not set, dot will looks as a `default`

<preview>
  <p-dot variant="pills" />
  <p-dot color="primary" variant="pills" />
  <p-dot color="info" variant="pills" />
  <p-dot color="success" variant="pills" />
  <p-dot color="warning" variant="pills" />
  <p-dot color="danger" variant="pills" />
</preview>

```vue
<template>
  <p-dot variant="pills" />
  <p-dot color="primary" variant="pills" />
  <p-dot color="info" variant="pills" />
  <p-dot color="success" variant="pills" />
  <p-dot color="warning" variant="pills" />
  <p-dot color="danger" variant="pills" />
</template>
```

## API

### Props

| Props     |   Type   | Default | Description                                                                    |
|-----------|:--------:|:-------:|--------------------------------------------------------------------------------|
| `color`   | `String` |   `-`   | Dot color variant, valid value is `primary`, `info`, `success`, `warning` and `danger` |
| `variant` | `String` |   `-`   | Dot style variant, valid value is `pills`                                      |

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
      <td colspan="3" class="text-center">There no event here</td>
    </tr>
  </tbody>
</table>

## See Also

- [Badge][badge]

[badge]: /components/badge/index
