<script setup>
  import pStrengthbar from './Strengthbar.vue'
  import pInputPassword from '../input-password/InputPassword.vue'
  import pInputRange from '../input-range/InputRange.vue'
  import { usePasswordStrength } from '../input-password'
  import { ref } from 'vue-demi'

  const input = ref('')
  const score = usePasswordStrength(input)

  const range = ref(50)

  const length = ref(6)
  const range2 = ref(6)
</script>

# Strengthbar

## Usage

### Simple Usage

<preview class="flex-col space-y-4">
  <p-strengthbar value="0" />
  <p-strengthbar value="1" />
  <p-strengthbar value="2" />
  <p-strengthbar value="3" />
  <p-strengthbar value="4" />
  <p-strengthbar value="5" />
  <p-strengthbar value="6" />
</preview>

```vue
<template>
  <p-strengthbar value="0" />
  <p-strengthbar value="1" />
  <p-strengthbar value="2" />
  <p-strengthbar value="3" />
  <p-strengthbar value="4" />
  <p-strengthbar value="5" />
  <p-strengthbar value="6" />
</template>
```

### For Measuring Password

<preview class="flex-col space-y-4">
  <p-input-password v-model="input" placeholder="Input your password" />
  <p-strengthbar :value="score" />
</preview>

```vue
<template>
  <p-input-password v-model="input" placeholder="Input your password" />
  <p-strengthbar :value="score" />
</template>

<script setup>
  import { ref } from 'vue-demi'
  import { usePasswordStrength } from '@privyid/persona/core'

  const input = ref('')
  const score = usePasswordStrength(input)
</script>
```

## Min and Max

You can set lowest value and highest value for the value with prop `min` and `max`. It usefull when you combine it with [Input Range](/components/input-range/).
Default is `0` and `6`

<preview class="flex-col space-y-4">
  <p-input-range v-model="range" min="0" max="100" />
  <p-strengthbar :value="range" min="0" max="100"  />
</preview>

```vue
<template>
  <p-input-range v-model="range" min="0" max="100" />
  <p-strengthbar :value="range" min="0" max="100"  />
</template>
```

## Number of Bar

You can set number of bar with prop `length`.

<preview class="flex-col space-y-4">
  <p-input-range v-model="length" min="1" max="12" />
  <p-input-range v-model="range2" min="0" max="6" />
  <p-strengthbar :value="range2" :length="length" />
</preview>

```vue
<template>
  <p-input-range v-model="length" min="1" max="12" />
  <p-input-range v-model="value" min="0" max="6" />
  <p-strengthbar :value="value" :length="length" />
</template>
```
## API

### Props

| Props      |   Type    | Default | Description            |
|------------|:---------:|:-------:|------------------------|
| `min`      | `Number`  |   `0`   | Lowest value in range  |
| `max`      | `Number`  |   `6`   | Highest value in range |
| `value`    | `Number`  |   `-`   | Active bar value       |
| `length`   | `Number`  |   `6`   | Number of bar          |

### Slots

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="2" class="text-center">There no slots here</td>
    </tr>
  </tbody>
</table>

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
      <td colspan="3" class="text-center">There no props here</td>
    </tr>
  </tbody>
</table>

## See Also

- [Input Password](/components/input-password/)
- [Input Range](/components/input-range/)
