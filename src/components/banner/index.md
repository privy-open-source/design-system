---
title: Banner · Components
description: Alert to convey information or actions
---

<script setup>
  import pBanner from './Banner.vue'
  import pButton from '../button/Button.vue'
  import pCaption from '../caption/Caption.vue'
  import pSubheading from '../subheading/Subheading.vue'
  import IconCheck from '@privyid/persona-icon/vue/checkmark-circle-solid/20.vue'
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

### Custom Icon

<preview class="flex-col">
  <p-banner>
    <template #icon>
      <IconCheck class="text-success" />
    </template>
    <span>
      Great! Your Privy ID and NPWP are verified.
    </span>
  </p-banner>
</preview>

```vue
<template>
  <p-banner>
    <template #icon>
      <IconCheck class="text-success" />
    </template>
    <span>
      Great! Your Privy ID and NPWP are verified.
    </span>
  </p-banner>

  <script setup>
  import IconCheck from '@privyid/persona-icon/vue/checkmark-circle-solid/20.vue'
  </script>
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

## No Icon
<preview class="flex-col">
  <p-banner variant="danger" :dismissable="false" noIcon>
    <p-subheading>
      Your e-Meterai balance is sufficient only for 2 placements
    </p-subheading>
    <span>
      You can continue with 2 e-Meterai or contact admin to top up then retry the process
    </span>
  </p-banner>
</preview>

```vue
<template>
  <p-banner variant="danger" :dismissable="false" noIcon>
    <p-subheading>
      Your e-Meterai balance is sufficient only for 2 placements
    </p-subheading>
    <span>
      You can continue with 2 e-Meterai or contact admin to top up then retry the process
    </span>
  </p-banner>
</template>
```

## Custom background image

<preview class="flex-col">
  <p-banner :dismissable="false" noIcon background-url="../../public/assets/images/img-banner-bg.svg">
    <span class="text-default">Buy and activate your Personal plan in <strong>Privy mobile app</strong></span>
  </p-banner>
</preview>

```vue
<template>
  <p-banner
    :dismissable="false"
    noIcon
    background-url="../assets/images/img-banner-bg.svg">
    <span class="text-default">
      Buy and activate your Personal plan in
      <strong>Privy mobile app</strong>
    </span>
  </p-banner>
</template>
```


## API

### Props

| Props               |   Type    | Default | Description                                     |
|---------------------|:---------:|:-------:|-------------------------------------------------|
| `variant`           | `String`  | `info`  | Banner variant, valid value is `info`, `danger` |
| `dismissable`       | `Boolean` | `true`  | Show / Hide dismiss button                      |
| `backgroundUrl`     | `String`  |    -    | Custom background image of banner               |
| `backgroundDarkUrl` | `String`  |    -    | Custom background image of banner in Dark Mode  |
| `backgroundOverlay` | `Boolean` | `false` | Activate background overlay of banner           |

### Slots

| Name      | Description                     |
|-----------|---------------------------------|
| `default` | Content to place in banner      |
| `icon`    | Content to place icon in banner |

### Events

| Name        | Arguments | Description                     |
|-------------|-----------|---------------------------------|
| `dismissed` | -         | Event when close button clicked |
