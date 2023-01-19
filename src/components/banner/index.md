---
title: Banner · Components
description: Alert to convey information or actions
---

<script setup>
  import pBanner from './Banner.vue'
  import pButton from '../button/Button.vue'
  import pCaption from '../caption/Caption.vue'
  import pSubheading from '../subheading/Subheading.vue'
</script>

# Banner

> Alert to convey information or actions

## Usage

### Simple usage

<preview class="flex-col">
  <p-banner>
    Every sign will requires privy balance.
    Please make sure you have enough privy balance
    before sign the document(s)
  </p-banner>
</preview>

```vue
<template>
  <p-banner>
    Every sign will requires privy balance.
    Please make sure you have enough privy balance
    before sign the document(s)
  </p-banner>
</template>
```

### With title

<preview class="flex-col">
  <p-banner>
    <p-subheading>
      Your enterprise Privy Balance is running out.
    </p-subheading>
    <div class="text-sm">
      Every sign will requires privy balance. Please make sure you have enough privy balance before sign the document(s)
    </div>
  </p-banner>
</preview>

```vue
<template>
  <p-banner>
    <p-subheading>
      Your enterprise Privy Balance is running out.
    </p-subheading>
    <div class="text-sm">
      Every sign will requires privy balance. Please make sure you have enough privy balance before sign the document(s)
    </div>
  </p-banner>
</template>
```

### With title and button

<preview class="flex-col">
  <p-banner>
    <p-subheading>
      Your enterprise Privy Balance is running out.
    </p-subheading>
    <div class="text-sm">
      Every sign will requires privy balance.
      Please make sure you have enough privy balance
      before sign the document(s)
    </div>
    <div class="mt-3">
      <p-button variant="outline" size="sm">Top Up Balance</p-button>
      <p-button variant="link">Learn More</p-button>
    </div>
  </p-banner>
</preview>

```vue
<template>
  <p-banner>
    <p-subheading>
      Your enterprise Privy Balance is running out.
    </p-subheading>
    <div class="text-sm">
      Every sign will requires privy balance.
      Please make sure you have enough privy balance
      before sign the document(s)
    </div>
    <div class="mt-3">
      <p-button variant="outline" size="sm">Top Up Balance</p-button>
      <p-button variant="link">Learn More</p-button>
    </div>
  </p-banner>
</template>
```

## Variants

Banner have 2 variants: `info` and `danger`, default is `info`

<preview class="flex-col space-y-3">
  <p-banner variant="info">
    Every sign will requires privy balance.
    Please make sure you have enough privy balance
    before sign the document(s)
  </p-banner>
  <p-banner variant="danger">
    Every sign will requires privy balance.
    Please make sure you have enough privy balance
    before sign the document(s)
  </p-banner>
</preview>

```vue
<template>
  <p-banner variant="info">
    Every sign will requires privy balance.
    Please make sure you have enough privy balance
    before sign the document(s)
  </p-banner>
  <p-banner variant="danger">
    Every sign will requires privy balance.
    Please make sure you have enough privy balance
    before sign the document(s)
  </p-banner>
</template>
```

## Hide close button

You can hide close button with `dismissable` set to `false`

<preview class="flex-col">
  <p-banner :dismissable="false">
    Every sign will requires privy balance.
    Please make sure you have enough privy balance
    before sign the document(s)
  </p-banner>
</preview>

```vue
<template>
  <p-banner :dismissable="false">
    Every sign will requires privy balance.
    Please make sure you have enough privy balance
    before sign the document(s)
  </p-banner>
</template>
```

## API

### Props

| Props         |   Type    | Default | Description                                     |
|---------------|:---------:|:-------:|-------------------------------------------------|
| `variant`     | `String`  | `info`  | Banner variant, valid value is `info`, `danger` |
| `dismissable` | `Boolean` | `true`  | Show / Hide dismiss button                      |

### Slots

| Name      | Description                |
|-----------|----------------------------|
| `default` | Content to place in banner |

### Events

| Name        | Arguments | Description                     |
|-------------|-----------|---------------------------------|
| `dismissed` | -         | Event when close button clicked |
