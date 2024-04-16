---
title: Markdown · Components
description: Like v-html but support markdown syntax.
---

<script setup>
  import { vPMd } from '.'
  import pTextarea from '../textarea/Textarea.vue'
  import { ref } from 'vue-demi'

  const text = ref('# Hello World\n> This is markdown')
</script>

# Markdown

> Like v-html but support markdown syntax

## Usage

### Simple Usage
<preview>
  <div v-p-md="'**Hello** _World_, I\'m using `Markdown`'" />
</preview>

```vue
<template>
  <div v-p-md="'**Hello** _World_, I\'m using `Markdown`'" />
</template>

<script setup>
  import { vPMd } from '@privyid/persona/directive'
</script>
```

### Simple MD Editor

<preview class="flex-col">
  <div class="flex flex-col w-full space-y-4">
    <p-textarea auto-grow v-model="text" />
    <div v-p-md="text" />
  </div>
</preview>

```vue
<template>
  <div class="flex flex-col w-full space-y-4">
    <p-textarea auto-grow v-model="text" />
    <div v-p-md="text" />
  </div>
</template>

<script setup>
  import { vPMd } from '@privyid/persona/directive'
</script>
```

## Inline Parsing

Add modifier `.inline` to enable inline parsing. This suit for inline element like `<p>` or `<span>`

```js
/* default parsing */
'**strong** _em_' 👉 `<p><strong>strong</strong> <em>em</em></p>`

/* Inline parsing */
'**strong** _em_' 👉 `<strong>strong</strong> <em>em</em>`
```
Check [this](https://marked.js.org/using_advanced#inline) for more information.

<preview class="flex-col">
  <span v-p-md.inline="'**Hello** _World_, I\'m using `Markdown`'" />
</preview>

```vue
<template>
  <span v-p-md.inline="'**Hello** _World_, I\'m using `Markdown`'" />
</template>

<script setup>
  import { vPMd } from '@privyid/persona/directive'
</script>
```

## API

### Modifiers

| Modifiers  | Description                       |
|------------|-----------------------------------|
| `inline`   | Enable inline parsing             |
| `escape`   | Enable HTML Escape before parsing |
| `unsecure` | Parsing without HTML Sanitize     |
