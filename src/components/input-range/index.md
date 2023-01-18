---
title: Input Range · Components
description: Range input slider.
---

<script setup>
  import pInputRange from './InputRange.vue'
  import { ref } from 'vue-demi'

  const result  = ref(50)
  const result2 = ref([30, 70])
  const start   = ref(0)
  const end     = ref(100)
</script>

# Input Range

> Range input slider.

## Usage

### Simple Usage

<preview class="flex-col">
  <p-input-range />
</preview>

```vue
<template>
  <p-input-range />
</template>
```

### With min, max & step

<preview class="flex-col">
  <p-input-range min="0" max="100" step="25" />
</preview>

```vue
<template>
  <p-input-range min="0" max="100" step="25" />
</template>
```


## Multiple Mode

<preview class="flex-col">
  <p-input-range multiple />
</preview>

```vue
<template>
  <p-input-range multiple />
</template>
```

## Disabled State

<preview class="flex-col">
  <p-input-range disabled />
</preview>

```vue
<template>
  <p-input-range disabled />
</template>
```

## Readonly State

<preview class="flex-col">
  <p-input-range readonly />
</preview>

```vue
<template>
  <p-input-range readonly />
</template>
```

## Binding v-model

<preview class="flex-col">
  <p-input-range v-model="result" />
</preview>

**result:**

<pre class="truncate"><code>{{ result ?? '-' }}</code></pre>

```vue
<template>
  <p-input-range v-model="result" />
</template>
```

### v-model in multiple mode

There are 2 ways to use v-model in `multiple` mode.

#### 1. Using basic v-model

You can use basic `v-model` to handle multiple range input, The value will be tuple of number, `[start, end]`

<preview class="flex-col">
  <p-input-range v-model="result2" multiple />
</preview>

**result:**

<pre class="truncate"><code>{{ result2 ?? '-' }}</code></pre>

```vue
<template>
  <p-input-range v-model="result" multiple />
</template>
```

#### 2. using v-model:start and v-model:end

You can specific binding the value using `v-model:start` or `v-model:end`

<preview class="flex-col">
  <p-input-range
    v-model:start="start"
    v-model:end="end"
    multiple />
</preview>

**start:**

<pre class="truncate"><code>{{ start ?? '-' }}</code></pre>

**end:**

<pre class="truncate"><code>{{ end ?? '-' }}</code></pre>

```vue
<template>
  <p-input-range
    v-model:start="start"
    v-model:end="end"
    multiple />
</template>
```

## API

### Props

| Props        |   Type    | Default | Description            |
|--------------|:---------:|:-------:|------------------------|
| `min`        | `Number`  |   `0`   | Lowest value in range  |
| `max`        | `Number`  |  `100`  | Highest value in range |
| `step`       | `Number`  |   `1`   | Step movement          |
| `multiple`   | `Boolean` | `false` | Enable multiple mode   |
| `disabled`   | `Boolean` | `false` | Disabled state         |
| `readonly`   | `Boolean` | `false` | Readonly state         |
| `error`      | `Boolean` | `false` | Error state            |
| `modelValue` | `Number`  |   `-`   | v-model value          |
| `start`      | `Number`  |   `-`   | v-model:start value    |
| `end`        | `Number`  |   `-`   | v-model:end value      |

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

| Name     | Arguments                      | Description              |
|----------|--------------------------------|--------------------------|
| `change` | `Number` \| `[Number, Number]` | Event when value changed |

## See Also

- [Input](/components/input/)
- [Strengthbar](/components/strengthbar/)
