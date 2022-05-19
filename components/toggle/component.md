<script setup>
  import Toggle from "./Toggle.vue"
  import IconLight from "@carbon/icons-vue/lib/light/16"
  import IconDark from "@carbon/icons-vue/lib/asleep/16"
  import { ref } from "vue-demi"
  import { useDark } from '@vueuse/core'

  const modelA   = ref(false)
  const modelB   = ref('off')
  const isDark   = useDark()
  const selected = ref([])
</script>

# Toggle

## Usage

### Simple Usage
<preview>
  <Toggle>Text</Toggle>
</preview>

```vue
<template>
  <Toggle>Text</Toggle>
</template>
```

### With Icon

<preview>
  <Toggle>
    <template #checked>
      <svg width="8" height="8" viewBox="0 0 2 8" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="2" height="8" rx="1" fill="white" /></svg>
    </template>
    <template #unchecked>
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="4" r="3" stroke="white" stroke-width="2"/></svg>
    </template>
    <template #default>
      Text
    </template>
  </Toggle>
</preview>

```vue
<template>
  <Toggle>
    <template #checked>
      <svg width="8" height="8" viewBox="0 0 2 8" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="2" height="8" rx="1" fill="white" /></svg>
    </template>
    <template #unchecked>
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="4" r="3" stroke="white" stroke-width="2"/></svg>
    </template>
    <template #default>
      Text
    </template>
  </Toggle>
</template>
```

## Type variant

There available 2 type variants: `pill` and `flat`. default is `pill`

<preview class="flex-col items-center gap-3">
  <Toggle variant="pill">Pill</Toggle>
  <Toggle variant="flat">Flat</Toggle>
</preview>

```vue
<template>
  <Toggle variant="pill">Pill</Toggle>
  <Toggle variant="flat">Flat</Toggle>
</template>
```

## Custom label

You can customize toggle label with `checked-label` and `unchecked-label`

<preview class="flex-col items-center gap-3">
  <Toggle variant="pill" checked-label="Y" unchecked-label="N">Text</Toggle>
  <Toggle variant="flat" checked-label="PM" unchecked-label="AM">Text</Toggle>
</preview>

```vue
<template>
  <Toggle variant="pill" checked-label="Y" unchecked-label="N">Text</Toggle>
  <Toggle variant="flat" checked-label="PM" unchecked-label="AM">Text</Toggle>
</template>
```

You can also use `checked` and `unchecked` slot to customize the label, it allow you to use non-text label like an **icon**

<preview class="flex-col items-center gap-3">
  <Toggle v-model="isDark">
    <template #checked>
      <IconDark />
    </template>
    <template #unchecked>
      <IconLight />
    </template>
    <template #default>
      Dark Mode
    </template>
  </Toggle>
</preview>

```vue
<template>
  <Toggle>
    <template #checked>
      <IconDark />
    </template>
    <template #unchecked>
      <IconLight />
    </template>
    <template #default>
      Dark Mode
    </template>
  </Toggle>
</template>

<script setup>
  import IconLight from "@carbon/icons-vue/lib/light/16"
  import IconDark from "@carbon/icons-vue/lib/asleep/16"
</script>
```

## Hide label

You can hide toggle label with `no-label` prop

<preview class="flex-col items-center gap-3">
  <Toggle variant="pill" no-label>Text</Toggle>
  <Toggle variant="flat" no-label>Text</Toggle>
</preview>

```vue
<template>
  <Toggle variant="pill" no-label>Text</Toggle>
  <Toggle variant="flat" no-label>Text</Toggle>
</template>
```

## Disable state

<preview class="flex-col items-center gap-3">
  <Toggle variant="pill" disabled>Pill</Toggle>
  <Toggle variant="flat" disabled>Flat</Toggle>
</preview>

```vue
<template>
  <Toggle variant="pill" disabled>Pill</Toggle>
  <Toggle variant="flat" disabled>Flat</Toggle>
</template>
```

## Readonly state

<preview class="flex-col items-center gap-3">
  <Toggle readonly>Readonly False</Toggle>
  <Toggle readonly checked>Readonly True</Toggle>
</preview>

```vue
<template>
  <Toggle readonly>Readonly False</Toggle>
  <Toggle readonly checked>Readonly True</Toggle>
</template>
```

## Binding v-model

<preview class="flex-col items-center gap-3">
  <Toggle v-model="modelA">Text</Toggle>
</preview>

**Result :**

<pre><code>{{ modelA }}</code></pre>

```vue
<template>
  <Toggle v-model="modelA">Text</Toggle>
</template>
```

### Custom v-model value

By default, value of toggle is always `Boolean`, but you can change it with `value` and `unchecked-value`.

<preview class="flex-col items-center gap-3">
  <Toggle v-model="modelB" value="on" unchecked-value="off">Lamp</Toggle>
</preview>

**Result :**

<pre><code>{{ modelB }}</code></pre>

```vue
<template>
  <Toggle
    v-model="model"
    value="on"
    unchecked-value="off">
    Active
  </Toggle>
</template>
```

### Array v-model

Similar to [Checkbox](/checkbox/component), if v-model **state** is an *array* it will append the value instead of replacing it.

<preview class="flex-col items-center">
  <div class="flex flex-col gap-3">
    <Toggle v-model="selected" value="apple">Apple</Toggle>
    <Toggle v-model="selected" value="grape">Grape</Toggle>
    <Toggle v-model="selected" value="pineapple">Pineapple</Toggle>
  </div>
</preview>

**Selected :**
<pre class="whitespace-normal"><code>{{ selected }}</code></pre>

```vue
<template>
  <div class="flex flex-col gap-3">
    <Toggle v-model="selected" value="apple">Apple</Toggle>
    <Toggle v-model="selected" value="grape">Grape</Toggle>
    <Toggle v-model="selected" value="pineapple">Pineapple</Toggle>
  </div>
</template>
```

## API

### Props

| Props            |   Type    | Default | Description                                                              |
|------------------|:---------:|:-------:|--------------------------------------------------------------------------|
| `variant`        | `String`  | `pill`  | Toggle style variant, valid value is `pill`, `flat`                      |
| `checked`        | `Boolean` | `false` | Checked condition. if it is `true`, Toggle will be checked on first time |
| `value`          |   `Any`   | `true`  | Checked value                                                            |
| `uncheckedValue` |   `Any`   | `false` | Unchecked value                                                          |
| `checkedLabel`   | `String`  |  `on`   | Label when Toggle is checked                                             |
| `uncheckedLabel` | `String`  |  `off`  | Label when Toggle is unchecked                                           |
| `noLabel`        | `Boolean` | `false` | Hide label                                                               |
| `disabled`       | `Boolean` | `false` | Disable state                                                            |
| `readonly`       | `Boolean` | `false` | Readonly state                                                           |
| `modelValue`     |   `Any`   |   `-`   | `v-model` value                                                          |

### Slots

| Name        | Description                 |
|-------------|-----------------------------|
| `default`   | Content to place in toggle  |
| `checked`   | Content for checked label   |
| `unchecked` | Content for unchecked label |

### Events

| Name     | Arguments | Description              |
|----------|-----------|--------------------------|
| `change` | Boolean   | Event when value changed |

## See Also
- [Checkbox](/checkbox/component)
- [Radio](/radio/component)
