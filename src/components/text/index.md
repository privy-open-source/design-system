---
title: Text · Components
description: Text functions as freetext which has all typography styles
---

<script setup>
  import pText from './Text.vue'
</script>

# Text

> Text functions as freetext which has all typography styles

## Usage
Used for the title of any sub-sections

### Basic Usage
Default style of `Text` is a body text

<preview>
  <p-text>The quick brown fox jumps over the lazy dog.</p-text>
</preview>

```vue
<template>
  <p-text>The quick brown fox jumps over the lazy dog.</p-text>
</template>
```

## Hyperlink
You can add `href` prop to make permalink.

<preview>
  <p-text href="https://privy.id">This should be a hyperlink</p-text>
</preview>

```vue
<template>
  <p-text href="https://privy.id">This should be a hyperlink</p-text>
</template>
```


## Variant
Text have 7 style variant, there are `heading`, `subheading`, `body`, `button`, `caption`, `formlabel` and `overline`.

### Heading

<preview class="flex-col space-y-2">
  <p-text variant="h1">Heading 1</p-text>
  <p-text variant="h2">Heading 2</p-text>
  <p-text variant="h3">Heading 3</p-text>
  <p-text variant="h4">Heading 4</p-text>
  <p-text variant="h5">Heading 5</p-text>
  <p-text variant="h6">Heading 6</p-text>
</preview>

```vue
<template>
  <p-text variant="h1">Heading 1</p-text>
  <p-text variant="h2">Heading 2</p-text>
  <p-text variant="h3">Heading 3</p-text>
  <p-text variant="h4">Heading 4</p-text>
  <p-text variant="h5">Heading 5</p-text>
  <p-text variant="h6">Heading 6</p-text>
</template>
```

### Subheading

<preview class="flex-col space-y-2">
  <p-text variant="subheading">Sub Heading 1</p-text>
  <p-text variant="subheading2">Sub Heading 2</p-text>
</preview>

```vue
<template>
  <p-text variant="subheading">Sub Heading 1</p-text>
  <p-text variant="subheading2">Sub Heading 2</p-text>
</template>
```

### Body

<preview class="flex-col space-y-2">
  <p-text variant="body">Body text 1</p-text>
  <p-text variant="body2">Body text 2</p-text>
  <ul class="!list-disc">
    <li><p-text variant="body">Body list 1</p-text></li>
  </ul>
  <ul class="!list-disc">
    <li><p-text variant="body2">Body list 2</p-text></li>
  </ul>
  <p-text variant="body" href="#">Hyperlink (text)</p-text>
  <p-text variant="body2" href="#">Hyperlink (subtext)</p-text>
</preview>

```vue
<template>
  <p-text variant="body">Body text 1</p-text>
  <p-text variant="body2">Body text 2</p-text>
  <ul>
    <li><p-text variant="body">Body list 1</p-text></li>
  </ul>
  <ul>
    <li><p-text variant="body2">Body list 2</p-text></li>
  </ul>
  <p-text variant="body" href="#">Hyperlink (text)</p-text>
  <p-text variant="body2" href="#">Hyperlink (subtext)</p-text>
</template>
```

### Button

<preview class="flex-col space-y-2">
  <p-text variant="btn">button 1</p-text>
  <p-text variant="btn2">button 2</p-text>
  <p-text variant="btn" href="#" hyperlink>button Link 1</p-text>
  <p-text variant="btn2" href="#" hyperlink>button Link 2</p-text>
</preview>

```vue
<template>
  <p-text variant="btn">button 1</p-text>
  <p-text variant="btn2">button 2</p-text>
  <p-text variant="btn" href="#">button Link 1</p-text>
  <p-text variant="btn2" href="#">button Link 2</p-text>
</template>
```

### Caption

<preview class="flex-col space-y-2">
  <p-text variant="caption">Caption</p-text>
  <p-text variant="caption2">Caption 2 (known as small text)</p-text>
  <p-text variant="caption" href="#">Hyperlink (caption)</p-text>
  <p-text variant="caption2" href="#">Hyperlink (caption 2)</p-text>
</preview>

```vue
<template>
  <p-text variant="caption">Caption</p-text>
  <p-text variant="caption2">Caption 2 (known as small text)</p-text>
  <p-text variant="caption" href="#">Hyperlink (caption)</p-text>
  <p-text variant="caption2" href="#">Hyperlink (caption 2)</p-text>
</template>
```

### Form Label

<preview class="flex-col space-y-2">
  <p-text variant="formlabel">Form Label 1</p-text>
  <p-text variant="formlabel2">Form Label 2</p-text>
</preview>

```vue
<template>
  <p-text variant="formlabel">Form Label 1</p-text>
  <p-text variant="formlabel2">Form Label 2</p-text>
</template>
```

### Overline

<preview class="flex-col space-y-2">
  <p-text variant="overline">Overline</p-text>
</preview>

```vue
<template>
  <p-text variant="overline">Overline</p-text>
</template>
```

## API

### Props

| Props               |   Type    | Default     | Description                                                            |
|---------------------|:---------:|:-----------:|------------------------------------------------------------------------|
| `variant`           | `String`  | `body`      | Text variant, valid value is `heading`, `subheading`, `body`, `button`, `caption`, `formlabel` and `overline`    |
| `href`              | `String`  | `-`         | Provide hyperlink in the text                                          |
| `weight`              | `String`  | `normal`         | Provide font-weight of text, valid value is `normal`, `medium` and `bold`                                          |
| `transform`              | `String`  | `normalcase`         | Provide font-weight of text, valid value is `normalcase`, `lowercase`, `capitalize` and `uppercase`                                          |

### Slots

| Name             | Description                                             |
|------------------|---------------------------------------------------------|
| `default`        | Content to place in the Text                            |

