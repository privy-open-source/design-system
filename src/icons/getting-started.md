---
title: Getting Started · Icons
description: Official Persona icon pack installation guide
---

<script setup>
import '@privyid/persona-icon/font/persona-icon.css'
import Icon16 from '@privyid/persona-icon/svg/persona/16.svg'
import Icon20 from '@privyid/persona-icon/svg/persona/20.svg'
import Icon24 from '@privyid/persona-icon/svg/persona/24.svg'
import Icon32 from '@privyid/persona-icon/svg/persona/32.svg'
import IconPersona from '@privyid/persona-icon/vue/persona/32.vue'

import PiBroom32 from '@privyid/persona-icon/vue/broom/32.vue'
import PiDocumentCheck16 from '@privyid/persona-icon/vue/document-check/16.vue'
import PiBannedSolid16 from '@privyid/persona-icon/vue/banned-solid/16.vue'
</script>

# Getting Started

> Official Persona icon pack installation guide

## Installation

```sh
yarn add @privyid/persona-icon
```

## Usage

### Using as SVG

To use original svg file, you can manually import from `@privyid/persona-icon/svg/[icon-name]/[size].svg`

<preview>
  <img class="dark:invert" :src="Icon32" />
</preview>

```vue
<template>
  <img class="dark:invert" :src="IconURL" />
</template>

<script setup lang="ts">
import IconURL from '@privyid/persona-icon/svg/persona/32.svg'
</script>
```

### Using as Vue Component

To use original svg file, you can manually import from `@privyid/persona-icon/svg/[icon-name]/[size].svg`

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

### Using as Fonticon

To use as font icon, you need include the css `@privyid/persona-icon/font/persona-icon.css`.

<preview>
  <p><i class="pi-persona" />Hello World</p>
</preview>

```vue
<template>
  <p><i class="pi-persona" />Hello World</p>
</template>

<script setup lang="ts">
import '@privyid/persona-icon/font/persona-icon.css'
</script>
```

## Sizing

There are 4 avaiables size for all icons: `16`, `20`, `24`, and `32`.
It work for both vue or svg version.

<preview class="space-x-4">
  <img class="dark:invert" :src="Icon16" />
  <img class="dark:invert" :src="Icon20" />
  <img class="dark:invert" :src="Icon24" />
  <img class="dark:invert" :src="Icon32" />
</preview>

```vue
<template>
  <img class="dark:invert" :src="Icon16" />
  <img class="dark:invert" :src="Icon20" />
  <img class="dark:invert" :src="Icon24" />
  <img class="dark:invert" :src="Icon32" />
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

All icons will auto-imported with format `pi-[icon-name]-[size]`

<preview class="space-x-4">
  <pi-broom-32 />
  <pi-document-check-16 />
  <pi-banned-solid-16 />
</preview>

```vue
<template>
  <pi-broom-32 />
  <pi-document-check-16 />
  <pi-banned-solid-16 />
</template>
```

### Enable Fonticon

We not recommended to use fonticon because cannot be tree-shaking. But if you want to enable, set `font: true` in your `nuxt.config.ts`.

```ts
export default defineNuxtConfig({
  modules: [
    '@privyid/persona-icon'
  ],
  personaIcon: {  // [!code ++]
    font: true    // [!code ++]
  },              // [!code ++]
})
```
