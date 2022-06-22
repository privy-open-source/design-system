<script setup>
  import Label from './Label.vue'
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
  <Label>Label</Label>
</preview>

```vue
<template>
  <Label>Label</Label>
</template>
```

## Colors
Label available in 7 different colors. There are `primary`, `secondary`, `success`, `info`, `warning`, `danger` and `gold`. Default color is `primary`

<preview>
  <Label color="primary">Label</Label>
  <Label color="secondary">Label</Label>
  <Label color="success">Label</Label>
  <Label color="info">Label</Label>
  <Label color="warning">Label</Label>
  <Label color="danger">Label</Label>
  <Label color="gold">Label</Label>
</preview>

```vue
<template>
  <Label color="primary">Label</Label>
  <Label color="secondary">Label</Label>
  <Label color="success">Label</Label>
  <Label color="info">Label</Label>
  <Label color="warning">Label</Label>
  <Label color="danger">Label</Label>
  <Label color="gold">Label</Label>
</template>
```

## Variants
Label has 3 variants namely `default`, `light` and `dot`. When variant is not set, label will looks as a `default`

<preview>
  <Label>Label</Label>
  <Label variant="light">Label</Label>
  <Label variant="dot">Label</Label>
</preview>

```vue
<template>
  <Label>Label</Label>
  <Label variant="light">Label</Label>
  <Label variant="dot">Label</Label>
</template>
```

## Sizing
Label has 4 size, namely `large`, `medium`, `small` and `tiny`. When size is not set, default label is `medium`

<preview>
  <Label size="large">Label</Label>
  <Label size="medium">Label</Label>
  <Label size="small">Label</Label>
  <Label size="tiny">Label</Label>
</preview>

```vue
<template>
  <Label size="large">Label</Label>
  <Label size="medium">Label</Label>
  <Label size="small">Label</Label>
  <Label size="tiny">Label</Label>
</template>
```

## Dismissible
Label has dismiss feature. It can be show or hide by `dismissable` props. If `dismissable` set to `true`, dismiss button will show.

<preview>
  <Label :dismissable="true">Label</Label>
  <Label variant="light" :dismissable="true">Label</Label>
  <Label variant="dot" :dismissable="true">Label</Label>
</preview>

```vue
<template>
  <Label :dismissable="true">Label</Label>
  <Label variant="light" :dismissable="true">Label</Label>
  <Label variant="dot" :dismissable="true">Label</Label>
</template>
```

## API

### Props

| Props         |   Type    |  Default  | Description                                                                                                |
|---------------|:---------:|:---------:|------------------------------------------------------------------------------------------------------------|
| `color`       | `String`  | `primary` | Label color variant, valid value is `primary`, `secondary`, `success`, `info`, `warning`, `danger`, `gold` |
| `variant`     | `String`  | `default` | Label variant, valid value is `default`, `light` and `dot`.                                                |
| `size`        | `String`  | `medium`  | Label variant, valid value is `large`, `medium`, `small` and `tiny`.                                       |
| `dismissable` | `Boolean` |  `false`  | Show / Hide dismiss button                                                                                 |

### Slots

| Name      | Description               |
|-----------|---------------------------|
| `default` | Content to place in badge |

### Events


| Name        | Arguments | Description                     |
|-------------|-----------|---------------------------------|
| `dismissed` | -         | Event when close button clicked |
