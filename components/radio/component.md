<script setup>
  import Radio from "./Radio.vue"
  import { ref } from "vue-demi"

  const value      = ref('')
  const groupValue = ref([])
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
