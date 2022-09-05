<script setup>
  import Input from "./Input.vue"
  import InputGroup from "./InputGroup.vue"
  import Button from "../button/Button.vue"
  import Select from "../select/Select.vue"
  import { ref } from "vue-demi"

  const value = ref('')
</script>

# Input

## Usage

### Simple Usage
<preview>
  <Input v-model="value" placeholder="Input Here" />
</preview>

```vue
<template>
  <Input v-model="value" placeholder="Input Here" />
</template>
```

### Input Group
<preview>
  <InputGroup>
    <Select v-model="value" :options="['A', 'B', 'C']" placeholder="Select" />
    <Input v-model="value" placeholder="Input Here" />
    <Input v-model="value" placeholder="Input Here" />
    <Button variant="input">Search</Button>
  </InputGroup>
</preview>

```vue
<template>
  <InputGroup>
    <Select v-model="value" :options="['A', 'B', 'C']" />
    <Input v-model="value" placeholder="Input Here" />
    <Input v-model="value" placeholder="Input Here" />
    <Button variant="input">Search</Button>
  </InputGroup>
</template>
```
