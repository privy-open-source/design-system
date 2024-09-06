---
title: Tabs · Components
description: Base tab menus.
---

<script setup>
  import pTabs from './Tabs.vue'
  import pTab from './Tab.vue'
  import pBadge from '../badge/Badge.vue'
  import IconEdit from '@privyid/persona-icon/vue/edit/20.vue'
  import IconView from '@privyid/persona-icon/vue/view/20.vue'
  import IconDocument from '@privyid/persona-icon/vue/document-filled/20.vue'
  import { ref } from 'vue-demi'

  const active = ref(1)
</script>

<style lang="postcss" scoped>
  .preview {
    @apply block;
  }
</style>

# Tabs

> Base tab menus.

## Usage

### Basic Usage

<preview>
  <p-tabs>
    <p-tab title="Home">Home page content</p-tab>
    <p-tab title="Profile">Profile page content</p-tab>
    <p-tab title="Setting" disabled>Setting page content</p-tab>
  </p-tabs>
</preview>

```vue
<template>
  <p-tabs>
    <p-tab title="Home">Home page content</p-tab>
    <p-tab title="Profile">Profile page content</p-tab>
    <p-tab title="Setting" disabled>Setting page content</p-tab>
  </p-tabs>
</template>
```

### Variants
Navigation of tabs has 3 variants, `tabs`, `pills` and `lines`. Default is `pills`

<preview>
  <p-tabs variant="tabs">
    <p-tab title="Home">Home page content</p-tab>
    <p-tab title="Profile">Profile page content</p-tab>
    <p-tab title="Setting" disabled>Setting page content</p-tab>
  </p-tabs>
  <p-tabs variant="pills">
    <p-tab title="Home">Home page content</p-tab>
    <p-tab title="Profile">Profile page content</p-tab>
    <p-tab title="Setting" disabled>Setting page content</p-tab>
  </p-tabs>
  <p-tabs variant="lines">
    <p-tab title="Home">Home page content</p-tab>
    <p-tab title="Profile">Profile page content</p-tab>
    <p-tab title="Setting" disabled>Setting page content</p-tab>
  </p-tabs>
</preview>

```vue
<template>
  <p-tabs variant="tabs">
    <p-tab title="Home">Home page content</p-tab>
    <p-tab title="Profile">Profile page content</p-tab>
    <p-tab title="Setting" disabled>Setting page content</p-tab>
  </p-tabs>
  <p-tabs variant="pills">
    <p-tab title="Home">Home page content</p-tab>
    <p-tab title="Profile">Profile page content</p-tab>
    <p-tab title="Setting" disabled>Setting page content</p-tab>
  </p-tabs>
  <p-tabs variant="lines">
    <p-tab title="Home">Home page content</p-tab>
    <p-tab title="Profile">Profile page content</p-tab>
    <p-tab title="Setting" disabled>Setting page content</p-tab>
  </p-tabs>
</template>
```

## Fill & Justify
Tabs can be fullwidth. There are 2 options available: `fill` and `justified`. To proportionately fill all available space, choose `fill`. When need every nav item will be the same width, choose `justified`.

<preview>
  <p-tabs fill>
    <p-tab title="Home">Home page content</p-tab>
    <p-tab title="Profile">Profile page content</p-tab>
    <p-tab title="Setting" disabled>Setting page content</p-tab>
  </p-tabs>
  <p-tabs justified>
    <p-tab title="Home">Home page content</p-tab>
    <p-tab title="Profile">Profile page content</p-tab>
    <p-tab title="Setting" disabled>Setting page content</p-tab>
  </p-tabs>
</preview>

```vue
<template>
  <p-tabs fill>
    <p-tab title="Home">Home page content</p-tab>
    <p-tab title="Profile">Profile page content</p-tab>
    <p-tab title="Setting" disabled>Setting page content</p-tab>
  </p-tabs>
  <p-tabs justified>
    <p-tab title="Home">Home page content</p-tab>
    <p-tab title="Profile">Profile page content</p-tab>
    <p-tab title="Setting" disabled>Setting page content</p-tab>
  </p-tabs>
</template>
```

## Alignment
To align Tabs, use `align` prop. Available value are `left`, `right` and `center`. The `center` align just working in horizontal Tabs.

<preview>
  <p-tabs align="left">
    <p-tab title="Home">Home page content</p-tab>
    <p-tab title="Profile">Profile page content</p-tab>
    <p-tab title="Setting" disabled>Setting page content</p-tab>
  </p-tabs>
  <p-tabs align="center">
    <p-tab title="Home">Home page content</p-tab>
    <p-tab title="Profile">Profile page content</p-tab>
    <p-tab title="Setting" disabled>Setting page content</p-tab>
  </p-tabs>
  <p-tabs align="right">
    <p-tab title="Home">Home page content</p-tab>
    <p-tab title="Profile">Profile page content</p-tab>
    <p-tab title="Setting" disabled>Setting page content</p-tab>
  </p-tabs>
</preview>

```vue
<template>
  <p-tabs align="left">
    <p-tab title="Home">Home page content</p-tab>
    <p-tab title="Profile">Profile page content</p-tab>
    <p-tab title="Setting" disabled>Setting page content</p-tab>
  </p-tabs>
  <p-tabs align="center">
    <p-tab title="Home">Home page content</p-tab>
    <p-tab title="Profile">Profile page content</p-tab>
    <p-tab title="Setting" disabled>Setting page content</p-tab>
  </p-tabs>
  <p-tabs align="right">
    <p-tab title="Home">Home page content</p-tab>
    <p-tab title="Profile">Profile page content</p-tab>
    <p-tab title="Setting" disabled>Setting page content</p-tab>
  </p-tabs>
</template>
```

## With Icon & Badge

### Icon

<preview>
  <p-tabs>
    <p-tab>
      <template #icon>
        <IconEdit />
      </template>
      But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born
    </p-tab>
    <p-tab>
      <template #icon>
        <IconView />
      </template>
      A wonderful serenity has taken possession of my entire soul, like these sweet mornings
    </p-tab>
    <p-tab disabled>
      <template #icon>
        <IconDocument />
      </template>
      One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed
    </p-tab>
  </p-tabs>
</preview>

```vue
<template>
  <p-tabs>
    <p-tab>
      <template #icon>
        <IconEdit />
      </template>
      But I must explain to you how all this mistaken idea of
      denouncing pleasure and praising pain was born
    </p-tab>
    <p-tab>
      <template #icon>
        <IconView />
      </template>
      A wonderful serenity has taken possession of my entire soul,
      like these sweet mornings
    </p-tab>
    <p-tab disabled>
      <template #icon>
        <IconDocument />
      </template>
      One morning, when Gregor Samsa woke from troubled dreams,
      he found himself transformed
    </p-tab>
  </p-tabs>
</template>
```

<preview>
  <p-tabs>
    <p-tab>
      <template #icon>
        <IconEdit />
      </template>
      <template #title>
        Edit
      </template>
      One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed
    </p-tab>
    <p-tab>
      <template #icon>
        <IconView />
      </template>
      <template #title>
        View
      </template>
      A wonderful serenity has taken possession of my entire soul, like these sweet mornings
    </p-tab>
    <p-tab disabled>
      <template #icon>
        <IconDocument />
      </template>
      <template #title>
        Setting
      </template>
      But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born
    </p-tab>
  </p-tabs>
</preview>

```vue
<template>
  <p-tabs>
    <p-tab>
      <template #icon>
        <IconEdit />
      </template>
      <template #title>
        Edit
      </template>
      One morning, when Gregor Samsa woke from troubled dreams,
      he found himself transformed
    </p-tab>
    <p-tab>
      <template #icon>
        <IconView />
      </template>
      <template #title>
        View
      </template>
      A wonderful serenity has taken possession of my entire soul,
      like these sweet mornings
    </p-tab>
    <p-tab disabled>
      <template #icon>
        <IconDocument />
      </template>
      <template #title>
        Setting
      </template>
      But I must explain to you how all this mistaken idea of denouncing
      pleasure and praising pain was born
    </p-tab>
  </p-tabs>
</template>
```
### Badge

<preview>
  <p-tabs>
    <p-tab>
      <template #title>
        To Sign <p-badge color="info">25</p-badge>
      </template>
      But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born
    </p-tab>
    <p-tab>
      <template #title>
        To Review <p-badge color="info">25</p-badge>
      </template>
      One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed
    </p-tab>
  </p-tabs>
</preview>

```vue
<template>
  <p-tabs>
    <p-tab>
      <template #title>
        To Sign <p-badge color="info">25</p-badge>
      </template>
      But I must explain to you how all this mistaken idea
      of denouncing pleasure and praising pain was born
    </p-tab>
    <p-tab>
      <template #title>
        To Review <p-badge color="info">25</p-badge>
      </template>
      One morning, when Gregor Samsa woke from troubled dreams,
      he found himself transformed
    </p-tab>
  </p-tabs>
</template>
```

<preview>
  <p-tabs justified>
    <p-tab>
      <template #icon>
        <IconEdit />
      </template>
      <template #title>
        To Sign <p-badge color="info" variant="light">25</p-badge>
      </template>
      One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed
    </p-tab>
    <p-tab>
      <template #icon>
        <IconView />
      </template>
      <template #title>
        To Review <p-badge color="info" variant="light">25</p-badge>
      </template>
      A wonderful serenity has taken possession of my entire soul, like these sweet mornings
    </p-tab>
  </p-tabs>
</preview>

```vue
<template>
  <p-tabs justified>
    <p-tab>
      <template #icon>
        <IconEdit />
      </template>
      <template #title>
        To Sign <p-badge color="info" variant="light">25</p-badge>
      </template>
      One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed
    </p-tab>
    <p-tab>
      <template #icon>
        <IconView />
      </template>
      <template #title>
        To Review <p-badge color="info" variant="light">25</p-badge>
      </template>
      A wonderful serenity has taken possession of my entire soul, like these sweet mornings
    </p-tab>
  </p-tabs>
</template>
```

### Vertical
The available alignment in vertical Tabs is just `left` and `right`

<preview>
  <p-tabs vertical nav-wrapper-class="w-48">
    <p-tab title="Home">
      One morning, when Gregor Samsa woke from troubled dreams,
      he found himself transformed in his bed into a horrible vermin.
      He lay on his armour-like back, and if he lifted his head
    </p-tab>
    <p-tab title="Profile">
      But I must explain to you how all this mistaken idea of
      denouncing pleasure and praising pain was born and I will
      give you a complete account of the system,
    </p-tab>
    <p-tab title="Setting" disabled>
      Far far away, behind the word mountains, far from
      the countries Vokalia and Consonantia, there live the
      blind texts. Separated they live in Bookmarksgrove right
    </p-tab>
  </p-tabs>
</preview>

```vue
<template>
  <p-tabs vertical nav-wrapper-class="w-48">
    <p-tab title="Home">
      One morning, when Gregor Samsa woke from troubled dreams,
      he found himself transformed in his bed into a horrible vermin.
      He lay on his armour-like back, and if he lifted his head
    </p-tab>
    <p-tab title="Profile">
      But I must explain to you how all this mistaken idea of
      denouncing pleasure and praising pain was born and I will
      give you a complete account of the system,
    </p-tab>
    <p-tab title="Setting" disabled>
      Far far away, behind the word mountains, far from
      the countries Vokalia and Consonantia, there live the
      blind texts. Separated they live in Bookmarksgrove right
    </p-tab>
  </p-tabs>
</template>
```

<preview>
  <p-tabs vertical nav-wrapper-class="w-48" align="right">
    <p-tab title="Home">
      One morning, when Gregor Samsa woke from troubled dreams,
      he found himself transformed in his bed into a horrible vermin.
      He lay on his armour-like back, and if he lifted his head
    </p-tab>
    <p-tab title="Profile">
      But I must explain to you how all this mistaken idea of
      denouncing pleasure and praising pain was born and I will
      give you a complete account of the system,
    </p-tab>
    <p-tab title="Setting" disabled>
      Far far away, behind the word mountains, far from
      the countries Vokalia and Consonantia, there live the
      blind texts. Separated they live in Bookmarksgrove right
    </p-tab>
  </p-tabs>
</preview>

```vue
<template>
  <p-tabs vertical nav-wrapper-class="w-48" align="right">
    <p-tab title="Home">
      One morning, when Gregor Samsa woke from troubled dreams,
      he found himself transformed in his bed into a horrible vermin.
      He lay on his armour-like back, and if he lifted his head
    </p-tab>
    <p-tab title="Profile">
      But I must explain to you how all this mistaken idea of
      denouncing pleasure and praising pain was born and I will
      give you a complete account of the system,
    </p-tab>
    <p-tab title="Setting" disabled>
      Far far away, behind the word mountains, far from
      the countries Vokalia and Consonantia, there live the
      blind texts. Separated they live in Bookmarksgrove right
    </p-tab>
  </p-tabs>
</template>
```
## Binding v-model

You can binding current active with v-model

<preview>
  <p-tabs v-model="active">
    <p-tab title="Home">
      One morning, when Gregor Samsa woke from troubled dreams,
      he found himself transformed in his bed into a horrible vermin.
      He lay on his armour-like back, and if he lifted his head
    </p-tab>
    <p-tab title="Profile">
      But I must explain to you how all this mistaken idea of
      denouncing pleasure and praising pain was born and I will
      give you a complete account of the system,
    </p-tab>
    <p-tab title="Setting" disabled>
      Far far away, behind the word mountains, far from
      the countries Vokalia and Consonantia, there live the
      blind texts. Separated they live in Bookmarksgrove right
    </p-tab>
  </p-tabs>
</preview>

**Active :**

<pre><code>{{ active }}</code></pre>

```vue
<template>
  <p-tabs v-model="active">
    <p-tab title="Home">
      One morning, when Gregor Samsa woke from troubled dreams,
      he found himself transformed in his bed into a horrible vermin.
      He lay on his armour-like back, and if he lifted his head
    </p-tab>
    <p-tab title="Profile">
      But I must explain to you how all this mistaken idea of
      denouncing pleasure and praising pain was born and I will
      give you a complete account of the system,
    </p-tab>
    <p-tab title="Setting" disabled>
      Far far away, behind the word mountains, far from
      the countries Vokalia and Consonantia, there live the
      blind texts. Separated they live in Bookmarksgrove right
    </p-tab>
  </p-tabs>
</template>
```

## Variables

Tabs use local CSS variables for enhanced real-time customization.

```sass
--p-tabs-content-padding-x: theme(spacing.6);
--p-tabs-content-padding-y: theme(spacing.6); // for vertical variant
```

## API

### Props `<p-tabs>`

| Props               |   Type    |   Default   | Description                                                             |
|---------------------|:---------:|:-----------:|-------------------------------------------------------------------------|
| `variant`           | `String`  |   `pills`   | Tabs navigation variant, valid value is `pills`, `lines` and `tabs`     |
| `fill`              | `Boolean` |   `false`   | Activate fullwidth Tabs navigation with `fill` type                     |
| `justified`         | `Boolean` |   `false`   | Activate fullwidth Tabs navigation with `justified` type                |
| `align`             | `String`  |   `left`    | Tabs navigation alignment, valid value is `left`, `center`, and `right` |
| `vertical`          | `Boolean` |   `false`   | Activate vertical Tabs                                                  |
| `nav-wrapper-class` | `String`  | `undefined` | Class to place in the navigation wrapper                                |
| `keep-alive`        | `Boolean` |   `false`   | Enable [KeepAlive][KeepAlive]                                           |
| `modelValue`        | `Number`  |     `0`     | `v-model` for actived tab                                               |

### Slots `<p-tabs>`

| Name      | Description                 |
|-----------|-----------------------------|
| `default` | Content to place in the Nav |

### Props `<p-tab>`

| Props      |   Type    |   Default   | Description                                              |
|------------|:---------:|:-----------:|----------------------------------------------------------|
| `title`    | `String`  | `undefined` | Place content in the Tab title                           |
| `disabled` | `Boolean` |   `false`   | Disable tab functionality and place it in disabled state |

### Slots `<p-tab>`

| Name      | Description                             |
|-----------|-----------------------------------------|
| `default` | Content to place in the Tab             |
| `icon`    | Content to place icon in Tab navigation |
| `title`   | Content to place icon in Tab title      |

### Events

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

[KeepAlive]: https://vuejs.org/guide/built-ins/keep-alive.html
