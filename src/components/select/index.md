---
title: Select · Components
description: Base form input.
---

<script setup>
  import pSelect from "./Select.vue"
  import pAvatar from "../avatar/Avatar.vue"
  import PiCaretDown16 from '@privyid/persona-icon/vue/caret-down/16.vue'
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

  const optionsC = ref([
    { text: '🍎 Apfel', value: 'Apple' },
    { text: '🍇 Traube', value: 'Grape', disabled: true },
    { text: '🍌 Bananen', value: 'Banana', disabled: false},
  ])

  const optionsD = ref([
    { text: '🍎 Apple', value: 'Apple' },
    { text: '🍇 Grape', value: 'Grape' },
    { text: '🍌 Banana', value: 'Banana'},
    { text: '🍋 Lemon', value: 'Lemon'},
    { text: '🥑 Avocado', value: 'Avocado'},
  ])

  const users = ref([
    {
      text : 'John Doe',
      value: 1,
      img  : "https://picsum.photos/id/50/50",
    },
    {
      text : 'Tarjono',
      value: 2,
      img  : "https://picsum.photos/id/51/50",
    }
  ])

  const value      = ref('')
  const selected   = ref()
  const province   = ref('')
  const city       = ref('')
  const multiValue = ref([])

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
  <p-select :options="optionsA" />
</preview>

```vue
<template>
  <p-select
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

### with Disabled option

<preview>
  <p-select :options="optionsC" v-model="value" />
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
    { text: '🍇 Traube', value: 'Grape', disabled: true },
    { text: '🍌 Bananen', value: 'Banana', disabled: false},
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

## Section Label

You can set sectiom label via `section-label` props

<preview>
  <p-select placeholder="Pick A Value" :options="optionsA" section-label="Fruits" />
</preview>

```vue
<template>
  <p-select placeholder="Pick A Value"
    :options="optionsA"
    section-label="Fruits" />
</template>
```

## Clearable

<preview>
  <p-select :options="optionsB" v-model="value" clearable/>
</preview>

```vue
<template>
  <p-select
    v-model="value"
    :options="options"
    clearable />
</template>

<script setup>
  const options = ref([
    { text: '🍎 Apfel', value: 'Apple' },
    { text: '🍇 Traube', value: 'Grape' },
    { text: '🍌 Bananen', value: 'Banana'},
  ])
</script>
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

## Multiple Selection

<preview>
  <p-select :options="optionsD" v-model="multiValue" multiple />
</preview>

```vue
<template>
  <p-select :options="optionsD" v-model="multiValue" multiple />
</template>
```

## Binding v-model

<preview>
  <p-select :options="optionsB" v-model="value" />
</preview>

**Result :**

<pre><code>{{ value || '-' }}</code></pre>

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
    v-model:selected="selected"
    clearable />
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

## Customization

### Custom Option

<preview>
  <p-select :options="users">
    <template #option="{ item }">
      <div class="flex flex-row space-x-2">
        <div class="shrink-0">
          <p-avatar :src="item.img" />
        </div>
        <div class="grow">
          <div class="font-sans text-base font-normal">{{ item.text }}
          </div>
            <div class="text-xs font-light option-text">ID: {{ item.value }}
          </div>
        </div>
      </div>
    </template>
  </p-select>
</preview>

```vue
<template>
  <p-select :options="users">
    <template #option="{ item }">
      <div class="flex flex-row space-x-2">
        <div class="shrink-0">
          <p-avatar :src="item.img" />
        </div>
        <div class="grow">
          <div class="font-sans text-base font-normal">{{ item.text }}
          </div>
            <div class="text-xs font-light option-text">ID: {{ item.value }}
          </div>
        </div>
      </div>
    </template>
  </p-select>
</template>

<script setup>
  const users = ref([
    {
      text : 'John Doe',
      value: 1,
      img  : "https://picsum.photos/id/50/50",
    },
    {
      text : 'Tarjono',
      value: 2,
      img  : "https://picsum.photos/id/51/50",
    }
  ])
</script>
```

### Custom Selected (Single)

<preview>
  <p-select :options="users">
    <template #selected="{ item }">
      <div class="flex flex-row space-x-2">
        <div class="shrink-0">
          <p-avatar :src="item.img" />
        </div>
        <div class="grow">
          <div class="font-sans text-base font-normal">{{ item.text }}
          </div>
            <div class="text-xs font-light option-text">ID: {{ item.value }}
          </div>
        </div>
      </div>
    </template>
  </p-select>
</preview>

```vue
<template>
  <p-select :options="users">
    <template #selected="{ item }">
      <div class="flex flex-row space-x-2">
        <div class="shrink-0">
          <p-avatar :src="item.img" />
        </div>
        <div class="grow">
          <div class="font-sans text-base font-normal">{{ item.text }}
          </div>
            <div class="text-xs font-light option-text">ID: {{ item.value }}
          </div>
        </div>
      </div>
    </template>
  </p-select>
</template>

<script setup>
  const users = ref([
    {
      text : 'John Doe',
      value: 1,
      img  : "https://picsum.photos/id/50/50",
    },
    {
      text : 'Tarjono',
      value: 2,
      img  : "https://picsum.photos/id/51/50",
    }
  ])
</script>
```

### Custom Selected (Multiple)

<preview>
  <p-select :options="users" multiple>
    <template #selected="{ item }">
      <div class="flex w-full">
        <div class="flex items-center pl-3">
          <p-avatar
            v-for="obj of item"
            :src="obj.img"
            class="-ml-3"
            size="xs" />
        </div>
        <div class="pl-2 grow">
          {{ item.length }} People selected
        </div>
      </div>
    </template>
  </p-select>
</preview>

```vue
<template>
  <p-select :options="users" multiple>
    <template #selected="{ item }">
      <div class="flex w-full">
        <div class="flex items-center pl-3">
          <p-avatar
            v-for="obj of item"
            :src="obj.img"
            class="-ml-3"
            size="xs" />
        </div>
        <div class="pl-2 grow">
          {{ item.length }} People selected
        </div>
      </div>
    </template>
  </p-select>
</template>

<script setup>
  const users = ref([
    {
      text : 'John Doe',
      value: 1,
      img  : "https://picsum.photos/id/50/50",
    },
    {
      text : 'Tarjono',
      value: 2,
      img  : "https://picsum.photos/id/51/50",
    }
  ])
</script>
```

## Hide Caret

When you set the `no-caret` prop to true, it will hide the caret icon, and users won't see it in the component.

<preview>
  <p-select :options="optionsA" no-caret />
</preview>

```vue
<template>
  <p-select :options="optionsA" />
</template>

<script setup>
  const options = ref(['Apple', 'Banana', 'Grape'])
</script>
```

## API

### Props

| Props                |              Type               |     Default     | Description                                                |
|----------------------|:-------------------------------:|:---------------:|------------------------------------------------------------|
| `options`            |             `Array`             |       `-`       | Select option's items                                      |
| `placeholder`        |            `String`             |       `-`       | Input placeholder                                          |
| `disabled`           |            `Boolean`            |     `false`     | Disabled state                                             |
| `readonly`           |            `Boolean`            |     `false`     | Readonly state                                             |
| `error`              |            `Boolean`            |     `false`     | Error state                                                |
| `emptyText`          |            `String`             |    `No Data`    | Label when options is empty                                |
| `loadingText`        |            `String`             |  `Loading...`   | Label when loading                                         |
| `sectionLabel`       |            `String`             |       `-`       | Add section label                                          |
| `adapter`            |            `Adapter`            |  `BaseAdapter`  | Adapter for loading option's items                         |
| `no-caret`           |            `Boolean`            |     `false`     | Hide caret icon                                            |
| `divider`            |            `Boolean`            |       `-`       | Enable divider in select-item                              |
| `menuClass`          | `String` \| `Array` \| `Object` |       `-`       | CSS class to add in the select menu container              |
| `menuSize`           |            `String`             |      `sm`       | Select menu size, valid value is `sm`, `md`, `lg` and `xl` |
| `multiple`           |            `Boolean`            |     `false`     | Enable multiple select                                     |
| `displayLimit`       |            `Number`             |       `2`       | Maximum of visible tags before truncated into single tag   |
| `limitText`          |            `String`             | `+{n} Other(s)` | Text on truncated tag **(Multiple Mode only)**             |
| `searchable`         |            `Boolean`            |     `true`      | Enable searchbar                                           |
| `noCloseAfterSelect` |            `Boolean`            |     `false`     | Disabled close popup after select an item                  |
| `modelValue`         |              `Any`              |       `-`       | `v-model` value                                            |
| `selected`           |       `Object` \| `Array`       |       `-`       | `v-model:selected` value                                   |

### Slots

| Name          | Description                                  |
|---------------|----------------------------------------------|
| `empty`       | Content when option is empty or not found    |
| `loading`     | Content when loading                         |
| `option`      | Content to place in Option Items             |
| `selected`    | Content to place for selected result         |
| `placeholder` | Content to place for placeholder             |
| `caret`       | Element for opening and closing the dropdown |

### Events

| Name        | Arguments | Description                                                                      |
|-------------|-----------|----------------------------------------------------------------------------------|
| `change`    | Object    | Event when value changed                                                         |
| `userInput` | Object    | Similar to `change`, but it's only triggered when user really clicked the option |

## See Also
- [Input](/components/input/index)
- [Input Group](/components/input-group/index)
- [Dropdown](/components/dropdown/index)
