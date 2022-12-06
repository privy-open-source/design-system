<script setup>
  import pFormGroup from './FormGroup.vue'
  import pInput from '../input/Input.vue'
</script>

# Form Group

## Usage

### Simple Usage

<preview>
  <p-form-group label="First Name">
    <p-input />
  </p-form-group>
</preview>

```vue
<template>
  <p-form-group label="First Name">
    <p-input />
  </p-form-group>
</template>
```

### Advance Usage

<preview>
  <p-form-group
    label="First Name"
    caption="This is caption"
    description="This is description"
    hint="This is hint"
    required>
    <p-input />
  </p-form-group>
</preview>

```vue
<template>
  <p-form-group
    label="First Name"
    caption="This is caption"
    description="This is description"
    hint="This is hint"
    required>
    <p-input />
  </p-form-group>
</template>
```
