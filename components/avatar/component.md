<script setup>
  import Avatar from './Avatar.vue'
  import IconUser from '@carbon/icons-vue/lib/events/20'
</script>

# Avatar

## Usage

### Using image

<div class="flex gap-1 mt-3">
  <Avatar src="https://picsum.photos/50" />
</div>

```vue
<template>
  <Avatar src="https://picsum.photos/50" />
</template>
```

### Using alias

<div class="flex gap-1 mt-3">
  <Avatar variant="alias" name="Tarjono Smith" />
</div>

```vue
<template>
  <Avatar variant="alias" name="Tarjono Smith" />
</template>
```

### Using icon
<div class="flex gap-1 mt-3">
  <Avatar>
    <IconUser />
  </Avatar>
</div>

```vue
<template>
  <Avatar>
    <IconUser />
  </Avatar>
</template>

<script setup>
  import IconUser from '@carbon/icons-vue/lib/events/20'
</script>
```

## Sizing

There available 5 size variant: `xs`, `sm`, `md`, `lg`, `xl`. default is `md`

<div class="flex gap-1 mt-3">
  <Avatar src="https://picsum.photos/24" size="xs" />
  <Avatar src="https://picsum.photos/32" size="sm" />
  <Avatar src="https://picsum.photos/40" size="md" />
  <Avatar src="https://picsum.photos/56" size="lg" />
  <Avatar src="https://picsum.photos/96" size="xl" />
</div>

```vue
<template>
  <Avatar src="https://picsum.photos/24" size="xs" />
  <Avatar src="https://picsum.photos/32" size="sm" />
  <Avatar src="https://picsum.photos/40" size="md" />
  <Avatar src="https://picsum.photos/56" size="lg" />
  <Avatar src="https://picsum.photos/96" size="xl" />
</template>
```

## Variant

Avatar has 2 style variant: `image` and `alias`

<div class="flex gap-1 mt-3">
  <Avatar variant="image" src="https://picsum.photos/40" />
  <Avatar variant="alias" name="Tarjono Smith" />
</div>

```vue
<template>
  <Avatar variant="image" src="https://picsum.photos/40" />
  <Avatar variant="alias" name="Tarjono Smith" />
</template>
```

### Auto-detect variant

If prop `variant` not settled, it will detect the variant with some caveats:
  - if `src` is provided, it will use `image`
  - if no `src` and `name` is provided, it will use `alias`
  - Otherwise, it will use `image`

```vue
<template>
  <!-- This will use `image` -->
  <Avatar src="https://picsum.photos/40" />
  <!-- This will use `alias` -->
  <Avatar name="Tarjono Smith" />
  <!-- This will use `image` -->
  <Avatar />
</template>
```
**Result**:
<div class="flex gap-1 mt-3">
  <Avatar variant="image" src="https://picsum.photos/40" />
  <Avatar variant="alias" name="Tarjono Smith" />
  <Avatar />
</div>
