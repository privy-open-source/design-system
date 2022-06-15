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

## Setting The Element

<preview>
  <Heading element="h1">
    Heading 1
  </Heading>
  <Heading element="h2">
    Heading 2
  </Heading>
  <Heading element="h3">
    Heading 3
  </Heading>
  <Heading element="h4">
    Heading 4
  </Heading>
  <Heading element="h5">
    Heading 5
  </Heading>
  <Heading element="h6">
    Heading 6
  </Heading>
</preview>

```vue
<template>
  <Heading element="h1">
    Heading 1
  </Heading>
  <Heading element="h2">
    Heading 2
  </Heading>
  <Heading element="h3">
    Heading 3
  </Heading>
  <Heading element="h4">
    Heading 4
  </Heading>
  <Heading element="h5">
    Heading 5
  </Heading>
  <Heading element="h6">
    Heading 6
  </Heading>
</template>
```

## API

### Props

| Props     |   Type   | Default | Description                                  |
|-----------|:--------:|:-------:|----------------------------------------------|
| `element` | `String` |  `h3`   | Heading element, valid value is `h1` to `h6` |

### Slots

| Name      | Description                 |
|-----------|-----------------------------|
| `default` | Content to place in heading |

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

## See Also

- [Heading Guide](/heading/guide)
- [Subheading](/subheading/component)
