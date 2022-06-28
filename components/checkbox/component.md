<script setup>
  import Banner from "../banner/Banner.vue"
  import Checkbox from "./Checkbox.vue"
  import { ref, computed } from "vue-demi"

  const value    = ref(false)
  const value2   = ref(false)
  const modelA   = ref(false)
  const modelB   = ref('disagree')
  const selected = ref([])

  const items  = ref(['apple', 'grape', 'orange'])
  const result = ref(['apple'])

  const selectAll = computed({
    get () {
      return result.value.length === items.value.length
    },
    set (value) {
      if (selectAll.value !== value)
        result.value = value ? [...items.value] : []
    },
  })

  const indeterminate = computed(() => {
    return result.value.length > 0
      && result.value.length < items.value.length
  })
</script>

# Checkbox

## Usage

### Simple Usage

<preview>
  <Checkbox>Checklist Label</Checkbox>
</preview>

```vue
<template>
  <Checkbox>Checklist Label</Checkbox>
</template>
```

### With Subtext

<preview>
  <Checkbox>
    <div>Checklist Label</div>
    <div class="text-subtext-100">
      Text
    </div>
  </Checkbox>
</preview>

```vue
<template>
  <Checkbox>
    <div>Checklist Label</div>
    <div class="text-subtext-100">
      Text
    </div>
  </Checkbox>
</template>
```

## Disabled State

<preview>
  <Checkbox disabled>
    Checkbox Label
  </Checkbox>
</preview>

```vue
<template>
  <Checkbox disabled>
    Checkbox Label
  </Checkbox>
</template>
```

## Readonly State

<preview>
  <Checkbox readonly>
    Checkbox Label
  </Checkbox>
</preview>

```vue
<template>
  <Checkbox readonly>
    Checkbox Label
  </Checkbox>
</template>
```

## Binding v-model

<preview class="flex-col items-center gap-3">
  <Checkbox v-model="modelA">Checkbox Label</Checkbox>
</preview>

**Result :**

<pre><code>{{ modelA }}</code></pre>

```vue
<template>
  <Checkbox v-model="modelA">Text</Checkbox>
</template>
```

### Custom v-model value

By default, value of toggle is always `Boolean`, but you can change it with `value` and `unchecked-value`.

<preview class="flex-col items-center gap-3">
  <Checkbox v-model="modelB" value="agree" unchecked-value="disagree">
    I agree with Term and Condition
  </Checkbox>
</preview>

**Result :**

<pre><code>{{ modelB }}</code></pre>

```vue
<template>
  <Checkbox
    v-model="model"
    value="on"
    unchecked-value="off">
    Active
  </Checkbox>
</template>
```

### Array v-model

If v-model **state** is an *array* it will append the value instead of replacing it.

<Banner><strong>Warn!</strong> selected order is not guaranteed</Banner>

<preview class="flex-col items-center">
  <div class="flex flex-col gap-3">
    <Checkbox v-model="selected" value="apple">Apple</Checkbox>
    <Checkbox v-model="selected" value="grape">Grape</Checkbox>
    <Checkbox v-model="selected" value="pineapple">Pineapple</Checkbox>
    <Checkbox v-model="selected" :value="{ id: 1, name: 'Tarjono' }">Object</Checkbox>
    <Checkbox v-model="selected" :value="['Item 1']">Array</Checkbox>
  </div>
</preview>

**Selected :**

<pre><code>{{ selected }}</code></pre>

```vue
<template>
  <div class="flex flex-col gap-3">
    <Checkbox v-model="selected" value="apple">Apple</Checkbox>
    <Checkbox v-model="selected" value="grape">Grape</Checkbox>
    <Checkbox v-model="selected" value="pineapple">Pineapple</Checkbox>
    <Checkbox v-model="selected" :value="{ id: 1, name: 'Tarjono' }">Object</Checkbox>
    <Checkbox v-model="selected" :value="['Item 1']">Array</Checkbox>
  </div>
</template>
```

## Indeterminate (3-state)

Indeterminate is condition between `checked` and `unchecked`. It's usefull for case like: **selectAll** feature.

<preview class="flex-col items-center">
  <div class="flex flex-col gap-3">
    <Checkbox
      v-model="selectAll"
      :indeterminate="indeterminate">
      Select All
    </Checkbox>
    <template v-for="item of items">
      <Checkbox v-model="result" :value="item" class="ml-4">
        {{ item }}
      </Checkbox>
    </template>
  </div>
</preview>

**Result :**

<pre class="whitespace-normal"><code>{{ result }}</code></pre>

```vue
<template>
  <div class="flex flex-col gap-3">
    <Checkbox
      v-model="selectAll"
      :indeterminate="indeterminate">
      Select All
    </Checkbox>

    <template v-for="item of items">
      <Checkbox v-model="result" :value="item" class="ml-4">
        {{ item }}
      </Checkbox>
    </template>
  </div>
</template>

<script setup>
  const items  = ref(['apple', 'grape', 'orange'])
  const result = ref([])

  const selectAll = computed({
    get () {
      return result.value.length === items.value.length
    },
    set (value) {
      if (selectAll.value !== value)
        result.value = value ? [...items.value] : []
    },
  })

  const indeterminate = computed(() => {
    return result.value.length > 0
      && result.value.length < items.value.length
  })
</script>
```

## API

### Props

| Props            |   Type    | Default | Description                                                                |
|------------------|:---------:|:-------:|----------------------------------------------------------------------------|
| `checked`        | `Boolean` | `false` | Checked condition. if it is `true`, Checkbox will be checked on first time |
| `value`          |   `Any`   | `true`  | Checked value                                                              |
| `uncheckedValue` |   `Any`   | `false` | Unchecked value                                                            |
| `disabled`       | `Boolean` | `false` | Disabled state                                                             |
| `readonly`       | `Boolean` | `false` | Readonly state                                                             |
| `indeterminate`  | `Boolean` | `false` | Indeterminate state                                                        |
| `modelValue`     |   `Any`   |   `-`   | `v-model` value                                                            |

### Slots

| Name      | Description                |
|-----------|----------------------------|
| `default` | Content to place in toggle |

### Events

| Name     | Arguments | Description              |
|----------|-----------|--------------------------|
| `change` | Boolean   | Event when value changed |

## See Also
- [Toggle](/toggle/component)
- [Radio](/radio/component)
