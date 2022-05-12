<script setup>
  import Checkbox from "./Checkbox.vue"
  import { ref } from "vue-demi"

  const value    = ref(false)
  const selected = ref([])
</script>

# Checkbox

## Usage

### Simple Usage

<preview>
  <Checkbox v-model="value">Checklist Label</Checkbox>
</preview>

```vue
<template>
  <Checkbox v-model="value">Checklist Label</Checkbox>
</template>
```

### With Subtext

<preview>
  <Checkbox v-model="value">
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

## Checkbox Group
<preview class="gap-3">
  <div class="flex flex-col gap-3">
    <Checkbox v-model="selected" value="apple">Apple</Checkbox>
    <Checkbox v-model="selected" value="grape">Grape</Checkbox>
    <Checkbox v-model="selected" value="pineaple">Pineapple</Checkbox>
    <Checkbox v-model="selected" :value="{ id: 1 }">JSON</Checkbox>
    <Checkbox v-model="selected" :value="['item1']">Array</Checkbox>
  </div>
</preview>

**Selected :**
<pre class="whitespace-normal"><code>{{ selected }}</code></pre>

```vue
<template>
  <div class="flex flex-col gap-3">
    <Checkbox v-model="selected" value="apple">Apple</Checkbox>
    <Checkbox v-model="selected" value="grape">Grape</Checkbox>
    <Checkbox v-model="selected" value="pineaple">Pineapple</Checkbox>
    <Checkbox v-model="selected" :value="{ id: 1 }">JSON</Checkbox>
    <Checkbox v-model="selected" :value="['item1']">Array</Checkbox>
  </div>
</template>
```

## Disabled State

<preview>
  <Checkbox v-model="value" value="3" disabled>
    Checkbox Label
  </Checkbox>
</preview>
