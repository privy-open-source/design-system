---
title: Getting Started · Icons
description: Official Persona icon pack installation guide
---

<script setup>
import Icon16 from '@privyid/persona-icon/svg/persona/16.svg'
import Icon20 from '@privyid/persona-icon/svg/persona/20.svg'
import Icon24 from '@privyid/persona-icon/svg/persona/24.svg'
import Icon32 from '@privyid/persona-icon/svg/persona/32.svg'
import IconPersona from '@privyid/persona-icon/vue/persona/32.vue'
</script>

# Getting Started

> Official Persona icon pack installation guide

## Installation

```sh
yarn add @privyid/persona-icon
```

## Usage

### Using SVG

<preview>
  <img :src="Icon32" />
</preview>

```vue
<template>
  <img :src="IconURL" />
</template>

<script setup lang="ts">
import IconURL from '@privyid/persona-icon/svg/persona/32.svg'
</script>
```

### Using Vue Component

<preview>
  <IconPersona />
</preview>

```vue
<template>
  <IconPersona />
</template>

<script setup lang="ts">
import IconPersona from '@privyid/persona-icon/vue/persona/32.vue'
</script>
```

## Sizing

There are 4 avaiables size for all icons: `16`, `20`, `24`, and `32`.
It work for both vue or svg version.

<preview class="space-x-4">
  <img :src="Icon16" />
  <img :src="Icon20" />
  <img :src="Icon24" />
  <img :src="Icon32" />
</preview>

```vue
<template>
  <img :src="Icon16" />
  <img :src="Icon20" />
  <img :src="Icon24" />
  <img :src="Icon32" />
</template>

<script setup lang="ts">
import Icon16 from '@privyid/persona-icon/svg/persona/16.svg'
import Icon20 from '@privyid/persona-icon/svg/persona/20.svg'
import Icon24 from '@privyid/persona-icon/svg/persona/24.svg'
import Icon32 from '@privyid/persona-icon/svg/persona/32.svg'
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
