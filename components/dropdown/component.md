<script setup>
  import Dropdown from "./Dropdown.vue"
  import DropdownItem from "./DropdownItem.vue"
  import DropdownGroup from "../dropdown-group/DropdownGroup.vue"
  import DropdownDivider from "./DropdownDivider.vue"
  import { ref } from "vue-demi"

  const count = ref(0)
</script>

# Dropdown

## Usage

### Simple Usage
<preview>
  <Dropdown text="Click Here">
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownDivider />
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
</preview>

```vue
<template>
  <Dropdown text="Click Here">
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
</template>
```

### With Subtext
<preview>
  <Dropdown text="Click Here">
    <DropdownItem>
      <div>Item Text</div>
      <div class="text-xs text-subtext-100">
        Item Subtext
      </div>
    </DropdownItem>
    <DropdownItem>
      <div>Item Text</div>
      <div class="text-xs text-subtext-100">
        Item Subtext
      </div>
    </DropdownItem>
    <DropdownItem>
      <div>Item Text</div>
      <div class="text-xs text-subtext-100">
        Item Subtext
      </div>
    </DropdownItem>
  </Dropdown>
</preview>

```vue
<template>
  <Dropdown text="Click Here">
    <DropdownItem>
      <div>Item Text</div>
      <div class="text-xs text-subtext-100">
        Item Subtext
      </div>
    </DropdownItem>
    <DropdownItem>
      <div>Item Text</div>
      <div class="text-xs text-subtext-100">
        Item Subtext
      </div>
    </DropdownItem>
    <DropdownItem>
      <div>Item Text</div>
      <div class="text-xs text-subtext-100">
        Item Subtext
      </div>
    </DropdownItem>
  </Dropdown>
</template>
```

## Nested Item

<preview>
  <Dropdown text="Click Here">
    <DropdownGroup text="Folder A">
      <DropdownGroup text="Subfolder A1">
        <DropdownItem>Item A.I</DropdownItem>
        <DropdownItem>Item A.I</DropdownItem>
      </DropdownGroup>
      <DropdownGroup text="Subfolder A2">
        <DropdownItem>Item A2.II</DropdownItem>
        <DropdownItem>Item A2.II</DropdownItem>
      </DropdownGroup>
    </DropdownGroup>
    <DropdownGroup text="Folder B">
      <DropdownGroup text="Subfolder B1">
        <DropdownItem>Item B.I</DropdownItem>
        <DropdownItem>Item B.I</DropdownItem>
      </DropdownGroup>
      <DropdownGroup text="Subfolder B2">
        <DropdownItem>Item B2.II</DropdownItem>
        <DropdownItem>Item B2.II</DropdownItem>
      </DropdownGroup>
    </DropdownGroup>
  </Dropdown>
</preview>

```vue
<template>
  <Dropdown text="Click Here">
    <DropdownGroup text="Folder A">
      <DropdownGroup text="Menu A1">
        <DropdownItem>Item A.I</DropdownItem>
        <DropdownItem>Item A.I</DropdownItem>
      </DropdownGroup>
      <DropdownGroup text="Menu A2">
        <DropdownItem>Item A2.II</DropdownItem>
        <DropdownItem>Item A2.II</DropdownItem>
      </DropdownGroup>
    </DropdownGroup>
    <DropdownGroup text="Folder B">
      <DropdownGroup text="Menu B1">
        <DropdownItem>Item B.I</DropdownItem>
        <DropdownItem>Item B.I</DropdownItem>
      </DropdownGroup>
      <DropdownGroup text="Menu B2">
        <DropdownItem>Item B2.II</DropdownItem>
        <DropdownItem>Item B2.II</DropdownItem>
      </DropdownGroup>
    </DropdownGroup>
  </Dropdown>
</template>
```
