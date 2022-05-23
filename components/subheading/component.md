<script setup>
  import Subheading from './Subheading.vue'
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
  <Subheading>
    Any subtitle should here
  </Subheading>
</preview>

```vue
<template>
  <Subheading>
    Any subtitle should here
  </Subheading>
</template>
```

## Sizing

<preview>
  <Subheading size="sm">
    Any subtitle should here
  </Subheading>
  <Subheading size="md">
    Any subtitle should here
  </Subheading>
</preview>

```vue
<template>
  <Subheading size="sm">
    Any subtitle should here
  </Subheading>
  <Subheading size="md">
    Any subtitle should here
  </Subheading>
</template>
```

## Overline

<preview>
  <Subheading overline="normal">
    Any section title should here
  </Subheading>
  <Subheading overline="medium">
    Any section title should here
  </Subheading>
</preview>

```vue
<template>
  <Subheading overline="normal">
    Any section title should here
  </Subheading>
  <Subheading overline="medium">
    Any section title should here
  </Subheading>
</template>
```

## API

### Props

| Props         |   Type    | Default    | Description                                           |
|---------------|:---------:|:----------:|-------------------------------------------------------|
| `size`        | `String`  | `md`       | Size of subheading, valid value is `sm` and `md`      |
| `overline`    | `String`  | -          | Overline variant. Valid value is `normal` and `medium`. If overline is active, subheading's `size` will be disabled automatically               |

### Slots

| Name      | Description                    |
|-----------|--------------------------------|
| `default` | Content to place in subheading |

### Events

<table>
  <thead>
    <tr>
      <th>Props</th>
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

