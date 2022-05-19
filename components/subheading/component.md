<script setup>
    import Subheading from './Subheading.vue'
</script>

# Subheading
Subheadings are used for the title of any sub-sections

## Usage
Used for the title of any sub-sections

### Basic Usage

<preview>
   <Subheading>
      Any title should here
   </Subheading>
</preview>

```vue
<template>
   <Subheading>
      Any title should here
   </Subheading>
</template>
```

### Sizing

<preview>
   <Subheading size="sm">
      Any title should here
   </Subheading>
</preview>

```vue
<template>
   <Subheading size="sm">
      Any title should here
   </Subheading>
</template>
```

### Overline

<preview>
   <Subheading overline="normal">
      Any title should here
   </Subheading>
</preview>

```vue
<template>
   <Subheading overline="normal">
      Any title should here
   </Subheading>
</template>
```

### Overline Medium

<preview>
   <Subheading overline="medium">
      Any title should here
   </Subheading>
</preview>

```vue
<template>
   <Subheading overline="medium">
      Any title should here
   </Subheading>
</template>
```

## API

### Props

| Props         |   Type    | Default    | Description                                           |
|---------------|:---------:|:----------:|-------------------------------------------------------|
| `size`        | `String`  | `md`       | Size of subheading, valid value is `sm` and `md`      |
| `overline`    | `String`  | -          | Overline variant. Valid value is `normal` and `medium`. If overline is active, subheading's `size` will be disabled automatically               |
| `class`       | `String`  | -          | Additional class for subheading element               |

### Slots

| Name      | Description                    |
|-----------|--------------------------------|
| `default` | Content to place in subheading |
