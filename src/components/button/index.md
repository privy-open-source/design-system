---
title: Button · Components
description: Base button component
---

<script setup>
  import pButton from './Button.vue'
  import IconBee from '@carbon/icons-vue/lib/bee/20'
</script>

# Button

> Base button component

## Usage

### Simple Button

<preview>
  <p-button>Click me</p-button>
</preview>

```vue
<template>
  <p-button>Click me</p-button>
</template>
```

### Button with icon

<preview>
  <p-button color="info" icon><IconBee /></p-button>
</preview>

```vue
<template>
  <p-button color="info" icon><IconBee /></p-button>
</template>

<script setup>
  import IconBee from '@carbon/icons-vue/lib/bee/20'
</script>
```

### Button with icon + text

<preview>
  <div class="flex flex-col items-center space-gap-3 md:flex-row">
    <p-button color="info"><IconBee /> Click Me</p-button>
    <p-button color="info">Click Me <IconBee /></p-button>
  </div>
</preview>

```vue
<template>
  <p-button color="info"><IconBee /> Click Me</p-button>
  <p-button color="info">Click Me <IconBee /></p-button>
</template>

<script setup>
  import IconBee from '@carbon/icons-vue/lib/bee/20'
</script>
```

## Variants

Button has 4 variants, `solid`, `outline`, `ghost`, `link`. Default is `solid`

### Without Color

<preview>
  <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
    <p-button variant="solid">Click me</p-button>
    <p-button variant="outline">Click me</p-button>
    <p-button variant="ghost">Click me</p-button>
    <p-button variant="link">Click me</p-button>
  </div>
</preview>

```vue
<template>
  <p-button variant="solid">Click me</p-button>
  <p-button variant="outline">Click me</p-button>
  <p-button variant="ghost">Click me</p-button>
  <p-button variant="link">Click me</p-button>
</template>
```

### With Color
<preview>
  <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
    <p-button color="info" variant="solid">Click me</p-button>
    <p-button color="info" variant="outline">Click me</p-button>
    <p-button variant="ghost">Click me</p-button>
    <p-button color="info" variant="link">Click me</p-button>
  </div>
</preview>

```vue
<template>
  <p-button color="info" variant="solid">Click me</p-button>
  <p-button color="info" variant="outline">Click me</p-button>
  <p-button variant="ghost">Click me</p-button>
  <p-button color="info" variant="link">Click me</p-button>
</template>
```

## Colors

Button available in 5 different colors `primary`, `info`, `success`, `warning` and `danger`.

<preview>
  <div class="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
    <p-button color="primary">Click me</p-button>
    <p-button color="info">Click me</p-button>
    <p-button color="success">Click me</p-button>
    <p-button color="warning">Click me</p-button>
    <p-button color="danger">Click me</p-button>
  </div>
</preview>

```vue
<template>
  <p-button color="primary">Click me</p-button>
  <p-button color="info">Click me</p-button>
  <p-button color="success">Click me</p-button>
  <p-button color="warning">Click me</p-button>
  <p-button color="danger">Click me</p-button>
</template>
```

It's also work with other variants (except `ghost`).

<preview label="outline variant">
  <div class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
    <p-button variant="outline" color="primary">Click me</p-button>
    <p-button variant="outline" color="info">Click me</p-button>
    <p-button variant="outline" color="success">Click me</p-button>
    <p-button variant="outline" color="warning">Click me</p-button>
    <p-button variant="outline" color="danger">Click me</p-button>
  </div>
</preview>

<preview label="link variant">
  <div class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
    <p-button variant="link" color="primary">Click me</p-button>
    <p-button variant="link" color="info">Click me</p-button>
    <p-button variant="link" color="success">Click me</p-button>
    <p-button variant="link" color="warning">Click me</p-button>
    <p-button variant="link" color="danger">Click me</p-button>
  </div>
</preview>

```vue
<template>
  <p-button variant="outline" color="primary">Click me</p-button>
  <p-button variant="outline" color="info">Click me</p-button>
  <p-button variant="outline" color="success">Click me</p-button>
  <p-button variant="outline" color="warning">Click me</p-button>
  <p-button variant="outline" color="danger">Click me</p-button>

  <p-button variant="link" color="primary">Click me</p-button>
  <p-button variant="link" color="info">Click me</p-button>
  <p-button variant="link" color="success">Click me</p-button>
  <p-button variant="link" color="warning">Click me</p-button>
  <p-button variant="link" color="danger">Click me</p-button>
</template>
```

## Sizing

There are 4 size variants that can be use: `xs`, `sm`, `md`, `lg`. default is `md`

<preview class="flex-col items-center gap-3 md:flex-row">
  <p-button color="info" size="xs">Click me</p-button>
  <p-button color="info" size="sm">Click me</p-button>
  <p-button color="info" size="md">Click me</p-button>
  <p-button color="info" size="lg">Click me</p-button>
</preview>

```vue
<template>
  <p-button color="info" size="xs">Click me</p-button>
  <p-button color="info" size="sm">Click me</p-button>
  <p-button color="info" size="md">Click me</p-button>
  <p-button color="info" size="lg">Click me</p-button>
</template>
```

## Pill mode

You can add prop `pill` to make button more rounded

<preview class="flex-col items-center gap-3 md:flex-row">
  <p-button color="info" size="xs" pill>Click me</p-button>
  <p-button color="info" size="sm" pill>Click me</p-button>
  <p-button color="info" size="md" pill>Click me</p-button>
  <p-button color="info" size="lg" pill>Click me</p-button>
</preview>

```vue
<template>
  <p-button color="info" size="xs" pill>Click me</p-button>
  <p-button color="info" size="sm" pill>Click me</p-button>
  <p-button color="info" size="md" pill>Click me</p-button>
  <p-button color="info" size="lg" pill>Click me</p-button>
</template>
```

## Icon mode

You can add prop `icon` to make button more square, it's suitable for button with icon only

<preview class="items-center gap-3">
  <p-button color="info" size="xs" icon><IconBee /></p-button>
  <p-button color="info" size="sm" icon><IconBee /></p-button>
  <p-button color="info" size="md" icon><IconBee /></p-button>
  <p-button color="info" size="lg" icon><IconBee /></p-button>
</preview>

```vue
<template>
  <p-button color="info" size="xs" icon><IconBee /></p-button>
  <p-button color="info" size="sm" icon><IconBee /></p-button>
  <p-button color="info" size="md" icon><IconBee /></p-button>
  <p-button color="info" size="lg" icon><IconBee /></p-button>
</template>
```

You can also combine with `pill` mode to make round button

<preview class="items-center gap-3">
  <p-button color="info" size="xs" icon pill><IconBee /></p-button>
  <p-button color="info" size="sm" icon pill><IconBee /></p-button>
  <p-button color="info" size="md" icon pill><IconBee /></p-button>
  <p-button color="info" size="lg" icon pill><IconBee /></p-button>
</preview>

```vue
<template>
  <p-button color="info" size="xs" icon pill><IconBee /></p-button>
  <p-button color="info" size="sm" icon pill><IconBee /></p-button>
  <p-button color="info" size="md" icon pill><IconBee /></p-button>
  <p-button color="info" size="lg" icon pill><IconBee /></p-button>
</template>
```

## Disable state

<preview label="link variant">
  <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
    <p-button color="info" variant="solid" disabled>Click me</p-button>
    <p-button color="info" variant="outline" disabled>Click me</p-button>
    <p-button variant="ghost" disabled>Click me</p-button>
    <p-button color="info" variant="link" disabled>Click me</p-button>
  </div>
</preview>

```vue
<template>
  <p-button color="info" variant="solid" disabled>Click me</p-button>
  <p-button color="info" variant="outline" disabled>Click me</p-button>
  <p-button variant="ghost" disabled>Click me</p-button>
  <p-button color="info" variant="link" disabled>Click me</p-button>
</template>
```

## API

### Props

| Props      |   Type    |  Default  | Description                                                                                                 |
|------------|:---------:|:---------:|-------------------------------------------------------------------------------------------------------------|
| `variant`  | `String`  |  `solid`  | Button style variant, valid value is `solid`, `outline`, `ghost` and `link`                                    |
| `color`    | `String`  | `-`       | Button color variant, valid value is `primary`, `info`, `success`, `warning` and `danger` |
| `size`     | `String`  |   `md`    | Size of button, valid value is `xs`, `sm`, `md`, `lg`                                                             |
| `pill`     | `Boolean` |  `false`  | Enable pill mode                                                                                            |
| `icon`     | `Boolean` |  `false`  | Enable icon mode                                                                                            |
| `disabled` | `Boolean` |  `false`  | Disable state                                                                                               |
| `href` | `String` |  `-`  | Place url in the button to make button-like permalink |

### Slots

| Name      | Description                |
|-----------|----------------------------|
| `default` | Content to place in button |

### Events

| Name    | Arguments               | Description                  |
|---------|-------------------------|------------------------------|
| `click` | Native DOM Event object | Event when button is clicked |
