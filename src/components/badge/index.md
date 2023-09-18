---
title: Badge · Components
description: Label of the thing they're quantifying, such as the number of notification/document received.
---

<script setup>
  import pBadge from './Badge.vue'
  import pBanner from '../banner/Banner.vue'
</script>

# Badge

> Label of the thing they're quantifying, such as the number of notification/document received.

## Usage

### Basic Usage

Default color of badge are black.
<p-badge class="bg-gold-40">25</p-badge>
<preview>
  <p-badge>25</p-badge>
</preview>

```vue
<template>
  <p-badge>25</p-badge>
</template>
```

## Colors

Badge available in 4 different colors. There are `primary`, `info`, `success`, `warning` and `danger`.

<preview>
  <div class="flex flex-wrap space-gap-3">
    <p-badge color="primary">25</p-badge>
    <p-badge color="info">1</p-badge>
    <p-badge color="success">999+</p-badge>
    <p-badge color="warning">7K</p-badge>
    <p-badge color="danger">6</p-badge>
  </div>
</preview>

```vue
<template>
  <p-badge color="primary">25</p-badge>
  <p-badge color="info">1</p-badge>
  <p-badge color="success">999+</p-badge>
  <p-badge color="warning">7K</p-badge>
  <p-badge color="danger">6</p-badge>
</template>
```

<p-banner :dismissable="false">
It's <strong>possible</strong> to make <strong>customizable</strong> and or optional <strong>color</strong> refers to what state the user 
is in or objects being tagged by using default color Badge with <code>variables</code> or <code>class</code>.
</p-banner>

### Custom Color

<preview>
  <div class="flex flex-wrap space-gap-3">
    <p-badge class="bg-gold-40">25</p-badge>
    <p-badge class="text-yellow-30">79</p-badge>
    <p-badge class="bg-purple-0 text-purple-40 dark:bg-purple-50 dark:text-purple-20">999+</p-badge>
  </div>
</preview>

```vue
<template>
  <p-badge class="bg-gold-40">25</p-badge>
  <p-badge class="text-yellow-30">79</p-badge>
  <p-badge 
    class="bg-purple-0 text-purple-40 dark:bg-purple-50 dark:text-purple-20">
    999+
  </p-badge>
</template>
```


## Variants

Badge has 3 variants namely `default`, `light` and `inverse`. When variant is not set, badge will looks as a `default`

<preview>
  <div class="flex flex-wrap space-gap-3">
    <p-badge>25</p-badge>
    <p-badge variant="light">7K</p-badge>
    <p-badge variant="inverse">999+</p-badge>
  </div>
</preview>

```vue
<template>
  <p-badge>25</p-badge>
  <p-badge variant="light">7K</p-badge>
  <p-badge variant="inverse">999+</p-badge>
</template>
```
### Sample Light Variant

<preview class="gap-4">
  <p-badge variant="light" color="primary">25</p-badge>
  <p-badge variant="light" color="info">1</p-badge>
  <p-badge variant="light" color="success">7K</p-badge>
  <p-badge variant="light" color="warning">999+</p-badge>
  <p-badge variant="light" color="danger">6</p-badge>
</preview>

```vue
<template>
  <p-badge variant="light" color="primary">25</p-badge>
  <p-badge variant="light" color="info">1</p-badge>
  <p-badge variant="light" color="success">7K</p-badge>
  <p-badge variant="light" color="warning">999+</p-badge>
  <p-badge variant="light" color="danger">6</p-badge>
</template>
```
### Sample Inverse Variant

<preview class="gap-4">
  <p-badge variant="inverse" color="primary">25</p-badge>
  <p-badge variant="inverse" color="info">1</p-badge>
  <p-badge variant="inverse" color="success">7K</p-badge>
  <p-badge variant="inverse" color="warning">999+</p-badge>
  <p-badge variant="inverse" color="danger">6</p-badge>
</preview>

```vue
<template>
  <p-badge variant="inverse" color="primary">25</p-badge>
  <p-badge variant="inverse" color="info">1</p-badge>
  <p-badge variant="inverse" color="success">7K</p-badge>
  <p-badge variant="inverse" color="warning">999+</p-badge>
  <p-badge variant="inverse" color="danger">6</p-badge>
</template>
```

## Variables
Badge use local CSS variables for enhanced real-time customization.
Use this variable for [level color](/styleguide/badge/#level-color-customizable-and-optional) customization.

### `.badge.badge--default`
```sass
--p-bg-variant-default: theme(backgroundColor.inverse);
--p-bg-dark-variant-default: theme(backgroundColor.dark.inverse);
```

### `.badge.badge--variant-inverse.badge--default`
```sass
--p-color-variant-inverse: theme(textColor.subtle);
--p-color-dark-variant-inverse: theme(textColor.dark.subtle);
```

### `.badge.badge--variant-light.badge--default`
```sass
--p-bg-variant-light: theme(backgroundColor.subtle.alpha);
--p-bg-dark-variant-light: theme(backgroundColor.dark.subtle.alpha);
```

## API

### Props

| Props     |   Type   |  Default  | Description                                                                                                                                          |
|-----------|:--------:|:---------:|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `color`   | `String` | `-` | Badge color variant, valid value is `primary`, `info`, `success`, `warning` and `danger`                                           |
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
