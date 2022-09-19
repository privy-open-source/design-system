<script setup>
import pContextualBar from './ContextualBar.vue'
import pButton from '../button/Button.vue'
import pCaption from '../caption/Caption.vue'
import pSubheading from '../subheading/Subheading.vue'
import { ref, onMounted } from "vue-demi"

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

<style scoped>
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
      @apply border-transparent bg-transparent bg-none;
    }
  }
</style>

# Contextual Bar

## Usage

### Simple Usage

<div class="pt-5">
  <p-button @click="example1">Live Preview</p-button>
</div>

<preview class="preview--bar">
  <p-contextual-bar v-model="sample01">
    Hey! This is Title Text and telling less You will be unable to sign or seal a document while your privy balance runs out.
  </p-contextual-bar>
</preview>

```vue
<template>
  <p-contextual-bar>
    Hey! This is Title Text and telling less
  </p-contextual-bar>
</template>

```
### With Action Button

<preview class="preview--bar">
  <p-contextual-bar message="Hey! This is Title Text" v-model="sample02">
    <p-button size="sm" color="primary">Button text</p-button>
  </p-contextual-bar>
</preview>

```vue
<template>
  <p-contextual-bar message="Hey! This is Title Text">
    <p-button size="sm" color="primary">Button text</p-button>
  </p-contextual-bar>
</template>
```
### With Two Action

<preview class="preview--bar">
  <p-contextual-bar message="This is Title Text" v-model="sample03">
    <p-button size="sm" color="primary">Button</p-button>
    <p-button size="sm" color="primary" variant="outline">Button</p-button>
  </p-contextual-bar>
</preview>

```vue
<template>
  <p-contextual-bar v-model="sample" message="This is Title Text">
    <p-button size="sm" color="primary">Button</p-button>
    <p-button size="sm" color="primary" variant="outline">Button</p-button>
  </p-contextual-bar>
</template>
```

### Additional Description

<preview class="preview--bar">
  <p-contextual-bar v-model="sample04">
    <p-subheading>Hey! This is Title Text</p-subheading>
    <p-caption>You will be unable to sign or seal a document</p-caption>
  </p-contextual-bar>
</preview>

```vue
<template>
  <p-contextual-bar v-model="sample">
    <p-subheading>Hey! This is Title Text</p-subheading>
    <p-caption>You will be unable to sign or seal a document</p-caption>
  </p-contextual-bar>
</template>
```

### Additional Description With Action

<preview class="preview--bar">
  <p-contextual-bar v-model="sample05">
    <div class="flex items-center justify-between">
      <div class="flex-grow-1">
        <p-subheading>Hey! This is Title Text</p-subheading>
        <p-caption>You will be unable to sign or seal a document</p-caption>
      </div>
      <div class="flex-shrink-0">
        <p-button color="primary" size="sm">Button</p-button>
      </div>
    </div>
  </p-contextual-bar>
</preview>

```vue
<template>
  <p-contextual-bar v-model="sample">
    <div class="flex items-center justify-between">
      <div class="flex-grow-1">
        <p-subheading>Hey! This is Title Text</p-subheading>
        <p-caption>You will be unable to sign or seal a document</p-caption>
      </div>
      <div class="flex-shrink-0">
        <p-button color="primary" size="sm">Button</p-button>
      </div>
    </div>
  </p-contextual-bar>
</template>
```

## Variants
Contextual Bar have 4 variants: `info`, `neutral`, `warning` and `error`. Default is `info`

<preview class="flex-col gap-4 preview--bar">
  <p-contextual-bar variant="info" v-model="sample06">
    Hey! This is Title Text and telling less
  </p-contextual-bar>
  <p-contextual-bar variant="neutral" v-model="sample07">
    Hey! This is Title Text and telling less
  </p-contextual-bar>
  <p-contextual-bar variant="warning" v-model="sample08">
    Hey! This is Title Text and telling less
  </p-contextual-bar>
  <p-contextual-bar variant="error" v-model="sample09">
    Hey! This is Title Text and telling less
  </p-contextual-bar>
</preview>

```vue
<template>
  <p-contextual-bar variant="info" v-model="sample">
    Hey! This is Title Text and telling less
  </p-contextual-bar>
  <p-contextual-bar variant="neutral" v-model="sample">
    Hey! This is Title Text and telling less
  </p-contextual-bar>
  <p-contextual-bar variant="warning" v-model="sample">
    Hey! This is Title Text and telling less
  </p-contextual-bar>
  <p-contextual-bar variant="error" v-model="sample">
    Hey! This is Title Text and telling less
  </p-contextual-bar>
</template>
```

## Alignments
To align Contextual Bar content, use align prop. Available value are `left`, `right` and `center`

<preview class="flex-col gap-4 preview--bar">
  <p-contextual-bar align="left" v-model="sample10">
    Hey! This is Title Text
  </p-contextual-bar>
  <p-contextual-bar align="center" v-model="sample11">
    Hey! This is Title Text
  </p-contextual-bar>
  <p-contextual-bar align="right" v-model="sample12">
    Hey! This is Title Text
  </p-contextual-bar>
</preview>

```vue
<template>
  <p-contextual-bar align="left" v-model="sample">
    Hey! This is Title Text
  </p-contextual-bar>
  <p-contextual-bar align="center" v-model="sample">
    Hey! This is Title Text
  </p-contextual-bar>
  <p-contextual-bar align="right" v-model="sample">
    Hey! This is Title Text
  </p-contextual-bar>
</template>
```

<preview class="preview--hide">
  <p-contextual-bar class="example1" color="info" message="Hey! This is Title Text and telling less as possible" v-model="sample1" align="center">
  </p-contextual-bar>
</preview>

## API

### Props

| Props                      |   Type    | Default | Description                                     |
|----------------------------|:---------:|:-------:|-------------------------------------------------|
| `variant`                  | `String`  | `info`  | Contextualbar variants, valid value is `neutral`, `info`, `error` and `warning`                                     |
| `align`                    | `String`  | `left`  | Contextualbar alignment, valid value is `left`, `center` and `right`|
| `dismissable`              | `Boolean` | `true`  | Show / Hide dismiss button                      |
| `message`                  | `String`  | -       | Content inside of Contextualbar                 |

### Slots
| Name      | Description                                                  |
|-----------|--------------------------------------------------------------|
| `default ` | Content to place in Contextualbar                           |

### Events

| Name        | Arguments | Description                     |
|-------------|-----------|---------------------------------|
| `close`     | -         | Event when close button clicked |
