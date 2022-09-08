<script setup>
  import pAvatar from './Avatar.vue'
  import IconUser from '@carbon/icons-vue/lib/events/20'
</script>

# Avatar

## Usage

### Using image

<preview>
  <p-avatar src="https://picsum.photos/50" />
</preview>

```vue
<template>
  <p-avatar src="https://picsum.photos/50" />
</template>
```

### Using alias

<preview>
  <p-avatar variant="alias" name="Tarjono Smith" />
</preview>

```vue
<template>
  <p-avatar variant="alias" name="Tarjono Smith" />
</template>
```

### Using icon
<preview>
  <p-avatar>
    <IconUser />
  </p-avatar>
</preview>

```vue
<template>
  <p-avatar>
    <IconUser />
  </p-avatar>
</template>

<script setup>
  import IconUser from '@carbon/icons-vue/lib/events/20'
</script>
```

## Sizing

There are 5 available size variant: `xs`, `sm`, `md`, `lg`, `xl`. The default is `md`

<preview class="flex-col items-center gap-3 lg:flex-row">
  <p-avatar src="https://picsum.photos/24" size="xs" />
  <p-avatar src="https://picsum.photos/32" size="sm" />
  <p-avatar src="https://picsum.photos/40" size="md" />
  <p-avatar src="https://picsum.photos/56" size="lg" />
  <p-avatar src="https://picsum.photos/96" size="xl" />
</preview>

```vue
<template>
  <p-avatar src="https://picsum.photos/24" size="xs" />
  <p-avatar src="https://picsum.photos/32" size="sm" />
  <p-avatar src="https://picsum.photos/40" size="md" />
  <p-avatar src="https://picsum.photos/56" size="lg" />
  <p-avatar src="https://picsum.photos/96" size="xl" />
</template>
```

## Variant

Avatar has 2 style variant: `image` and `alias`

<preview class="gap-3">
  <p-avatar variant="image" src="https://picsum.photos/40" />
  <p-avatar variant="alias" name="Tarjono Smith" />
</preview>

```vue
<template>
  <p-avatar variant="image" src="https://picsum.photos/40" />
  <p-avatar variant="alias" name="Tarjono Smith" />
</template>
```

### Auto-detect variant

If prop `variant` not set, it will detect the variant with some caveats:
  - if `src` is provided, it will use `image`
  - if `name` is provided, it will use `alias`
  - Otherwise, it will use `image`

```vue
<template>
  <!-- This will use `image` -->
  <p-avatar src="https://picsum.photos/40" />
  <!-- This will use `alias` -->
  <p-avatar name="Tarjono Smith" />
  <!-- This will use `image` -->
  <p-avatar />
</template>
```

**Result**:

<preview class="gap-3">
  <p-avatar variant="image" src="https://picsum.photos/40" />
  <p-avatar variant="alias" name="Tarjono Smith" />
  <p-avatar />
</preview>

## API

### Props

| Props         |   Type   | Default | Description                                                                                                                       |
|---------------|:--------:|:-------:|-----------------------------------------------------------------------------------------------------------------------------------|
| `variant`     | `String` | `image` | Avatar type variant, valid value: `avatar`, `alias`. default value is determined by some caveats, see [this](#auto-detect-variant) |
| `src`         | `String` |    -    | Image URL, **required if using variant `image`**                                                                                  |
| `fallbackSrc` | `String` |    -    | Fallback image url for broken link                                                                                                |
| `name`        | `String` |    -    | Avatar name which would be generated into alias, **required if using variant `alias`**                                             |
| `size`        | `String` |  `md`   | Avatar size, valid value: `xs`, `sm`, `md`, `lg`, `xl`                                                                            |
| `imgClass`    | `String` |    -    | Additional class for image element                                                                                                |

### Slots

| Name      | Description                                     |
|-----------|-------------------------------------------------|
| `default` | Content to replace default avatar image element |

### Events

| Name        | Arguments | Description                     |
|-------------|-----------|---------------------------------|
| `imgloaded` | Image URL | Event when image loaded         |
| `imgerror`  | Error     | Event when image failed to load |
