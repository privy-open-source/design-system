<script setup>
    import Card from './Card.vue'
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
   <Card no-padding>
      <div class="p-6 border-b border-secondary-5">
         <h6 class="text-xl">Any Title Should Here</h6>
         While here you will see the content of cards, everything goes here. If you need custom cards, take the component which more represent to what you need and detach it.
      </div>
      <div class="p-6 border-b border-secondary-10">
         <h6 class="uppercase">Any Title Should Here</h6>
         While here you will see the content of cards, everything goes here. If you need custom cards, take the component which more represent to what you need and detach it.
      </div>
   </Card>
</preview>
