<script setup>
  import ButtonGroup from './ButtonGroup.vue'
  import Button from '../button/Button.vue'
</script>

# Button Group

## Usage

### Simple Button

<Button-Group>
  <Button>Button Text</Button>
  <Button>Button Text</Button>
  <Button>Button Text</Button>
</Button-Group>



## Sizing

4 sizes you can use: `xs`, `sm`, `md`, `lg`. default is `md`

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

You can add prop `pill` to make button more rounded

<preview class="flex-col items-center gap-3">
  <Button-Group pill>
    <Button>Button Text</Button>
    <Button>Button Text</Button>
    <Button>Button Text</Button>
  </Button-Group>
</preview>

```vue
<template>
  <Button-Group pill>
    <Button>Button Text</Button>
    <Button>Button Text</Button>
    <Button>Button Text</Button>
  </Button-Group>
</template>
```
