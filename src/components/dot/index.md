<script setup>
  import pDot from './Dot.vue'
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
Dot is a sub-component used for [Badge][badge] and Label

## Usage

### Basic Usage

<preview>
  <p-dot />
</preview>

```vue
<template>
  <p-dot />
</template>
```

## Colors
Dot available in 7 different colors `primary`, `secondary`, `success`, `info`, `warning`, `danger`, `gold`. default is `primary`

<preview>
  <p-dot color="primary" />
  <p-dot color="secondary" />
  <p-dot color="success" />
  <p-dot color="info" />
  <p-dot color="warning" />
  <p-dot color="danger" />
  <p-dot color="gold" />
</preview>

```vue
<template>
  <p-dot color="primary" />
  <p-dot color="secondary" />
  <p-dot color="success" />
  <p-dot color="info" />
  <p-dot color="warning" />
  <p-dot color="danger" />
  <p-dot color="gold" />
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

## See Also

- [Badge][badge]

[badge]: /components/badge/index
