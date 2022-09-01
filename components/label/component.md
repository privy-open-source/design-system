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
<preview>
  <p-label>Label</p-label>
</preview>

```vue
<template>
  <p-label>Label</p-label>
</template>
```

## Colors
Label available in 7 different colors. There are `primary`, `secondary`, `success`, `info`, `warning`, `danger` and `gold`. Default color is `primary`

<preview>
  <p-label color="primary">Label</p-label>
  <p-label color="secondary">Label</p-label>
  <p-label color="success">Label</p-label>
  <p-label color="info">Label</p-label>
  <p-label color="warning">Label</p-label>
  <p-label color="danger">Label</p-label>
  <p-label color="gold">Label</p-label>
</preview>

```vue
<template>
  <p-label color="primary">Label</p-label>
  <p-label color="secondary">Label</p-label>
  <p-label color="success">Label</p-label>
  <p-label color="info">Label</p-label>
  <p-label color="warning">Label</p-label>
  <p-label color="danger">Label</p-label>
  <p-label color="gold">Label</p-label>
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
  <p-label size="lg">Label</p-label>
  <p-label size="md">Label</p-label>
  <p-label size="sm">Label</p-label>
  <p-label size="xs">Label</p-label>
</preview>

```vue
<template>
  <p-label size="lg">Label</p-label>
  <p-label size="md">Label</p-label>
  <p-label size="sm">Label</p-label>
  <p-label size="xs">Label</p-label>
</template>
```

## Dismissible
Label has dismiss feature. It can be show or hide by `dismissable` props. If `dismissable` set to `true`, dismiss button will show.

<preview>
  <p-label :dismissable="true">Label</p-label>
  <p-label variant="light" :dismissable="true">Label</p-label>
  <p-label variant="dot" :dismissable="true">Label</p-label>
</preview>

```vue
<template>
  <p-label :dismissable="true">Label</p-label>
  <p-label variant="light" :dismissable="true">Label</p-label>
  <p-label variant="dot" :dismissable="true">Label</p-label>
</template>
```

## API

### Props

| Props         |   Type    |  Default  | Description                                                                                                |
|---------------|:---------:|:---------:|------------------------------------------------------------------------------------------------------------|
| `color`       | `String`  | `primary` | Label color variant, valid value is `primary`, `secondary`, `success`, `info`, `warning`, `danger`, `gold` |
| `variant`     | `String`  | `default` | Label variant, valid value is `default`, `light` and `dot`.                                                |
| `size`        | `String`  | `md`  | Label variant, valid value is `lg`, `md`, `sm` and `xs`.                                       |
| `dismissable` | `Boolean` |  `false`  | Show / Hide dismiss button                                                                                 |

### Slots

| Name      | Description               |
|-----------|---------------------------|
| `default` | Content to place in badge |

### Events


| Name        | Arguments | Description                     |
|-------------|-----------|---------------------------------|
| `dismissed` | -         | Event when close button clicked |
