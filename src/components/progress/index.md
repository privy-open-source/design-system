<script setup>
  import pProgress from './Progress.vue'
  import pProgressItem from './ProgressItem.vue'
  import IconDocument from '@carbon/icons-vue/lib/document/16'
</script>

# Progress
> Sub-component for Wizard and Timeline

## Usage

### Simple Usage

<preview>
  <p-progress>
    <p-progress-item label="Step 1" />
    <p-progress-item label="Step 2" active />
    <p-progress-item label="Step 3" />
    <p-progress-item label="Step 4" />
    <p-progress-item label="Step 5" />
  </p-progress>
</preview>

```vue
<template>
  <p-progress>
    <p-progress-item label="Step 1" />
    <p-progress-item label="Step 2" active />
    <p-progress-item label="Step 3" />
    <p-progress-item label="Step 4" />
    <p-progress-item label="Step 5" />
  </p-progress>
</template>
```

### Multiple Active

<preview>
  <p-progress>
    <p-progress-item label="Step 1" active />
    <p-progress-item label="Step 2" active />
    <p-progress-item label="Step 3" active />
    <p-progress-item label="Step 4" />
    <p-progress-item label="Step 5" />
  </p-progress>
</preview>

```vue
<template>
  <p-progress>
    <p-progress-item label="Step 1" active />
    <p-progress-item label="Step 2" active />
    <p-progress-item label="Step 3" active />
    <p-progress-item label="Step 4" />
    <p-progress-item label="Step 5" />
  </p-progress>
</template>
```

## Variants
There are 2 variants, `dot` and `counter`, default is `dot`

<preview class="flex-col gap-4">
  <p-progress variant="dot">
    <p-progress-item label="Step 1" />
    <p-progress-item label="Step 2" />
    <p-progress-item label="Step 3" />
    <p-progress-item label="Step 4" />
  </p-progress>
  <p-progress variant="counter">
    <p-progress-item label="Step 1" />
    <p-progress-item label="Step 2" />
    <p-progress-item label="Step 3" />
    <p-progress-item label="Step 4" />
  </p-progress>
</preview>

```vue
<template>
  <p-progress variant="dot">
    <p-progress-item label="Step 1" />
    <p-progress-item label="Step 2" />
    <p-progress-item label="Step 3" />
    <p-progress-item label="Step 4" />
  </p-progress>
  <p-progress variant="counter">
    <p-progress-item label="Step 1" />
    <p-progress-item label="Step 2" />
    <p-progress-item label="Step 3" />
    <p-progress-item label="Step 4" />
  </p-progress>
</template>
```

## Label Variants

There are 2 label's variants, `specific` and `general`, default is `specific`

<preview class="flex-col gap-4">
  <p-progress label-variant="specific">
    <p-progress-item label="Step 1" active />
    <p-progress-item label="Step 2" active />
    <p-progress-item label="Step 3" />
    <p-progress-item label="Step 4" />
  </p-progress>
  <p-progress label-variant="general">
    <p-progress-item label="Step 1" active />
    <p-progress-item label="Step 2" active />
    <p-progress-item label="Step 3" />
    <p-progress-item label="Step 4" />
  </p-progress>
</preview>

```vue
<template>
<p-progress label-variant="specific">
    <p-progress-item label="Step 1" active />
    <p-progress-item label="Step 2" active />
    <p-progress-item label="Step 3" />
    <p-progress-item label="Step 4" />
  </p-progress>
  <p-progress label-variant="general">
    <p-progress-item label="Step 1" active />
    <p-progress-item label="Step 2" active />
    <p-progress-item label="Step 3" />
    <p-progress-item label="Step 4" />
  </p-progress>
</template>
```

## Custom Icon
You can customize progress point with icon with slot `icon`.

<preview class="flex-col gap-4">
  <p-progress variant="dot">
    <p-progress-item label="Step 1" />
    <p-progress-item label="Step 2" active>
      <template #icon>
        <IconDocument />
      </template>
    </p-progress-item>
    <p-progress-item label="Step 3" />
    <p-progress-item label="Step 4" />
  </p-progress>
</preview>

```vue
<template>
  <p-progress variant="dot">
    <p-progress-item label="Step 1" />
    <p-progress-item label="Step 2" active>
      <template #icon>
        <IconDocument />
      </template>
    </p-progress-item>
    <p-progress-item label="Step 3" />
    <p-progress-item label="Step 4" />
  </p-progress>
</template>

<script setup>
import IconDocument from '@carbon/icons-vue/lib/document/16'
</script>
```

## Vertical Mode

<preview>
  <div class="h-96">
    <p-progress vertical>
      <p-progress-item label="Step 1" />
      <p-progress-item label="Step 2" active />
      <p-progress-item label="Step 3" />
      <p-progress-item label="Step 4" />
    </p-progress>
  </div>
</preview>

```vue
<template>
  <p-progress vertical>
    <p-progress-item label="Step 1" />
    <p-progress-item label="Step 2" active />
    <p-progress-item label="Step 3" />
    <p-progress-item label="Step 4" />
  </p-progress>
</template>
```

## API

### Props `<p-progress>`

| Props          |   Type    |  Default   | Description                                                  |
|----------------|:---------:|:----------:|--------------------------------------------------------------|
| `variant`      | `String`  |   `dot`    | Progress point variant, valid value is `dot`, `counter`      |
| `labelVariant` | `String`  | `specific` | Progress label variant, valid value is `specific`, `general` |
| `vertical`     | `Boolean` |  `false`   | Vertical mode                                                |

### Slots `<p-progress>`

| Name      | Description                    |
|-----------|--------------------------------|
| `default` | Content to place progress item |

### Events `<p-progress>`

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Arguments</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="3" class="text-center">There no event here</td>
    </tr>
  </tbody>
</table>

### Props `<p-progress-item>`

| Props    |   Type    | Default | Description                |
|----------|:---------:|:-------:|----------------------------|
| `label`  | `String`  |   `-`   | Progress Item label        |
| `active` | `Boolean` | `false` | Progress Item active state |

### Slots `<p-progress-item>`

| Name    | Description                             |
|---------|-----------------------------------------|
| `label` | Content to use as label                 |
| `icon`  | Content to place as progress point icon |

### Events `<p-progress-item>`

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Arguments</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="3" class="text-center">There no event here</td>
    </tr>
  </tbody>
</table>
