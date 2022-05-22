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

### With Title
<preview>
   <Card
      title="Any Title Should Here">
      While here you will see the content of cards, everything goes here. If you need custom cards, take the component which more represent to what you need and detach it.
   </Card>
   <Card
      title="Any Title Should Here">
      <Button color="primary" variant="link">Button Text</Button>
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

### With Heading
<preview>
   <Card 
      title="Any Title Should Here"
      sectioned>
      <template #action>
         <Button variant="link" color="primary">Button Text</Button>
      </template>
      <Card-Section>
         While here you will see the content of cards, everything goes here. If you need custom cards, take the component which more represent to what you need and detach it.
      </Card-Section>
      <Card-Section title="hello">
         <template #action>
            <!-- <Button variant="link" color="danger" size="sm">Delete</Button> -->
            <!-- <Button variant="link" color="primary" size="sm">Edit</Button> -->
            <a href="#" class="text-danger-100">Delete</a>
         </template>
         While here you will see the content of cards, everything goes here.
         <template #footer>
            <Button variant="outline" color="primary">Enable Sample Button</Button>
            <Button variant="link" color="primary">Button Text</Button>
         </template>
      </Card-Section>
   </Card>
</preview>
