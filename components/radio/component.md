<script setup>
  import Radio from "./Radio.vue"
  import { ref } from "vue-demi"

  const value    = ref('')
  const selected = ref()
</script>


# Radio

## Usage

### Simple Usage
<preview>
  <Radio value="1" v-model="value">Radio Label</Radio>
</preview>

```vue
<template>
  <Radio value="1" v-model="value">Radio Label</Radio>
</template>
```

### With Subtext

<preview>
  <Radio v-model="value">
    <div>Radio Label</div>
    <div class="text-subtext-100">
      Text
    </div>
  </Radio>
</preview>

```vue
<template>
  <Radio v-model="value">
    <div>Radio Label</div>
    <div class="text-subtext-100">
      Text
    </div>
  </Radio>
</template>
```

## Disabled State

<preview>
  <Radio disabled>
    Radio Label
  </Radio>
</preview>

```vue
<template>
  <Radio v-model="value" disabled>
    Radio Label
  </Radio>
</template>
```

## Readonly State

<preview>
  <Radio readonly>
    Radio Label
  </Radio>
</preview>

```vue
<template>
  <Radio readonly>
    Radio Label
  </Radio>
</template>
```

## Binding v-model

<preview class="justify-center">
  <div class="flex flex-col gap-3">
    <Radio v-model="selected" value="apple">Apple</Radio>
    <Radio v-model="selected" value="grape">Grape</Radio>
    <Radio v-model="selected" value="orange">Orange</Radio>
  </div>
</preview>

**Selected :**

<pre><code>{{ selected }}</code></pre>

```vue
<template>
  <Radio v-model="selected" value="apple">Apple</Radio>
  <Radio v-model="selected" value="grape">Grape</Radio>
  <Radio v-model="selected" value="orange">Orange</Radio>
</template>
```

## Apperance

Some case, you may need some [Checkbox](/checkbox/component) but work like a Radio. You can change the apperance via `apperance` props.

<preview class="justify-center">
  <div class="flex flex-col gap-3">
    <Radio apperance="checkbox" v-model="selected" value="apple">Apple</Radio>
    <Radio apperance="checkbox" v-model="selected" value="grape">Grape</Radio>
    <Radio apperance="checkbox" v-model="selected" value="orange">Orange</Radio>
  </div>
</preview>

**Selected :**

<pre><code>{{ selected }}</code></pre>

```vue
<template>
  <Radio apperance="checkbox" v-model="selected" value="apple">Apple</Radio>
  <Radio apperance="checkbox" v-model="selected" value="grape">Grape</Radio>
  <Radio apperance="checkbox" v-model="selected" value="orange">Orange</Radio>
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
