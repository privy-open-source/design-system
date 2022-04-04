<script setup>
  import Button from './Button.vue'
  import IconBee from '@carbon/icons-vue/lib/bee/20'

  function log(text) {
    console.log(text)
  }
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
  <Button>
    <IconBee />
  </Button>
</template>

<script setup>
  import IconBee from '@carbon/icons-vue/lib/bee/20'
</script>
```

### Button with icon + text

<div><Button class="mt-3 mr-1"><IconBee /> Click Me</Button><Button class="mt-3 mr-1">Click Me <IconBee /></Button></div>

```vue
<template>
  <Button>
    <IconBee /> Click Me
  </Button>
  <Button>
    Click Me <IconBee />
  </Button>
</template>

<script setup>
  import IconBee from '@carbon/icons-vue/lib/bee/20'
</script>
```

## Variants

Button has 4 variants, `solid`, `outline`, `ghost`, `link`. default is `solid`

<Button class="mr-1" variant="solid">Click me</Button>
<Button class="mr-1" variant="outline">Click me</Button>
<Button class="mr-1" variant="ghost">Click me</Button>
<Button class="mr-1" variant="link">Click me</Button>

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

<Button class="mr-1" color="primary">Click me</Button>
<Button class="mr-1" color="secondary">Click me</Button>
<Button class="mr-1" color="success">Click me</Button>
<Button class="mr-1" color="info">Click me</Button>
<Button class="mr-1" color="warning">Click me</Button>
<Button class="mr-1" color="danger">Click me</Button>
<Button class="mr-1" color="gold">Click me</Button>

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

<div>
  <Button class="mr-1" variant="outline" color="primary">Click me</Button>
  <Button class="mr-1" variant="outline" color="secondary">Click me</Button>
  <Button class="mr-1" variant="outline" color="success">Click me</Button>
  <Button class="mr-1" variant="outline" color="info">Click me</Button>
  <Button class="mr-1" variant="outline" color="warning">Click me</Button>
  <Button class="mr-1" variant="outline" color="danger">Click me</Button>
  <Button class="mr-1" variant="outline" color="gold">Click me</Button>
</div>
<div class="mt-1">
  <Button class="mr-1" variant="link" color="primary">Click me</Button>
  <Button class="mr-1" variant="link" color="secondary">Click me</Button>
  <Button class="mr-1" variant="link" color="success">Click me</Button>
  <Button class="mr-1" variant="link" color="info">Click me</Button>
  <Button class="mr-1" variant="link" color="warning">Click me</Button>
  <Button class="mr-1" variant="link" color="danger">Click me</Button>
  <Button class="mr-1" variant="link" color="gold">Click me</Button>
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

## Disable state

<Button class="mr-1" variant="solid" disabled>Click me</Button>
<Button class="mr-1" variant="outline" disabled>Click me</Button>
<Button class="mr-1" variant="ghost" disabled>Click me</Button>
<Button class="mr-1" variant="link" disabled>Click me</Button>

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

| Props      | Type      | Default   | Description                                                                                                 |
|------------|-----------|-----------|-------------------------------------------------------------------------------------------------------------|
| `variant`  | `String`  | `'solid'` | Button style variant, valid value is `solid`, `outline`, `ghost`, `link`                                    |
| `color`    | `String`  | `primary` | Button color variant, valid value is `primary`, `secondary`, `success`, `info`, `warning`, `danger`, `gold` |
| `size`     | `String`  | `md`      | Size of button, valid value is `sm`, `md`, `lg`                                                             |
| `disabled` | `Boolean` | `false`   | Disabled state                                                                                              |

### Slots
| Name      | Description                |
|-----------|----------------------------|
| `default` | Content to place in button |

### Events

| Name    | Argunments              | Description                  |
|---------|-------------------------|------------------------------|
| `click` | Native DOM Event object | Event when button is clicked |
