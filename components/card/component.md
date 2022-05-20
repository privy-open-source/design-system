<script setup>
    import Card from './Card.vue'
    import Button from '../button/Button.vue'
</script>

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

### With Heading
<preview>
   <Card>
      <h6 class="text-xl">Any Title Should Here</h6>
      While here you will see the content of cards, everything goes here. If you need custom cards, take the component which more represent to what you need and detach it.
   </Card>
</preview>


### With Heading
<preview>
   <Card sectioned>
      <div class="p-6 border-b border-secondary-5">
         <div class="flex items-center justify-between">
            <h6 class="text-xl">Any Title Should Here</h6>
            <Button variant="link" size="sm">Button Text</Button>
         </div>
         While here you will see the content of cards, everything goes here. If you need custom cards, take the component which more represent to what you need and detach it.
      </div>
      <div class="p-6 border-b border-secondary-10">
         <h6 class="uppercase">Any Title Should Here</h6>
         While here you will see the content of cards, everything goes here. If you need custom cards, take the component which more represent to what you need and detach it.
      </div>
   </Card>
</preview>
