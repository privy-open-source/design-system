<script setup>
  import pInput from '../input/Input.vue'
  import pInputGroup from './InputGroup.vue'
  import pInputGroupAddon from './InputGroupAddon.vue'
  import pButton from '../button/Button.vue'
  import pDivider from '../divider/Divider.vue'
  import pSelect from '../select/Select.vue'
  import IconEmail from '@carbon/icons-vue/lib/at/16'
</script>

# Input Group

## Usage

### Simple Usage

<preview>
  <p-input-group>
    <p-input />
    <p-button variant="input">
      Submit
    </p-button>
  </p-input-group>
</preview>

```vue
<template>
  <p-input-group>
    <p-input />
    <p-button variant="input">
      Submit
    </p-button>
  </p-input-group>
</template>
```

### With Addon and Divider

<preview>
  <p-input-group>
    <p-input-group-addon>
      <IconEmail />
    </p-input-group-addon>
    <p-divider />
    <p-input />
    <p-button variant="input">
      Submit
    </p-button>
  </p-input-group>
</preview>

```vue
<template>
  <p-input-group>
    <p-input-group-addon>
      <IconEmail />
    </p-input-group-addon>
    <p-divider />
    <p-input />
    <p-button variant="input">
      Submit
    </p-button>
  </p-input-group>
</template>
```

## Sizing

<preview class="flex-col space-gap-3">
  <p-input-group size="xs">
    <p-input-group-addon>
      <IconEmail />
    </p-input-group-addon>
    <p-divider />
    <p-input />
    <p-button variant="input">
      Search
    </p-button>
  </p-input-group>
  <p-input-group size="sm">
    <p-input-group-addon>
      <IconEmail />
    </p-input-group-addon>
    <p-divider />
    <p-input />
    <p-button variant="input">
      Search
    </p-button>
  </p-input-group>
  <p-input-group size="md">
    <p-input-group-addon>
      <IconEmail />
    </p-input-group-addon>
    <p-divider />
    <p-input />
    <p-button variant="input">
      Search
    </p-button>
  </p-input-group>
  <p-input-group size="lg">
    <p-input-group-addon>
      <IconEmail />
    </p-input-group-addon>
    <p-divider />
    <p-input />
    <p-button variant="input">
      Search
    </p-button>
  </p-input-group>
</preview>
