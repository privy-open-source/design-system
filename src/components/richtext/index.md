---
title: Richtext · Components
description: Feature-rich WYSWYG text editor
---

<script setup>
  import pRichtext from './Richtext.vue'
  import { ref } from 'vue-demi'

  const result = ref()
</script>

# Richtext

> Feature-rich WYSWYG text editor

## Usage

### Simple Usage

<preview>
  <p-richtext />
</preview>

```vue
<template>
  <p-richtext />
</template>
```

## Control Variants

Richtext has 2 control variants, `simple` and `advanced`. Default is `simple`

<preview class="flex-col space-y-4">
  <p-richtext variant="simple" />
  <p-richtext variant="advanced" />
</preview>

```vue
<template>
  <p-richtext variant="simple" />
  <p-richtext variant="advanced" />
</template>
```

## Placeholder

<preview>
  <p-richtext placeholder="Write something" />
</preview>

```vue
<template>
  <p-richtext placeholder="Write something" />
</template>
```

## Disabled State
<preview>
  <p-richtext disabled />
</preview>

```vue
<template>
  <p-richtext disabled />
</template>
```

## Readonly State
<preview>
  <p-richtext readonly />
</preview>

```vue
<template>
  <p-richtext readonly />
</template>
```

## Error State
<preview>
  <p-richtext error />
</preview>

```vue
<template>
  <p-richtext error />
</template>
```

## Binding v-model

Textarea value can be binding with `v-model`.

<preview>
  <p-richtext v-model="result" />
</preview>

**result:**

<pre class="truncate"><code>{{ result || '-' }}</code></pre>

```vue
<template>
  <p-richtext v-model="result" />
</template>
```

## API

### Props

| Props          |   Type    | Default | Description                         |
|----------------|:---------:|:-------:|-------------------------------------|
| `placeholder`  | `String`  |   `-`   | Input's placeholder                 |
| `disabled`     | `Boolean` | `false` | Disable state                       |
| `readonly`     | `Boolean` | `false` | Readonly state                      |
| `error`        | `Boolean` | `false` | Error state                         |
| `accept`       | `String`  |   `-`   | Whitelist character can be inputted |
| `modelValue`   | `String`  |   `-`   | `v-model` value                     |

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

| Name    | Arguments           | Description               |
|---------|---------------------|---------------------------|
| `input` | Native Input Object | Event when value inputted |

## See Also
- [Input](/components/input/index)
