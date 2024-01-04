---
title: Popup · Components
description: Simple notification pop-up.
---

<script setup>
  import Button from '../button/Button.vue'
  import Popup from './Popup.vue'
  import popup from '.'
  import IconSuccess from '@privyid/persona-icon/vue/checkmark/24.vue'
  import IconFailed from '@privyid/persona-icon/vue/trash/24.vue'
  import Banner from '../banner/Banner.vue'
</script>

# Popup

> Simple notification pop-up.

## Usage

### Simple Usage

<div class="flex mt-3">
  <Button color="info" @click="popup({
    title: 'Lorem ipsum',
    text : 'Lorem ipsum dolor sit amet.',
  })">
    Show Popup
  </Button>
</div>

```ts
import { popup } from '@privyid/persona/core'

popup({
  title: 'Lorem ipsum',
  text : 'Lorem ipsum dolor sit amet.',
})
```

### Advance Usage

<div class="flex mt-3">
  <Button color="info" @click="popup({
    type      : 'error',
    title     : 'Lorem ipsum',
    text      : 'Lorem ipsum dolor sit amet.',
    variant   : 'filled',
    duration  : 5000,
    popupClass: 'custom-popup',
  })">
    Show Popup
  </Button>
</div>

```ts
import { popup } from '@privyid/persona/core'

popup({
  type      : 'error',
  title     : 'Lorem ipsum',
  text      : 'Lorem ipsum dolor sit amet.',
  variant   : 'filled',
  duration  : 5000,
  popupClass: 'custom-popup',
})
```

## Type Variant

There available 4 type variants: `info`, `success`, `warning`, `error`. default is `info`

<preview class="flex-col items-center space-y-3">
  <Popup type="info" title="Lorem ipsum" text="Lorem ipsum dolor sit amet." />
  <Popup type="success" title="Lorem ipsum" text="Lorem ipsum dolor sit amet." />
  <Popup type="warning" title="Lorem ipsum" text="Lorem ipsum dolor sit amet." />
  <Popup type="error" title="Lorem ipsum" text="Lorem ipsum dolor sit amet." />
</preview>

**Try it:**

<div class="mt-3 space-gap-3">
  <Button color="info" @click="popup({
    type : 'info',
    title: 'Lorem ipsum',
    text : 'Lorem ipsum dolor sit amet.',
  })">
    Info
  </Button>
  <Button color="success" @click="popup({
    type : 'success',
    title: 'Lorem ipsum',
    text : 'Lorem ipsum dolor sit amet.',
  })">
    Success
  </Button>
  <Button color="warning" @click="popup({
    type : 'warning',
    title: 'Lorem ipsum',
    text : 'Lorem ipsum dolor sit amet.',
  })">
    Warning
  </Button>
  <Button color="danger" @click="popup({
    type : 'error',
    title: 'Lorem ipsum',
    text : 'Lorem ipsum dolor sit amet.',
  })">
    Error
  </Button>
</div>

```ts
import { popup } from '@privyid/persona/core'

// info
popup({
  type : 'info',
  title: 'Lorem ipsum',
  text : 'Lorem ipsum dolor sit amet.',
})

// success
popup({
  type : 'success',
  title: 'Lorem ipsum',
  text : 'Lorem ipsum dolor sit amet.',
})

// warning
popup({
  type : 'warning',
  title: 'Lorem ipsum',
  text : 'Lorem ipsum dolor sit amet.',
})

// error
popup({
  type : 'error',
  title: 'Lorem ipsum',
  text : 'Lorem ipsum dolor sit amet.',
})
```

## Style Variant

There available 2 style variant: `simple` and `filled`. default is `simple`

<preview class="flex-col items-center space-y-3">
  <Popup variant="filled" type="info" title="Lorem ipsum" text="Lorem ipsum dolor sit amet." />
  <Popup variant="filled" type="success" title="Lorem ipsum" text="Lorem ipsum dolor sit amet." />
  <Popup variant="filled" type="warning" title="Lorem ipsum" text="Lorem ipsum dolor sit amet." />
  <Popup variant="filled" type="error" title="Lorem ipsum" text="Lorem ipsum dolor sit amet." />
</preview>

**Try it:**

<div class="mt-3 space-gap-3">
  <Button color="info" @click="popup({
    type   : 'info',
    variant: 'filled',
    title  : 'Lorem ipsum',
    text   : 'Lorem ipsum dolor sit amet.',
  })">
    Info
  </Button>
  <Button color="success" @click="popup({
    type   : 'success',
    variant: 'filled',
    title  : 'Lorem ipsum',
    text   : 'Lorem ipsum dolor sit amet.',
  })">
    Success
  </Button>
  <Button color="warning" @click="popup({
    type   : 'warning',
    variant: 'filled',
    title  : 'Lorem ipsum',
    text   : 'Lorem ipsum dolor sit amet.',
  })">
    Warning
  </Button>
  <Button color="danger" @click="popup({
    type   : 'error',
    variant: 'filled',
    title  : 'Lorem ipsum',
    text   : 'Lorem ipsum dolor sit amet.',
  })">
    Error
  </Button>
</div>

```ts
import { popup } from '@privyid/persona/core'

// info
popup({
  type   : 'info',
  variant: 'filled',
  title  : 'Lorem ipsum',
  text   : 'Lorem ipsum dolor sit amet.',
})

// success
popup({
  type   : 'success',
  variant: 'filled',
  title  : 'Lorem ipsum',
  text   : 'Lorem ipsum dolor sit amet.',
})

// warning
popup({
  type   : 'warning',
  variant: 'filled',
  title  : 'Lorem ipsum',
  text   : 'Lorem ipsum dolor sit amet.',
})

// error
popup({
  type   : 'error',
  variant: 'filled',
  title  : 'Lorem ipsum',
  text   : 'Lorem ipsum dolor sit amet.',
})
```

## Position

There available 6 position for popup: `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `top-right` default is `bottom-left`

**Try it:**

<div class="mt-3 space-gap-3">
  <Button color="info" @click="popup({
    title: 'Lorem ipsum',
    text : 'Lorem ipsum dolor sit amet.',
    position : 'top-left'
  })">
    Top Left
  </Button>

  <Button color="info" @click="popup({
    title: 'Lorem ipsum',
    text : 'Lorem ipsum dolor sit amet.',
    position : 'top-center'
  })">
    Top Center
  </Button>

  <Button color="info" @click="popup({
    title: 'Lorem ipsum',
    text : 'Lorem ipsum dolor sit amet.',
    position : 'top-right'
  })">
    Top Right
  </Button>

  <Button color="info" @click="popup({
    title: 'Lorem ipsum',
    text : 'Lorem ipsum dolor sit amet.',
    position : 'bottom-left'
  })">
    Bottom Left
  </Button>

  <Button color="info" @click="popup({
    title: 'Lorem ipsum',
    text : 'Lorem ipsum dolor sit amet.',
    position : 'bottom-center'
  })">
    Bottom Center
  </Button>

  <Button color="info" @click="popup({
    title: 'Lorem ipsum',
    text : 'Lorem ipsum dolor sit amet.',
    position : 'bottom-right'
  })">
    Bottom Right
  </Button>
</div>

```ts
import { popup } from '@privyid/persona/core'

// top-left
popup({
  title: 'Lorem ipsum',
  text : 'Lorem ipsum dolor sit amet.',
  position : 'top-left'
})

// top-center
popup({
  title: 'Lorem ipsum',
  text : 'Lorem ipsum dolor sit amet.',
  position : 'top-center'
})

// top-right
popup({
  title: 'Lorem ipsum',
  text : 'Lorem ipsum dolor sit amet.',
  position : 'top-right'
})

// bottom-left
popup({
  title: 'Lorem ipsum',
  text : 'Lorem ipsum dolor sit amet.',
  position : 'bottom-left'
})

// bottom-center
popup({
  title: 'Lorem ipsum',
  text : 'Lorem ipsum dolor sit amet.',
  position : 'bottom-center'
})

// bottom-right
popup({
  title: 'Lorem ipsum',
  text : 'Lorem ipsum dolor sit amet.',
  position : 'bottom-right'
})
```

## Icon

It's possible to custom icon of toast, like color and icon-name.
There are 6 icon colors available for toast: `default`, `primary`, `info`, `success`, `warning` and `danger`. Default icon color is toast icon color it's self.
<Banner>
Custom icon color just work in type-variant <code>info</code> with <code>simple</code> style-variant, 
and or all type-variant with <code>filled</code> style-variant.
</Banner>

<div class="mt-3 space-x-5">
  <Button type="" color="info" @click="popup({
    title     : 'Member added to the group',
    icon: IconSuccess,
    iconColor : 'success',
  })">
    Show simple popup
  </Button>
  
  <Button type="" color="info" @click="popup({
    title     : 'Members removed from the group',
    type: 'info',
    variant: 'filled',
    icon: IconFailed,
    iconColor : 'default',
  })">
    Show filled popup
  </Button>
</div>

```ts
import { popup } from '@privyid/persona/core'
import IconSuccess from '@privyid/persona-icon/vue/checkmark/24.vue'
import IconFailed from '@privyid/persona-icon/vue/trash/24.vue'

popup({
  title: 'Member added to the group',
  icon: IconSuccess,
  iconColor: 'success',
})

popup({
  title: 'Members removed from the group',
  type: 'info',
  variant: 'filled',
  icon: IconFailed,
  iconColor: 'default',
})
```

## Customization

You can add some custom class to Popup element via `popupClass`.

<div class="mt-3">
  <Button type="" color="info" @click="popup({
    title     : 'Lorem ipsum',
    text      : 'Lorem ipsum dolor sit amet.',
    popupClass: 'mt-28 mr-10',
  })">
    Custom Popup
  </Button>
</div>

```ts
import { popup } from '@privyid/persona/core'

popup({
  title     : 'Lorem ipsum',
  text      : 'Lorem ipsum dolor sit amet.',
  popupClass: 'mt-28 mr-10',
})
```
## Variables
Popup use local CSS variables on `.popup-container` for enhanced real-time customization.

```sass
--p-popup-z-index: theme(zIndex.toast); //1090
```

## API

### popup

`toast(options: ToastOptions): Promise<void>`

| Options      |   Type   | Default  | Description                                                               |
|--------------|:--------:|:--------:|---------------------------------------------------------------------------|
| `type`       | `String` |  `info`  | Toast type variant, valid value is `info`, `success`, `warning`, `error`  |
| `title`      | `String` |    -     | Toast title message, **required** (support markdown)                      |
| `text`       | `String` |    -     | Toast text message (support markdown)                                     |
| `icon`       | `String` or `Component`|    -    | Custom toast icon (will replace default icon)                |
| `variant`    | `String` | `simple` | Toast style variant, valid value is `simple`, `filled`                    |
| `duration`   | `Number` |  `3000`  | Duration for which the toast should be displayed. `-1` to permanent toast |
| `position`   | `String` |  `bottom-left`  | Position for toast, valid value is `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `top-right`|
| `iconColor`  | `String` |    -     | Custom color of toast icon, valid value is `default`, `primary`, `info`, `success`, `warning`, `danger`                                                |
| `toastClass` | `String` |    -     | Add class to toast component                                              |
 