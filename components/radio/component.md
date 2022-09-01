<script setup>
  import pRadio from "./Radio.vue"
  import { ref } from "vue-demi"

  const value    = ref('')
  const selected = ref()
</script>

# Radio

## Usage

### Simple Usage

<preview>
  <p-radio value="1" v-model="value">Radio Label</p-radio>
</preview>

```vue
<template>
  <p-radio value="1" v-model="value">Radio Label</p-radio>
</template>
```

### With Subtext

<preview>
  <p-radio v-model="value">
    <div>Radio Label</div>
    <div class="text-subtext-100">
      Text
    </div>
  </p-radio>
</preview>

```vue
<template>
  <p-radio v-model="value">
    <div>Radio Label</div>
    <div class="text-subtext-100">
      Text
    </div>
  </p-radio>
</template>
```

## Disabled State

<preview>
  <p-radio disabled>
    Radio Label
  </p-radio>
</preview>

```vue
<template>
  <p-radio v-model="value" disabled>
    Radio Label
  </p-radio>
</template>
```

## Readonly State

<preview>
  <p-radio readonly>
    Radio Label
  </p-radio>
</preview>

```vue
<template>
  <p-radio readonly>
    Radio Label
  </p-radio>
</template>
```

## Binding v-model

<preview class="justify-center">
  <div class="flex flex-col gap-3">
    <p-radio v-model="selected" value="apple">Apple</p-radio>
    <p-radio v-model="selected" value="grape">Grape</p-radio>
    <p-radio v-model="selected" value="orange">Orange</p-radio>
  </div>
</preview>

**Selected :**

<pre><code>{{ selected }}</code></pre>

```vue
<template>
  <p-radio v-model="selected" value="apple">Apple</p-radio>
  <p-radio v-model="selected" value="grape">Grape</p-radio>
  <p-radio v-model="selected" value="orange">Orange</p-radio>
</template>
```

## Apperance

Some case, you may need some [Checkbox](/checkbox/component) but work like a Radio. You can change the apperance via `apperance` props.

<preview class="justify-center">
  <div class="flex flex-col gap-3">
    <p-radio apperance="checkbox" v-model="selected" value="apple">Apple</p-radio>
    <p-radio apperance="checkbox" v-model="selected" value="grape">Grape</p-radio>
    <p-radio apperance="checkbox" v-model="selected" value="orange">Orange</p-radio>
  </div>
</preview>

**Selected :**

<pre><code>{{ selected }}</code></pre>

```vue
<template>
  <p-radio apperance="checkbox" v-model="selected" value="apple">Apple</p-radio>
  <p-radio apperance="checkbox" v-model="selected" value="grape">Grape</p-radio>
  <p-radio apperance="checkbox" v-model="selected" value="orange">Orange</p-radio>
</template>
```

## API

### Props

| Props        |   Type    | Default | Description                                                             |
|--------------|:---------:|:-------:|-------------------------------------------------------------------------|
| `checked`    | `Boolean` | `false` | Checked condition. if it is `true`, Radio will be checked on first time |
| `value`      |   `Any`   | `true`  | Checked value                                                           |
| `disabled`   | `Boolean` | `false` | Disable state                                                           |
| `readonly`   | `Boolean` | `false` | Readonly state                                                          |
| `apperance`  | `String`  | `radio` | Radio apperance, valid value is: `radio`, `checkbox`                    |
| `modelValue` |   `Any`   |   `-`   | `v-model` value                                                         |

### Slots

| Name      | Description               |
|-----------|---------------------------|
| `default` | Content to place in radio |

### Events

| Name     | Arguments | Description              |
|----------|-----------|--------------------------|
| `change` | Boolean   | Event when value changed |

## See Also
- [Checkbox](/checkbox/component)
- [Toggle](/toggle/component)
