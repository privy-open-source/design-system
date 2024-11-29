---
title: List Group · Components
description: Flexible displaying a series of content
---

<script lang="ts" setup>
  import pListGroup from './ListGroup.vue'
  import pListGroupItem from './ListGroupItem.vue'
  import IconCheck from '@privyid/persona-icon/vue/checkmark-circle/20.vue'
  import IconDocument from '@privyid/persona-icon/vue/document-filled/16.vue'
  import pAvatar from '../avatar/Avatar.vue'
  import pCard from '../card/Card.vue'
  import pCaption from '../caption/Caption.vue'
  import pBadge from '../badge/Badge.vue'
  import pSubheading from '../subheading/Subheading.vue'
  import pHeading from '../heading/Heading.vue'
</script>

<style lang="postcss">
.preview {
  .list-group {
    @apply max-w-lg;
  }

  &--wide {
    .list-group {
      @apply w-3/4;
    }
  }

  &--widest {
    .list-group {
      @apply max-w-full w-full;
    }
  }
}
</style>

# List Group

> Displaying a series of content

## Usage

### Basic Usage

<preview>
  <p-list-group>
    <p-list-group-item>A list item</p-list-group-item>
    <p-list-group-item>Second item</p-list-group-item>
    <p-list-group-item>The third item</p-list-group-item>
    <p-list-group-item>And the last item</p-list-group-item>
  </p-list-group>
</preview>

```vue
<template>
  <p-list-group>
    <p-list-group-item>A list item</p-list-group-item>
    <p-list-group-item>Second item</p-list-group-item>
    <p-list-group-item>The third item</p-list-group-item>
    <p-list-group-item>And the last item</p-list-group-item>
  </p-list-group>
</template>
```

### Active item

<preview>
  <p-list-group>
    <p-list-group-item active>First item active</p-list-group-item>
    <p-list-group-item>Second item</p-list-group-item>
    <p-list-group-item>The third item</p-list-group-item>
    <p-list-group-item>And the last item</p-list-group-item>
  </p-list-group>
</preview>

```vue
<template>
  <p-list-group>
    <p-list-group-item active>First item active</p-list-group-item>
    <p-list-group-item>Second item</p-list-group-item>
    <p-list-group-item>The third item</p-list-group-item>
    <p-list-group-item>And the last item</p-list-group-item>
  </p-list-group>
</template>
```

### Disabled item

<preview>
  <p-list-group>
    <p-list-group-item disabled>First item disabled</p-list-group-item>
    <p-list-group-item>Second item</p-list-group-item>
    <p-list-group-item>The third item</p-list-group-item>
    <p-list-group-item>And the last item</p-list-group-item>
  </p-list-group>
</preview>

```vue
<template>
  <p-list-group>
    <p-list-group-item disabled>First item disabled</p-list-group-item>
    <p-list-group-item>Second item</p-list-group-item>
    <p-list-group-item>The third item</p-list-group-item>
    <p-list-group-item>And the last item</p-list-group-item>
  </p-list-group>
</template>
```

### Link

<preview>
  <p-list-group>
    <p-list-group-item element="link" href="#">A First item</p-list-group-item>
    <p-list-group-item element="link" href="#">Second item</p-list-group-item>
    <p-list-group-item element="link" href="#">The third item</p-list-group-item>
    <p-list-group-item element="link" href="#">And the last item</p-list-group-item>
  </p-list-group>
</preview>

```vue
<template>
  <p-list-group>
    <p-list-group-item element="link" href="#">
      A First item
    </p-list-group-item>
    <p-list-group-item element="link" href="#">
      Second item
    </p-list-group-item>
    <p-list-group-item element="link" href="#">
      The third item
    </p-list-group-item>
    <p-list-group-item element="link" href="#">
      And the last item
    </p-list-group-item>
  </p-list-group>
</template>
```

## Variant
### Flush

<preview>
  <p-list-group flush>
    <p-list-group-item disabled>First item disabled</p-list-group-item>
    <p-list-group-item active>Second item active</p-list-group-item>
    <p-list-group-item>The third item</p-list-group-item>
    <p-list-group-item>And the last item</p-list-group-item>
  </p-list-group>
</preview>

```vue
<template>
  <p-list-group flush>
    <p-list-group-item disabled>First item disabled</p-list-group-item>
    <p-list-group-item active>Second item active</p-list-group-item>
    <p-list-group-item>The third item</p-list-group-item>
    <p-list-group-item>And the last item</p-list-group-item>
  </p-list-group>
</template>
```

### Horizontal

<preview>
  <p-list-group horizontal>
    <p-list-group-item disabled>First item disabled</p-list-group-item>
    <p-list-group-item active>Second item active</p-list-group-item>
    <p-list-group-item>The third item</p-list-group-item>
    <p-list-group-item>And the last item</p-list-group-item>
  </p-list-group>
</preview>

```vue
<template>
  <p-list-group horizontal>
    <p-list-group-item disabled>First item disabled</p-list-group-item>
    <p-list-group-item active>Second item active</p-list-group-item>
    <p-list-group-item>The third item</p-list-group-item>
    <p-list-group-item>And the last item</p-list-group-item>
  </p-list-group>
</template>
```

### Borderless

<preview>
  <p-list-group borderless>
    <p-list-group-item disabled>First item disabled</p-list-group-item>
    <p-list-group-item active>Second item active</p-list-group-item>
    <p-list-group-item>The third item</p-list-group-item>
    <p-list-group-item>And the last item</p-list-group-item>
  </p-list-group>
</preview>

```vue
<template>
  <p-list-group borderless>
    <p-list-group-item disabled>First item disabled</p-list-group-item>
    <p-list-group-item>Second item</p-list-group-item>
    <p-list-group-item>The third item</p-list-group-item>
    <p-list-group-item>And the last item</p-list-group-item>
  </p-list-group>
</template>
```

### Combination

<preview class="space-x-6 flex-cols">
  <p-list-group rounded borderless class="space-y-2" style="--p-list-group-bg: transparent;">
    <p-list-group-item class="shadow-sm">
      <span class="flex items-center space-x-3">
        <p-avatar size="sm" />
        <span>Danish Brown</span>
      </span>
    </p-list-group-item>
    <p-list-group-item class="shadow-sm">Second item</p-list-group-item>
    <p-list-group-item class="shadow-sm">The third item</p-list-group-item>
    <p-list-group-item class="shadow-sm">And the last item</p-list-group-item>
  </p-list-group>
</preview>

```vue
<template>
  <p-list-group rounded borderless class="space-y-2" 
    style="--p-list-group-bg: transparent; --p-list-group-bg-dark: transparent;">
    <p-list-group-item class="shadow-sm">
      <span class="flex items-center space-x-3">
        <p-avatar size="sm" />
        <span>Danish Brown</span>
      </span>
    </p-list-group-item>
    <p-list-group-item class="shadow-sm">
      Second item
    </p-list-group-item>
    <p-list-group-item class="shadow-sm">
      The third item
    </p-list-group-item>
    <p-list-group-item class="shadow-sm">
      And the last item
    </p-list-group-item>
  </p-list-group>
</template>
```

## Custom Content

### With badge

<preview class="preview--wide">
  <p-list-group>
    <p-list-group-item>
      <span class="flex items-center justify-between">
        <span>A First Item</span>
        <span>
          <p-badge color="info">4k</p-badge>
        </span>
      </span>
    </p-list-group-item>
    <p-list-group-item>
      <span class="flex items-center justify-between">
        <span>Second Item</span>
        <span>
          <p-badge color="info">25</p-badge>
        </span>
      </span>
    </p-list-group-item>
    <p-list-group-item>
      <span class="flex items-center justify-between">
        <span>The third item</span>
        <span>
          <p-badge color="info">7</p-badge>
        </span>
      </span>
    </p-list-group-item>
  </p-list-group>
</preview>

```vue
<template>
  <p-list-group>
    <p-list-group-item>
      <span class="flex items-center justify-between">
        <span>A First Item</span>
        <span>
          <p-badge color="info">4k</p-badge>
        </span>
      </span>
    </p-list-group-item>
    <p-list-group-item>
      <span class="flex items-center justify-between">
        <span>Second Item</span>
        <span>
          <p-badge color="info">25</p-badge>
        </span>
      </span>
    </p-list-group-item>
    <p-list-group-item>
      <span class="flex items-center justify-between">
        <span>The third item</span>
        <span>
          <p-badge color="info">7</p-badge>
        </span>
      </span>
    </p-list-group-item>
  </p-list-group>
</template>
```

### Posts

<preview class="preview--widest">
  <p-list-group>
    <p-list-group-item>
      <span class="flex items-center justify-between">
        <p-heading element="h6">
          But I must explain to you
        </p-heading>
        <p-caption>2 days ago</p-caption>
      </span>
      <p class="!leading-tightest max-w-md py-2">how all this mistaken idea of denouncing pleasure and praising pain was born</p>
      <p-caption>I will give you a complete</p-caption>
    </p-list-group-item>
    <p-list-group-item>
      <span class="flex items-center justify-between">
        <p-heading element="h6">
          But I must explain to you
        </p-heading>
        <p-caption>2 days ago</p-caption>
      </span>
      <p class="!leading-tightest max-w-md py-2">how all this mistaken idea of denouncing pleasure and praising pain was born</p>
      <p-caption>I will give you a complete</p-caption>
    </p-list-group-item>
    <p-list-group-item>
      <span class="flex items-center justify-between">
        <p-heading element="h6">
          But I must explain to you
        </p-heading>
        <p-caption>2 days ago</p-caption>
      </span>
      <p class="!leading-tightest max-w-md py-2">how all this mistaken idea of denouncing pleasure and praising pain was born</p>
      <p-caption>I will give you a complete</p-caption>
    </p-list-group-item>
  </p-list-group>
</preview>

```vue
<template>
  <p-list-group>
    <p-list-group-item>
      <span class="flex items-center justify-between">
        <p-heading element="h6">
          But I must explain to you
        </p-heading>
        <p-caption>2 days ago</p-caption>
      </span>
      <p class="max-w-md py-2">
        how all this mistaken idea of 
        denouncing pleasure and praising pain was born
      </p>
      <p-caption>I will give you a complete</p-caption>
    </p-list-group-item>
    <p-list-group-item>
      <span class="flex items-center justify-between">
        <p-heading element="h6">
          But I must explain to you
        </p-heading>
        <p-caption>2 days ago</p-caption>
      </span>
      <p class="max-w-md py-2">
        how all this mistaken idea of 
        denouncing pleasure and praising pain was born
      </p>
      <p-caption>I will give you a complete</p-caption>
    </p-list-group-item>
    <p-list-group-item>
      <span class="flex items-center justify-between">
        <p-heading element="h6">
          But I must explain to you
        </p-heading>
        <p-caption>2 days ago</p-caption>
      </span>
      <p class="max-w-md py-2">
        how all this mistaken idea of 
        denouncing pleasure and praising pain was born
      </p>
      <p-caption>I will give you a complete</p-caption>
    </p-list-group-item>
  </p-list-group>
</template>
```

### Notification

<preview class="preview--wide">
  <p-list-group>
    <p-list-group-item>
      <span class="flex items-center space-x-3">
        <span class="flex items-center justify-center w-10 h-10 rounded-full bg-ground dark:bg-dark-ground shrink-0">
          <IconCheck class="text-success dark:text-dark-success" />
        </span>
        <span>
          <p-subheading>Cooperation Agreement Letter.pdf</p-subheading>
          <p-caption class="!text-success">Done</p-caption>
        </span>
      </span>
    </p-list-group-item>
    <p-list-group-item>
      <span class="flex items-center space-x-3">
        <span>
          <p-avatar />
        </span>
        <span>
          <p-subheading>Nancy (NS9999) has reviewed the document</p-subheading>
          <p-caption class="!flex items-center"><IconDocument class="mr-2" /> Cooperation Agreement Letter.pdf.pdf</p-caption>
        </span>
      </span>
    </p-list-group-item>
    <p-list-group-item>
      <span class="flex items-start space-x-3">
        <span>
          <p-avatar src="https://picsum.photos/50" />
        </span>
        <span>
          <p-subheading>Ozman (OT9999) Mention you in discussion</p-subheading>
          <p-caption class="!flex items-center">
            <IconDocument class="mr-2" /> Cooperation Agreement Letter.pdf.pdf
          </p-caption>
          <p-card style="--p-card-padding-y: 4px; --p-card-padding-x: 8px;" class="mt-3">
            What is this document for, @Jane? please give a complete explanation
          </p-card>
        </span>
      </span>
    </p-list-group-item>
  </p-list-group>
</preview>

```vue
<template>
  <p-list-group>
    <p-list-group-item>
      <span class="flex items-center space-x-3">
        <span class="flex items-center justify-center w-10 h-10 rounded-full bg-ground dark:bg-dark-ground shrink-0">
          <IconCheck class="text-success dark:text-dark-success" />
        </span>
        <span>
          <p-subheading>Cooperation Agreement Letter.pdf</p-subheading>
          <p-caption class="!text-success">Done</p-caption>
        </span>
      </span>
    </p-list-group-item>
    <p-list-group-item>
      <span class="flex items-center space-x-3">
        <span>
          <p-avatar />
        </span>
        <span>
          <p-subheading>
            Nancy (NS9999) has reviewed the document
          </p-subheading>
          <p-caption class="!flex items-center">
            <IconDocument class="mr-2" /> Cooperation Agreement Letter.pdf.pdf
          </p-caption>
        </span>
      </span>
    </p-list-group-item>
    <p-list-group-item>
      <span class="flex items-start space-x-3">
        <span>
          <p-avatar src="https://picsum.photos/50" />
        </span>
        <span>
          <p-subheading>
            Ozman (OT9999) Mention you in discussion
          </p-subheading>
          <p-caption class="!flex items-center">
            <IconDocument class="mr-2" /> Cooperation Agreement Letter.pdf.pdf
          </p-caption>
          <p-card style="--p-card-padding-y: 4px; --p-card-padding-x: 8px;" class="mt-3">
            What is this document for, @Jane? 
            please give a complete explanation
          </p-card>
        </span>
      </span>
    </p-list-group-item>
  </p-list-group>
</template>
```

## Variables
List group use local CSS variables for enhanced real-time customization.

### List Group

```sass
--p-list-group-bg: theme(backgroundColor.default.DEFAULT);
--p-list-group-bg-dark: theme(backgroundColor.dark.default.DEFAULT);
```

### List Group Item

```sass
--p-list-item-bg: theme(backgroundColor.default.DEFAULT);
--p-list-item-bg-dark: theme(backgroundColor.dark.default.DEFAULT);
--p-list-item-bg-active: theme(backgroundColor.default.alpha);
--p-list-item-bg-active-dark: theme(backgroundColor.dark.default.alpha);
--p-list-item-padding-x: theme(spacing.4);
--p-list-item-padding-y: theme(spacing.2);
```

## API

### Props `<p-list-group>`

| Props         |   Type    |  Default  | Description                                                  |
|---------------|:---------:|:---------:|--------------------------------------------------------------|
| `flush`       | `Boolean` |  `false`  | Enable flush, list group without container-border            |
| `horizontal`  | `Boolean` |  `false`  | Enable horizontal list group                                 |
| `borderless`  | `Boolean` |  `false`  | Remove all border in list group                              |
| `rounded`     | `Boolean` |  `false`  | Enable rounded in each list group item                       |

### Slots `<p-list-group>`

| Name             | Description                           |
|------------------|---------------------------------------|
| `default`        | List group content                    |

### Events `<p-list-group>`

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

### Props `<p-list-group-item>`

| Props         |   Type    |  Default  | Description                                                  |
|---------------|:---------:|:---------:|--------------------------------------------------------------|
| `active`      | `Boolean` |  `false`  | Active state of list group item                              |
| `disabled`    | `Boolean` |  `false`  | Disable state of list group item                             |
| `element`     | `Boolean` |  `false`  | Change tag element of list group item, valid value is `div`, `span` and `link` |

### Slots `<p-list-group-item>`

| Name             | Description                           |
|------------------|---------------------------------------|
| `default`        | List group item content                    |

### Events `<p-list-group-item>`

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
