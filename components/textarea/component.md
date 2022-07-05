<script setup>
  import Textarea from './Textarea.vue'
</script>

# Textarea

## Usage

### Simple Usage

<preview>
  <Textarea />
</preview>

```vue
<template>
  <Textarea />
</template>
```

## Placeholder

<preview>
  <Textarea placeholder="Write something" />
</preview>

```vue
<template>
  <Textarea placeholder="Write something" />
</template>
```

## Disabled State
<preview>
  <Textarea disabled />
</preview>

```vue
<template>
  <Textarea disabled />
</template>
```

## Readonly State
<preview>
  <Textarea readonly />
</preview>

```vue
<template>
  <Textarea readonly />
</template>
```

## Resizeable
Enable resize button via prop `resize`

<preview>
  <Textarea resize />
</preview>

```vue
<template>
  <Textarea resize />
</template>
```

## Auto Grow

Auto adjust textarea based on text height.

<preview>
  <Textarea rows="1" auto-grow />
</preview>

```vue
<template>
  <Textarea rows="1" auto-grow />
</template>
```

## Counter

Show character counter with prop `show-counter`

<preview class="flex-col gap-3">
  <Textarea show-counter />
  <Textarea show-counter maxlength="50" />
</preview>

```vue
<template>
  <Textarea show-counter />
  <Textarea show-counter maxlength="50" />
</template>
```

## API

### Props

| Props          |   Type    | Default | Description            |
|----------------|:---------:|:-------:|------------------------|
| `placeholder`  | `String`  |   `-`   | Input's placeholder    |
| `disabled`     | `Boolean` | `false` | Disable state          |
| `readonly`     | `Boolean` | `false` | Readonly state         |
| `autogrow`     | `Boolean` | `false` | Enable auto-resize     |
| `resize`       | `Boolean` | `false` | Enable resize          |
| `show-counter` | `Boolean` | `false` | Show character counter |
| `modelValue`   | `String`  |   `-`   | `v-model` value        |

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

| Name    | Arguments           | Description               |
|---------|---------------------|---------------------------|
| `input` | Native Input Object | Event when value inputted |

## See Also
- [Input](/input/component)
