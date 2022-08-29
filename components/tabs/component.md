<script setup>
  import Tabs from './Tabs.vue'
  import Tab from './Tab.vue'
  import Badge from '../badge/Badge.vue'
  import IconEdit from '@carbon/icons-vue/lib/edit/16'
  import IconView from '@carbon/icons-vue/lib/view/16'
  import IconDocument from '@carbon/icons-vue/lib/document/16'
</script>

<style scoped>
  .preview {
    @apply block;
  }
</style>

# Tabs

## Usage

### Basic Usage

<preview>
  <Tabs>
    <Tab title="Home">Home page content</Tab>
    <Tab title="Profile">Profile page content</Tab>
    <Tab title="Setting" disabled>Setting page content</Tab>
  </Tabs>
</preview>

```vue
<template>
  <Tabs>
    <Tab title="Home">Home page content</Tab>
    <Tab title="Profile">Profile page content</Tab>
    <Tab title="Setting" disabled>Setting page content</Tab>
  </Tabs>
</template>
```

### Variants
Navigation of tabs has 3 variants, `tabs`, `pills` and `lines`. Default is `pills`

<preview>
  <Tabs variant="tabs">
    <Tab title="Home">Home page content</Tab>
    <Tab title="Profile">Profile page content</Tab>
    <Tab title="Setting" disabled>Setting page content</Tab>
  </Tabs>
  <Tabs variant="pills">
    <Tab title="Home">Home page content</Tab>
    <Tab title="Profile">Profile page content</Tab>
    <Tab title="Setting" disabled>Setting page content</Tab>
  </Tabs>
  <Tabs variant="lines">
    <Tab title="Home">Home page content</Tab>
    <Tab title="Profile">Profile page content</Tab>
    <Tab title="Setting" disabled>Setting page content</Tab>
  </Tabs>
</preview>

```vue
<template>
  <Tabs variant="tabs">
    <Tab title="Home">Home page content</Tab>
    <Tab title="Profile">Profile page content</Tab>
    <Tab title="Setting" disabled>Setting page content</Tab>
  </Tabs>
  <Tabs variant="pills">
    <Tab title="Home">Home page content</Tab>
    <Tab title="Profile">Profile page content</Tab>
    <Tab title="Setting" disabled>Setting page content</Tab>
  </Tabs>
  <Tabs variant="lines">
    <Tab title="Home">Home page content</Tab>
    <Tab title="Profile">Profile page content</Tab>
    <Tab title="Setting" disabled>Setting page content</Tab>
  </Tabs>
</template>
```

## Fill & Justify
Tabs can be fullwidth. There are 2 options available: `fill` and `justified`. To proportionately fill all available space, choose `fill`. When need every nav item will be the same width, choose `justified`.

<preview>
  <Tabs fill>
    <Tab title="Home">Home page content</Tab>
    <Tab title="Profile">Profile page content</Tab>
    <Tab title="Setting" disabled>Setting page content</Tab>
  </Tabs>
  <Tabs justified>
    <Tab title="Home">Home page content</Tab>
    <Tab title="Profile">Profile page content</Tab>
    <Tab title="Setting" disabled>Setting page content</Tab>
  </Tabs>
</preview>

```vue
<template>
  <Tabs fill>
    <Tab title="Home">Home page content</Tab>
    <Tab title="Profile">Profile page content</Tab>
    <Tab title="Setting" disabled>Setting page content</Tab>
  </Tabs>
  <Tabs justified>
    <Tab title="Home">Home page content</Tab>
    <Tab title="Profile">Profile page content</Tab>
    <Tab title="Setting" disabled>Setting page content</Tab>
  </Tabs>
</template>
```

## Alignment

To align Tabs, use `align` prop. Available value are `left`, `right` and `center`

<preview>
  <Tabs align="left">
    <Tab title="Home">Home page content</Tab>
    <Tab title="Profile">Profile page content</Tab>
    <Tab title="Setting" disabled>Setting page content</Tab>
  </Tabs>
  <Tabs align="center">
    <Tab title="Home">Home page content</Tab>
    <Tab title="Profile">Profile page content</Tab>
    <Tab title="Setting" disabled>Setting page content</Tab>
  </Tabs>
  <Tabs align="right">
    <Tab title="Home">Home page content</Tab>
    <Tab title="Profile">Profile page content</Tab>
    <Tab title="Setting" disabled>Setting page content</Tab>
  </Tabs>
</preview>

```vue
<template>
  <Tabs align="left">
    <Tab title="Home">Home page content</Tab>
    <Tab title="Profile">Profile page content</Tab>
    <Tab title="Setting" disabled>Setting page content</Tab>
  </Tabs>
  <Tabs align="center">
    <Tab title="Home">Home page content</Tab>
    <Tab title="Profile">Profile page content</Tab>
    <Tab title="Setting" disabled>Setting page content</Tab>
  </Tabs>
  <Tabs align="right">
    <Tab title="Home">Home page content</Tab>
    <Tab title="Profile">Profile page content</Tab>
    <Tab title="Setting" disabled>Setting page content</Tab>
  </Tabs>
</template>
```

## With Icon & Badge

### Icon

<preview>
  <Tabs>
    <Tab>
      <template #title>
        <IconEdit />
        adsfasdf
      </template>
      Edit Section
    </Tab>
    <Tab title="Profile">
      <template #title>
        <IconView />
      </template>
      View's Section
    </Tab>
    <Tab title="Setting" disabled>
      <template #title>
        <IconDocument />
      </template>
      Settings Section
    </Tab>
  </Tabs>
  <Tabs>
    <Tab title="Home">Home page content</Tab>
    <Tab title="Profile">Profile page content</Tab>
    <Tab title="Setting" disabled>Setting page content</Tab>
  </Tabs>
</preview>

```vue
<template>
  <Tabs>
    <Tab title="Home">Home page content</Tab>
    <Tab title="Profile">Profile page content</Tab>
    <Tab title="Setting" disabled>Setting page content</Tab>
  </Tabs>
  <Tabs>
    <Tab title="Home">Home page content</Tab>
    <Tab title="Profile">Profile page content</Tab>
    <Tab title="Setting" disabled>Setting page content</Tab>
  </Tabs>
</template>
```

### Vertical
<preview>
  <Tabs vertical nav-wrapper-class="w-80">
    <Tab title="home">home page content</Tab>
    <Tab title="home">home page</Tab>
    <Tab title="home">home</Tab>
  </Tabs>
  <Tabs vertical variant="lines">
    <Tab title="home">home page content</Tab>
  </Tabs>
  <Tabs vertical variant="pills">
    <Tab title="home">home page content</Tab>
  </Tabs>
  <Tabs vertical align="right">
    <Tab title="home">home page content</Tab>
  </Tabs>
  <Tabs vertical variant="lines" align="right">
    <Tab title="home">home page content</Tab>
  </Tabs>
  <Tabs vertical variant="pills" align="right">
    <Tab title="home">home page content</Tab>
  </Tabs>
</preview>

```vue
<template>
  <Tabs>
    <Tab title="home">home page content</Tab>
  </Tabs>
</template>
```
