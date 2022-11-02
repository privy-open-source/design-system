<script setup>
  import pBanner from './Banner.vue'
  import pButton from '../button/Button.vue'
</script>

# Banner

## Usage

### Simple usage

<preview class="flex-col">
  <p-banner>
    Your enterprise Privy Balance is running out. Please topup now.
  </p-banner>
</preview>

```vue
<template>
  <p-banner>
    Your enterprise Privy Balance is running out. Please topup now.
  </p-banner>
</template>
```

### with Title

<preview class="flex-col">
  <p-banner>
    <div class="font-semibold">
      Your enterprise Privy Balance is running out. Please topup now.
    </div>
    <div class="text-sm">
      Your enterprise Privy Balance is running out. Please topup now.
    </div>
  </p-banner>
</preview>

```vue
<template>
  <p-banner>
    <div class="font-semibold">
      Your enterprise Privy Balance is running out. Please topup now.
    </div>
    <div class="text-sm">
      Your enterprise Privy Balance is running out. Please topup now.
    </div>
  </p-banner>
</template>
```

### with Title + Button

<preview class="flex-col">
  <p-banner>
    <div class="font-semibold">
      Your enterprise Privy Balance is running out. Please topup now.
    </div>
    <div class="text-sm">
      Your enterprise Privy Balance is running out. Please topup now.
    </div>
    <div class="mt-3">
      <p-button variant="outline">Top Up Balance</p-button>
      <p-button variant="link" color="secondary">Learn More</p-button>
    </div>
  </p-banner>
</preview>

```vue
<template>
  <p-banner>
    <div class="font-semibold">
      Your enterprise Privy Balance is running out. Please topup now.
    </div>
    <div class="text-sm">
      Your enterprise Privy Balance is running out. Please topup now.
    </div>
    <div class="mt-3">
      <p-button variant="outline">Top Up Balance</p-button>
      <p-button variant="link" color="secondary">Learn More</p-button>
    </div>
  </p-banner>
</template>
```

## Variants

Banner have 2 variants: `info` and `danger`, default is `info`

<preview class="flex-col space-y-3">
  <p-banner variant="info">Your enterprise Privy Balance is running out. Please topup now.</p-banner>
  <p-banner variant="danger">Your enterprise Privy Balance is running out. Please topup now.</p-banner>
</preview>

```vue
<template>
  <p-banner variant="info">
    Your enterprise Privy Balance is running out. Please topup now.
  </p-banner>
  <p-banner variant="danger">
    Your enterprise Privy Balance is running out. Please topup now.
  </p-banner>
</template>
```

## Hide close button

You can hide close button with `dismissable` set to `false`

<preview class="flex-col">
  <p-banner :dismissable="false">Your enterprise Privy Balance is running out. Please topup now.</p-banner>
</preview>

```vue
<template>
  <p-banner :dismissable="false">
    Your enterprise Privy Balance is running out. Please topup now.
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
