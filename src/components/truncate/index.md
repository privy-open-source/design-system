---
title: Truncate · Components
description: Limiting long text.
---

<script setup>
  import pTruncate from './Truncate.vue'
</script>

# Truncate

> Limiting long text.

## Usage

### Simple Usage

<preview>
  <p-truncate
    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iste."
    length="30" />
</preview>

```vue
<template>
  <p-truncate
    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iste."
    length="30" />
</template>
```

## Custom Omission

<preview>
  <p-truncate
    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iste."
    length="30"
    omission=" [...]" />
</preview>

```vue
<template>
  <p-truncate
    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iste."
    length="30"
    omission=" [...]" />
</template>
```

## Expandable

<preview>
  <p-truncate
    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iste."
    length="30"
    expandable />
</preview>

```vue
<template>
  <p-truncate
    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iste."
    length="30"
    expandable />
</template>
```

### Custom Text

You can change "show more" and "show less" text via prop `show-more-text` and `show-less-text`

<preview>
  <p-truncate
    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iste."
    length="30"
    expandable
    show-more-text="Lihat Selengkapnya"
    show-less-text="Sembunyikan" />
</preview>

```vue
<template>
  <p-truncate
    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iste."
    length="30"
    expandable
    show-more-text="Lihat Selengkapnya"
    show-less-text="Sembunyikan" />
</template>
```

## API

### Props

| Props          |   Type    |   Default   | Description                      |
|----------------|:---------:|:-----------:|----------------------------------|
| `text`         | `String`  |     `-`     | Text to truncate                 |
| `length`       | `Number`  |    `100`    | Max length before text truncated |
| `expandable`   | `Boolean` |   `false`   | Show expand button               |
| `showMoreText` | `String`  | `Show More` | Text for show more's button      |
| `showLessText` | `String`  | `Show Less` | Text for show less's button      |

### Slots

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="2" class="text-center">There no slots here</td>
    </tr>
  </tbody>
</table>

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
      <td colspan="3" class="text-center">There no props here</td>
    </tr>
  </tbody>
</table>
