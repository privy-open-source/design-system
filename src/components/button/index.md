---
title: Button · Components
description: Base button component
---

<script setup>
  import pButton from './Button.vue'
  import pBanner from '../banner/Banner.vue'
  import IconPersona from '@privyid/persona-icon/vue/persona/20.vue'
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
  <p-button color="info" icon><IconPersona /></p-button>
</preview>

```vue
<template>
  <p-button color="info" icon><IconPersona /></p-button>
</template>

<script setup>
  import IconPersona from '@privyid/persona-icon/vue/persona/20.vue'
</script>
```

### Button with icon + text

<preview>
  <div class="flex flex-col items-center space-gap-3 md:flex-row">
    <p-button color="info"><IconPersona /> Click Me</p-button>
    <p-button color="info">Click Me <IconPersona /></p-button>
  </div>
</preview>

```vue
<template>
  <p-button color="info"><IconPersona /> Click Me</p-button>
  <p-button color="info">Click Me <IconPersona /></p-button>
</template>

<script setup>
  import IconPersona from '@privyid/persona-icon/vue/persona/20.vue'
</script>
```

## Variants

Button has 4 variants, `solid`, `outline`, `ghost`, `link`. Default is `solid`

### Default color

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
    <p-button variant="outline">Click me</p-button>
    <p-button color="info" variant="ghost">Click me</p-button>
    <p-button variant="link">Click me</p-button>
  </div>
</preview>

```vue
<template>
  <p-button color="info" variant="solid">Click me</p-button>
  <p-button variant="outline">Click me</p-button>
  <p-button color="info" variant="ghost">Click me</p-button>
  <p-button variant="link">Click me</p-button>
</template>
```

## Colors

Button solid and ghost available in 5 different colors `primary`, `info`, `success`, `warning` and `danger`.

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

<!-- It's also available in ghost variants. -->
<preview label="ghost variant">
  <div class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
    <p-button variant="ghost" color="primary">Click me</p-button>
    <p-button variant="ghost" color="info">Click me</p-button>
    <p-button variant="ghost" color="success">Click me</p-button>
    <p-button variant="ghost" color="warning">Click me</p-button>
    <p-button variant="ghost" color="danger">Click me</p-button>
  </div>
</preview>

```vue
<template>
  <p-button variant="ghost" color="primary">Click me</p-button>
  <p-button variant="ghost" color="info">Click me</p-button>
  <p-button variant="ghost" color="success">Click me</p-button>
  <p-button variant="ghost" color="warning">Click me</p-button>
  <p-button variant="ghost" color="danger">Click me</p-button>
</template>
```

Button link and button outline are available in emphasis color to accommodate dark background (inverse).
<preview label="link variant">
  <div class="flex items-center space-x-4">
    <p-button variant="outline">Click me</p-button>
    <div class="px-4 py-3 bg-inverse dark:bg-dark-inverse">
      <p-button variant="outline" color="emphasis">Click me</p-button>
    </div>
    <p-button variant="link">Click me</p-button>
    <div class="px-4 py-3 bg-inverse dark:bg-dark-inverse">
      <p-button variant="link" color="emphasis">Click me</p-button>
    </div>
  </div>
</preview>

```vue
<template>
  <p-button variant="outline">Click me</p-button>
  <p-button variant="outline" color="emphasis">Click me</p-button>
  <p-button variant="link">Click me</p-button>
  <p-button variant="link" color="emphasis">Click me</p-button>
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
  <p-button color="info" size="xs" icon><IconPersona /></p-button>
  <p-button color="info" size="sm" icon><IconPersona /></p-button>
  <p-button color="info" size="md" icon><IconPersona /></p-button>
  <p-button color="info" size="lg" icon><IconPersona /></p-button>
</preview>

```vue
<template>
  <p-button color="info" size="xs" icon><IconPersona /></p-button>
  <p-button color="info" size="sm" icon><IconPersona /></p-button>
  <p-button color="info" size="md" icon><IconPersona /></p-button>
  <p-button color="info" size="lg" icon><IconPersona /></p-button>
</template>
```

You can also combine with `pill` mode to make round button

<preview class="items-center gap-3">
  <p-button color="info" size="xs" icon pill><IconPersona /></p-button>
  <p-button color="info" size="sm" icon pill><IconPersona /></p-button>
  <p-button color="info" size="md" icon pill><IconPersona /></p-button>
  <p-button color="info" size="lg" icon pill><IconPersona /></p-button>
</preview>

```vue
<template>
  <p-button color="info" size="xs" icon pill><IconPersona /></p-button>
  <p-button color="info" size="sm" icon pill><IconPersona /></p-button>
  <p-button color="info" size="md" icon pill><IconPersona /></p-button>
  <p-button color="info" size="lg" icon pill><IconPersona /></p-button>
</template>
```

## Disable state

<preview label="link variant">
  <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
    <p-button color="info" variant="solid" disabled>Click me</p-button>
    <p-button variant="outline" disabled>Click me</p-button>
    <p-button variant="ghost" color="info" disabled>Click me</p-button>
    <p-button variant="link" disabled>Click me</p-button>
  </div>
</preview>

```vue
<template>
  <p-button color="info" variant="solid" disabled>Click me</p-button>
  <p-button variant="outline" disabled>Click me</p-button>
  <p-button variant="ghost" color="info" disabled>Click me</p-button>
  <p-button variant="link" disabled>Click me</p-button>
</template>
```

## Loading state

<preview label="link variant">
  <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
    <p-button color="info" variant="solid" loading>Click me</p-button>
    <p-button variant="outline" loading>Click me</p-button>
    <p-button variant="ghost" color="info" loading>Click me</p-button>
    <p-button variant="link" loading>Click me</p-button>
  </div>
</preview>

```vue
<template>
  <p-button color="info" variant="solid" loading>Click me</p-button>
  <p-button variant="outline" loading>Click me</p-button>
  <p-button variant="ghost" color="info" loading>Click me</p-button>
  <p-button variant="link" loading>Click me</p-button>
</template>
```

## Variables
Button use local CSS variables on `.btn` for enhanced real-time customization.

```sass
--p-button-xs-padding-x: theme(spacing.2);
--p-button-sm-padding-x: theme(spacing.4);
--p-button-md-padding-x: theme(spacing.5);
--p-button-lg-padding-x: theme(spacing.8);

/** only work in button variant link */
--p-button-xs-padding-y: theme(spacing[0.5]);
--p-button-sm-padding-y: theme(spacing.1);
--p-button-md-padding-y: theme(spacing[2.5]);
--p-button-lg-padding-y: theme(spacing.4);
```

## API

### Props

| Props      |              Type              | Default | Description                                                                               |
|------------|:------------------------------:|:-------:|-------------------------------------------------------------------------------------------|
| `variant`  |            `String`            | `solid` | Button style variant, valid value is `solid`, `outline`, `ghost` and `link`               |
| `color`    |            `String`            |   `-`   | Button color variant, valid value is `primary`, `info`, `success`, `warning` and `danger` |
| `size`     |            `String`            |  `md`   | Size of button, valid value is `xs`, `sm`, `md`, `lg`                                     |
| `pill`     |           `Boolean`            | `false` | Enable pill mode                                                                          |
| `icon`     |           `Boolean`            | `false` | Enable icon mode                                                                          |
| `disabled` |           `Boolean`            | `false` | Disable state                                                                             |
| `loading`  |           `Boolean`            | `false` | Enable loading state                                                                      |
| `href`     | `String` or `RouteLocationRaw` |   `-`   | Place url in the button to make button-like permalink                                     |

### Slots

| Name      | Description                |
|-----------|----------------------------|
| `default` | Content to place in button |
| `loading` | Content when loading       |

### Events

| Name    | Arguments               | Description                  |
|---------|-------------------------|------------------------------|
| `click` | Native DOM Event object | Event when button is clicked |
