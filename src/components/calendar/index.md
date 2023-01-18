---
title: Calendar · Components
description: Sub-component for Datepicker
---

<script setup>
  import pCalendar from "./Calendar.vue"
  import Banner from "../banner/Banner.vue"
  import { ref } from "vue-demi"
  import { format } from 'date-fns'

  const value = ref()
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
    :min="new Date(2022, 0, 1)"
    :max="new Date(2022, 11, 31)" />
</preview>

```vue
<template>
  <!-- Limit 1 Jan - 31 Dec 2022 -->
  <p-calendar
    :min="new Date(2022, 0, 1)"
    :max="new Date(2022, 11, 31)" />
</template>
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
    <div>
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
## API

### Props

| Props        |   Type    | Default | Description                                        |
|--------------|:---------:|:-------:|----------------------------------------------------|
| `modelValue` |  `Date`   |   `-`   | `v-model` value                                    |
| `disabled`   | `Boolean` | `false` | Disabled state                                     |
| `readonly`   | `Boolean` | `false` | Readonly state                                     |
| `mode`       | `String`  |   `-`   | Calendar mode valid value: `date`, `month`, `year` |
| `max`        |  `Date`   |   `-`   | Maximum date can be selected                       |
| `min`        |  `Date`   |   `-`   | Minimum date can be selected                       |

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
