---
title: Time · Components
description: Sub-component for Timepicker
---

<script setup>
  import pTime from "./Time.vue"
  import pToggle from '../toggle/Toggle.vue'
  import pButton from "../button/Button.vue"
  import { ref, watch } from "vue-demi"
  import { startOfDay, addDays, set, addHours } from 'date-fns'

  const minTime = ref(set(new Date(), { hours: 1, minutes: 20 }))
  const maxTime = ref(set(new Date(), { hours: 17, minutes: 30 }))

  const is12Hour  = ref(false)
  const model     = ref(new Date())
  const timeModel = ref({
    hh: '01',
    mm: '30'
  })
</script>

# Time

> Sub-component for [Timepicker](/components/timepicker/)

## Usage

### Simple usage

<preview>
  <p-time />
</preview>

```vue
<template>
  <p-time />
</template>
```

### Time Interval

Set prop `hour-interval` or `minute-interval` to make time item use interval .

<preview>
  <p-time :hour-interval="2" :minute-interval="10" />
</preview>

```vue
<template>
  <p-time :hour-interval="2" :minute-interval="10" />
</template>
```

### 12 Hour Format

Set prop `is12-hour` to use 12 hour time format with am/pm period picker

<preview>
  <p-time is12-hour />
</preview>

```vue
<template>
  <p-time is12-hour />
</template>
```

## Limit Time

### Min and Max
Time can limit the options to be selected using prop `min` and `max`. Default value of `min` is start of today and `max` is end of today.
Both `min` and `max` props use `Date` type for widespread use.

<preview>
  <p-time :min="minTime" :max="maxTime" />
</preview>

```vue
<template>
  <p-time :min="min" :max="max" />
</template>

<script setup>
import { set } from 'date-fns'

const min = ref(set(new Date(), { hours: 1, minutes: 0 }))
const max = ref(set(new Date(), { hours: 17, minutes: 30 }))
</script>
```

### Min and Max with Interval

<preview>
  <p-time :min="minTime" :max="maxTime" :hour-interval="2" :minute-interval="10" />
</preview>

```vue
<template>
  <p-time :min="min" :max="max" />
</template>

<script setup>
import { set } from 'date-fns'

const min = ref(set(new Date(), { hours: 1, minutes: 20 }))
const max = ref(set(new Date(), { hours: 17, minutes: 30 }))
</script>
```

## Binding v-model

Time `v-model` can support data type of `Date` and `TimeModel`. Which `TimeModel` is object with `hh`, `mm`, and `a` property.

### Date v-model

<preview>
  <p-time v-model="model" v-slot="{ confirm }">
    <p-button
      variant="ghost"
      class="mr-2">
      Cancel
    </p-button>
    <p-button
      variant="solid"
      color="info"
      @click="confirm">
      Set
    </p-button>
  </p-time>
</preview>

**result:**

<pre class="truncate"><code>{{ model }}</code></pre>


```vue
<template>
  <p-time v-model="model" v-slot="{ confirm }">
    <p-button
      variant="ghost"
      class="mr-2">
      Cancel
    </p-button>
    <p-button
      variant="solid"
      color="info"
      @click="confirm">
      Set
    </p-button>
  </p-time>
</template>

<script setup>
const model = ref(new Date())
</script>
```

### TimeModel v-model

<preview class="flex space-x-2">
  <p-time v-model="timeModel" :is12-hour="is12Hour" v-slot="{ confirm }">
    <p-button
      variant="ghost"
      class="mr-2">
      Cancel
    </p-button>
    <p-button
      variant="solid"
      color="info"
      @click="confirm">
      Set
    </p-button>
  </p-time>
  <p-toggle v-model="is12Hour">12-hour</p-toggle>
</preview>

**result:**

<pre class="truncate"><code>{{ timeModel }}</code></pre>


```vue
<template>
  <p-time v-model="model" v-slot="{ confirm }">
    <p-button
      variant="ghost"
      class="mr-2">
      Cancel
    </p-button>
    <p-button
      variant="solid"
      color="info"
      @click="confirm">
      Set
    </p-button>
  </p-time>
</template>

<script setup>
import type { TimeModel } from '@privyid/persona/dist/components/time'

const model = ref<TimeModel>({
  hh: '01',
  mm: '30'
})
</script>
```

## API

### Props

| Props             | Type                  | Default | Description                                                                                           |
| ----------------- | --------------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| `modelValue`      | `Date` or `TimeModel` | `-`  | `v-model` value accept `Date` and `TimeModel` object which have default value is current start of day |
| `is12-hour`      | `Boolean`             | `false` | Enable hour item to be formatted to 12 Hour                                                           |
| `hour-interval`   | `Number`              | `1`     | Step of each hour item                                                                                |
| `minute-interval` | `Number`              | `1`     | Steap of each minute item                                                                             |
| `min`             | `Date`                | `-`     | Minimum datetime to generate time items                                                               |
| `max`             | `Date`                | `-`     | Maximum datetime to generate time items                                                               |

### Slots

| Name      | Description                                 |
| --------- | ------------------------------------------- |
| `default` | Content to place at footer as footer action |

`default` slot contains scoped slots

| Scoped    | Type       | Default | Description                    |
| --------- | ---------- | ------- | ------------------------------ |
| `confirm` | `Function` | `-`     | Hook to update `v-model` value |

### Events

| Name      | Arguments     | Description                                                                                                                                                                               |
| --------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `context` | `TimeContext` | Event when `confirm` hook is triggered. `TimeContext` contains property `time` formatted as 24-hour or 12-hour, `date` is `Date` object, and `dateISO` formatted as standard ISO string   |

## See Also

- [Timepicker][timepicker]

[timepicker]: /components/timepicker/index
