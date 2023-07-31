---
title: Spinner · Components
description: Loading spinner.
---

<script setup>
  import pSpinner from "./Spinner.vue"
  import pSpinnerRing from "./SpinnerRing.vue"
  import pSpinnerRinggo from "./SpinnerRinggo.vue"
</script>

# Spinner

> Loading spinner.

## Usage

### Spinner

<preview>
  <p-spinner />
</preview>

```vue
<template>
  <p-spinner />
</template>
```

### Spinner Ring

<preview>
  <p-spinner-ring />
</preview>

```vue
<template>
  <p-spinner-ring />
</template>
```

### Spinner Ring-O

<preview>
  <p-spinner-ringgo />
</preview>

```vue
<template>
  <p-spinner-ringgo />
</template>
```

## Customize Color

All spinners are color neutral, it will follow the current text's color. Changing spinner's color is easy as changing text color

<preview>
  <div class="flex items-center justify-center p-4 space-x-4 bg-info-emphasis text-on-emphasis dark:bg-dark-info-emphasis">
    <p-spinner />
    <p-spinner-ring />
    <p-spinner-ringgo />
  </div>
</preview>

```vue
<template>
  <div class="flex items-center justify-center p-4 space-x-4 bg-info-emphasis text-on-emphasis dark:bg-dark-info-emphasis">
    <p-spinner />
    <p-spinner-ring />
    <p-spinner-ringgo />
  </div>
</template>
```

## API

### Props

<table>
  <thead>
    <tr>
      <th>Props</th>
      <th style="text-align:center;">Type</th>
      <th style="text-align:center;">Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="4" class="text-center">There no props here</td>
    </tr>
  </tbody>
</table>

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
      <td colspan="3" class="text-center">There no props here</td>
    </tr>
  </tbody>
</table>

## See Also
- [Overlay](/components/overlay/index)
