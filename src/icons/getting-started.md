<script setup>
import IconURL from '@privyid/persona-icon/svg/broom/32.svg'
import IconBroom from '@privyid/persona-icon/vue/broom/32.vue'
</script>

# Icons

> Official Persona icon pack

## Installation

```sh
yarn add @privyid/persona-icon
```

## Usage

### Using SVG

<preview>
  <img :src="IconURL" />
</preview>

```vue
<template>
  <img :src="IconURL" />
</template>

<script setup lang="ts">
import IconURL from '@privyid/persona-icon/svg/broom/32.svg'
</script>
```

### Using Vue Component

<preview>
  <IconBroom />
</preview>

```vue
<template>
  <IconBroom />
</template>

<script setup lang="ts">
import IconBroom from '@privyid/persona-icon/vue/broom/32.vue'
</script>
```

## Nuxt 3

Add this to your `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: [
    '@privyid/persona-icon'
  ]
})
```

All icons will auto-imported with format `pi-[name]-[size]`

```vue
<template>
  <pi-broom-32 />
</template>
```
