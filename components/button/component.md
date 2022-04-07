<script setup>
  import Button from './Button.vue'
  import IconBee from '@carbon/icons-vue/lib/bee/20'
</script>

# Button

## Usage

### Simple Button

<Button class="mt-3">Click me</Button>

```vue
<template>
  <Button>Click me</Button>
</template>
```

### Button with icon

<Button class="mt-3"><IconBee /></Button>

```vue
<template>
  <Button><IconBee /></Button>
</template>

<script setup>
  import IconBee from '@carbon/icons-vue/lib/bee/20'
</script>
```

### Button with icon + text

<div class="flex flex-wrap gap-1 mt-3">
  <Button><IconBee /> Click Me</Button>
  <Button>Click Me <IconBee /></Button>
</div>

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

Button has 4 variants, `solid`, `outline`, `ghost`, `link`. default is `solid`

<div class="flex flex-wrap gap-1">
  <Button variant="solid">Click me</Button>
  <Button variant="outline">Click me</Button>
  <Button variant="ghost">Click me</Button>
  <Button variant="link">Click me</Button>
</div>

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

<div class="flex flex-wrap gap-1">
  <Button color="primary">Click me</Button>
  <Button color="secondary">Click me</Button>
  <Button color="success">Click me</Button>
  <Button color="info">Click me</Button>
  <Button color="warning">Click me</Button>
  <Button color="danger">Click me</Button>
  <Button color="gold">Click me</Button>
</div>

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

<div class="flex flex-wrap gap-1">
  <Button variant="outline" color="primary">Click me</Button>
  <Button variant="outline" color="secondary">Click me</Button>
  <Button variant="outline" color="success">Click me</Button>
  <Button variant="outline" color="info">Click me</Button>
  <Button variant="outline" color="warning">Click me</Button>
  <Button variant="outline" color="danger">Click me</Button>
  <Button variant="outline" color="gold">Click me</Button>
</div>
<div class="flex flex-wrap gap-1">
  <Button variant="link" color="primary">Click me</Button>
  <Button variant="link" color="secondary">Click me</Button>
  <Button variant="link" color="success">Click me</Button>
  <Button variant="link" color="info">Click me</Button>
  <Button variant="link" color="warning">Click me</Button>
  <Button variant="link" color="danger">Click me</Button>
  <Button variant="link" color="gold">Click me</Button>
</div>

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

3 sizes you can use: `sm`, `md`, `lg`. default is `md`

<div class="flex flex-wrap items-start gap-1">
  <Button size="sm">Click me</Button>
  <Button size="md">Click me</Button>
  <Button size="lg">Click me</Button>
</div>

```vue
<template>
  <Button size="sm">Click me</Button>
  <Button size="md">Click me</Button>
  <Button size="lg">Click me</Button>
</template>
```

## Disable state

<div class="flex flex-wrap gap-1">
  <Button variant="solid" disabled>Click me</Button>
  <Button variant="outline" disabled>Click me</Button>
  <Button variant="ghost" disabled>Click me</Button>
  <Button variant="link" disabled>Click me</Button>
</div>

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
| `size`     | `String`  |   `md`    | Size of button, valid value is `sm`, `md`, `lg`                                                             |
| `disabled` | `Boolean` |  `false`  | Disable state                                                                                               |

### Slots
| Name      | Description                |
|-----------|----------------------------|
| `default` | Content to place in button |

### Events

| Name    | Arguments               | Description                  |
|---------|-------------------------|------------------------------|
| `click` | Native DOM Event object | Event when button is clicked |
