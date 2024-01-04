---
title: Toast · Components
description: Simple notification pop-up.
---

<script setup>
  import Button from '../button/Button.vue'
  import Toast from './Toast.vue'
  import toast from '.'
  import IconSuccess from '@privyid/persona-icon/vue/checkmark/24.vue'
  import IconFailed from '@privyid/persona-icon/vue/trash/24.vue'
  import Banner from '../banner/Banner.vue'
</script>

# Toast

> Simple notification pop-up.

## Usage

### Simple Usage

<div class="flex mt-3">
  <Button color="info" @click="toast({
    text : 'Far far away, behind the word.',
  })">
    Show Toast
  </Button>
</div>

```ts
import { toast } from '@privyid/persona/core'

toast({
  text : 'Far far away, behind the word.',
})
```

### Advance Usage

<div class="flex mt-3">
  <Button color="info" @click="toast({
    text      : `Far far away, behind the word.`,
    duration  : 5000,
  })">
    Show Toast
  </Button>
</div>

```ts
import { toast } from '@privyid/persona/core'

toast({
  text      : 'Far far away, behind the word.',
  duration  : 5000,
})
```

## Position

There available 6 position for toast: `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `top-right` default is `bottom-left`

**Try it:**

<div class="mt-3 space-gap-3">
  <Button color="info" @click="toast({
    text : 'Far far away, behind the word.',
    position : 'top-left'
  })">
    Top Left
  </Button>

  <Button color="info" @click="toast({
    text : 'Far far away, behind the word.',
    position : 'top-center'
  })">
    Top Center
  </Button>

  <Button color="info" @click="toast({
    text : 'Far far away, behind the word.',
    position : 'top-right'
  })">
    Top Right
  </Button>

  <Button color="info" @click="toast({
    text : 'Far far away, behind the word.',
    position : 'bottom-left'
  })">
    Bottom Left
  </Button>

  <Button color="info" @click="toast({
    text : 'Far far away, behind the word.',
    position : 'bottom-center'
  })">
    Bottom Center
  </Button>

  <Button color="info" @click="toast({
    text : 'Far far away, behind the word.',
    position : 'bottom-right'
  })">
    Bottom Right
  </Button>
</div>

```ts
import { toast } from '@privyid/persona/core'

// top-left
toast({
  text: 'Far far away, behind the word.',
  position: 'top-left'
})

// top-center
toast({
  text: 'Far far away, behind the word.',
  position: 'top-center'
})

// top-right
toast({
  text: 'Far far away, behind the word.',
  position: 'top-right'
})

// bottom-left
toast({
  text: 'Far far away, behind the word.',
  position: 'bottom-left'
})

// bottom-center
toast({
  text: 'Far far away, behind the word.',
  position: 'bottom-center'
})

// bottom-right
toast({
  text: 'Far far away, behind the word.',
  position: 'bottom-right'
})
```

## Icon

It's possible to custom icon of toast, like color and icon-name.
There are 6 icon colors available for toast: `default`, `primary`, `info`, `success`, `warning` and `danger`. Default icon color is toast icon color it's self.

<div class="mt-3 space-x-5">
  <Button color="info" @click="toast({
    text     : 'Member added to the group',
    icon: IconSuccess,
    iconColor : 'success',
  })">
    Show toast
  </Button>
</div>

```ts
import { toast } from '@privyid/persona/core'
import IconSuccess from '@privyid/persona-icon/vue/checkmark/24.vue'

toast({
  text: 'Member added to the group',
  icon: IconSuccess,
  iconColor: 'success',
})
```

## Customization

You can add some custom class to Toast element via `toastClass`.

<div class="mt-3">
  <Button type="" color="info" @click="toast({
    text      : 'A wonderful serenity has taken.',
    toastClass: 'mt-28 mr-10',
  })">
    Custom Toast
  </Button>
</div>

```ts
import { toast } from '@privyid/persona/core'

toast({
  text      : 'A wonderful serenity has taken.',
  toastClass: 'mt-28 mr-10',
})
```
## Variables
Toast use local CSS variables on `.toast-container` for enhanced real-time customization.

```sass
--p-toast-z-index: theme(zIndex.toast); //1090
```

## API

### toast

`toast(options: ToastOptions): Promise<void>`

| Options       |   Type   | Default  | Description                                                               |
|---------------|:--------:|:--------:|---------------------------------------------------------------------------|
| `text`        | `String` |    -     | Toast text message (support markdown)                                     |
| `icon`        | `String` or `Component`|    -    | Custom toast icon (will replace default icon)                |
| `duration`    | `Number` |  `3000`  | Duration for which the toast should be displayed. `-1` to permanent toast |
| `position`    | `String` |  `bottom-left`  | Position for toast, valid value is `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `top-right`|
| `iconColor`   | `String` |    -     | Custom color of toast icon, valid value is `default`, `primary`, `info`, `success`, `warning`, `danger`                                                |
| `toastClass`  | `String` |    -     | Add class to toast component                                              |
| `dismissText` | `String` |    -     | Add custom dismiss text of toast                                             |
| `dismissVariant`   | `String` |    -     | Custom dismiss button style variant, valid value is `solid`, `outline`, `ghost` and `link`                                                |
 