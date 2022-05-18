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
   <Subheading overline>
      Any title should here
   </Subheading>
</preview>

```vue
<template>
   <Subheading overline>
      Any title should here
   </Subheading>
</template>
```

### Overline Medium

<preview>
   <Subheading class="font-medium" overline>
      Any title should here
   </Subheading>
</preview>

```vue
<template>
   <Subheading class="font-medium" overline>
      Any title should here
   </Subheading>
</template>
```

## API

### Props

| Props         |   Type    | Default    | Description                                     |
|---------------|:---------:|:----------:|-------------------------------------------------|
| `size`        | `String`  | `md`       | Heading element, valid value is `sm`, `md`      |
| `overline`    | `Boolean` | `false`    | Enable/disable `overline` variant. If overline are enable, the `size` will be disabled automatically               |
| `class`       | `String`  | -          | Additional class for heading element            |

### Slots

| Name      | Description                 |
|-----------|-----------------------------|
| `default` | Content to place in heading |
