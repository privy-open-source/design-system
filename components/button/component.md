<script setup>
  import Button from './Button.vue'
  import IconBee from '@carbon/icons-vue/lib/bee/20'
</script>

# Button

## Usage

### Simple Button

<preview>
  <Button>Click me</Button>
</preview>

```vue
<template>
  <Button>Click me</Button>
</template>
```

### Button with icon

<preview>
  <Button icon><IconBee /></Button>
</preview>

```vue
<template>
  <Button icon><IconBee /></Button>
</template>

<script setup>
  import IconBee from '@carbon/icons-vue/lib/bee/20'
</script>
```

### Button with icon + text

<preview class="flex-col items-center gap-3 md:flex-row">
  <Button><IconBee /> Click Me</Button>
  <Button>Click Me <IconBee /></Button>
</preview>

```vue
<template>
  <Button><IconBee /> Click Me</Button>
  <Button>Click Me <IconBee /></Button>
</template>

<script setup>
  import IconBee from '@carbon/icons-vue/lib/bee/20'
</script>
```

## Variants

Button has 4 variants, `solid`, `outline`, `ghost`, `link`. Default is `solid`

<preview>
  <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
    <Button variant="solid">Click me</Button>
    <Button variant="outline">Click me</Button>
    <Button variant="ghost">Click me</Button>
    <Button variant="link">Click me</Button>
  </div>
</preview>

```vue
<template>
  <Button variant="solid">Click me</Button>
  <Button variant="outline">Click me</Button>
  <Button variant="ghost">Click me</Button>
  <Button variant="link">Click me</Button>
</template>
```

## Colors

Button available in 7 different colors `primary`, `secondary`, `success`, `info`, `warning`, `danger`, `gold`. default is `primary`

<preview>
  <div class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
    <Button color="primary">Click me</Button>
    <Button color="secondary">Click me</Button>
    <Button color="success">Click me</Button>
    <Button color="info">Click me</Button>
    <Button color="warning">Click me</Button>
    <Button color="danger">Click me</Button>
    <Button color="gold">Click me</Button>
  </div>
</preview>

```vue
<template>
  <Button color="primary">Click me</Button>
  <Button color="secondary">Click me</Button>
  <Button color="success">Click me</Button>
  <Button color="info">Click me</Button>
  <Button color="warning">Click me</Button>
  <Button color="danger">Click me</Button>
  <Button color="gold">Click me</Button>
</template>
```

It's also work with other variants (except `ghost`).

<preview label="outline variant">
  <div class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
    <Button variant="outline" color="primary">Click me</Button>
    <Button variant="outline" color="secondary">Click me</Button>
    <Button variant="outline" color="success">Click me</Button>
    <Button variant="outline" color="info">Click me</Button>
    <Button variant="outline" color="warning">Click me</Button>
    <Button variant="outline" color="danger">Click me</Button>
    <Button variant="outline" color="gold">Click me</Button>
  </div>
</preview>

<preview label="link variant">
  <div class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
    <Button variant="link" color="primary">Click me</Button>
    <Button variant="link" color="secondary">Click me</Button>
    <Button variant="link" color="success">Click me</Button>
    <Button variant="link" color="info">Click me</Button>
    <Button variant="link" color="warning">Click me</Button>
    <Button variant="link" color="danger">Click me</Button>
    <Button variant="link" color="gold">Click me</Button>
  </div>
</preview>

```vue
<template>
  <Button variant="outline" color="primary">Click me</Button>
  <Button variant="outline" color="secondary">Click me</Button>
  <Button variant="outline" color="success">Click me</Button>
  <Button variant="outline" color="info">Click me</Button>
  <Button variant="outline" color="warning">Click me</Button>
  <Button variant="outline" color="danger">Click me</Button>
  <Button variant="outline" color="gold">Click me</Button>

  <Button variant="link" color="primary">Click me</Button>
  <Button variant="link" color="secondary">Click me</Button>
  <Button variant="link" color="success">Click me</Button>
  <Button variant="link" color="info">Click me</Button>
  <Button variant="link" color="warning">Click me</Button>
  <Button variant="link" color="danger">Click me</Button>
  <Button variant="link" color="gold">Click me</Button>
</template>
```

## Sizing

3 sizes you can use: `xs`, `sm`, `md`, `lg`. default is `md`

<preview class="flex-col items-center gap-3 md:flex-row">
  <Button size="xs">Click me</Button>
  <Button size="sm">Click me</Button>
  <Button size="md">Click me</Button>
  <Button size="lg">Click me</Button>
</preview>

```vue
<template>
  <Button size="xs">Click me</Button>
  <Button size="sm">Click me</Button>
  <Button size="md">Click me</Button>
  <Button size="lg">Click me</Button>
</template>
```

## Pill mode

You can add prop `pill` to make button more rounded

<preview class="flex-col items-center gap-3 md:flex-row">
  <Button size="xs" pill>Click me</Button>
  <Button size="sm" pill>Click me</Button>
  <Button size="md" pill>Click me</Button>
  <Button size="lg" pill>Click me</Button>
</preview>

```vue
<template>
  <Button size="xs" pill>Click me</Button>
  <Button size="sm" pill>Click me</Button>
  <Button size="md" pill>Click me</Button>
  <Button size="lg" pill>Click me</Button>
</template>
```

## Icon mode

You can add prop `icon` to make button more square, it's suitable for button with icon only

<preview class="items-center gap-3">
  <Button size="xs" icon><IconBee /></Button>
  <Button size="sm" icon><IconBee /></Button>
  <Button size="md" icon><IconBee /></Button>
  <Button size="lg" icon><IconBee /></Button>
</preview>

```vue
<template>
  <Button size="xs" icon><IconBee /></Button>
  <Button size="sm" icon><IconBee /></Button>
  <Button size="md" icon><IconBee /></Button>
  <Button size="lg" icon><IconBee /></Button>
</template>
```

You can also combine with `pill` mode to make round button

<preview class="items-center gap-3">
  <Button size="xs" icon pill><IconBee /></Button>
  <Button size="sm" icon pill><IconBee /></Button>
  <Button size="md" icon pill><IconBee /></Button>
  <Button size="lg" icon pill><IconBee /></Button>
</preview>

```vue
<template>
  <Button size="xs" icon pill><IconBee /></Button>
  <Button size="sm" icon pill><IconBee /></Button>
  <Button size="md" icon pill><IconBee /></Button>
  <Button size="lg" icon pill><IconBee /></Button>
</template>
```

## Disable state

<preview label="link variant">
  <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
    <Button variant="solid" disabled>Click me</Button>
    <Button variant="outline" color="gold" disabled>Click me</Button>
    <Button variant="ghost" disabled>Click me</Button>
    <Button variant="link" disabled>Click me</Button>
  </div>
</preview>

```vue
<template>
  <Button variant="solid" disabled>Click me</Button>
  <Button variant="outline" disabled>Click me</Button>
  <Button variant="ghost" disabled>Click me</Button>
  <Button variant="link" disabled>Click me</Button>
</template>
```

## API

### Props

| Props      |   Type    |  Default  | Description                                                                                                 |
|------------|:---------:|:---------:|-------------------------------------------------------------------------------------------------------------|
| `variant`  | `String`  |  `solid`  | Button style variant, valid value is `solid`, `outline`, `ghost`, `link`                                    |
| `color`    | `String`  | `primary` | Button color variant, valid value is `primary`, `secondary`, `success`, `info`, `warning`, `danger`, `gold` |
| `size`     | `String`  |   `md`    | Size of button, valid value is `xs`, `sm`, `md`, `lg`                                                             |
| `pill`     | `Boolean` |  `false`  | Enable pill mode                                                                                            |
| `icon`     | `Boolean` |  `false`  | Enable icon mode                                                                                            |
| `disabled` | `Boolean` |  `false`  | Disable state                                                                                               |

### Slots

| Name      | Description                |
|-----------|----------------------------|
| `default` | Content to place in button |

### Events

| Name    | Arguments               | Description                  |
|---------|-------------------------|------------------------------|
| `click` | Native DOM Event object | Event when button is clicked |
