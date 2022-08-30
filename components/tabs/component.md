<script setup>
  import Tabs from './Tabs.vue'
  import Tab from './Tab.vue'
  import Badge from '../badge/Badge.vue'
  import IconEdit from '@carbon/icons-vue/lib/edit/20'
  import IconView from '@carbon/icons-vue/lib/view/20'
  import IconDocument from '@carbon/icons-vue/lib/document/20'
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
To align Tabs, use `align` prop. Available value are `left`, `right` and `center`. The `center` align just working in horizontal Tabs.

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
      <template #icon>
        <IconEdit />
      </template>
      But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born
    </Tab>
    <Tab>
      <template #icon>
        <IconView />
      </template>
      A wonderful serenity has taken possession of my entire soul, like these sweet mornings
    </Tab>
    <Tab disabled>
      <template #icon>
        <IconDocument />
      </template>
      One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed
    </Tab>
  </Tabs>
</preview>

```vue
<template>
  <Tabs>
    <Tab>
      <template #icon>
        <IconEdit />
      </template>
      But I must explain to you how all this mistaken idea of 
      denouncing pleasure and praising pain was born
    </Tab>
    <Tab>
      <template #icon>
        <IconView />
      </template>
      A wonderful serenity has taken possession of my entire soul, 
      like these sweet mornings
    </Tab>
    <Tab disabled>
      <template #icon>
        <IconDocument />
      </template>
      One morning, when Gregor Samsa woke from troubled dreams, 
      he found himself transformed
    </Tab>
  </Tabs>
</template>
```

<preview>
  <Tabs>
    <Tab>
      <template #icon>
        <IconEdit />
      </template>
      <template #title>
        Edit
      </template>
      One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed
    </Tab>
    <Tab>
      <template #icon>
        <IconView />
      </template>
      <template #title>
        View
      </template>
      A wonderful serenity has taken possession of my entire soul, like these sweet mornings
    </Tab>
    <Tab disabled>
      <template #icon>
        <IconDocument />
      </template>
      <template #title>
        Setting
      </template>
      But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born
    </Tab>
  </Tabs>
</preview>

```vue
<template>
  <Tabs>
    <Tab>
      <template #icon>
        <IconEdit />
      </template>
      <template #title>
        Edit
      </template>
      One morning, when Gregor Samsa woke from troubled dreams, 
      he found himself transformed
    </Tab>
    <Tab>
      <template #icon>
        <IconView />
      </template>
      <template #title>
        View
      </template>
      A wonderful serenity has taken possession of my entire soul, 
      like these sweet mornings
    </Tab>
    <Tab disabled>
      <template #icon>
        <IconDocument />
      </template>
      <template #title>
        Setting
      </template>
      But I must explain to you how all this mistaken idea of denouncing 
      pleasure and praising pain was born
    </Tab>
  </Tabs>
</template>
```
### Badge

<preview>
  <Tabs>
    <Tab>
      <template #title>
        To Sign <Badge color="primary">25</Badge>
      </template>
      But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born
    </Tab>
    <Tab>
      <template #title>
        To Review <Badge color="primary">25</Badge>
      </template>
      One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed
    </Tab>
  </Tabs>
</preview>

```vue
<template>
  <Tabs>
    <Tab>
      <template #title>
        To Sign <Badge color="primary">25</Badge>
      </template>
      But I must explain to you how all this mistaken idea 
      of denouncing pleasure and praising pain was born
    </Tab>
    <Tab>
      <template #title>
        To Review <Badge color="primary">25</Badge>
      </template>
      One morning, when Gregor Samsa woke from troubled dreams, 
      he found himself transformed
    </Tab>
  </Tabs>
</template>
```

<preview>
  <Tabs justified>
    <Tab>
      <template #icon>
        <IconEdit />
      </template>
      <template #title>
        To Sign <Badge color="primary" variant="light">25</Badge>
      </template>
      One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed
    </Tab>
    <Tab>
      <template #icon>
        <IconView />
      </template>
      <template #title>
        To Review <Badge color="primary" variant="light">25</Badge>
      </template>
      A wonderful serenity has taken possession of my entire soul, like these sweet mornings
    </Tab>
  </Tabs>
</preview>

```vue
<template>
  <Tabs justified>
    <Tab>
      <template #icon>
        <IconEdit />
      </template>
      <template #title>
        To Sign <Badge color="primary" variant="light">25</Badge>
      </template>
      One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed
    </Tab>
    <Tab>
      <template #icon>
        <IconView />
      </template>
      <template #title>
        To Review <Badge color="primary" variant="light">25</Badge>
      </template>
      A wonderful serenity has taken possession of my entire soul, like these sweet mornings
    </Tab>
  </Tabs>
</template>
```

### Vertical
Available alignment in vertical Tabs is just `left` and `right`

<preview>
  <Tabs vertical nav-wrapper-class="w-48">
    <Tab title="Home">
      One morning, when Gregor Samsa woke from troubled dreams, 
      he found himself transformed in his bed into a horrible vermin. 
      He lay on his armour-like back, and if he lifted his head
    </Tab>
    <Tab title="Profile">
      But I must explain to you how all this mistaken idea of 
      denouncing pleasure and praising pain was born and I will 
      give you a complete account of the system,
    </Tab>
    <Tab title="Setting" disabled>
      Far far away, behind the word mountains, far from 
      the countries Vokalia and Consonantia, there live the 
      blind texts. Separated they live in Bookmarksgrove right
    </Tab>
  </Tabs>
</preview>

```vue
<template>
  <Tabs vertical nav-wrapper-class="w-48">
    <Tab title="Home">
      One morning, when Gregor Samsa woke from troubled dreams, 
      he found himself transformed in his bed into a horrible vermin. 
      He lay on his armour-like back, and if he lifted his head
    </Tab>
    <Tab title="Profile">
      But I must explain to you how all this mistaken idea of 
      denouncing pleasure and praising pain was born and I will 
      give you a complete account of the system,
    </Tab>
    <Tab title="Setting" disabled>
      Far far away, behind the word mountains, far from 
      the countries Vokalia and Consonantia, there live the 
      blind texts. Separated they live in Bookmarksgrove right
    </Tab>
  </Tabs>
</template>
```

<preview>
  <Tabs vertical nav-wrapper-class="w-48" align="right">
    <Tab title="Home">
      One morning, when Gregor Samsa woke from troubled dreams, 
      he found himself transformed in his bed into a horrible vermin. 
      He lay on his armour-like back, and if he lifted his head
    </Tab>
    <Tab title="Profile">
      But I must explain to you how all this mistaken idea of 
      denouncing pleasure and praising pain was born and I will 
      give you a complete account of the system,
    </Tab>
    <Tab title="Setting" disabled>
      Far far away, behind the word mountains, far from 
      the countries Vokalia and Consonantia, there live the 
      blind texts. Separated they live in Bookmarksgrove right
    </Tab>
  </Tabs>
</preview>

```vue
<template>
  <Tabs vertical nav-wrapper-class="w-48" align="right">
    <Tab title="Home">
      One morning, when Gregor Samsa woke from troubled dreams, 
      he found himself transformed in his bed into a horrible vermin. 
      He lay on his armour-like back, and if he lifted his head
    </Tab>
    <Tab title="Profile">
      But I must explain to you how all this mistaken idea of 
      denouncing pleasure and praising pain was born and I will 
      give you a complete account of the system,
    </Tab>
    <Tab title="Setting" disabled>
      Far far away, behind the word mountains, far from 
      the countries Vokalia and Consonantia, there live the 
      blind texts. Separated they live in Bookmarksgrove right
    </Tab>
  </Tabs>
</template>
```
