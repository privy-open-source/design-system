<script setup>
  import Colors from './Colors.vue'
  import pCaption from '../../components/caption/Caption.vue'
  import pHeading from '../../components/heading/Heading.vue'
  import { ref, computed } from "vue-demi"
  import items from './Colors.json'
</script>

# Colors
Persona uses design tokens to collaborate between UI/UX designers and engineers. Token design is a way to manage user interface data such as color, spacing, shadow, etc. by storing it in a variable. The goal is to build a cross platform user interface.

## Colors Tokens

<div class="pb-8 pt-20 space-y-1">
  <p-heading element="h5" class="mb-0">Main</p-heading>
  <p-caption class="!text-lightblue-50">token-name</p-caption>
  <p-caption class="!text-subtle">figma-style-name</p-caption>
  <p-caption class="!text-subtle" weight="bold">hex</p-caption>
</div>

<div class="pb-8 mt-8">
  <template v-for="item of items.palletes">
    <Colors :item="item">
      {{ item.title }}
    </Colors>
  </template>
</div>

## Colors Semantics

<div class="pb-8 pt-20 space-y-1">
  <p-heading element="h5" class="mb-0">Semantics</p-heading>
  <p-caption class="!text-lightblue-50">token-name</p-caption>
  <p-caption class="!text-subtle">figma-style-name</p-caption>
  <p-caption class="!text-subtle" weight="bold">parent-token-name</p-caption>
</div>

### Foregrounds
Mostly used on text and icons

<div class="pb-8 mt-8">
  <template v-for="item of items.foregrounds">
    <Colors :item="item">
      {{ item.title }}
    </Colors>
  </template>
</div>

### Backgrounds
Mostly used on cards or overlay

<div class="pb-8 mt-8">
  <template v-for="item of items.backgrounds">
    <Colors :item="item">
      {{ item.title }}
    </Colors>
  </template>
</div>

### Borders
Mostly used on cards and form OR as divider beetween section such as data table

<div class="pb-8 mt-8">
  <template v-for="item of items.borders">
    <Colors :item="item">
      {{ item.title }}
    </Colors>
  </template>
</div>
