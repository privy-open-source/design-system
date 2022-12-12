<script setup>
  import { vPAspectRatio } from '.'
</script>

# Aspect Ratio
> CSS Aspect-Ratio alternative using JS

## Usage

### Simple Usage

<preview class="items-start space-x-3">
  <div
    class="p-4 text-on-emphasis w-28 bg-accent-emphasis"
    v-p-aspect-ratio="1 / 1">
    1 / 1
  </div>
  <div
    class="p-4 text-on-emphasis w-28 bg-accent-emphasis"
    v-p-aspect-ratio="4 / 3">
    4 / 3
  </div>
  <div
    class="p-4 text-on-emphasis w-28 bg-accent-emphasis"
    v-p-aspect-ratio="16 / 9">
    16 / 9
  </div>
</preview>

```vue
<template>
  <div
    class="p-4 text-on-emphasis w-28 bg-accent-emphasis"
    v-p-aspect-ratio="1 / 1">
    1 / 1
  </div>
  <div
    class="p-4 text-on-emphasis w-28 bg-accent-emphasis"
    v-p-aspect-ratio="4 / 3">
    4 / 3
  </div>
  <div
    class="p-4 text-on-emphasis w-28 bg-accent-emphasis"
    v-p-aspect-ratio="16 / 9">
    16 / 9
  </div>
</template>

<script setup>
  import { vPAspectRatio } from '@privyid/persona/directive'
</script>
```

## Fixed Size

Add modifier `.fixed` to enable fixed size, it'll use style `height` instead of `min-height`

<preview class="space-x-3">
  <div class="p-4 text-on-emphasis w-28 bg-accent-emphasis" v-p-aspect-ratio="1">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  </div>
  <div class="p-4 text-on-emphasis w-28 bg-accent-emphasis" v-p-aspect-ratio.fixed="1">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  </div>
</preview>

```vue
<template>
  <div class="p-4 text-on-emphasis w-28 bg-accent-emphasis" v-p-aspect-ratio="1">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  </div>
  <div class="p-4 text-on-emphasis w-28 bg-accent-emphasis" v-p-aspect-ratio.fixed="1">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  </div>
</template>
```

## API

### Modifiers

| Modifiers | Description        |
|-----------|--------------------|
| `fixed`   | Enable fixed sized |
