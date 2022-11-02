<script setup>
  import pBadge from './Badge.vue'
</script>

# Badge
Badges are placed before/after the label of the thing they're quantifying, such as the number of notification/document received.

## Usage

### Basic Usage

<preview>
  <p-badge>25</p-badge>
</preview>

```vue
<template>
  <p-badge>25</p-badge>
</template>
```

## Colors
Badge available in 7 different colors. There are `primary`, `secondary`, `success`, `info`, `warning`, `danger` and `gold`. Default color is `primary`

<preview class="flex-wrap space-gap-3">
  <p-badge color="primary">25</p-badge>
  <p-badge color="secondary">7K</p-badge>
  <p-badge color="success">999+</p-badge>
  <p-badge color="info">25</p-badge>
  <p-badge color="warning">7K</p-badge>
  <p-badge color="danger">999+</p-badge>
  <p-badge color="gold">25</p-badge>
</preview>

```vue
<template>
  <p-badge color="primary">25</p-badge>
  <p-badge color="secondary">7K</p-badge>
  <p-badge color="success">999+</p-badge>
  <p-badge color="info">25</p-badge>
  <p-badge color="warning">7K</p-badge>
  <p-badge color="danger">999+</p-badge>
  <p-badge color="gold">25</p-badge>
</template>
```

## Variants
Badge has 3 variants namely `default`, `light` and `inverse`. When variant is not set, badge will looks as a `default`

<preview class="flex-wrap space-gap-3">
  <p-badge>25</p-badge>
  <p-badge variant="light">7K</p-badge>
  <p-badge variant="inverse">999+</p-badge>
</preview>

```vue
<template>
  <p-badge>25</p-badge>
  <p-badge variant="light">7K</p-badge>
  <p-badge variant="inverse">999+</p-badge>
</template>
```

## API

### Props

| Props     |   Type   |  Default  | Description                                                                                                                                          |
|-----------|:--------:|:---------:|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `color`   | `String` | `primary` | Badge color variant, valid value is `primary`, `secondary`, `success`, `info`, `warning`, `danger`, `gold`                                           |
| `variant` | `String` | `default` | Badge variant, valid value is `default`, `light` and `inverse`. If need badge in `default` variant, just leave badge without setting up the variant. |

### Slots

| Name      | Description               |
|-----------|---------------------------|
| `default` | Content to place in badge |

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
      <td colspan="3" class="text-center">There is no event here</td>
    </tr>
  </tbody>
</table>
