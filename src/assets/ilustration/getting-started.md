---
title: Getting Started · Icons
description: Official Persona icon pack installation guide
---

<script setup>
import '@privyid/persona-icon/font/persona-icon.css'
import ImgDS from '@privyid/persona-ilustration/svg/privy-app/dot-small.svg'
import ImgDL from '@privyid/persona-ilustration/svg/privy-app/dot-large.svg'
import ImgS from '@privyid/persona-ilustration/svg/privy-app/spot.svg'
import ImgSHM from '@privyid/persona-ilustration/svg/privy-app/spot-hero-small.svg'
import ImgSHL from '@privyid/persona-ilustration/svg/privy-app/spot-hero-large.svg'

import ImgPNG from '@privyid/persona-ilustration/png/privy-app/spot.png'
import ImgPNGx2 from '@privyid/persona-ilustration/png/privy-app/spot@2x.png'

import pilIdFaceSpot from '@privyid/persona-ilustration/vue/id-face/spot.vue'
import pilPageNotFoundSpotHeroLarge from '@privyid/persona-ilustration/vue/page-not-found/spot-hero-large.vue'
</script>

# Getting Started

> Official Persona ilustration pack installation guide

## Installation

```sh
yarn add @privyid/persona-ilustration
```

## Usage

### Using as SVG

To use original svg file, you can manually import from `@privyid/persona-ilustration/svg/[name]/[size].svg`

<preview>
  <img :src="ImgS" />
</preview>

```vue
<template>
  <img :src="ImgURL" />
</template>

<script setup lang="ts">
import ImgURL from '@privyid/persona-ilustration/svg/privy-app/spot.svg'
</script>
```

### Using as PNG

Ilustration also available in PNG format, you can import from `@privyid/persona-ilustration/png/[name]/[size].png`

<preview>
  <img :src="ImgPNG" :srcset="`${ImgPNGx2} 2x`" />
</preview>

```vue
<template>
  <img :src="ImgURL" :srcset="`${ImgURLx2} 2x`" />
</template>

<script setup lang="ts">
import ImgURL from '@privyid/persona-ilustration/png/privy-app/spot.png'
import ImgURLx2 from '@privyid/persona-ilustration/png/privy-app/spot@2x.png'
</script>
```

### Using as Vue Component

To use original svg file, you can manually import from `@privyid/persona-ilustration/svg/[name]/[size].svg`

<preview>
  <pilIdFaceSpot />
</preview>

```vue
<template>
  <ImgIdFace />
</template>

<script setup lang="ts">
import ImgIdFace from '@privyid/persona-ilustration/vue/id-face/spot.vue'
</script>
```

## Sizing

There are 5 avaiables size for all icons: `dot-small`, `dot-large`, `spot`, `spot-hero-small`, `spot-hero-large`.

It's work for both vue or svg version.

<preview>
  <div class="flex flex-grow w-full overflow-auto">
    <img :src="ImgDS" />
    <img :src="ImgDL" />
    <img :src="ImgS" />
    <img :src="ImgSHM" />
    <img :src="ImgSHL" />
  </div>
</preview>

```vue
<template>
  <img :src="ImgDS" />
  <img :src="ImgDL" />
  <img :src="ImgS" />
  <img :src="ImgSHM" />
  <img :src="ImgSHL" />
</template>

<script setup lang="ts">
import ImgDS from '@privyid/persona-ilustration/svg/privy-app/dot-small.svg'
import ImgDL from '@privyid/persona-ilustration/svg/privy-app/dot-large.svg'
import ImgS from '@privyid/persona-ilustration/svg/privy-app/spot.svg'
import ImgSHM from '@privyid/persona-ilustration/svg/privy-app/spot-hero-small.svg'
import ImgSHL from '@privyid/persona-ilustration/svg/privy-app/spot-hero-large.svg'
</script>
```

## Nuxt 3

Add this to your `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: [
    '@privyid/persona-ilustration'
  ]
})
```

All ilustrations will auto-imported with format `pil-[name]-[size]`

<preview>
  <pil-page-not-found-spot-hero-large />
</preview>

```vue
<template>
  <pil-page-not-found-spot-hero-large />
</template>
```
