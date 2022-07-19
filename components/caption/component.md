<script setup>
    import Caption from './Caption.vue'
</script>

# Caption

## Usage

### Basic Usage

<preview>
  <Caption>
    Any caption should here
  </Caption>
</preview>

```vue
<template>
  <Caption>
    Any caption should here
  </Caption>
</template>
```

## Setting The Element

<preview class="flex-col">
  <Caption>
    Any caption should here
  </Caption>
  <Caption bold>
    Any caption should here
  </Caption>
</preview>

```vue
<template>
  <Caption>
    Any caption should here
  </Caption>
  <Caption bold>
    Any caption should here
  </Caption>
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
