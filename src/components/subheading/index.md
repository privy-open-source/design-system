---
title: Subheading · Components
description: Subheadings are used for the title of any sub-sections
---

<script setup>
  import pSubheading from './Subheading.vue'
</script>

# Subheading

> Subheadings are used for the title of any sub-sections

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

<preview class="flex-col gap-3">
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

## Weight
Subheading have 3 weights variant, there are `normal`, `medium` and `bold`. Default weight is `normal`.

<preview class="flex-col gap-3">
  <p-subheading weight="normal">
    Normal subheading title
  </p-subheading>
  <p-subheading weight="medium">
    Medium subheading title
  </p-subheading>
  <p-subheading weight="bold">
    Bold subheading title
  </p-subheading>
</preview>

```vue
<template>
  <p-heading weight="normal">
    Normal heading title
  </p-heading>
  <p-heading weight="medium">
    Medium heading title
  </p-heading>
  <p-heading weight="bold">
    Bold heading title
  </p-heading>
</template>
```

## Transform
Subheading have 4 transforms variant, there are `normalcase`, `lowercase`, `capitalize` and `uppercase`. Default transform is `normalcase`.
<preview class="flex-col gap-3">
  <p-subheading transform="normalcase">
    Normalcase subheading title
  </p-subheading>
  <p-subheading transform="lowercase">
    Lowercase subheading title
  </p-subheading>
  <p-subheading transform="capitalize">
    Capitalize subheading title
  </p-subheading>
  <p-subheading transform="uppercase">
    Uppercase subheading title
  </p-subheading>
</preview>

```vue
<template>
  <p-subheading transform="normalcase">
    Normalcase subheading title
  </p-subheading>
  <p-subheading transform="lowercase">
    Lowercase subheading title
  </p-subheading>
  <p-subheading transform="capitalize">
    Capitalize subheading title
  </p-subheading>
  <p-subheading transform="uppercase">
    Uppercase subheading title
  </p-subheading>
</template>
```

## Overline

<preview class="flex-col gap-3">
  <p-subheading overline weight="medium">
    Any section title should here
  </p-subheading>
  <p-subheading overline weight="bold">
    Any section title should here
  </p-subheading>
</preview>

```vue
<template>
  <p-subheading overline weight="medium">
    Any section title should here
  </p-subheading>
  <p-subheading overline weight="bold">
    Any section title should here
  </p-subheading>
</template>
```

## API

### Props

| Props           |   Type     | Default      | Description|
|-----------------|:----------:|:------------:|--------------------------------------------------------------------|
| `size`          | `String`   | `md`         | Size of subheading, valid value is `sm` and `md`                   |
| `weight`        | `String`   | `normal`     | Weight of subheading, valid value is `normal`, `medium` and `bold` |
| `transform`     | `String`   | `normalcase` | Transform of subheading, valid value is `normalcase`, `lowercase`, `capitalize` and `uppercase`   |
| `overline`      | `Boolean`  | `false`      | Overline variant. If overline is provided, subheading's `size` will be disabled automatically |

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

- [Heading](/components/heading/index)

