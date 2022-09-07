<script setup>
  import pTextarea from './Textarea.vue'
</script>

# Textarea

## Usage

### Simple Usage

<preview>
  <p-textarea />
</preview>

```vue
<template>
  <p-textarea />
</template>
```

## Placeholder

<preview>
  <p-textarea placeholder="Write something" />
</preview>

```vue
<template>
  <p-textarea placeholder="Write something" />
</template>
```

## Disabled State
<preview>
  <p-textarea disabled />
</preview>

```vue
<template>
  <p-textarea disabled />
</template>
```

## Readonly State
<preview>
  <p-textarea readonly />
</preview>

```vue
<template>
  <p-textarea readonly />
</template>
```

## Resizeable
Enable resize button via prop `resize`

<preview>
  <p-textarea resize />
</preview>

```vue
<template>
  <p-textarea resize />
</template>
```

## Auto Grow

Auto adjust textarea based on text height.

<preview>
  <p-textarea rows="1" auto-grow />
</preview>

```vue
<template>
  <p-textarea rows="1" auto-grow />
</template>
```

## Counter

Show character counter with prop `show-counter`

<preview class="flex-col gap-3">
  <p-textarea show-counter />
  <p-textarea show-counter maxlength="50" />
</preview>

```vue
<template>
  <p-textarea show-counter />
  <p-textarea show-counter maxlength="50" />
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
- [Input](/components/input/index)
