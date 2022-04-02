<script setup>
  import Banner from './Banner.vue'
</script>

# Banner / Alert

## Usage

### Simple Banner

<Banner>Your enterprise Privy Balance is running out. Please topup now.</Banner>

```vue
<template>
  <Banner>Your enterprise Privy Balance is running out. Please topup now.</Banner>
</template>
```

### Banner with Title

  <Banner><div class="font-semibold">Your enterprise Privy Balance is running out. Please topup now.</div><div class="text-sm">Your enterprise Privy Balance is running out. Please topup now.</div></Banner>

```vue
<template>
  <Banner>
    <div class="font-semibold">Your enterprise Privy Balance is running out. Please topup now.</div>
    <div class="text-sm">Your enterprise Privy Balance is running out. Please topup now.</div>
  </Banner>
</template>
```

## Banner Variants

Banner have 2 variants: `info` and `danger`, default is `info`

<Banner variant="info">Your enterprise Privy Balance is running out. Please topup now.</Banner>
<Banner variant="danger">Your enterprise Privy Balance is running out. Please topup now.</Banner>

```vue
<template>
  <Banner variant="info">Your enterprise Privy Balance is running out. Please topup now.</Banner>
  <Banner variant="danger">Your enterprise Privy Balance is running out. Please topup now.</Banner>
</template>
```

## Hide close button

You can hide close button with `dismissable` set to `false`

<Banner :dismissable="false">Your enterprise Privy Balance is running out. Please topup now.</Banner>

```vue
<Banner :dismissable="false">Your enterprise Privy Balance is running out. Please topup now.</Banner>
```

## API

### Props

| Props         | Type      | Default  | Description                                     |
|---------------|-----------|----------|-------------------------------------------------|
| `variant`     | `String`  | `'info'` | Banner variant, valid value is `info`, `danger` |
| `dismissable` | `Boolean` | `true`   | Show / Hide dismiss button                      |

### Slots
| Name      | Description                |
|-----------|----------------------------|
| `default` | Content to place in banner |

### Events

| Name        | Argunments | Description                     |
|-------------|------------|---------------------------------|
| `dismissed` |            | Event when close button clicked |
