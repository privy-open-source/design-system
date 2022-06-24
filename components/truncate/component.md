<script setup>
  import Truncate from './Truncate.vue'
</script>

# Truncate

## Usage

### Simple Usage

<preview>
  <Truncate
    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iste."
    length="30" />
</preview>

```vue
<template>
  <Truncate
    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iste."
    length="30" />
</template>
```

## Custom Omission

<preview>
  <Truncate
    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iste."
    length="30"
    omission=" [...]" />
</preview>

```vue
<template>
  <Truncate
    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iste."
    length="30"
    omission=" [...]" />
</template>
```

## Show More mode

<preview>
  <Truncate
    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iste."
    length="30"
    show-more />
</preview>

```vue
<template>
  <Truncate
    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iste."
    length="30"
    show-more />
</template>
```

### Custom Text

You can change "show more" and "show less" text via prop `show-more-text` and `show-less-text`

<preview>
  <Truncate
    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iste."
    length="30"
    show-more
    show-more-text="Lihat Selengkapnya"
    show-less-text="Sembunyikan" />
</preview>

```vue
<template>
  <Truncate
    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iste."
    length="30"
    show-more
    show-more-text="Lihat Selengkapnya"
    show-less-text="Sembunyikan" />
</template>
```

