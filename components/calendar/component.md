<script setup>
  import Calendar from "./Calendar.vue"
  import { ref } from "vue-demi"
  import { format } from 'date-fns'

  const value = ref()
</script>


# Calendar

## Usage

### Simple Usage

<preview>
  <Calendar />
</preview>

```vue
<template>
  <Calendar />
</template>
```

## Limiting Date

You can limit the date via `min` or `max` props

<preview>
  <Calendar
    :min="new Date(2022, 0, 1)"
    :max="new Date(2022, 11, 31)" />
</preview>

```vue
<template>
  <!-- Limit 1 Jan - 31 Dec 2022 -->
  <Calendar
    :min="new Date(2022, 0, 1)"
    :max="new Date(2022, 11, 31)" />
</template>
```

## Mode Variant

There 3 available mode: `date` , `month`, `year`. default is `date`. it will limit user input the date.

for example, mode `month` make user can only select the month, but can't select what spesific date.

<preview class="flex-col items-center gap-2">
  <Calendar
    mode="date" />
  <Calendar
    mode="month" />
  <Calendar
    mode="year" />
</preview>

```vue
<template>
  <Calendar
    mode="date" />
  <Calendar
    mode="month" />
  <Calendar
    mode="year" />
</template>
```

## Disabled State

<preview class="flex-col items-center gap-2">
  <Calendar disabled />
</preview>

```vue
<template>
  <Calendar disabled />
</template>
```

## Readonly state
<preview>
  <Calendar readonly />
</preview>

```vue
<template>
  <Calendar readonly />
</template>
```

## Binding v-model

<preview>
  <Calendar v-model="value" />
</preview>

```vue
<template>
  <Calendar v-vmodel="value" />
</template>
```

**Result :**

<pre class="max-w-full truncate"><code>{{ value ?? '-' }}</code></pre>

::: tip
value is a native `Date` instance, Component doesn't provide any date formatting. if you want change the format, you can use [date-fns][date-fns] or [moment.js][momentjs]
:::

[date-fns]: https://date-fns.org/
[momentjs]: https://momentjs.com/

Example:

<preview>
  <div>
    <Calendar v-model="value" />
    <div>
      Result: {{ value && format(value, 'dd-MM-yyyy') }}
    </div>
  </div>
</preview>

```vue
<template>
  <div>
    <Calendar v-model="value" />
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
      <td colspan="4" class="text-center">There no slots here</td>
    </tr>
  </tbody>
</table>

### Events

| Name     | Arguments          | Description              |
|----------|--------------------|--------------------------|
| `change` | Native Date object | Event when date selected |
