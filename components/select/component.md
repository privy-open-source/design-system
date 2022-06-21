<script setup>
  import Select from "./Select.vue"
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

## Usage

### Simple Usage

<preview>
  <Select :options="optionsA" v-model="value" />
</preview>

```vue
<template>
  <Select
    v-model="value"
    :options="options" />
</template>

<script setup>
  const options = ref(['Apple', 'Banana', 'Grape'])
</script>
```

### with Text and Value

<preview>
  <Select :options="optionsB" v-model="value" />
</preview>

```vue
<template>
  <Select
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
  <Select placeholder="Pick A Value" />
</preview>

```vue
<template>
  <Select placeholder="Pick A Value" />
</template>
```

## Disabled State

<preview>
  <Select disabled />
</preview>

```vue
<template>
  <Select disabled />
</template>
```

## Readonly State
<preview>
  <Select readonly />
</preview>

```vue
<template>
  <Select readonly />
</template>
```

## Binding v-model

<preview>
  <Select :options="optionsB" v-model="value" />
</preview>

**Result :**

<pre><code>{{ value }}</code></pre>

```vue
<template>
  <Select
    v-model="value"
    :options="options" />
</template>
```

### Binding raw value

If you want to get original selected item (text and value) not value only. you can use `v-model:selected`.

<preview>
  <Select
    :options="optionsB"
    v-model="value"
    v-model:selected="selected" />
</preview>

**v-model**
<pre><code>{{ value }}</code></pre>

**v-model:selected**
<pre class="whitespace-normal"><code>{{ selected }}</code></pre>

```vue
<template>
  <Select
    :options="optionsB"
    v-model="value"
    v-model:selected="selected" />
</template>
```

## Fuzzy Search

This component has build-in Fuzzy-search Adapter, powered by [Fuze.js](https://fusejs.io/).

**Example:** try type `nn`, and you'll got `Bananen`

<preview>
  <Select
    :adapter="FuzzyAdapter"
    :options="optionsB"
    v-model="value" />
</preview>

```vue
<template>
  <Select
    v-model="value"
    :adapter="FuzzyAdapter"
    :options="options" />
</template>

<script setup>
  import FuzzyAdapter from './select/adapter/fuzzy-adapter'

  const options = ref([
    { text: '🍎 Apple', value: 'Apple' },
    { text: '🍇 Grape', value: 'Grape' },
    { text: '🍌 Banana', value: 'Banana'},
  ])
</script>
```


## Handling Asynchronous

Somecase you will need to load your options from API.
You just need define custom async adapter and request handler.
It will take care of loading, inifinite load, and other stuff.

<preview>
  <Select
    :adapter="provincesAdapter"
    v-model="province" />
</preview>

**Result:** <pre><code>{{ province }}</code></pre>

```vue
<template>
  <Select
    :adapter="provincesAdapter"
    v-model="province" />
</template>

<script setup>
  import defineAsyncAdapter from "./adapter/async-adapter"
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

<preview class="flex-col gap-2">
  <Select
    v-model="province"
    placeholder="Select Province"
    :adapter="provincesAdapter"
    @user-input="city = ''" />
  <Select
    v-model="city"
    placeholder="Select Cities"
    :adapter="citiesAdapter" />
</preview>

```vue
<template>
  <Select
    v-model="province"
    placeholder="Select Province"
    :adapter="provincesAdapter"
    @user-input="city = ''" />
  <Select
    v-model="city"
    placeholder="Select Cities"
    :adapter="citiesAdapter" />
</template>

<script setup>
  import defineAsyncAdapter from "./adapter/async-adapter"
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
- [Input](/input/component)
- Input Group
- [Dropdown](/dropdown/component)
