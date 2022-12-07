<script setup>
  import pLabel from './Label.vue'
</script>

<style scoped lang="postcss">
  .preview {
    .label {
      @apply mr-4;

      &:last-child {
        @apply mr-0;
      }
    }
  }
</style>

# Label

## Usage

### Basic Usage
Default color of label is `black`

<preview>
  <p-label>Label</p-label>
</preview>

```vue
<template>
  <p-label>Label</p-label>
</template>
```

## Colors
Label available in 4 different colors. There are `primary`, `success`, `warning`, and `danger`.

<preview>
  <p-label color="primary">Label</p-label>
  <p-label color="success">Label</p-label>
  <p-label color="warning">Label</p-label>
  <p-label color="danger">Label</p-label>
</preview>

```vue
<template>
  <p-label color="primary">Label</p-label>
  <p-label color="success">Label</p-label>
  <p-label color="warning">Label</p-label>
  <p-label color="danger">Label</p-label>
</template>
```

## Variants
Label has 3 variants namely `default`, `light` and `dot`. When variant is not set, label will looks as a `default`

<preview>
  <p-label>Label</p-label>
  <p-label variant="light">Label</p-label>
  <p-label variant="dot">Label</p-label>
</preview>

```vue
<template>
  <p-label>Label</p-label>
  <p-label variant="light">Label</p-label>
  <p-label variant="dot">Label</p-label>
</template>
```

## Sizing
Label has 4 size, namely `lg`, `md`, `sm` and `xs`. When size is not set, default label is `md`

<preview>
  <p-label color="primary" size="lg">Label</p-label>
  <p-label color="primary" size="md">Label</p-label>
  <p-label color="primary" size="sm">Label</p-label>
  <p-label color="primary" size="xs">Label</p-label>
</preview>

```vue
<template>
  <p-label color="primary" size="lg">Label</p-label>
  <p-label color="primary" size="md">Label</p-label>
  <p-label color="primary" size="sm">Label</p-label>
  <p-label color="primary" size="xs">Label</p-label>
</template>
```

## Dismissible
Label has dismiss feature. It can be show or hide by `dismissable` props. If `dismissable` set to `true`, dismiss button will show.

<preview>
  <p-label color="primary" :dismissable="true">Label</p-label>
  <p-label color="primary" variant="light" :dismissable="true">Label</p-label>
  <p-label color="primary" variant="dot" :dismissable="true">Label</p-label>
</preview>

```vue
<template>
  <p-label color="primary" :dismissable="true">Label</p-label>
  <p-label color="primary" variant="light" :dismissable="true">Label</p-label>
  <p-label color="primary" variant="dot" :dismissable="true">Label</p-label>
</template>
```

## API

### Props

| Props         |   Type    |  Default  | Description                                                                                                |
|---------------|:---------:|:---------:|---------------------------------------------------------------------------------------------------------------------|
| `color`       | `String`  | `-` | Label color variant, valid value is `primary`, `success`, `warning` and `danger` |
| `variant`     | `String`  | `default` | Label variant, valid value is `default`, `light` and `dot`.                |
| `size`        | `String`  |   `md`    | Label variant, valid value is `lg`, `md`, `sm` and `xs`.                   |
| `dismissable` | `Boolean` |  `false`  | Show / Hide dismiss button                                                 |

### Slots

| Name      | Description               |
|-----------|---------------------------|
| `default` | Content to place in badge |

### Events

| Name        | Arguments | Description                     |
|-------------|-----------|---------------------------------|
| `dismissed` | -         | Event when close button clicked |
