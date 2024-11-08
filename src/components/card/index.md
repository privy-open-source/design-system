---
title: Card · Components
description: Take picture from user's camera
---

<script setup>
  import pCard from './Card.vue'
  import pButton from '../button/Button.vue'
  import pCardSection from './CardSection.vue'
</script>

<style scoped lang="postcss">
  .preview {
    @apply block;

    p {
      @apply p-0;
    }

    .card {
      @apply mb-6;
    }

    h1, h2, h3, h4, h5, h6 {
      @apply mt-0;
      font-weight: inherit;
    }

    h2 {
      @apply m-0 p-0 border-b-0;
    }
  }
</style>

# Card

> Base card container

## Usage

### Basic Usage

<preview>
  <p-card>
    While here you will see the content of cards, everything goes here.
    If you need custom cards, take the component which more represent to
    what you need and detach it.
  </p-card>
</preview>

```vue
<template>
  <p-card>
    While here you will see the content of cards, everything goes here.
    If you need custom cards, take the component which more represent to
    what you need and detach it.
  </p-card>
</template>
```

### Card with Header
<preview>
  <p-card
    title="Any Title Should Here">
    While here you will see the content of cards, everything goes here.
    If you need custom cards, take the component which more represent to
    what you need and detach it.
  </p-card>
  <p-card
    title="Any Title Should Here">
    <template #action>
      <p-button color="info" variant="link" style="--p-button-md-padding-y:0; --p-button-md-padding-x:0;">Button Text</p-button>
    </template>
    While here you will see the content of cards, everything goes here.
    If you need custom cards, take the component which more represent to
    what you need and detach it.
  </p-card>
</preview>

```vue
<template>
  <p-card
    title="Any Title Should Here">
    While here you will see the content of cards, everything goes here.
    If you need custom cards, take the component which more represent to
    what you need and detach it.
  </p-card>
  <p-card
    title="Any Title Should Here">
    <template #action>
      <p-button color="info" variant="link">Button Text</p-button>
    </template>
    While here you will see the content of cards, everything goes here.
    If you need custom cards, take the component which more represent to
    what you need and detach it.
  </p-card>
</template>
```

### Card with Footer
<preview>
  <p-card
    title="Any Title Should Here">
    While here you will see the content of cards, everything goes here.
    If you need custom cards, take the component which more represent to
    what you need and detach it.
    <template #footer>
      <p-button variant="outline" color="info">Enable Sample Button</p-button>
      <p-button variant="link" color="info">Button Text</p-button>
    </template>
  </p-card>
</preview>

```vue
<template>
  <p-card
    title="Any Title Should Here">
    While here you will see the content of cards, everything goes here.
    If you need custom cards, take the component which more represent to
    what you need and detach it.
    <template #footer>
      <p-button variant="outline" color="info">Enable Sample Button</p-button>
      <p-button variant="link" color="info">Button Text</p-button>
    </template>
  </p-card>
</template>
```

## Sectioned
<preview>
  <p-card
    title="Card with Section"
    sectioned>
    <p-card-section>
      While here you will see the content of cards, everything goes here.
      If you need custom cards, take the component which more represent to
      what you need and detach it.
    </p-card-section>
    <p-card-section
      title="Subtitle supposedly here">
      <template #action>
        <a href="#" class="underline text-link dark:text-dark-link">Edit</a>
      </template>
      While here you will see the content of cards, everything goes here.
      If you need custom cards, take the component which more represent to
      what you need and detach it.
    </p-card-section>
  </p-card>

  <p-card
    title="Card with Sub-Section"
    sectioned>
    <template #action>
      <p-button variant="link" color="info" style="--p-button-md-padding-y:0; --p-button-md-padding-x:0;">Button Text</p-button>
    </template>
    <p-card-section>
      While here you will see the content of cards, everything goes here.
      If you need custom cards, take the component which more represent to
      what you need and detach it.
    </p-card-section>
    <p-card-section
      title="Subtitle supposedly here">
      While here you will see the content of cards, everything goes here.
      If you need custom cards, take the component which more represent to
      what you need and detach it.
      <p-card-section>
        While here you will see the content of cards, everything goes here.
        If you need custom cards, take the component which more represent to
        what you need and detach it.
      </p-card-section>
    </p-card-section>
  </p-card>
</preview>

```vue
<template>
  <p-card
    title="Card Section"
    sectioned>
    <p-card-section>
      While here you will see the content of cards, everything goes here.
      If you need custom cards, take the component which more represent to
      what you need and detach it.
    </p-card-section>
    <p-card-section
      title="Subtitle supposedly here">
      <template #action>
        <a href="#" class="underline text-link dark:text-dark-link">Edit</a>
      </template>
      While here you will see the content of cards, everything goes here.
      If you need custom cards, take the component which more represent to
      what you need and detach it.
    </p-card-section>
  </p-card>

  <p-card
    title="Card Sub-Section"
    sectioned>
    <template #action>
      <p-button variant="link" color="info">Button Text</p-button>
    </template>
    <p-card-section>
      While here you will see the content of cards, everything goes here.
      If you need custom cards, take the component which more represent to
      what you need and detach it.
    </p-card-section>
    <p-card-section
      title="Subtitle supposedly here">
      While here you will see the content of cards, everything goes here.
      If you need custom cards, take the component which more represent to
      what you need and detach it.
      <p-card-section>
        While here you will see the content of cards, everything goes here.
        If you need custom cards, take the component which more represent to
        what you need and detach it.
      </p-card-section>
    </p-card-section>
  </p-card>
</template>
```

## Disabled
When the `disabled` prop is set to true, the card component will visually indicate that it is disabled.
These state are works in `<p-card-section>` too.
<preview>
  <p-card
    disabled
    title="Judul apapun seharusnya disini">
    Ketika Anda berada di sini, Anda akan melihat konten kartu-kartu, semuanya tersedia di sini. Jika Anda membutuhkan kartu-kartu khusus, ambillah komponen yang paling sesuai dengan kebutuhan Anda dan lepaskan.
  </p-card>
</preview>

```vue
<template>
  <p-card
    disabled
    title="Judul apapun seharusnya disini">
    Ketika Anda berada di sini, Anda akan melihat konten kartu-kartu, 
    semuanya tersedia di sini. Jika Anda membutuhkan kartu-kartu khusus, 
    ambillah komponen yang paling sesuai dengan kebutuhan Anda dan lepaskan.
  </p-card>
</template>
```

## Readonly
Card also has readonly state. The card background will visually change if the `readonly` prop is set to true.
These state are also work in `<p-card-section>`.
<preview>
  <p-card
    title="Card with Section"
    sectioned>
    <p-card-section>
      While here you will see the content of cards, everything goes here.
      If you need custom cards, take the component which more represent to
      what you need and detach it.
    </p-card-section>
    <p-card-section
      title="Subtitle supposedly here"
      readonly>
      <template #action>
        <a href="#" class="underline text-link dark:text-dark-link">Edit</a>
      </template>
      While here you will see the content of cards, everything goes here.
      If you need custom cards, take the component which more represent to
      what you need and detach it.
    </p-card-section>
  </p-card>
</preview>

```vue
<template>
  <p-card
    title="Card with Section"
    sectioned>
    <p-card-section>
      While here you will see the content of cards, everything goes here.
      If you need custom cards, take the component which more represent to
      what you need and detach it.
    </p-card-section>
    <p-card-section
      title="Subtitle supposedly here"
      readonly>
      <template #action>
        <a href="#" class="underline text-link dark:text-dark-link">Edit</a>
      </template>
      While here you will see the content of cards, everything goes here.
      If you need custom cards, take the component which more represent to
      what you need and detach it.
    </p-card-section>
  </p-card>
</template>
```

## Callout
<preview>
  <p-card
    title="Hello and Happy New Year!"
    element="div"
    callout>
    <div class="flex items-start space-x-8">
      <div class="w-3/4">
        What amazing growth you achieved this year, Tarjono! You deserve
        every bit of it and we’re sure you’ll do even better next year.
        There’s a 30% membership renewal discount waiting for you when you come back.
        <div class="pt-8">
          <p-button variant="outline" color="secondary">Collect Discount</p-button>
          <p-button variant="link" color="info">Learn More</p-button>
        </div>
      </div>
      <div class="w-1/4">
        <img src="/assets/images/img-card-callout-01.svg">
      </div>
    </div>
  </p-card>
</preview>

```vue
<template>
  <p-card
    title="Hello and Happy New Year!"
    element="div"
    callout>
    <div class="flex items-start space-x-8">
      <div class="w-3/4">
        What amazing growth you achieved this year, Tarjono! You deserve
        every bit of it and we’re sure you’ll do even better next year.
        There’s a 30% membership renewal discount waiting for you when you come back.
        <div class="pt-8">
          <p-button variant="outline" color="secondary">Collect Discount</p-button>
          <p-button variant="link" color="info">Learn More</p-button>
        </div>
      </div>
      <div class="w-1/4">
        <img src="/assets/images/img-card-callout-01.svg">
      </div>
    </div>
  </p-card>
</template>
```

## Spacing
Card component features 4 distinct spacing variants that adjust the size and 
layout of the content within the card body. Each variant is designed to offer 
flexibility in presentation and to suit different design needs. 
There are `sm`, `md`, `lg` and `xl`. Default spacing are `md`.
The spacing feature also work in `Sectioned card`.

<preview>
  <p-card spacing="sm">
    While here you will see the content of cards, everything goes here.
    If you need custom cards, take the component which more represent to
    what you need and detach it.
  </p-card>
  <p-card spacing="md">
    While here you will see the content of cards, everything goes here.
    If you need custom cards, take the component which more represent to
    what you need and detach it.
  </p-card>
  <p-card spacing="lg">
    While here you will see the content of cards, everything goes here.
    If you need custom cards, take the component which more represent to
    what you need and detach it.
  </p-card>
  <p-card spacing="xl">
    While here you will see the content of cards, everything goes here.
    If you need custom cards, take the component which more represent to
    what you need and detach it.
  </p-card>
</preview>

```vue
<template>
  <p-card spacing="sm">
    While here you will see the content of cards, everything goes here.
    If you need custom cards, take the component which more represent to
    what you need and detach it.
  </p-card>
  <p-card spacing="md">
    While here you will see the content of cards, everything goes here.
    If you need custom cards, take the component which more represent to
    what you need and detach it.
  </p-card>
  <p-card spacing="lg">
    While here you will see the content of cards, everything goes here.
    If you need custom cards, take the component which more represent to
    what you need and detach it.
  </p-card>
  <p-card spacing="xl">
    While here you will see the content of cards, everything goes here.
    If you need custom cards, take the component which more represent to
    what you need and detach it.
  </p-card>
</template>
```

## Variables
Card use local CSS variables on `.card` for enhanced real-time customization.

```sass
--p-card-border-radius: theme(borderRadius.md);
--p-card-inside-border-radius: theme(borderRadius.DEFAULT);
--p-card-bg: theme(backgroundColor.default.DEFAULT);
--p-card-bg-dark: theme(backgroundColor.dark.default.DEFAULT);
--p-card-border: theme(borderColor.default.DEFAULT);
--p-card-border-dark: theme(borderColor.default.DEFAULT);
--p-card-color: theme(textColor.default);
--p-card-color-dark: theme(textColor.dark.default);
```

## API

### Props `<p-card>`

| Props         |   Type    |  Default  | Description                                                  |
|---------------|:---------:|:---------:|--------------------------------------------------------------|
| `element`     | `String`  | `section` | Card element, valid value are `div`, `section` and `article` |
| `title`       | `String`  |     -     | Card Header Title                                            |
| `sectioned`   | `Boolean` |  `false`  | Enable Card Section                                          |
| `disabled`    | `Boolean` |  `false`  | Disable (look-like) Card                                     |
| `readonly`    | `Boolean` |  `false`  | Readonly (look-like) Card                                    |
| `callout`     | `Boolean` |  `false`  | Enable Callout                                               |
| `dismissable` | `Boolean` |  `true`   | Show / Hide dismiss button                                   |
| `spacing`     | `String`  |  `md`     | Card spacing, valid value are `sm`, `md`, `lg` and `xl`      |

### Props `<p-card-section>`

| Props         |   Type    |  Default  | Description                                                  |
|---------------|:---------:|:---------:|--------------------------------------------------------------|
| `title`       | `String`  |     -     | Card Header Title                                            |
| `disabled`    | `Boolean` |  `false`  | Disable (look-like) Card                                     |
| `readonly`    | `Boolean` |  `false`  | Readonly (look-like) Card                                    |

### Slots
| Name      | Description                                                                                      |
|-----------|--------------------------------------------------------------------------------------------------|
| `action ` | Action (permalink or button) to place in Card/Card-Section Header just if `header` slot inactive |
| `header ` | Content (in the form of— permalink or button) to place in Card/Card-Section Header               |
| `footer ` | Content (in the form of— permalink or button) to place in Card/Card-Section Footer               |

### Events


| Name        | Arguments | Description                     |
|-------------|-----------|---------------------------------|
| `dismissed` | -         | Event when close button clicked |
