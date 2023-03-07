---
title: Select · Components
description: Base form input.
---

<script setup>
  import pSelect from "./Select.vue"
  import FuzzyAdapter from "../select/adapter/fuzzy-adapter"
  import defineAsyncAdapter from "./adapter/async-adapter"
  import { ref } from "vue-demi"
  import { getProvinces, getCities } from './demo/get-region'

  const optionsA = ref(['Apple', 'Banana', 'Grape'])
  const optionsB = ref([
    { text: '🍎 Apfel', value: 'Apple' },
    { text: '🍇 Traube', value: 'Grape' },
    { text: '🍌 Bananen', value: 'Banana'},
  ])

  const value    = ref('')
  const selected = ref()
  const province = ref('')
  const city     = ref('')

  const provincesAdapter = defineAsyncAdapter(async (keyword, page, perPage) => {
    const response = await getProvinces(keyword, page, perPage)

    return response.data.map((item) => {
      return {
        text : item.name,
        value: item.id,
      }
    })
  }, [])

  const citiesAdapter = defineAsyncAdapter(async (keyword, page, perPage) => {
    const response = await getCities(province.value, keyword, page, perPage)

    return response.data.map((item) => {
      return {
        text : item.name,
        value: item.id,
      }
    })
  }, [province])
</script>


# Select

> Base form select.

## Usage

### Simple Usage

<preview>
  <p-select :options="optionsA" v-model="value" />
</preview>

```vue
<template>
  <p-select
    v-model="value"
    :options="options" />
</template>

<script setup>
  const options = ref(['Apple', 'Banana', 'Grape'])
</script>
```

### with Text and Value

<preview>
  <p-select :options="optionsB" v-model="value" />
</preview>

```vue
<template>
  <p-select
    v-model="value"
    :options="options" />
</template>

<script setup>
  const options = ref([
    { text: '🍎 Apfel', value: 'Apple' },
    { text: '🍇 Traube', value: 'Grape' },
    { text: '🍌 Bananen', value: 'Banana'},
  ])
</script>
```
## Placeholder

You can set input placeholder via `placeholder` props

<preview>
  <p-select placeholder="Pick A Value" />
</preview>

```vue
<template>
  <p-select placeholder="Pick A Value" />
</template>
```

## Sizing

You can set size of select via `size` prop. Available size are `lg`, `md`, `sm`, `xs`. Default size is `md`.

<preview class="flex-col space-y-3">
  <p-select size="xs" v-model="value" :options="optionsA" placeholder="Size xs" />
  <p-select size="sm" v-model="value" :options="optionsA" placeholder="Size sm" />
  <p-select size="md" v-model="value" :options="optionsA" placeholder="Size md" />
  <p-select size="lg" v-model="value" :options="optionsA" placeholder="Size lg" />
</preview>

```vue
<template>
  <p-select size="xs" v-model="value" :options="options" placeholder="Size xs" />
  <p-select size="sm" v-model="value" :options="options" placeholder="Size sm" />
  <p-select size="md" v-model="value" :options="options" placeholder="Size md" />
  <p-select size="lg" v-model="value" :options="options" placeholder="Size lg" />
</template>
```

## Disabled State

<preview>
  <p-select disabled />
</preview>

```vue
<template>
  <p-select disabled />
</template>
```

## Readonly State
<preview>
  <p-select readonly />
</preview>

```vue
<template>
  <p-select readonly />
</template>
```

## Error State
<preview>
  <p-select error />
</preview>

```vue
<template>
  <p-select error />
</template>
```

## Binding v-model

<preview>
  <p-select :options="optionsB" v-model="value" />
</preview>

**Result :**

<pre><code>{{ value }}</code></pre>

```vue
<template>
  <p-select
    v-model="value"
    :options="options" />
</template>
```

### Binding raw value

If you want to get original selected item (text and value) not value only. you can use `v-model:selected`.

<preview>
  <p-select
    :options="optionsB"
    v-model="value"
    v-model:selected="selected" />
</preview>

**v-model**

<pre><code>{{ value || '-' }}</code></pre>

**v-model:selected**

<pre class="whitespace-normal"><code>{{ selected || '-' }}</code></pre>

```vue
<template>
  <p-select
    :options="optionsB"
    v-model="value"
    v-model:selected="selected" />
</template>
```

## Fuzzy Search

This component has build-in Fuzzy-search Adapter, powered by [Fuze.js](https://fusejs.io/).

**Example:** try type `nn`, and you'll got `Bananen`

<preview>
  <p-select
    :adapter="FuzzyAdapter"
    :options="optionsB"
    v-model="value" />
</preview>

```vue
<template>
  <p-select
    v-model="value"
    :adapter="FuzzyAdapter"
    :options="options" />
</template>

<script setup>
  import { FuzzyAdapter } from '@privyid/persona/core'

  const options = ref([
    { text: '🍎 Apfel', value: 'Apple' },
    { text: '🍇 Traube', value: 'Grape' },
    { text: '🍌 Bananen', value: 'Banana'},
  ])
</script>
```


## Handling Asynchronous

Somecase you will need to load your options from API.
You just need define custom async adapter and request handler.
It will take care of loading, inifinite load, and other stuff.

<preview>
  <p-select
    :adapter="provincesAdapter"
    v-model="province" />
</preview>

**Result:**

<pre><code>{{ province }}</code></pre>

```vue
<template>
  <p-select
    :adapter="provincesAdapter"
    v-model="province" />
</template>

<script setup>
  import { defineAsyncAdapter } from "@privyid/persona/core"
  import { getProvinces } from '~/api/region'

  const provincesAdapter = defineAsyncAdapter(async (keyword, page, perPage) => {
    const response = await getProvinces(keyword, page, perPage)

    return response.data.map((item) => {
      return {
        text : item.name,
        value: item.code,
      }
    })
  }, [])
</script>
```

### Reactivity inside Handler

When you working with chaining select like `province` -> `city` form.
Normally, when you select the province, it should trigger reload on city based on the province.
To do this, you need add the province value as **watch dependencies**. It will automatically reload when `province` is changed

<preview class="flex-col space-y-2">
  <p-select
    v-model="province"
    placeholder="Select Province"
    :adapter="provincesAdapter"
    @user-input="city = ''" />
  <p-select
    v-model="city"
    placeholder="Select Cities"
    :adapter="citiesAdapter" />
</preview>

```vue
<template>
  <p-select
    v-model="province"
    placeholder="Select Province"
    :adapter="provincesAdapter"
    @user-input="city = ''" />
  <p-select
    v-model="city"
    placeholder="Select Cities"
    :adapter="citiesAdapter" />
</template>

<script setup>
  import { defineAsyncAdapter } from "@privyid/persona/core"
  import { getProvinces } from '~/api/region'

  const province = ref('')
  const city     = ref('')

  const provincesAdapter = defineAsyncAdapter(/* example above */)

  const citiesAdapter = defineAsyncAdapter(async (keyword, page, perPage) => {
    const response = await getCities(province.value, keyword, page, perPage)
                                    // 👆 reactive ref
    return response.data.map((item) => {
      return {
        text : item.name,
        value: item.id,
      }
    })
  }, [province]) // 👈 need to add `province` as watch deps
</script>
```
## API

### Props

| Props         |   Type    |    Default    | Description                        |
|---------------|:---------:|:-------------:|------------------------------------|
| `options`     |  `Array`  |      `-`      | Select option's items              |
| `placeholder` | `String`  |      `-`      | Input placeholder                  |
| `disabled`    | `Boolean` |    `false`    | Disabled state                     |
| `readonly`    | `Boolean` |    `false`    | Readonly state                     |
| `error`       | `Boolean` |    `false`    | Error state                        |
| `emptyText`   | `String`  |   `No Data`   | Label when options is empty        |
| `loadingText` | `String`  | `Loading...`  | Label when loading                 |
| `adapter`     | `Adapter` | `BaseAdapter` | Adapter for loading option's items |
| `modelValue`  |   `Any`   |      `-`      | `v-model` value                    |
| `selected`    | `Object`  |      `-`      | `v-model:selected` value           |

### Slots

| Name      | Description                               |
|-----------|-------------------------------------------|
| `empty`   | Content when option is empty or not found |
| `loading` | Content when loading                      |
| `option`  | Content to place in Option Items          |

### Events

| Name        | Arguments | Description                                                                      |
|-------------|-----------|----------------------------------------------------------------------------------|
| `change`    | Object    | Event when value changed                                                         |
| `userInput` | Object    | Similar to `change`, but it's only triggered when user really clicked the option |

## See Also
- [Input](/components/input/index)
- Input Group
- [Dropdown](/components/dropdown/index)
