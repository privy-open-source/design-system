<script setup>
  import pCaption from './Caption.vue'
</script>

# Caption

## Usage
### Basic Usage

<preview>
  <p-caption>
    Any caption should here
  </p-caption>
</preview>

```vue
<template>
  <p-caption>
    Any caption should here
  </p-caption>
</template>
```

## Bold

<preview class="flex-col">
  <p-caption>
    Default caption should here
  </p-caption>
  <p-caption bold>
    Bold caption should here
  </p-caption>
</preview>

```vue
<template>
  <p-caption>
    Default caption should here
  </p-caption>
  <p-caption bold>
    Bold caption should here
  </p-caption>
</template>
```

## API

### Props

| Props     |   Type    | Default    | Description                                              |
|-----------|:---------:|:----------:|----------------------------------------------------------|
| `bold`    | `Boolean` |  `false`   | Weight of caption, if `true` caption will turn into bold |

### Slots

| Name      | Description                 |
|-----------|-----------------------------|
| `default` | Content to place in caption |

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
