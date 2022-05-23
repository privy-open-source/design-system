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
   }
</style>

# Card

## Usage

### Basic Usage

<preview>
   <Card>
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
            <a href="#" class="text-primary-100 hover:text-primary-hovered underline pl-3">Edit</a>
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
            <Button variant="outline" color="primary">Enable Sample Button</Button>
            <Button variant="link" color="primary">Button Text</Button>
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
            <Button variant="outline" color="primary">Enable Sample Button</Button>
            <Button variant="link" color="primary">Button Text</Button>
         </template>
      </Card-Section>
   </Card>
</template>
```
