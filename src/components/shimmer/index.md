---
title: Shimmer · Components
description: Skeleton loader.
---

<script setup>
  import pShimmer from './Shimmer.vue'
</script>

# Shimmer

> Skeleton loader.

## Usage

### Simple Usage

<preview class="space-x-2">
  <p-shimmer />
</preview>

```vue
<template>
  <p-shimmer />
</template>
```

### Avatar

<preview class="space-x-2">
  <p-shimmer width="50" height="50">
    <circle cx="50%" cy="50%" r="50%" />
  </p-shimmer>
</preview>

```vue
<template>
  <p-shimmer width="50" height="50">
    <circle cx="50%" cy="50%" r="50%" />
  </p-shimmer>
</template>
```

### Badge

<preview class="space-x-2">
  <p-shimmer width="32" height="20">
    <rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" />
  </p-shimmer>
</preview>

```vue
<template>
  <p-shimmer width="32" height="20">
    <rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" />
  </p-shimmer>
</template>
```

### Button

<preview class="space-x-2">
  <p-shimmer width="110" height="46">
    <rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" />
  </p-shimmer>
</preview>

```vue
<template>
  <p-shimmer width="32" height="20">
    <rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" />
  </p-shimmer>
</template>
```

### Button (Icon)

<preview>
  <p-shimmer width="46" height="46">
    <rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" />
  </p-shimmer>
</preview>

```vue
<template>
  <p-shimmer width="46" height="46">
    <rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" />
  </p-shimmer>
</template>
```

### Label

<preview class="space-x-2">
  <p-shimmer width="56" height="26">
    <rect x="0" y="0" rx="8" ry="8" width="100%" height="100%" />
  </p-shimmer>
</preview>

```vue
<template>
  <p-shimmer width="56" height="26">
    <rect x="0" y="0" rx="8" ry="8" width="100%" height="100%" />
  </p-shimmer>
</template>
```

## Responsive

Add props `responsive` to make shimmer scale with the parent element.

<preview class="space-x-2">
  <div class="flex space-x-3" >
    <p-shimmer class="rounded" width="160" height="30" responsive>
      <rect x="0" y="0" width="100%" height="100%" />
    </p-shimmer>
    <p-shimmer class="rounded" width="400" height="300" responsive>
      <rect x="0" y="0" width="100%" height="100%" />
    </p-shimmer>
    <p-shimmer class="rounded" width="400" height="300" responsive>
      <rect x="0" y="0" width="100%" height="100%" />
    </p-shimmer>
  </div>
</preview>

```vue
<template>
  <div class="flex space-x-3" >
    <p-shimmer class="rounded" width="160" height="30" responsive>
      <rect x="0" y="0" width="100%" height="100%" />
    </p-shimmer>
    <p-shimmer class="rounded" width="400" height="300" responsive>
      <rect x="0" y="0" width="100%" height="100%" />
    </p-shimmer>
    <p-shimmer class="rounded" width="400" height="300" responsive>
      <rect x="0" y="0" width="100%" height="100%" />
    </p-shimmer>
  </div>
</template>
```

## Variables

You can color of shimmer using CSS Variable

```sass
--p-shimmer-fg: theme('backgroundColor.subtle.DEFAULT');
--p-shimmer-bg: theme('backgroundColor.base.DEFAULT');
--p-shimmer-dark-bg: theme('backgroundColor.dark.subtle.DEFAULT');
--p-shimmer-dark-fg: theme('backgroundColor.dark.base');
```

## API

| Props        |   Type    | Default | Description                  |
|--------------|:---------:|:-------:|------------------------------|
| `width`      | `String`  |  `100`  | Shimmer's width              |
| `height`     | `String`  |  `16`   | Shimmer's height             |
| `responsive` | `Boolean` | `false` | Enable responsive image mode |

### Slots

| Name      | Description     |
|-----------|-----------------|
| `default` | Shimmer content |

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
