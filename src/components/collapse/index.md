<script setup>
  import { ref } from 'vue-demi'
  import pCollapse from './Collapse.vue'
  import pButton from './../button/Button.vue'
  import pCard from './../card/Card.vue'

  const sample = ref(false)
</script>

# Collapse

## Usage

<preview class="flex-col">
  <p-button class="mb-5" @click="sample = !sample">Collapse</p-button>
  <p-collapse v-model="sample">
    <p-card>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born</p-card>
  </p-collapse>
</preview>

```vue
<template>
  <p-button class="mb-5" @click="sample = !sample">Collapse</p-button>
  <p-collapse v-model="sample">
    <p-card>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born</p-card>
  </p-collapse>
</template>
```

## API

### Props

<table>
  <thead>
    <tr>
      <th>Props</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="4" class="text-center">There no props here</td>
    </tr>
  </tbody>
</table>

### Slots
| Name       | Description                                                  |
|------------|--------------------------------------------------------------|
| `default ` | Content to place in Collapse                           |

### Events

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Arguments</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="3" class="text-center">There no event here</td>
    </tr>
  </tbody>
</table>
