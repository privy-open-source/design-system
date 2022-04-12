<script setup>
  import Banner from './Banner.vue'
  import Button from '../button/Button.vue'
</script>

# Banner

## Usage

### Simple usage

<preview class="flex-col">
  <Banner>
    Your enterprise Privy Balance is running out. Please topup now.
  </Banner>
</preview>

```vue
<template>
  <Banner>
    Your enterprise Privy Balance is running out. Please topup now.
  </Banner>
</template>
```

### with Title

<preview class="flex-col">
  <Banner>
    <div class="font-semibold">
      Your enterprise Privy Balance is running out. Please topup now.
    </div>
    <div class="text-sm">
      Your enterprise Privy Balance is running out. Please topup now.
    </div>
  </Banner>
</preview>

```vue
<template>
  <Banner>
    <div class="font-semibold">
      Your enterprise Privy Balance is running out. Please topup now.
    </div>
    <div class="text-sm">
      Your enterprise Privy Balance is running out. Please topup now.
    </div>
  </Banner>
</template>
```

### with Title + Button

<preview class="flex-col">
  <Banner>
    <div class="font-semibold">
      Your enterprise Privy Balance is running out. Please topup now.
    </div>
    <div class="text-sm">
      Your enterprise Privy Balance is running out. Please topup now.
    </div>
    <div class="mt-3">
      <Button variant="outline">Top Up Balance</Button>
      <Button variant="link" color="secondary">Learn More</Button>
    </div>
  </Banner>
</preview>

```vue
<template>
  <Banner>
    <div class="font-semibold">
      Your enterprise Privy Balance is running out. Please topup now.
    </div>
    <div class="text-sm">
      Your enterprise Privy Balance is running out. Please topup now.
    </div>
    <div class="mt-3">
      <Button variant="outline">Top Up Balance</Button>
      <Button variant="link" color="secondary">Learn More</Button>
    </div>
  </Banner>
</template>
```

## Variants

Banner have 2 variants: `info` and `danger`, default is `info`

<preview class="flex-col gap-3">
  <Banner variant="info">Your enterprise Privy Balance is running out. Please topup now.</Banner>
  <Banner variant="danger">Your enterprise Privy Balance is running out. Please topup now.</Banner>
</preview>

```vue
<template>
  <Banner variant="info">
    Your enterprise Privy Balance is running out. Please topup now.
  </Banner>
  <Banner variant="danger">
    Your enterprise Privy Balance is running out. Please topup now.
  </Banner>
</template>
```

## Hide close button

You can hide close button with `dismissable` set to `false`

<preview class="flex-col">
  <Banner :dismissable="false">Your enterprise Privy Balance is running out. Please topup now.</Banner>
</preview>

```vue
<template>
  <Banner :dismissable="false">
    Your enterprise Privy Balance is running out. Please topup now.
  </Banner>
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
