<script setup>
import { ref } from 'vue-demi'
import pPagination from './Pagination.vue'

import IconNextOutline from '@privyid/persona-icon/vue/arrow-circle-right/20.vue'
import IconPrevOutline from '@privyid/persona-icon/vue/arrow-circle-left/20.vue'
import IconSkipForward from '@privyid/persona-icon/vue/caret-right/20.vue'
import IconSkipBack from '@privyid/persona-icon/vue/caret-left/20.vue'

const simpleModel = ref(1)
const simpleTotal = ref(100)

const moreModel   = ref(1)
const moreTotal   = ref(200)

const navModel          = ref(1)
const navTotal          = ref(50)
const navPerPage        = ref(10)
const navPerPageOptions = ref([5,10,15])

const detailModel          = ref(1)
const detailTotal          = ref(50)
const detailPerPage        = ref(10)
const detailPerPageOptions = ref([5,10,15])

const quickModel          = ref(1)
const quickTotal          = ref(100)
const quickPerPage        = ref(10)
const quickPerPageOptions = ref([5,10,15])

</script>


# Pagination

## Usage

### Simple Usage

<preview>
  <p-pagination v-model="simpleModel" :total="simpleTotal" />
</preview>

```vue
<template>
  <p-pagination v-model="model" :total="total" />
</template>

<script setup>
  const model = ref(1)
  const total = ref(100)
</script>
```

### More Pages

Pages will automatically truncated if maximum display limit exceeded.

<preview>
  <p-pagination v-model="moreModel" :total="moreTotal" />
</preview>

```vue
<template>
  <p-pagination v-model="model" :total="total" />
</template>

<script setup>
  const model   = ref(1)
  const total   = ref(200)
</script>
```

## Variants

There are 3 navigation variants: `none`, `short`, `far`, default is `short`

<preview class="flex-col space-y-2">
  <p-pagination v-model="simpleModel" variant="none" :total="simpleTotal" />
  <p-pagination v-model="simpleModel" variant="short" :total="simpleTotal" />
  <p-pagination v-model="simpleModel" variant="far" :total="simpleTotal" />
</preview>

```vue
<template>
  <p-pagination v-model="model" variant="none" :total="total" />
  <p-pagination v-model="model" variant="short" :total="total" />
  <p-pagination v-model="model" variant="far" :total="total" />
</template>

<script setup>
  const model = ref(1)
  const total = ref(100)
</script>
```

## Show Detail

Add prop `show-detail` to show row calculation and per page options.

<preview class="flex-col space-y-2">
  <p-pagination v-model="detailModel" v-model:per-page="detailPerPage" :per-page-options="detailPerPageOptions" :total="detailTotal" show-detail />
</preview>

```vue
<template>
  <p-pagination
    v-model="model"
    v-model:per-page="perPage"
    :total="total"
    :per-page-options="perPageOptions"
    show-detail />
</template>

<script setup>
  const model          = ref(1)
  const total          = ref(50)
  const perPage        = ref(10)
  const perPageOptions = ref([5,10,15])
</script>
```

## Navigation Text
Add prop `navigation-text` to change previous and next icon to text, default is `Previous` and `Next`.\
You can change the text label via `prev-nav-label` and `next-nav-label` prop.

<preview class="flex-col space-y-2">
  <p-pagination v-model="simpleModel" :total="simpleTotal" navigation-text />
  <p-pagination v-model="simpleModel" :total="simpleTotal" navigation-text prev-nav-label="Kembali" next-nav-label="Lanjut" />
</preview>

```vue
<template>
  <p-pagination v-model="model" :total="total" navigation-text />
  <p-pagination
    v-model="model"
    :total="total"
    navigation-text
    prev-nav-label="Kembali"
    next-nav-label="Lanjut" />
</template>

<script setup>
  const model = ref(1)
  const total = ref(100)
</script>
```

## Navigation Only

Add prop `navigation-only` to show navigation without page items. Navigation only  will auto aligned to right.

<preview class="flex-col space-y-2">
  <p-pagination v-model="navModel" navigation-only :total="navTotal" />
  <p-pagination v-model="navModel" v-model:per-page="navPerPage" :per-page-options="navPerPageOptions" :total="navTotal" show-counter navigation-only />
  <p-pagination v-model="navModel" v-model:per-page="navPerPage" :per-page-options="navPerPageOptions" :total="navTotal" show-per-page navigation-only />
  <p-pagination v-model="navModel" v-model:per-page="navPerPage" :per-page-options="navPerPageOptions" :total="navTotal" show-detail navigation-only />
</preview>

```vue
<template>
  <p-pagination v-model="model" navigation-only :total="total" />
  <p-pagination
    v-model="model"
    v-model:per-page="perPage"
    :per-page-options="perPageOptions"
    :total="total"
    navigation-only
    show-counter />
  <p-pagination
    v-model="model"
    v-model:per-page="perPage"
    :per-page-options="perPageOptions"
    :total="total"
    navigation-only
    show-per-page />
  <p-pagination
    v-model="model"
    v-model:per-page="perPage"
    :per-page-options="perPageOptions"
    :total="total"
    navigation-only
    show-detail />
</template>

<script setup>
  const model = ref(1)
  const total = ref(50)
  const perPage        = ref(10)
  const perPageOptions = ref([5,10,15])
</script>
```

## Quick Jump

Add prop `quick-jump` to change mode to quick jump.

<preview class="flex-col space-y-2">
  <p-pagination v-model="quickModel" v-model:per-page="quickPerPage" :total="quickTotal" quick-jump />
  <p-pagination v-model="quickModel" v-model:per-page="quickPerPage" :per-page-options="quickPerPageOptions" :total="quickTotal" quick-jump show-detail />
</preview>

```vue
<template>
  <p-pagination v-model="model" :total="total" quick-jump />
  <p-pagination
    v-model="model"
    v-model:per-page="perPage"
    :per-page-options="perPageOptions"
    :total="total"
    quick-jump
    show-detail />
</template>

<script>
  const model          = ref(1)
  const total          = ref(100)
  const perPage        = ref(10)
  const perPageOptions = ref([5,10,15])
</script>
```

## Customization Slots

### Custom Navigation

<preview>
  <p-pagination v-model="simpleModel" variant="far" :total="100">
    <template #first-navigation>
      <IconSkipBack />
    </template>
    <template #last-navigation>
      <IconSkipForward />
    </template>
    <template #prev-navigation>
      <IconPrevOutline />
    </template>
    <template #next-navigation>
      <IconNextOutline />
    </template>
  </p-pagination>
</preview>

```vue
<template>
 <p-pagination v-model="model" variant="far" :total="100">
    <template #first-navigation>
      <IconSkipBack />
    </template>
    <template #last-navigation>
      <IconSkipForward />
    </template>
    <template #prev-navigation>
      <IconPrevOutline/>
    </template>
    <template #next-navigation>
      <IconNextOutline/>
    </template>
 </p-pagination>
</template>
```

### Custom Data Counter

<preview>
  <p-pagination v-model="detailModel" v-model:per-page="detailPerPage" :total="detailTotal" show-detail>
    <template #pagination-count="{ range, total }">
      {{ range[0] }} to {{ range[1] }} from {{ total }}
    </template>
  </p-pagination>
</preview>

```vue
<template>
  <p-pagination v-model="model" v-model:per-page="perPage" :total="total" show-detail>
    <template #pagination-count="{ range, total }">
      {{ range[0] }} to {{ range[1] }} from {{ total }}
    </template>
  </p-pagination>
</template>
```

### Custom Page Count

<preview>
  <p-pagination v-model="quickModel" :total="quickTotal" quick-jump page-label="Halaman">
    <template #quick-jump-count="{ total }">
      dari {{ total }}
    </template>
  </p-pagination>
</preview>


```vue
<template>
  <p-pagination v-model="model" :total="total" quick-jump page-label="Halaman">
    <template #quick-jump-count="{ total }">
      dari {{ total }}
    </template>
  </p-pagination>
</template>
```

## API

### Props

| Props              |    Type    |   Default    | Description                                                                                   |
| ------------------ | :--------: | :----------: | --------------------------------------------------------------------------------------------- |
| `modelValue`       |  `Number`  |     `-`      | `v-model` value. Specified as current page                                                    |
| `quick-jump`       | `Boolean`  |   `false`    | Shorten pagination using select component                                                     |
| `show-counter`     | `Boolean`  |   `false`    | Show the data items counters                                                                  |
| `show-per-page`    | `Boolean`  |   `false`    | Show the per page options                                                                     |
| `show-detail`      | `Boolean`  |   `false`    | Show the data items counter and per page options                                              |
| `navigation-text`  | `Boolean`  |   `false`    | Change previous and next navigation icon to text label                                        |
| `navigation-only`  | `Boolean`  |   `false`    | Hide pagination items and show the navigation only                                            |
| `per-page`         |  `Number`  |     `10`     | Number of data items per page                                                                 |
| `per-page-options` | `Number[]` | `[10,20,30]` | Specify per page options                                                                      |
| `total`            |  `Number`  |     `0`      | Total number of data items                                                                    |
| `display-limit`    |  `Number`  |     `10`     | Maximum display limit of visible page buttons. Included two ellipsis                          |
| `variant`          |  `String`  |   `short`    | Specify navigation variant                                                                    |
| `page-label`       |  `String`  |    `Page`    | Label to place in the quick jump                                                              |
| `prev-nav-label`   |  `String`  |  `Previous`  | Label to place in the previous navigation button. Only works if `navigation-text` is provided |
| `next-nav-label`   |  `String`  |    `Next`    | Label to place in the next navigation button. Only works if `navigation-text` is provided     |
| `first-nav-label`  |  `String`  |   `First`    | Label to place in the first navigation button                                                 |
| `last-nav-label`   |  `String`  |    `Last`    | Label to place in the last navigation button                                                  |
| `show-rows-label`  |  `String`  | `Show rows`  | Label to place in the per page options. Only works if `show-detail` is provided               |
| `select-size`      |  `String`  |     `md`     | Set size of select input. Valid value is `xs`, `sm`, `md` and `lg`                            |

### Slots
| Name               | Scoped              | Description                                                                                |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------ |
| `first-navigation` | No                  | Content to place in first navigation button when prop `variant` set to `far`               |
| `last-navigation`  | No                  | Content to place in last navigation button when prop `variant` set to `far`                |
| `prev-navigation`  | No                  | Content to place in previous navigation button when prop `variant` set to `short` or `far` |
| `next-navigation`  | No                  | Content to place in next navigation button when prop `variant` set to `short` or `far`     |
| `quick-jump-count` | `total`             | Content to place in quick jump page count when prop `quick-jump` is provided               |
| `pagination-count` | `range` and `total` | Content to place in pagination counter when prop `show-detail` is provided                 |

## See Also
- [Table Static](/components/table-static/)
- [Table Flex](/components/table-flex/)

