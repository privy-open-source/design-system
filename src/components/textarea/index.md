---
title: Textarea · Components
description: Base textarea form input.
---

<script setup>
  import pTextarea from './Textarea.vue'
  import { ref } from 'vue-demi'

  const result = ref()
</script>

# Textarea

> Base textarea form input

## Usage

### Simple Usage

<preview>
  <p-textarea />
</preview>

```vue
<template>
  <p-textarea />
</template>
```

## Placeholder

<preview>
  <p-textarea placeholder="Write something" />
</preview>

```vue
<template>
  <p-textarea placeholder="Write something" />
</template>
```

## Disabled State
<preview>
  <p-textarea disabled />
</preview>

```vue
<template>
  <p-textarea disabled />
</template>
```

## Readonly State
<preview>
  <p-textarea readonly />
</preview>

```vue
<template>
  <p-textarea readonly />
</template>
```

## Error State
<preview>
  <p-textarea error />
</preview>

```vue
<template>
  <p-textarea error />
</template>
```

## Resizeable
Enable resize button via prop `resize`

<preview>
  <p-textarea resize />
</preview>

```vue
<template>
  <p-textarea resize />
</template>
```

## Auto Grow

Auto adjust textarea based on text height.

<preview>
  <p-textarea rows="1" auto-grow />
</preview>

```vue
<template>
  <p-textarea rows="1" auto-grow />
</template>
```

## Counter

Show character counter with prop `show-counter`

<preview class="flex-col space-y-3">
  <p-textarea show-counter />
  <p-textarea show-counter maxlength="50" />
</preview>

```vue
<template>
  <p-textarea show-counter />
  <p-textarea show-counter maxlength="50" />
</template>
```

## Accept Character

You can filter what characters are allowed to be input using the prop `accept`. The value can be RegExp, or using available preset.

<preview class="flex-col space-y-4">
  <p-textarea accept="0-9" placeholder="Numeric Only (Manual)" />
  <p-textarea accept="numeric" placeholder="Numeric Only (using Preset)" />
</preview>

```vue
<template>
  <p-textarea accept="0-9" placeholder="Numeric Only (Manual)" />
  <p-textarea accept="numeric" placeholder="Numeric Only (using Preset)" />
</template>
```

👉 See [Available Preset](../input/#available-preset) for more information

## Binding v-model

Textarea value can be binding with `v-model`.

<preview>
  <p-textarea v-model="result" accept="num" />
</preview>

**result:**

<pre class="truncate"><code>{{ result || '-' }}</code></pre>

```vue
<template>
  <p-textarea v-model="result" />
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
| `autogrow`     | `Boolean` | `false` | Enable auto-resize                  |
| `resize`       | `Boolean` | `false` | Enable resize                       |
| `show-counter` | `Boolean` | `false` | Show character counter              |
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
