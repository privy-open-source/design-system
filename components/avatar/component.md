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

## API

### Props

| Props         |   Type   | Default | Description                                                                                                                       |
|---------------|:--------:|:-------:|-----------------------------------------------------------------------------------------------------------------------------------|
| `variant`     | `String` | `image` | Avatar type variant, valid value: `avatar`, `alias`. default valus is determine by some caveats, see [this](#auto-detect-variant) |
| `src`         | `String` |    -    | Image URL, **required if using variant `image`**                                                                                  |
| `fallbackSrc` | `String` |    -    | Fallback image url for broken link                                                                                                |
| `name`        | `String` |    -    | Avatar name which would be generate into alias, **required if using variant `alias`**                                             |
| `name`        | `String` |    -    | Avatar name which would be generate into alias, **required if using variant `alias`**                                             |
| `size`        | `String` |  `md`   | Avatar size, valid value: `xs`, `sm`, `md`, `lg`, `xl`                                                                            |

### Slots
| Name      | Description                                     |
|-----------|-------------------------------------------------|
| `default` | Content to replace default avatar image element |

### Events

| Name        | Arguments | Description                                                    |
|-------------|-----------|----------------------------------------------------------------|
| `imgloaded` | Image src | Event when image loaded, only when using variant `image`       |
| `imgloaded` | Error     | Event when image fail to load, only when using variant `image` |
