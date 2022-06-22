<script setup>
  import Badge from './Badge.vue'
</script>

<style scoped lang="postcss">
  .preview {
    .badge {
      @apply mr-4;

      &:last-child {
        @apply mr-0;
      }
    }
  }
</style>

# Badge
Badges are placed before/after the label of the thing they're quantifying, such as the number of notification/document received.

## Usage

### Basic Usage

<preview>
  <Badge>25</Badge>
</preview>

```vue
<template>
  <Badge>25</Badge>
</template>
```

## Colors
Badge available in 7 different colors. There are `primary`, `secondary`, `success`, `info`, `warning`, `danger` and `gold`. Default color is `primary`

<preview>
  <Badge color="primary">25</Badge>
  <Badge color="secondary">7K</Badge>
  <Badge color="success">999+</Badge>
  <Badge color="info">25</Badge>
  <Badge color="warning">7K</Badge>
  <Badge color="danger">999+</Badge>
  <Badge color="gold">25</Badge>
</preview>

```vue
<template>
  <Badge color="primary">25</Badge>
  <Badge color="secondary">7K</Badge>
  <Badge color="success">999+</Badge>
  <Badge color="info">25</Badge>
  <Badge color="warning">7K</Badge>
  <Badge color="danger">999+</Badge>
  <Badge color="gold">25</Badge>
</template>
```

## Variants
Badge has 3 variants namely `default`, `light` and `inverse`. When variant is not set, badge will looks as a `default`

<preview>
  <Badge>25</Badge>
  <Badge variant="light">7K</Badge>
  <Badge variant="inverse">999+</Badge>
</preview>

```vue
<template>
  <Badge>25</Badge>
  <Badge variant="light">7K</Badge>
  <Badge variant="inverse">999+</Badge>
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
