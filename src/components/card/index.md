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
      <p-button color="primary" variant="link">Button Text</p-button>
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
      <p-button color="primary" variant="link">Button Text</p-button>
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
      <p-button variant="outline" color="primary">Enable Sample Button</p-button>
      <p-button variant="link" color="primary">Button Text</p-button>
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
      <p-button variant="outline" color="primary">Enable Sample Button</p-button>
      <p-button variant="link" color="primary">Button Text</p-button>
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
        <a href="#" class="underline text-accent">Edit</a>
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
      <p-button variant="link" color="primary">Button Text</p-button>
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
        <a href="#" class="underline text-accent">Edit</a>
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
      <p-button variant="link" color="primary">Button Text</p-button>
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
          <p-button variant="link" color="primary">Learn More</p-button>
        </div>
      </div>
      <div class="w-1/4">
        <img src="./assets/images/img-card-callout-01.svg">
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
          <p-button variant="link" color="primary">Learn More</p-button>
        </div>
      </div>
      <div class="w-1/4">
        <img src="./assets/images/img-card-callout-01.svg">
      </div>
    </div>
  </p-card>
</template>
```

## API

### Props

| Props         |   Type    |  Default  | Description                                                  |
|---------------|:---------:|:---------:|--------------------------------------------------------------|
| `element`     | `String`  | `section` | Card element, valid value is `div`, `section`, and `article` |
| `title`       | `String`  |     -     | Card Header Title                                            |
| `sectioned`   | `Boolean` |  `false`  | Enable Card Section                                          |
| `disabled`    | `Boolean` |  `false`  | Disable (look-like) Card                                     |
| `callout`     | `Boolean` |  `false`  | Enable Callout                                               |
| `dismissable` | `Boolean` |  `true`   | Show / Hide dismiss button                                   |

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
