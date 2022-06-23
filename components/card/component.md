<script setup>
  import Card from './Card.vue'
  import Button from '../button/Button.vue'
  import CardSection from './CardSection.vue'
  import Heading from '../heading/Heading.vue'
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
  <Card>
    While here you will see the content of cards, everything goes here.
    If you need custom cards, take the component which more represent to
    what you need and detach it.
  </Card>
</preview>

```vue
<template>
  <Card>
    While here you will see the content of cards, everything goes here.
    If you need custom cards, take the component which more represent to
    what you need and detach it.
  </Card>
</template>
```

### Card with Header
<preview>
  <Card
    title="Any Title Should Here">
    While here you will see the content of cards, everything goes here.
    If you need custom cards, take the component which more represent to
    what you need and detach it.
  </Card>
  <Card
    title="Any Title Should Here">
    <template #action>
      <Button color="primary" variant="link">Button Text</Button>
    </template>
    While here you will see the content of cards, everything goes here.
    If you need custom cards, take the component which more represent to
    what you need and detach it.
  </Card>
</preview>

```vue
<template>
  <Card
    title="Any Title Should Here">
    While here you will see the content of cards, everything goes here.
    If you need custom cards, take the component which more represent to
    what you need and detach it.
  </Card>
  <Card
    title="Any Title Should Here">
    <template #action>
      <Button color="primary" variant="link">Button Text</Button>
    </template>
    While here you will see the content of cards, everything goes here.
    If you need custom cards, take the component which more represent to
    what you need and detach it.
  </Card>
</template>
```

### Card with Footer
<preview>
  <Card
    title="Any Title Should Here">
    While here you will see the content of cards, everything goes here.
    If you need custom cards, take the component which more represent to
    what you need and detach it.
    <template #footer>
      <Button variant="outline" color="primary">Enable Sample Button</Button>
      <Button variant="link" color="primary">Button Text</Button>
    </template>
  </Card>
</preview>

```vue
<template>
  <Card
    title="Any Title Should Here">
    While here you will see the content of cards, everything goes here.
    If you need custom cards, take the component which more represent to
    what you need and detach it.
    <template #footer>
      <Button variant="outline" color="primary">Enable Sample Button</Button>
      <Button variant="link" color="primary">Button Text</Button>
    </template>
  </Card>
</template>
```

## Sectioned
<preview>
  <Card
    title="Card with Section"
    sectioned>
    <Card-Section>
      While here you will see the content of cards, everything goes here.
      If you need custom cards, take the component which more represent to
      what you need and detach it.
    </Card-Section>
    <Card-Section
      title="Subtitle supposedly here">
      <template #action>
        <a href="#" class="underline text-primary-100 hover:text-primary-hovered">Edit</a>
      </template>
      While here you will see the content of cards, everything goes here.
      If you need custom cards, take the component which more represent to
      what you need and detach it.
    </Card-Section>
  </Card>
  <Card
    title="Card with Sub-Section"
    sectioned>
    <template #action>
      <Button variant="link" color="primary">Button Text</Button>
    </template>
    <Card-Section>
      While here you will see the content of cards, everything goes here.
      If you need custom cards, take the component which more represent to
      what you need and detach it.
    </Card-Section>
    <Card-Section
      title="Subtitle supposedly here">
      While here you will see the content of cards, everything goes here.
      If you need custom cards, take the component which more represent to
      what you need and detach it.
      <Card-Section>
        While here you will see the content of cards, everything goes here.
        If you need custom cards, take the component which more represent to
        what you need and detach it.
      </Card-Section>
    </Card-Section>
  </Card>
</preview>

```vue
<template>
  <Card
    title="Card Section"
    sectioned>
    <Card-Section>
      While here you will see the content of cards, everything goes here.
      If you need custom cards, take the component which more represent to
      what you need and detach it.
    </Card-Section>
    <Card-Section
      title="Subtitle supposedly here">
      <template #action>
        <a href="#" class="underline text-primary-100 hover:text-primary-hovered">Edit</a>
      </template>
      While here you will see the content of cards, everything goes here.
      If you need custom cards, take the component which more represent to
      what you need and detach it.
    </Card-Section>
  </Card>

  <Card
    title="Card Sub-Section"
    sectioned>
    <template #action>
      <Button variant="link" color="primary">Button Text</Button>
    </template>
    <Card-Section>
      While here you will see the content of cards, everything goes here.
      If you need custom cards, take the component which more represent to
      what you need and detach it.
    </Card-Section>
    <Card-Section
      title="Subtitle supposedly here">
      While here you will see the content of cards, everything goes here.
      If you need custom cards, take the component which more represent to
      what you need and detach it.
      <Card-Section>
        While here you will see the content of cards, everything goes here.
        If you need custom cards, take the component which more represent to
        what you need and detach it.
      </Card-Section>
    </Card-Section>
  </Card>
</template>
```

## Callout
<preview>
  <Card
    title="Hello and Happy New Year!"
    element="div"
    callout>
    <div class="flex items-start gap-x-8">
      <div class="w-3/4">
        What amazing growth you achieved this year, Tarjono! You deserve
        every bit of it and we’re sure you’ll do even better next year.
        There’s a 30% membership renewal discount waiting for you when you come back.
        <div class="pt-8">
          <Button variant="outline" color="secondary">Collect Discount</Button>
          <Button variant="link" color="primary">Learn More</Button>
        </div>
      </div>
      <div class="w-1/4">
        <img src="./assets/images/img-card-callout-01.svg">
      </div>
    </div>
  </Card>
</preview>

```vue
<template>
  <Card
    title="Hello and Happy New Year!"
    element="div"
    callout>
    <div class="flex items-start gap-x-8">
      <div class="w-3/4">
        What amazing growth you achieved this year, Tarjono! You deserve
        every bit of it and we’re sure you’ll do even better next year.
        There’s a 30% membership renewal discount waiting for you when you come back.
        <div class="pt-8">
          <Button variant="outline" color="secondary">Collect Discount</Button>
          <Button variant="link" color="primary">Learn More</Button>
        </div>
      </div>
      <div class="w-1/4">
        <img src="./assets/images/img-card-callout-01.svg">
      </div>
    </div>
  </Card>
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
