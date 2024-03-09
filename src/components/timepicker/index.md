---
title: Timepicker · Components
description: Base button component
---

<script setup>
  import pTimepicker from './Timepicker.vue'
  import pToggle from '../toggle/Toggle.vue'
  import pButton from '../button/Button.vue'
  import { ref, watch } from "vue-demi"
  import { startOfDay, set } from 'date-fns'

  const minTime = ref(set(new Date(), { hours: 1, minutes: 0 }))
  const maxTime = ref(set(new Date(), { hours: 17, minutes: 30 }))

  const is12Hour  = ref(true)
  const model     = ref(new Date())
  const model2    = ref(new Date())
  const timeModel = ref({
    hh: '01',
    mm: '30'
  })
</script>

# Timepicker

> Base input type date

## Usage

### Simple Usage

<preview>
  <p-timepicker />
</preview>

```vue
<template>
  <p-timepicker />
</template>
```

## Sizing
Timepicker has 4 variants size: `xs`, `sm`, `md`, `lg`, default is `md`.

<preview class="flex-col space-y-3">
  <p-timepicker size="xs" />
  <p-timepicker size="sm" />
  <p-timepicker size="md" />
  <p-timepicker size="lg" />
</preview>

```vue
<template>
  <p-timepicker size="xs" />
  <p-timepicker size="sm" />
  <p-timepicker size="md" />
  <p-timepicker size="lg" />
</template>
```

## Placeholder

You can set input placeholder via `placeholder` props

<preview>
  <p-timepicker placeholder="Time" />
</preview>

```vue
<template>
  <p-timepicker placeholder="Time" />
</template>
```

## Time Format

Time has 12-hour and 24-hour clock format. You can use 12-hour clock format by set `is12-hour` prop.

<preview class="flex-col space-y-2">
  <p-timepicker />
  <p-timepicker is12-hour />
</preview>

```vue
<template>
  <p-timepicker />
  <p-timepicker is12-hour />
</template>
```

## Limit Time

You can limit the time via `min` or `max` props

<preview>
  <p-timepicker
    :min="minTime"
    :max="maxTime" />
</preview>

```vue
<template>
  <!-- Limit this year only -->
  <p-datepicker
    :min="min"
    :max="max" />
</template>

<script lang="ts" setup>
  import { set } from 'date-fns'

  const min = ref(set(new Date(), { hours: 1, minutes: 0 }))
  const max = ref(set(new Date(), { hours: 17, minutes: 30 }))
</script>
```

## Disabled State

<preview>
  <p-timepicker disabled />
</preview>

```vue
<template>
  <p-datepicker disabled />
</template>
```

## Readonly state
<preview>
  <p-timepicker readonly />
</preview>

```vue
<template>
  <p-timepicker readonly />
</template>
```

## Error state
<preview>
  <p-timepicker error />
</preview>

```vue
<template>
  <p-timepicker error />
</template>
```

## Binding v-model

### Date v-model

<preview>
  <p-timepicker v-model="model" />
</preview>

**Result :**

<pre class="max-w-full truncate"><code>{{ model ?? '-' }}</code></pre>

```vue
<template>
  <p-timepicker v-vmodel="model" />
</template>

<script setup>
  const model = ref(new Date())
</script>
```

### TimeModel v-model

<preview class="flex space-x-2">
  <p-timepicker v-model="timeModel" :is12-hour="is12Hour" />
  <p-toggle v-model="is12Hour">12-hour</p-toggle>
</preview>

**result:**

<pre class="truncate"><code>{{ timeModel }}</code></pre>


```vue
<template>
  <p-timepicker v-vmodel="model" :is12-hour="is12Hour" />
  <p-toggle v-model="is12Hour">12-hour</p-toggle>
</template>

<script setup>
import type { TimeModel } from '@privyid/persona/dist/components/time'

const model = ref<TimeModel>({
  hh: '01',
  mm: '30'
})
</script>
```

## Customization Slots

### Custom Footer

<preview class="flex space-x-2">
  <p-timepicker v-model="model2">
    <template #footer="{ confirm }">
      <p-button class="mx-2" @click="confirm">
        Apply
      </p-button>
    </template>
  </p-timepicker>
</preview>

**result:**

<pre class="truncate"><code>{{ model2 }}</code></pre>

```vue
<template>
  <p-timepicker v-model="model">
    <template #footer="{ confirm, close }">
      <p-button class="mx-2" @click="confirm">
        Apply
      </p-button>
    </template>
  </p-timepicker>
</template>

<script setup>
const model = ref(new Date())
</script>
```

## API

### Props

| Props             | Type                  | Default  | Description                                                                                           |
|-------------------|-----------------------|----------|-------------------------------------------------------------------------------------------------------|
| `modelValue`      | `Date` or `TimeModel` | `-`      | `v-model` value accept `Date` and `TimeModel` object which have default value is current start of day |
| `size`            | `String`              | `md`     | Input size variant, valid value: `xs`, `sm`, `md`, `lg`                                               |
| `placeholder`     | `String`              | `-`      | Input placeholder                                                                                     |
| `disabled`        | `Boolean`             | `false`  | Disabled state                                                                                        |
| `readonly`        | `Boolean`             | `false`  | Readonly state                                                                                        |
| `error`           | `Boolean`             | `false`  | Error state                                                                                           |
| `dismissable`     | `Boolean`             | `false`  | Show dismiss button action                                                                            |
| `dismissLabel`    | `String`              | `Cancel` | Label to place at dismiss button                                                                      |
| `confirmLabel`    | `String`              | `Set`    | Label to place at confirm button                                                                      |
| `is12-hour`       | `Boolean`             | `false`  | Enable hour item to be formatted to 12 Hour                                                           |
| `hour-interval`   | `Number`              | `1`      | Step of each hour item                                                                                |
| `minute-interval` | `Number`              | `1`      | Steap of each minute item                                                                             |
| `min`             | `Date`                | `-`      | Minimum datetime to generate time items                                                               |
| `max`             | `Date`                | `-`      | Maximum datetime to generate time items                                                               |

### Slots

| Name     | Description                |
|----------|----------------------------|
| `footer` | Content to place at footer |

`footer` slot contains scoped slots

| Scoped    | Type       | Default | Description                    |
|-----------|------------|---------|--------------------------------|
| `confirm` | `Function` | `-`     | Hook to update `v-model` value |
| `close`   | `Function` | `-`     | Hook to close dropdown menu    |

### Events

| Name      | Arguments     | Description                                                                                                                                                                             |
|-----------|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `context` | `TimeContext` | Event when `confirm` hook is triggered. `TimeContext` contains property `time` formatted as 24-hour or 12-hour, `date` is `Date` object, and `dateISO` formatted as standard ISO string |

## See Also

- [Time](/components/time/)
