<script setup>
  import Dot from './Dot.vue'
</script>

<style scoped lang="postcss">
  .preview {
    .dot {
      @apply mr-4;

      &:last-child {
        @apply mr-0;
      }
    }
  }
</style>

# Dot
Dot is a sub-component used for [Badge](/badge/component) and Label

## Usage

### Basic Usage

<preview>
  <Dot />
</preview>

```vue
<template>
  <Dot />
</template>
```

## Colors
Dot available in 7 different colors `primary`, `secondary`, `success`, `info`, `warning`, `danger`, `gold`. default is `primary`

<preview>
  <Dot color="primary" />
  <Dot color="secondary" />
  <Dot color="success" />
  <Dot color="info" />
  <Dot color="warning" />
  <Dot color="danger" />
  <Dot color="gold" />
</preview>

```vue
<template>
  <Dot color="primary" />
  <Dot color="secondary" />
  <Dot color="success" />
  <Dot color="info" />
  <Dot color="warning" />
  <Dot color="danger" />
  <Dot color="gold" />
</template>
```


## API

### Props

| Props   |   Type   |  Default  | Description                                                                                              |
|---------|:--------:|:---------:|----------------------------------------------------------------------------------------------------------|
| `color` | `String` | `primary` | Dot color variant, valid value is `primary`, `secondary`, `success`, `info`, `warning`, `danger`, `gold` |

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
      <td colspan="3" class="text-center">There no event here</td>
    </tr>
  </tbody>
</table>
