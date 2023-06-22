---
title: Calendar · Components
description: Sub-component for Datepicker
---

<script setup>
  import pCalendar from "./Calendar.vue"
  import Banner from "../banner/Banner.vue"
  import { ref } from "vue-demi"
  import { format, startOfYear, endOfYear, endOfMonth } from 'date-fns'

  const value = ref()

  const result = ref()
  const start  = ref()
  const end    = ref()

  const min = startOfYear(new Date())
  const max = endOfYear(new Date())

  const thisMonth = endOfMonth(new Date())
</script>

# Calendar

> Sub-component for [Datepicker](/components/datepicker/)

## Usage

### Simple Usage

<preview>
  <p-calendar />
</preview>

```vue
<template>
  <p-calendar />
</template>
```

## Limiting Date

You can limit the date via `min` or `max` props

<preview>
  <p-calendar
    :min="min"
    :max="max" />
</preview>

```vue
<template>
  <!-- Limit this year only -->
  <p-calendar
    :min="min"
    :max="max" />
</template>

<script lang="ts" setup>
  import { startOfYear, endOfYear } from 'date-fns'

  const min = startOfYear(new Date())
  const max = endOfYear(new Date())
</script>
```

## Mode Variant

There 3 available mode: `date` , `month`, `year`. default is `date`. it will limit user input the date.

for example, mode `month` make user can only select the month, but can't select what spesific date.

<preview class="flex-col items-center space-y-2">
  <p-calendar
    mode="date" />
  <p-calendar
    mode="month" />
  <p-calendar
    mode="year" />
</preview>

```vue
<template>
  <p-calendar
    mode="date" />
  <p-calendar
    mode="month" />
  <p-calendar
    mode="year" />
</template>
```

## Disabled State

<preview class="flex-col items-center space-y-2">
  <p-calendar disabled />
</preview>

```vue
<template>
  <p-calendar disabled />
</template>
```

## Readonly state
<preview>
  <p-calendar readonly />
</preview>

```vue
<template>
  <p-calendar readonly />
</template>
```

## Range Picker

Set prop `range` to `true` to enable date range picker mode.

<preview>
  <p-calendar range />
</preview>

```vue
<template>
  <p-calendar range />
</template>
```

## Min and Max Gap

You can limit minimal and maximal date range to pick using prop `min-gap` and `max-gap`.

<preview>
  <p-calendar range min-gap="3D" max-gap="7D" />
</preview>

```vue
<template>
  <!-- Limit min 3 days and max 7 days -->
  <p-calendar range min-gap="3D" max-gap="7D" />
</template>
```

### Gap Format

Value of min-gap and max-gap was following this format token:

|   Tokens   | Description |
|:----------:|-------------|
| `Y` or `y` | `years`     |
|    `M`     | `months`    |
| `D` or `d` | `days`      |
| `W` or `w` | `weeks`     |
| `H` or `h` | `hours`     |
|    `m`     | `minutes`   |
| `S` or `s` | `seconds`   |

## Binding v-model

<preview>
  <p-calendar v-model="value" />
</preview>

```vue
<template>
  <p-calendar v-vmodel="value" />
</template>
```

**Result :**

<pre class="max-w-full truncate"><code>{{ value ?? '-' }}</code></pre>

<Banner class="mt-4">
  <div class="font-semibold">
    Info
  </div>
  <div class="text-sm">
    value is a native <code>Date</code> instance, Component doesn't provide any date formatting. if you want change the format, you can use <a href="https://date-fns.org/">date-fns</a> or <a href="https://momentjs.com/">moment.js</a>
  </div>
</Banner>

Example:

<preview>
  <div>
    <p-calendar v-model="value" />
    <div class="mt-4">
      Result: {{ value && format(value, 'dd-MM-yyyy') }}
    </div>
  </div>
</preview>

```vue
<template>
  <div>
    <p-calendar v-model="value" />
    <div>
      Result: {{ value && format(value, 'dd-MM-yyyy') }}
    </div>
  </div>
</template>

<script setup>
  import { format } from 'date-fns'
</script>
```

### v-model in range mode

There are 2 ways to use v-model in `range` mode.

#### 1. Using basic v-model

You can use basic `v-model` to handle date range input, The value will be tuple of Date, `[start, end]`

<preview class="flex-col">
  <p-calendar v-model="result" range />
</preview>

**result:**

<pre class="truncate"><code>{{ result ?? '-' }}</code></pre>

```vue
<template>
  <p-calendar v-model="result" range />
</template>
```

#### 2. using v-model:start and v-model:end

You can specific binding the value using `v-model:start` or `v-model:end`

<preview class="flex-col">
  <p-calendar
    v-model:start="start"
    v-model:end="end"
    range />
</preview>

**start:**

<pre class="truncate"><code>{{ start ?? '-' }}</code></pre>

**end:**

<pre class="truncate"><code>{{ end ?? '-' }}</code></pre>

```vue
<template>
  <p-calendar
    v-model:start="start"
    v-model:end="end"
    range />
</template>
```

## API

### Props

| Props        |   Type    | Default | Description                                                          |
|--------------|:---------:|:-------:|----------------------------------------------------------------------|
| `modelValue` |  `Date`   |   `-`   | `v-model` value                                                      |
| `start`      |  `Date`   |   `-`   | `v-model:start` value                                                |
| `end`        |  `Date`   |   `-`   | `v-model:end` value                                                  |
| `disabled`   | `Boolean` | `false` | Disabled state                                                       |
| `readonly`   | `Boolean` | `false` | Readonly state                                                       |
| `mode`       | `String`  |   `-`   | Calendar mode valid value: `date`, `month`, `year`                   |
| `min`        |  `Date`   |   `-`   | Minimum date can be selected                                         |
| `max`        |  `Date`   |   `-`   | Maximum date can be selected                                         |
| `range`      | `Boolean` | `false` | Enable range picker mode                                             |
| `minGap`     | `String`  |   `-`   | Minimum range date should be selected, see [gap format](#gap-format) |
| `maxGap`     | `String`  |   `-`   | Maximum range date should be selected, see [gap format](#gap-format) |

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

| Name     | Arguments          | Description              |
|----------|--------------------|--------------------------|
| `change` | Native Date object | Event when date selected |

## See Also

- [Datepicker](/components/datepicker/)
