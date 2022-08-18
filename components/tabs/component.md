<script setup>
  import Tabs from './Tabs.vue'
  import Tab from './Tab.vue'
  import Badge from '../badge/Badge.vue'
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
    <Tab title="home">home page content</Tab>
    <Tab title="profile">profile page content</Tab>
    <Tab disabled>
      <template #title>
        Setting <Badge>new</Badge>
      </template>
      setting page content
    </Tab>
  </Tabs>
</preview>

```vue
<template>
  <Tabs>
    <Tab title="home">home page content</Tab>
    <Tab title="profile">profile page content</Tab>
    <Tab disabled>
      <template #title>
        Setting <Badge>new</Badge>
      </template>
      setting page content
    </Tab>
  </Tabs>
</template>
```

### Vertical
<preview>
  <Tabs vertical nav-wrapper-class="w-80">
    <Tab title="home">home page content</Tab>
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
