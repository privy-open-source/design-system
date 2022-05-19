<script setup>
    import Heading from './Heading.vue'
</script>

<style scoped lang="postcss">
    .preview {
        @apply block;

        h1, h2, h3, h4, h5, h6 {
            @apply mt-0;
            font-weight: inherit;
        }

        h2 {
            @apply m-0 p-0 border-b-0;
        }
    }
</style>
# Heading
Headings are used as the titles of each major section of a page in the interface.

## Usage
Use for the title of each top-level page section. The default element of heading are `h2`

### Basic Usage

<preview>
   <Heading>
      Any title should here
   </Heading>
</preview>

```vue
<template>
   <Heading>
      Any title should here
   </Heading>
</template>
```

### Setting the element

<preview>
   <Heading element="h5">
      Account Information
   </Heading>
</preview>

```vue
<template>
   <Heading element="h5">
      Account Information
   </Heading>
</template>
```

## API

### Props

| Props         |   Type    | Default    | Description                                     |
|---------------|:---------:|:----------:|-------------------------------------------------|
| `element`     | `String`  | `h3`       | Heading element, valid value is `h1` to `h6`    |
| `class`       | `String`  | -          | Additional class for heading element            |

### Slots

| Name      | Description                 |
|-----------|-----------------------------|
| `default` | Content to place in heading |
