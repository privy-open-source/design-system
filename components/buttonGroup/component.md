<script setup>
  import { ref } from "vue-demi"
  import ButtonGroup from './ButtonGroup.vue'
  import Button from '../button/Button.vue'
  import Dropdown from "../dropdown/Dropdown.vue"
  import DropdownItem from "../dropdown/DropdownItem.vue"
  import IconChevronLeft from '@carbon/icons-vue/lib/chevron--left/20'
  import IconChevronRight from '@carbon/icons-vue/lib/chevron--right/20'
  import IconChevronDown from '@carbon/icons-vue/lib/chevron--down/20'

</script>

# Button Group
Button Group is a collection of buttons consisting of at least 2 buttons in single line. 
Therefore, the Button Group is very dependent on the [Button](/button/component) component. But it should be underlined that not all props on the Button can work here.
## Usage

### Simple Button

<preview class="flex-col items-center">
  <Button-Group>
    <Button>Button Text</Button>
    <Button>Button Text</Button>
  </Button-Group>
</preview>

```vue
<template>
  <Button-Group>
    <Button>Button Text</Button>
    <Button>Button Text</Button>
  </Button-Group>
</template>
```
### Button with Addon
Place one add-on on either side of a Button. You may also make Button all addon.

#### Addon Left

<preview>
  <Button-Group>
    <Button><IconChevronLeft /></Button>
    <Button>Button Text</Button>
  </Button-Group>
</preview>

```vue
<template>
  <Button-Group>
    <Button><IconChevronLeft /></Button>
    <Button>Button Text</Button>
  </Button-Group>
</template>

<script setup>
  import IconChevronLeft from '@carbon/icons-vue/lib/chevron--left/20'
</script>
```

#### Addon Right
In the button group, to simplify several actions in one button, it can be combined with the [Dropdown](/dropdown/component) component.

<preview>
  <Button-Group>
    <Button>Button Text</Button>
    <Dropdown>
      <template #activator="{ open }">
        <Button @click="open"><IconChevronDown /></Button>
      </template>
      <DropdownItem>Action</DropdownItem>
      <DropdownItem>Another action</DropdownItem>
      <DropdownItem>Something else here</DropdownItem>
    </Dropdown>
  </Button-Group>
</preview>


```vue
<template>
  <Button-Group>
    <Button>Button Text</Button>
    <Dropdown>
      <template #activator="{ open }">
        <Button @click="open"><IconChevronDown /></Button>
      </template>
      <DropdownItem>Action</DropdownItem>
      <DropdownItem>Another action</DropdownItem>
      <DropdownItem>Something else here</DropdownItem>
    </Dropdown>
  </Button-Group>
</template>

<script setup>
  import IconChevronDown from '@carbon/icons-vue/lib/chevron--down/20'
</script>
```

#### All Addon
Button Group all addon is group a series of buttons with only icon
<preview>
  <Button-Group>
    <Button><IconChevronLeft /></Button>
    <Button><IconChevronRight /></Button>
  </Button-Group>
</preview>

```vue
<template>
  <Button-Group>
    <Button><IconChevronLeft /></Button>
    <Button><IconChevronRight /></Button>
  </Button-Group>
</template>

<script setup>
  import IconChevronLeft from '@carbon/icons-vue/lib/chevron--left/20'
  import IconChevronRight from '@carbon/icons-vue/lib/chevron--right/20'
</script>
```



## Variants

Button Group just available in 3 variants: `solid`, `outline` and `ghost`. You can make these variants by applying variant to each button in a group.

<preview class="flex-col items-center gap-3">
  <div>
    <Button-Group>
      <Button>Button Text</Button>
      <Button>Button Text</Button>
      <Button>Button Text</Button>
    </Button-Group>
  </div>
  <div>
    <Button-Group>
      <Button variant="outline">Button Text</Button>
      <Button variant="outline">Button Text</Button>
      <Button variant="outline">Button Text</Button>
    </Button-Group>
  </div>
  <div>
    <Button-Group>
      <Button variant="ghost">Button Text</Button>
      <Button variant="ghost">Button Text</Button>
      <Button variant="ghost">Button Text</Button>
    </Button-Group>
  </div>
</preview>

```vue
<template>
  <Button-Group>
    <Button>Button Text</Button>
    <Button>Button Text</Button>
    <Button>Button Text</Button>
  </Button-Group>
  <Button-Group>
    <Button variant="outline">Button Text</Button>
    <Button variant="outline">Button Text</Button>
    <Button variant="outline">Button Text</Button>
  </Button-Group>
  <Button-Group>
    <Button variant="ghost">Button Text</Button>
    <Button variant="ghost">Button Text</Button>
    <Button variant="ghost">Button Text</Button>
  </Button-Group>
</template>
```

## Color
You can change color of Button Group by applying color to every button in a group.
<preview class="flex-col items-center gap-3">
  <div>
    <Button-Group>
      <Button>Button Text</Button>
      <Button>Button Text</Button>
      <Button>Button Text</Button>
    </Button-Group>
  </div>
  <div>
    <Button-Group>
      <Button color="secondary">Button Text</Button>
      <Button color="secondary">Button Text</Button>
      <Button color="secondary">Button Text</Button>
    </Button-Group>
  </div>
  <div>
    <Button-Group>
      <Button color="success">Button Text</Button>
      <Button color="success">Button Text</Button>
      <Button color="success">Button Text</Button>
    </Button-Group>
  </div>
  <div>
    <Button-Group>
      <Button color="warning">Button Text</Button>
      <Button color="warning">Button Text</Button>
      <Button color="warning">Button Text</Button>
    </Button-Group>
  </div>
  <div>
    <Button-Group>
      <Button color="info">Button Text</Button>
      <Button color="info">Button Text</Button>
      <Button color="info">Button Text</Button>
    </Button-Group>
  </div>
  <div>
    <Button-Group>
      <Button color="danger">Button Text</Button>
      <Button color="danger">Button Text</Button>
      <Button color="danger">Button Text</Button>
    </Button-Group>
  </div>
  <div>
    <Button-Group>
      <Button color="gold">Button Text</Button>
      <Button color="gold">Button Text</Button>
      <Button color="gold">Button Text</Button>
    </Button-Group>
  </div>
</preview>

```vue
<template>
  <Button-Group>
    <Button color="primary">Button Text</Button>
    <Button color="primary">Button Text</Button>
    <Button color="primary">Button Text</Button>
  </Button-Group>
  <Button-Group>
    <Button color="secondary">Button Text</Button>
    <Button color="secondary">Button Text</Button>
    <Button color="secondary">Button Text</Button>
  </Button-Group>
  <Button-Group>
    <Button color="success">Button Text</Button>
    <Button color="success">Button Text</Button>
    <Button color="success">Button Text</Button>
  </Button-Group>
  <Button-Group>
    <Button color="warning">Button Text</Button>
    <Button color="warning">Button Text</Button>
    <Button color="warning">Button Text</Button>
  </Button-Group>
  <Button-Group>
    <Button color="info">Button Text</Button>
    <Button color="info">Button Text</Button>
    <Button color="info">Button Text</Button>
  </Button-Group>
  <Button-Group>
    <Button color="danger">Button Text</Button>
    <Button color="danger">Button Text</Button>
    <Button color="danger">Button Text</Button>
  </Button-Group>
  <Button-Group>
    <Button color="gold">Button Text</Button>
    <Button color="gold">Button Text</Button>
    <Button color="gold">Button Text</Button>
  </Button-Group>
</template>
```

## Sizing

Instead of applying button sizing prop to every button in a group, you just can add size in Button Group. There are 4 sizes available: `xs`, `sm`, `md` and `lg`. Default is `md`

<preview class="flex-col items-center gap-3">
  <div>
    <Button-Group size="xs">
      <Button>Button Text</Button>
      <Button>Button Text</Button>
      <Button>Button Text</Button>
    </Button-Group>
  </div>
  <div>
    <Button-Group size="sm">
      <Button>Button Text</Button>
      <Button>Button Text</Button>
      <Button>Button Text</Button>
    </Button-Group>
  </div>
  <div>
    <Button-Group size="md">
      <Button>Button Text</Button>
      <Button>Button Text</Button>
      <Button>Button Text</Button>
    </Button-Group>
  </div>
  <div>
    <Button-Group size="lg">
      <Button>Button Text</Button>
      <Button>Button Text</Button>
      <Button>Button Text</Button>
    </Button-Group>
  </div>
</preview>

```vue
<template>
  <Button-Group size="xs">
    <Button>Button Text</Button>
    <Button>Button Text</Button>
    <Button>Button Text</Button>
  </Button-Group>
  <Button-Group size="sm">
    <Button>Button Text</Button>
    <Button>Button Text</Button>
    <Button>Button Text</Button>
  </Button-Group>
  <Button-Group size="md">
    <Button>Button Text</Button>
    <Button>Button Text</Button>
    <Button>Button Text</Button>
  </Button-Group>
  <Button-Group size="lg">
    <Button>Button Text</Button>
    <Button>Button Text</Button>
    <Button>Button Text</Button>
  </Button-Group>
</template>
```
## Pill mode

You just add `pill` in Button Group to make button more rounded. Prop `pill` of every single Button will not working in Button Group

<preview class="flex-col items-center gap-3">
  <div>
    <Button-Group pill>
      <Button>Button Text</Button>
      <Button>Button Text</Button>
      <Button>Button Text</Button>
    </Button-Group>
  </div>
  <div>
    <Button-Group pill>
      <Button variant="outline">Button Text</Button>
      <Button variant="outline">Button Text</Button>
      <Button variant="outline">Button Text</Button>
    </Button-Group>
  </div>
  <div>
    <Button-Group pill>
      <Button variant="ghost">Button Text</Button>
      <Button variant="ghost">Button Text</Button>
      <Button variant="ghost">Button Text</Button>
    </Button-Group>
  </div>
</preview>

```vue
<template>
  <div>
    <Button-Group pill>
      <Button>Button Text</Button>
      <Button>Button Text</Button>
      <Button>Button Text</Button>
    </Button-Group>
  </div>
  <div>
    <Button-Group pill>
      <Button variant="outline">Button Text</Button>
      <Button variant="outline">Button Text</Button>
      <Button variant="outline">Button Text</Button>
    </Button-Group>
  </div>
  <div>
    <Button-Group pill>
      <Button variant="ghost">Button Text</Button>
      <Button variant="ghost">Button Text</Button>
      <Button variant="ghost">Button Text</Button>
    </Button-Group>
  </div>
</template>
```

## API

### Props

| Props      |   Type    |  Default  | Description                                                         |
|------------|:---------:|:---------:|---------------------------------------------------------------------|
| `size`     | `String`  |   `md`    | Size of button group, valid value is `xs`, `sm`, `md` and `lg`      |
| `pill`     | `Boolean` |  `false`  | Enable pill mode                                                    |
### Slots

| Name      | Description                                               |
|-----------|-----------------------------------------------------------|
| `default` | Content (in the form of— button) to place in button group |

### Events

| Name    | Arguments               | Description                  |
|---------|-------------------------|------------------------------|
| `click` | Native DOM Event object | Event when button is clicked |
