---
title: Progress Indicator · Components
description: Sub-component for Carousel.
---

<script setup>
  import pProgressIndicator from './ProgressIndicator.vue'
  import { ref } from 'vue-demi'

  const active = ref()
</script>

# Progress Indicator
> Sub-component for [Carousel](../carousel/)

## Usage

### Simple Usage

<preview>
  <p-progress-indicator />
</preview>

```vue
<template>
  <p-progress-indicator />
</template>
```

## Number of Dots

<preview class="flex-col space-y-3">
  <p-progress-indicator length="3" />
  <p-progress-indicator length="5" />
  <p-progress-indicator length="7" />
</preview>

```vue
<template>
  <p-progress-indicator length="3" />
  <p-progress-indicator length="5" />
  <p-progress-indicator length="7" />
</template>
```

## Vertical Mode

Set prop `direction` to `vertical` to enable Vertical Mode.

<preview>
  <div class="h-36">
    <p-progress-indicator direction="vertical" />
  </div>
</preview>

```vue
<template>
  <p-progress-indicator direction="vertical" />
</template>
```

## Binding v-model

You can binding current active with v-model

<preview>
  <p-progress-indicator v-model="active" />
</preview>

```vue
<template>
  <p-progress-indicator v-model="active" />
</template>
```

**Active :**

<pre><code>{{ active }}</code></pre>

## API

### Props

| Props        |   Type   |   Default    | Description                                                   |
|--------------|:--------:|:------------:|---------------------------------------------------------------|
| `direction`  | `String` | `horizontal` | Indicator direction, valid values is `horizontal`, `vertical` |
| `length`     | `Number` |     `6`      | Number of dots                                                |
| `modelValue` | `Number` |     `1`      | v-model value                                                 |

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

| Name     | Arguments | Description              |
|----------|-----------|--------------------------|
| `change` | `String`  | Event when value changed |


## See Also

- [Carousel](../carousel/)
