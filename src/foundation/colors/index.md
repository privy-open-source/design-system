---
title: Colors · Foundation
description: Collections of colors library
---

<script setup>
  import Colors from './Colors.vue'
  import pCaption from '../../components/caption/Caption.vue'
  import pHeading from '../../components/heading/Heading.vue'
  import pText from '../../components/text/Text.vue'
  import { ref, computed } from "vue-demi"
  import items from './Colors.json'
</script>

# Colors
Persona use design tokens to collaborate between UI/UX designers and engineers. Design token is a way to manage user interface data such as color, spacing, shadow, etc. by storing it in a variable. The goal is to build a cross platform user interface.

## Colors Tokens

<div class="pb-8 pt-20 space-y-1">
  <p-heading element="h5" class="mb-0">Main</p-heading>
  <p-caption class="!text-lightblue-50">token-name</p-caption>
  <p-caption class="!text-subtle dark:!text-dark-subtle">figma-style-name</p-caption>
  <p-caption class="!text-subtle dark:!text-dark-subtle" weight="bold">hex</p-caption>
</div>

<div class="pb-8 mt-8">
  <template v-for="item of items.palletes">
    <Colors :item="item">
      {{ item.title }}
    </Colors>
  </template>
</div>

## Colors Semantics
In the development process, to maintain consistency, everything related to color must use color semantics. Because semantic colors are very easy to maintain. If at any time the parent-color-token of the semantic color changes, there is no need to change the code that has been written.

<div class="pb-8 pt-20 space-y-1">
  <p-heading element="h5" class="mb-0">Semantics</p-heading>
  <p-caption class="!text-lightblue-50">token-name</p-caption>
  <p-caption class="!text-subtle dark:!text-dark-subtle">figma-style-name</p-caption>
  <p-caption class="!text-subtle dark:!text-dark-subtle" weight="bold">parent-token-name</p-caption>
</div>

### Brand
Mostly used on logo and button cta

<p-text variant="subheading" class="block ml-24 pt-8">
  Light
</p-text>
<div class="pb-8">
  <template v-for="item of items.brandlight">
    <Colors :item="item">
      {{ item.title }}
    </Colors>
  </template>
</div>

<p-text variant="subheading" class="block ml-24 pt-8">
  Dark
</p-text>
<div class="pb-8">
  <template v-for="item of items.branddark">
    <Colors :item="item">
      {{ item.title }}
    </Colors>
  </template>
</div>

### Foregrounds
Mostly used on text and icons. 

This semantic can be written to the tailwind class with the format: `text-{semantic-foreground-name}`. Example: `text-default`. And for the dark-mode version can be written as: `text-dark-{semantic-foreground-name}`. Example `text-dark-default`.

<p-text variant="subheading" class="block ml-24 pt-8">
  Light
</p-text>
<div class="pb-8">
  <template v-for="item of items.foregrounds">
    <Colors :item="item">
      {{ item.title }}
    </Colors>
  </template>
</div>

<p-text variant="subheading" class="block ml-24 pt-8">
  Dark
</p-text>
<div class="pb-8">
  <template v-for="item of items.foregroundsdark">
    <Colors :item="item">
      {{ item.title }}
    </Colors>
  </template>
</div>

### Backgrounds
Mostly used on cards or overlay.

Semantic background can be written to the tailwind class with the format: `bg-{semantic-background-name}`. Example: `bg-default`. And for the dark-mode version can be written as: `bg-dark-{semantic-background-name}`. Example `bg-dark-default`.

<p-text variant="subheading" class="block ml-24 pt-8">
  Light
</p-text>
<div class="pb-8">
  <template v-for="item of items.backgrounds">
    <Colors :item="item">
      {{ item.title }}
    </Colors>
  </template>
</div>

<p-text variant="subheading" class="block ml-24 pt-8">
  Dark
</p-text>
<div class="pb-8">
  <template v-for="item of items.backgroundsdark">
    <Colors :item="item">
      {{ item.title }}
    </Colors>
  </template>
</div>

### Borders
Mostly used on cards and form OR as divider beetween section such as data table.

This semantic can be written to the tailwind class with the format: `border-{semantic-border-name}`. Example: `border-default`. And for the dark-mode version can be written as: `border-dark-{semantic-border-name}`. Example `border-dark-default`.

<p-text variant="subheading" class="block ml-24 pt-8">
  Light
</p-text>
<div class="pb-8 mt-8">
  <template v-for="item of items.borders">
    <Colors :item="item">
      {{ item.title }}
    </Colors>
  </template>
</div>

<p-text variant="subheading" class="block ml-24 pt-8">
  Dark
</p-text>
<div class="pb-8 mt-8">
  <template v-for="item of items.bordersdark">
    <Colors :item="item">
      {{ item.title }}
    </Colors>
  </template>
</div>
