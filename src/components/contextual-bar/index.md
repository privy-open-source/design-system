---
title: Contextual Bar · Components
description: App-level notification bar.
---

<script setup>
import pContextualBar from './ContextualBar.vue'
import pButton from '../button/Button.vue'
import { ref, onMounted } from "vue-demi"
import IconInfo from '@privyid/persona-icon/vue/information-circle-solid/20.vue'

const sample1 = ref(false)

const sample01 = ref(true)
const sample02 = ref(true)
const sample03 = ref(true)
const sample04 = ref(true)
const sample05 = ref(true)
const sample06 = ref(true)
const sample07 = ref(true)
const sample08 = ref(true)
const sample09 = ref(true)
const sample10 = ref(true)
const sample11 = ref(true)
const sample12 = ref(true)

function example1 () {
  sample1.value = true

  setTimeout(() => {
    sample1.value = false
  }, 3000)
}

onMounted (() => {
  document.body?.style.removeProperty('transform')
})
</script>

<style scoped lang="postcss">
  .preview {
    &--bar {
      .contextual-bar {
        @apply static translate-y-0 z-0 !important;

        &__wrapper {
          @apply px-6 !important;
        }
      }
    }

    &--hide {
      @apply border-transparent dark:border-transparent bg-transparent dark:bg-transparent bg-none p-0;

      :deep(.preview__label) {
        @apply hidden;
      }
    }
  }
</style>

# Contextual Bar

> App-level notification bar.

## Usage

### Simple Usage

<div class="pt-5">
  <p-button @click="example1" color="info">Live Preview</p-button>
</div>

<preview class="preview--bar">
  <p-contextual-bar v-model="sample01" title="Hey! This is Title Text and telling less" />
</preview>

```vue
<template>
  <p-contextual-bar
    v-model="sample"
    title="Hey! This is Title Text and telling less" />
</template>
```

### With Icon

<preview class="flex-col space-y-3 preview--bar">
  <p-contextual-bar title="Hey! This is Title Text and telling less">
    <template #icon>
      <IconInfo />
    </template>
  </p-contextual-bar>
  <p-contextual-bar title="Hey! This is Title Text and telling less">
    <template #icon>
      <img src="../avatar/assets/avatar.png" />
    </template>
  </p-contextual-bar>
</preview>

```vue
<template>
  <p-contextual-bar v-model="sample" title="Hey! This is Title Text and telling less">
    <template #icon>
      <IconInfo />
    </template>
  </p-contextual-bar>
  <p-contextual-bar v-model="sample" title="Hey! This is Title Text and telling less">
    <template #icon>
      <img src="../avatar/assets/avatar.png" />
    </template>
  </p-contextual-bar>
</template>

<script setup>
import IconInfo from '@privyid/persona-icon/vue/information-circle-solid/20.vue'
</script>
```

### With Action Button

<preview class="preview--bar">
  <p-contextual-bar title="Hey! This is Title Text" v-model="sample02">
    <template #icon>
      <IconInfo />
    </template>
    <template #action>
      <p-button size="sm" color="info">Button text</p-button>
    </template>
  </p-contextual-bar>
</preview>

```vue
<template>
  <p-contextual-bar v-model="sample" title="Hey! This is Title Text">
    <template #action>
      <p-button size="sm" color="info">Button text</p-button>
    </template>
  </p-contextual-bar>
</template>
```
### With Two Action

<preview class="preview--bar">
  <p-contextual-bar title="This is Title Text" v-model="sample03">
    <template #action>
      <p-button size="sm" color="info">Button</p-button>
      <p-button size="sm" color="info" variant="outline">Button</p-button>
    </template>
  </p-contextual-bar>
</preview>

```vue
<template>
  <p-contextual-bar v-model="sample" message="This is Title Text">
    <template #action>
      <p-button size="sm" color="info">Button</p-button>
      <p-button size="sm" color="info" variant="outline">Button</p-button>
    </template>
  </p-contextual-bar>
</template>
```

### Additional Description

<preview class="preview--bar">
  <p-contextual-bar v-model="sample04" title="Hey! This is Title Text" message="You will be unable to sign or seal a document">
  </p-contextual-bar>
</preview>

```vue
<template>
  <p-contextual-bar
    v-model="sample"
    title="Hey! This is Title Text"
    message="You will be unable to sign or seal a document" />
</template>
```

### Additional Description With Action

<preview class="preview--bar">
  <p-contextual-bar
    v-model="sample05"
    title="Hey! This is Title Text"
    message="You will be unable to sign or seal a document">
    <template #action>
      <p-button color="info" size="sm">Button</p-button>
    </template>
  </p-contextual-bar>
</preview>

```vue
<template>
  <p-contextual-bar
    v-model="sample"
    title="Hey! This is Title Text"
    message="You will be unable to sign or seal a document">
    <template #action>
      <p-button color="info" size="sm">Button</p-button>
    </template>
  </p-contextual-bar>
</template>
```

### Custom Background Image

<preview class="preview--bar">
  <p-contextual-bar
    title="Hey! This is Title Text"
    message="You will be unable to sign or seal a document"
    background-url="../../public/assets/images/img-contextualbar-bg.svg">
    <template #icon>
      <img src="../avatar/assets/avatar.png" />
    </template>
  </p-contextual-bar>
</preview>

```vue
<template>
  <p-contextual-bar
    v-model="sample"
    title="Hey! This is Title Text"
    message="You will be unable to sign or seal a document"
    background-url="/assets/images/img-contextualbar-bg.svg">
    <template #icon>
      <img src="../avatar/assets/avatar.png" />
    </template>
  </p-contextual-bar>
</template>
```

## State
Contextual Bar have 4 state variants: `error`, `warning`, `info` and `neutral`. Default is `info`

<preview class="flex-col space-y-4 preview--bar">
  <p-contextual-bar state="error" v-model="sample06" title="Hey! This is Title Text and telling less" />
  <p-contextual-bar state="warning" v-model="sample07" title="Hey! This is Title Text and telling less" />
  <p-contextual-bar state="info" title="Hey! This is Title Text and telling less" />
  <p-contextual-bar state="neutral" title="Hey! This is Title Text and telling less" />
</preview>

```vue
<template>
  <p-contextual-bar
    state="error"
    v-model="sample" title="Hey! This is Title Text and telling less" />
  <p-contextual-bar
    state="warning"
    v-model="sample" title="Hey! This is Title Text and telling less" />
  <p-contextual-bar
    state="info"
    v-model="sample" title="Hey! This is Title Text and telling less" />
  <p-contextual-bar
    state="neutral"
    v-model="sample" title="Hey! This is Title Text and telling less" />
</template>
```

## Alignment

To align Contextual Bar content, use align prop. Available value are `left`, `right` and `center`

<preview class="flex-col space-y-4 preview--bar">
  <p-contextual-bar align="left" v-model="sample10" title="Hey! This is Title Text" />
  <p-contextual-bar align="center" v-model="sample11" title="Hey! This is Title Text" />
  <p-contextual-bar align="right" v-model="sample12" title="Hey! This is Title Text" />
</preview>

```vue
<template>
  <p-contextual-bar
    align="left"
    v-model="sample" title="Hey! This is Title Text" />
  <p-contextual-bar
    align="center"
    v-model="sample" title="Hey! This is Title Text" />
  <p-contextual-bar
    align="right"
    v-model="sample" title="Hey! This is Title Text" />
</template>
```

<preview class="preview--hide">
  <p-contextual-bar
    v-model="sample1"
    color="light"
    title="Hey! This is Title Text and telling less as possible"
    background-url="../../public/assets/images/img-contextualbar-bg.svg">
    <template #icon>
      <img src="../avatar/assets/avatar.png" />
    </template>
    <template #action>
      <p-button size="sm" color="secondary" variant="link">Cancel</p-button>
      <p-button size="sm" color="info">Button Text</p-button>
    </template>
    <template #message>
      You will be unable to sign or seal a document while your privy balance runs out.
    </template>
  </p-contextual-bar>
</preview>

## API

### Props

| Props                 |   Type    | Default | Description                                                                           |
|-----------------------|:---------:|:-------:|---------------------------------------------------------------------------------------|
| `state`               | `String`  | `info`  | Contextualbar state variants, valid value is `error`, `warning`, `info` and `neutral` |
| `align`               | `String`  | `left`  | Contextualbar alignment, valid value is `left`, `center` and `right`                  |
| `dismissable`         | `Boolean` | `true`  | Show / Hide dismiss button                                                            |
| `title`               | `String`  |    -    | Content or title inside of Contextualbar                                              |
| `message`             | `String`  |    -    | Additional message of Contextualbar                                                   |
| `background-url`      | `String`  |    -    | Custom background image of Contextualbar                                              |
| `background-dark-url` | `String`  |    -    | Custom background image of Contextualbar in Dark Mode                                 |

### Slots
| Name       | Description                                          |
|------------|------------------------------------------------------|
| `title `   | Title content to place in Contextualbar              |
| `message ` | Additional message content to place in Contextualbar |
| `icon `    | Content to place icon in Contextualbar               |
| `action `  | Content to place button in Contextualbar             |

### Events

| Name    | Arguments | Description                     |
|---------|-----------|---------------------------------|
| `close` | -         | Event when close button clicked |
| `show`  | -         | Event Contextualbar shown       |
| `hide`  | -         | Event Contextualbar hidden      |
