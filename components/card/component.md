<script setup>
  import Card from './Card.vue'
  import Button from '../button/Button.vue'
  import CardSection from './CardSection.vue'
</script>

<style scope>
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
  <Card title="hahhaa">
    <template #header>
      <div class="flex justify-between items-center">
        <h2>asldkfaklsdjfkasd</h2>  
        <span><a href="#" class="">Edit</a></span>
      </div>
    </template>
    While here you will see the content of cards, everything goes here. If you need custom cards, take the component which more represent to what you need and detach it.
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

## Card With Header & Action
<preview>
  <Card
    title="Any Title Should Here">
    While here you will see the content of cards, everything goes here. If you need custom cards, take the component which more represent to what you need and detach it.
  </Card>
  <Card
    title="Any Title Should Here">
    <template #action>
      <Button color="primary" variant="link">Button Text</Button>
    </template>
    While here you will see the content of cards, everything goes here. If you need custom cards, take the component which more represent to what you need and detach it.
  </Card>
</preview>

```vue
<template>
  <Card
    title="Any Title Should Here">
    While here you will see the content of cards, everything goes here. If you need custom cards, take the component which more represent to what you need and detach it.
  </Card>
  <Card
    title="Any Title Should Here">
    <template #action>
      <Button color="primary" variant="link">Button Text</Button>
    </template>
    While here you will see the content of cards, everything goes here. If you need custom cards, take the component which more represent to what you need and detach it.
  </Card>
</template>
```

## Card with Section
<preview>
  <Card 
    title="Card with Section Should Here"
    sectioned>
    <Card-Section>
      While here you will see the content of cards, everything goes here. 
      If you need custom cards, take the component which more represent to what you need and detach it.
    </Card-Section>
    <Card-Section 
      title="Subtitle supposedly here">
      While here you will see the content of cards, everything goes here. 
      If you need custom cards, take the component which more represent to what you need and detach it.
    </Card-Section>
  </Card>
  <Card 
    title="Card Section with Action Should Here"
    sectioned>
    <Card-Section>
      While here you will see the content of cards, everything goes here. 
      If you need custom cards, take the component which more represent to what you need and detach it.
    </Card-Section>
    <Card-Section 
      title="Subtitle supposedly here">
      <template #action>
        <a href="#" class="text-primary-100 hover:text-primary-hovered underline">Edit</a>
      </template>
      While here you will see the content of cards, everything goes here. 
      If you need custom cards, take the component which more represent to what you need and detach it.
    </Card-Section>
  </Card>
</preview>

```vue
<template>
  <Card 
    title="Any Title Should Here"
    sectioned>
    <Card-Section>
      While here you will see the content of cards, everything goes here. 
      If you need custom cards, take the component which more represent to what you need and detach it.
    </Card-Section>
    <Card-Section 
      title="Subtitle supposedly here">
      While here you will see the content of cards, everything goes here. 
      If you need custom cards, take the component which more represent to what you need and detach it.
    </Card-Section>
  </Card>

  <Card 
    title="Card Section with Action Should Here"
    sectioned>
    <Card-Section>
      While here you will see the content of cards, everything goes here. 
      If you need custom cards, take the component which more represent to what you need and detach it.
    </Card-Section>
    <Card-Section 
      title="Subtitle supposedly here">
      <template #action>
        <a href="#" class="text-primary-100 hover:text-primary-hovered underline">Edit</a>
      </template>
      While here you will see the content of cards, everything goes here. 
      If you need custom cards, take the component which more represent to what you need and detach it.
    </Card-Section>
  </Card>
</template>
```

## Card with Sub-Section
<preview>
  <Card 
    title="Any Title Should Here"
    sectioned>
    <template #action>
      <Button color="primary" variant="link">Button Text</Button>
    </template>
    <Card-Section>
      While here you will see the content of cards, everything goes here. 
      If you need custom cards, take the component which more represent to what you need and detach it.
    </Card-Section>
    <Card-Section 
      title="Subtitle supposedly here">
      <template #action>
        <a href="#" class="text-primary-100 hover:text-primary-hovered underline">Edit</a>
      </template>
      While here you will see the content of cards, everything goes here. 
      If you need custom cards, take the component which more represent to what you need and detach it.
      <Card-Section>
        While here you will see the content of cards, everything goes here. 
        If you need custom cards, take the component which more represent to what you need and detach it.
      </Card-Section>
    </Card-Section>
    <Card-Section disabled>
      While here you will see the content of cards, everything goes here. 
      If you need custom cards, take the component which more represent to what you need and detach it.
    </Card-Section>
    <Card-Section
      title="Second Subtitle Will Be here">
      <template #action>
        <a href="#" class="text-danger-100 hover:text-danger-hovered underline">Delete</a>
        <a href="#" class="text-primary-100 hover:text-primary-hovered underline">Edit</a>
      </template>
      While here you will see the content of cards, everything goes here. 
      If you need custom cards, take the component which more represent to what you need and detach it.
    </Card-Section>
  </Card>
</preview>

```vue
<template>
  <Card 
    title="Any Title Should Here"
    sectioned>
    <Card-Section>
      <template #action>
        <Button color="primary" variant="link">Button Text</Button>
      </template>
      While here you will see the content of cards, everything goes here. 
      If you need custom cards, take the component which more represent to what you need and detach it.
    </Card-Section>
    <Card-Section 
      title="Subtitle supposedly here">
      <template #action>
        <a href="#" class="text-primary-100 hover:text-primary-hovered underline">Edit</a>
      </template>
      While here you will see the content of cards, everything goes here. 
      If you need custom cards, take the component which more represent to what you need and detach it.
      <Card-Section>
        While here you will see the content of cards, everything goes here. 
        If you need custom cards, take the component which more represent to what you need and detach it.
      </Card-Section>
    </Card-Section>
    <Card-Section disabled>
      While here you will see the content of cards, everything goes here. 
      If you need custom cards, take the component which more represent to what you need and detach it.
    </Card-Section>
    <Card-Section
      title="Second Subtitle Will Be here">
      While here you will see the content of cards, everything goes here. 
      If you need custom cards, take the component which more represent to what you need and detach it.
    </Card-Section>
  </Card>
</template>
```

## Card with Footer Action
<preview>
  <Card 
    title="Any Title Should Here"
    sectioned>
    <template #action>
      <Button color="primary" variant="link">Button Text</Button>
    </template>
    <Card-Section>
      While here you will see the content of cards, everything goes here. 
      If you need custom cards, take the component which more represent to what you need and detach it.
    </Card-Section>
    <Card-Section
      title="Second Subtitle Will Be here">
      While here you will see the content of cards, everything goes here. 
      If you need custom cards, take the component which more represent to what you need and detach it.
      <template #footer>
        <div class="flex justify-end">
          <Button variant="outline" color="primary">Enable Sample Button</Button>
          <Button variant="link" color="primary">Button Text</Button>
        </div>
      </template>
    </Card-Section>
  </Card>
</preview>

```vue
<template>
  <Card 
    title="Any Title Should Here"
    sectioned>
    <template #action>
      <Button color="primary" variant="link">Button Text</Button>
    </template>
    <Card-Section>
      While here you will see the content of cards, everything goes here. 
      If you need custom cards, take the component which more represent to what you need and detach it.
    </Card-Section>
    <Card-Section
      title="Second Subtitle Will Be here">
      While here you will see the content of cards, everything goes here. 
      If you need custom cards, take the component which more represent to what you need and detach it.
      <template #footer>
        <div class="flex-end">
          <Button variant="outline" color="primary">Enable Sample Button</Button>
          <Button variant="link" color="primary">Button Text</Button>
        </div>
      </template>
    </Card-Section>
  </Card>
</template>
```

## API

### Props

| Props         |   Type    | Default    | Description                                                     |
|---------------|:---------:|:----------:|-----------------------------------------------------------------|
| `element`     | `String`  | `section`  | Card element, valid value is `div`, `section`, and `article`    |
| `title`       | `String`  | -          | Card Header Title                                               |
| `sectioned`   | `Boolean` | `false`    | Enable Card Section                                             |
| `disabled`    | `Boolean` | `false`    | Disable (look-like) Card                                        |

### Slots
| Name      | Description                                                                        |
|-----------|------------------------------------------------------------------------------------|
| `action ` | Action (permalink or button) to place in Card/Card-Section Header                  |
| `header ` | Content (in the form of— permalink or button) to place in Card/Card-Section Header |
| `footer ` | Content (in the form of— permalink or button) to place in Card/Card-Section Footer |

### Events

<table>
  <thead>
    <tr>
      <th>Props</th>
      <th>Arguments</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="3" class="text-center">There no props here</td>
    </tr>
  </tbody>
</table>
