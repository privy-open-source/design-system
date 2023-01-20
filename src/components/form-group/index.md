---
title: Form Group · Components
description: Form label, caption, and other stuff.
---

<script setup>
  import pFormGroup from './FormGroup.vue'
  import pInput from '../input/Input.vue'
  import pCheckbox from '../checkbox/Checkbox.vue'
</script>

# Form Group

> Form label, caption, and other stuff.

## Usage

### Simple Usage

<preview>
  <p-form-group label="First Name">
    <p-input />
  </p-form-group>
</preview>

```vue
<template>
  <p-form-group label="First Name">
    <p-input />
  </p-form-group>
</template>
```

### Advance Usage

<preview>
  <p-form-group
    label="First Name"
    caption="This is caption"
    description="This is description"
    hint="This is hint"
    required>
    <p-input />
  </p-form-group>
</preview>

```vue
<template>
  <p-form-group
    label="First Name"
    caption="This is caption"
    description="This is description"
    hint="This is hint"
    required>
    <p-input />
  </p-form-group>
</template>
```

## Required Mode

Add little marker for required form using prop `required`.

<preview>
  <p-form-group
    label="First Name"
    required>
    <p-input />
  </p-form-group>
</preview>

```vue
<template>
  <p-form-group
    label="First Name"
    required>
    <p-input />
  </p-form-group>
</template>
```

## Caption
Add sub-label using `caption` prop.

<preview>
  <p-form-group
    label="First Name"
    caption="Lorem Ipsum dolor sitar">
    <p-input />
  </p-form-group>
</preview>

```vue
<template>
  <p-form-group
    label="First Name"
    caption="Lorem Ipsum dolor sitar">
    <p-input />
  </p-form-group>
</template>
```

## Description

Add decription note below the form input using `description` prop.

<preview>
  <p-form-group
    label="First Name"
    description="Lorem Ipsum dolor sitar">
    <p-input />
  </p-form-group>
</preview>

```vue
<template>
  <p-form-group
    label="First Name"
    description="Lorem Ipsum dolor sitar">
    <p-input />
  </p-form-group>
</template>
```

## Error Message

Error message from validation can be add in here using prop `error`. Note, it'll replace `description` message.

<preview class="flex-col space-y-4">
  <div>
    <p-form-group
      label="First Name"
      description="Lorem Ipsum dolor sitar"
      error="Please fill this field">
      <p-input />
    </p-form-group>
  </div>
</preview>

```vue
<template>
  <p-form-group
    label="First Name"
    description="Lorem Ipsum dolor sitar"
    error="Please fill this field">
    <p-input />
  </p-form-group>
</template>
```
## Hint tooltip

Easy add hint tooltip using prop `hint`.

<preview>
  <p-form-group
    label="First Name"
    hint="Lorem Ipsum dolor sitar">
    <p-input />
  </p-form-group>
</preview>

```vue
<template>
  <p-form-group
    label="First Name"
    hint="Lorem Ipsum dolor sitar">
    <p-input />
  </p-form-group>
</template>
```

## API

### Props

| Props         |   Type    | Default | Description              |
|---------------|:---------:|:-------:|--------------------------|
| `label`       | `String`  |   `-`   | Form group label         |
| `required`    | `Boolean` | `false` | Required flag            |
| `caption`     | `String`  |   `-`   | Sublabel caption         |
| `description` | `String`  |   `-`   | Description note         |
| `hint`        | `String`  |   `-`   | Tooltip hint             |
| `error`       | `String`  |   `-`   | Error validation message |

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
      <td colspan="3" class="text-center">There no event here</td>
    </tr>
  </tbody>
</table>
