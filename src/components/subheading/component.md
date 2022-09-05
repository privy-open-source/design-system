<script setup>
  import pSubheading from './Subheading.vue'
</script>

<style scoped lang="postcss">
  .preview {
    @apply block;
  }
</style>

# Subheading
Subheadings are used for the title of any sub-sections

## Usage
Used for the title of any sub-sections

### Basic Usage

<preview>
  <p-subheading>
    Any subtitle should here
  </p-subheading>
</preview>

```vue
<template>
  <p-subheading>
    Any subtitle should here
  </p-subheading>
</template>
```

## Sizing

<preview>
  <p-subheading size="sm">
    Any subtitle should here
  </p-subheading>
  <p-subheading size="md">
    Any subtitle should here
  </p-subheading>
</preview>

```vue
<template>
  <p-subheading size="sm">
    Any subtitle should here
  </p-subheading>
  <p-subheading size="md">
    Any subtitle should here
  </p-subheading>
</template>
```

## Overline

<preview>
  <p-subheading overline="normal">
    Any section title should here
  </p-subheading>
  <p-subheading overline="medium">
    Any section title should here
  </p-subheading>
</preview>

```vue
<template>
  <p-subheading overline="normal">
    Any section title should here
  </p-subheading>
  <p-subheading overline="medium">
    Any section title should here
  </p-subheading>
</template>
```

## API

### Props

| Props      |   Type   | Default | Description                                                                                                                       |
|------------|:--------:|:-------:|-----------------------------------------------------------------------------------------------------------------------------------|
| `size`     | `String` |  `md`   | Size of subheading, valid value is `sm` and `md`                                                                                  |
| `overline` | `String` |    -    | Overline variant. Valid value is `normal` and `medium`. If overline is active, subheading's `size` will be disabled automatically |

### Slots

| Name      | Description                    |
|-----------|--------------------------------|
| `default` | Content to place in subheading |

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

- Subheading Guide
- [Heading](/heading/guide)

