<script setup>
  import pStrengthBar from './StrengthBar.vue'
  import pInputPassword from '../input-password/InputPassword.vue'
  import { usePasswordStrength } from '../input-password'
  import { ref } from 'vue-demi'

  const input = ref('')
  const score = usePasswordStrength(input)
</script>

# Strength Bar

## Usage

### Simple Usage

<preview class="flex-col space-y-4">
  <p-strength-bar value="0" />
  <p-strength-bar value="1" />
  <p-strength-bar value="2" />
  <p-strength-bar value="3" />
  <p-strength-bar value="4" />
  <p-strength-bar value="5" />
  <p-strength-bar value="6" />
</preview>

```vue
<template>
  <p-strength-bar value="0" />
  <p-strength-bar value="1" />
  <p-strength-bar value="2" />
  <p-strength-bar value="3" />
  <p-strength-bar value="4" />
  <p-strength-bar value="5" />
  <p-strength-bar value="6" />
</template>
```

### For Measuring Password

<preview class="flex-col space-y-4">
  <p-input-password v-model="input" placeholder="Input your password" />
  <p-strength-bar :value="score" />
</preview>

```vue
<template>
  <p-input-password v-model="input" placeholder="Input your password" />
  <p-strength-bar :value="score" />
</template>

<script setup>
  import { ref } from 'vue-demi'
  import { usePasswordStrength } from '@privyid/persona/core'

  const input = ref('')
  const score = usePasswordStrength(input)
</script>
```

