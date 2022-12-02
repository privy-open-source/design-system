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

## Size
Caption have 2 sizes variant, there are `xs` and `tn`. Default size is `xs`.

<preview class="flex-col gap-3">
  <p-caption size="xs">
    Small caption should here
  </p-caption>
  <p-caption size="tn">
    Tiny caption should here
  </p-caption>
</preview>

```vue
<template>
  <p-caption size="xs">
    Small caption should here
  </p-caption>
  <p-caption size="tn">
    Tiny caption should here
  </p-caption>
</template>
```

## Weight
Caption have 3 weights variant, there are `normal`, `medium` and `bold`. Default weight is `normal`.

<preview class="flex-col gap-3">
  <p-caption weight="normal">
    Normal caption should here
  </p-caption>
  <p-caption weight="medium">
    Medium caption should here
  </p-caption>
  <p-caption weight="bold">
    Bold caption should here
  </p-caption>
</preview>

```vue
<template>
  <p-caption weight="normal">
    Normal caption should here
  </p-caption>
  <p-caption weight="medium">
    Medium caption should here
  </p-caption>
  <p-caption weight="bold">
    Bold caption should here
  </p-caption>
</template>
```

## Transform
Caption have 4 transforms variant, there are `normalcase`, `lowercase`, `capitalize` and `uppercase`. Default transform is `normalcase`.
<preview class="flex-col gap-3">
  <p-caption transform="normalcase">
    Normalcase caption should here
  </p-caption>
  <p-caption transform="lowercase">
    Lowercase caption should here
  </p-caption>
  <p-caption transform="capitalize">
    Capitalize caption should here
  </p-caption>
  <p-caption transform="uppercase">
    Uppercase caption should here
  </p-caption>
</preview>

```vue
<template>
  <p-caption transform="normalcase">
    Normalcase caption should here
  </p-caption>
  <p-caption transform="lowercase">
    Lowercase caption should here
  </p-caption>
  <p-caption transform="capitalize">
    Capitalize caption should here
  </p-caption>
  <p-caption transform="uppercase">
    Uppercase caption should here
  </p-caption>
</template>
```

## API

### Props

| Props       |   Type     | Default      | Description                                               |
|-------------|:----------:|:------------:|-----------------------------------------------------------|
| `size`      | `String`   |  `xs`        | Size of caption, valid value is `xs` and `tn`                 |
| `weight`    | `String`   | `normal`     | Weight of subheading, valid value is `normal`, `medium` and `bold` |
| `transform` | `String`   | `normalcase` | Transform of subheading, valid value is `normalcase`, `lowercase`, `capitalize` and `uppercase`   |

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
