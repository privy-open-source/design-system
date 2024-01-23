---
title: Popup · Components
description: Simple notification pop-up.
---

<script setup>
  import Button from '../button/Button.vue'
  import Popup from './Popup.vue'
  import popup from '.'
  import IconSuccess from '@privyid/persona-icon/vue/checkmark/20.vue'
  import IconFailed from '@privyid/persona-icon/vue/trash/20.vue'
  import Banner from '../banner/Banner.vue'
  import { markRaw } from 'vue-demi'
</script>

# Popup

> Simple notification pop-up.

## Usage

### Simple Usage

<div class="flex mt-3">
  <Button color="info" @click="popup('This is popup message', 'Hi!')">
    Show Popup
  </Button>
</div>

```ts
import { popup } from '@privyid/persona/core'

popup('This is popup message', 'Hi!')
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
  <Button color="warning" @click="popup('Lorem ipsum dolor sit amet.', 'Lorem ipsum', 'warning')">
    Warning
  </Button>
  <Button color="danger" @click="popup('Lorem ipsum dolor sit amet.', 'Lorem ipsum', 'error')">
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

// Using shorthand
// warning
popup('Lorem ipsum dolor sit amet.', 'Lorem ipsum', 'warning')
// error
popup('Lorem ipsum dolor sit amet.', 'Lorem ipsum', 'error')
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
  <Button color="warning" @click="popup('Lorem ipsum dolor sit amet.', 'Lorem ipsum', 'warning', 'filled')">
    Warning
  </Button>
  <Button color="danger" @click="popup('Lorem ipsum dolor sit amet.', 'Lorem ipsum', 'error', 'filled')">
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

// Using shorthand
// warning
popup('Lorem ipsum dolor sit amet.', 'Lorem ipsum', 'warning', 'filled')
// error
popup('Lorem ipsum dolor sit amet.', 'Lorem ipsum', 'error', 'filled')
```

## Position

There available 6 position for popup: `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `top-right` default is `bottom-left`

**Try it:**

<div class="grid grid-cols-3 gap-3 mt-3">
  <Button class="items-center" color="info" @click="popup({
    title   : 'Lorem ipsum',
    text    : 'Lorem ipsum dolor sit amet.',
    position: 'top-left'
  })">
    Top Left
  </Button>

  <Button class="items-center" color="info" @click="popup({
    title   : 'Lorem ipsum',
    text    : 'Lorem ipsum dolor sit amet.',
    position: 'top-center'
  })">
    Top Center
  </Button>

  <Button class="items-center" color="info" @click="popup({
    title   : 'Lorem ipsum',
    text    : 'Lorem ipsum dolor sit amet.',
    position: 'top-right'
  })">
    Top Right
  </Button>

  <Button class="items-center" color="info" @click="popup({
    title   : 'Lorem ipsum',
    text    : 'Lorem ipsum dolor sit amet.',
    position: 'bottom-left'
  })">
    Bottom Left
  </Button>

  <Button class="items-center" color="info" @click="popup({
    title   : 'Lorem ipsum',
    text    : 'Lorem ipsum dolor sit amet.',
    position: 'bottom-center'
  })">
    Bottom Center
  </Button>

  <Button class="items-center" color="info" @click="popup({
    title   : 'Lorem ipsum',
    text    : 'Lorem ipsum dolor sit amet.',
    position: 'bottom-right'
  })">
    Bottom Right
  </Button>
</div>

```ts
import { popup } from '@privyid/persona/core'

// top-left
popup({
  title   : 'Lorem ipsum',
  text    : 'Lorem ipsum dolor sit amet.',
  position: 'top-left'
})

// top-center
popup({
  title   : 'Lorem ipsum',
  text    : 'Lorem ipsum dolor sit amet.',
  position: 'top-center'
})

// top-right
popup({
  title   : 'Lorem ipsum',
  text    : 'Lorem ipsum dolor sit amet.',
  position: 'top-right'
})

// bottom-left
popup({
  title   : 'Lorem ipsum',
  text    : 'Lorem ipsum dolor sit amet.',
  position: 'bottom-left'
})

// bottom-center
popup({
  title   : 'Lorem ipsum',
  text    : 'Lorem ipsum dolor sit amet.',
  position: 'bottom-center'
})

// bottom-right
popup({
  title   : 'Lorem ipsum',
  text    : 'Lorem ipsum dolor sit amet.',
  position: 'bottom-right'
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
    text     : 'Member added to the group',
    icon     : markRaw(IconSuccess),
    iconColor: 'success',
  })">
    Show simple popup
  </Button>

  <Button type="" color="info" @click="popup({
    text   : 'Members removed from the group',
    type   : 'error',
    variant: 'filled',
    icon   : markRaw(IconFailed),
  })">
    Show filled popup
  </Button>
</div>

```ts
import { markRaw } from 'vue-demi'
import { popup } from '@privyid/persona/core'
import IconSuccess from '@privyid/persona-icon/vue/checkmark/24.vue'
import IconFailed from '@privyid/persona-icon/vue/trash/24.vue'

popup({
  text     : 'Member added to the group',
  icon     : markRaw(IconSuccess),
  iconColor: 'success',
})

popup({
  text   : 'Members removed from the group',
  type   : 'error',
  variant: 'filled',
  icon   : markRaw(IconFailed),
})
```

## Actions

Add additional button using option `actions`.

<preview>
  <Popup
    title="Upload success"
    text="Upload document successfully."
    :actions="[
      {
        text: 'Goto Doc',
      }
    ]"
  />
</preview>

<div class="mt-3">
  <Button type="" color="info" @click="popup({
    title     : 'Upload success',
    text      : 'Upload document successfully.',
    actions   : [
      {
        text: 'Goto Doc',
        onClick (event) {
          event.close()
        }
      }
    ],
  })">
    With Action
  </Button>
</div>

```ts
popup({
  title     : 'Upload success',
  text      : 'Upload document successfully.',
  actions   : [
    {
      text: 'Goto Doc',
      onClick (event) {
        // Do something
        // ...
        event.close()
      }
    }
  ],
})
```

## Dismissable

Dismiss button of toast can be show or hide by `dismissable` props. If `dismissable`
set to `true`, dismiss button will show.

<preview class="flex-col items-center space-y-3">
  <Popup
    title="Lorem ipsum"
    text="Lorem ipsum dolor sit amet."
    :dismissable="false"
  />
</preview>

```ts
import { toast } from '@privyid/persona/core'

toast({
  title      : 'Lorem ipsum dolor sit amet.',
  variant    : 'filled',
  dismissable: false,
})
```

## Customization

You can add some custom class to Popup element via `popupClass` and `popupAttrs`.

<div class="mt-3">
  <Button type="" color="info" @click="popup({
    title     : 'Lorem ipsum',
    text      : 'Lorem ipsum dolor sit amet.',
    popupClass: 'h-40',
    popupAttrs: { 'data-e2eid': 'popup-custom' }
  })">
    Custom Popup
  </Button>
</div>

```ts
import { popup } from '@privyid/persona/core'

popup({
  title     : 'Lorem ipsum',
  text      : 'Lorem ipsum dolor sit amet.',
  popupClass: 'h-40',
  popupAttrs: { 'data-e2eid': 'popup-custom' }
})
```

## API

### popup

`popup(options: PopupOptions): Promise<CloseFn>`

| Options       |          Type           |    Default    | Description                                                                                                           |
|---------------|:-----------------------:|:-------------:|-----------------------------------------------------------------------------------------------------------------------|
| `type`        |        `String`         |    `info`     | Toast type variant, valid value is `info`, `success`, `warning`, `error`                                              |
| `title`       |        `String`         |       -       | Toast title message (support markdown)                                                                                |
| `text`        |        `String`         |       -       | Toast text message (support markdown)                                                                                 |
| `variant`     |        `String`         |   `simple`    | Toast style variant, valid value is `simple`, `filled`                                                                |
| `duration`    |        `Number`         |    `3000`     | Duration for which the popup should be displayed. `-1` to permanent popup                                             |
| `position`    |        `String`         | `bottom-left` | Position for popup, valid value is `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `top-right` |
| `icon`        | `String` or `Component` |       -       | Custom popup icon (will replace default icon)                                                                         |
| `iconColor`   |        `String`         |       -       | Custom color of popup icon, valid value is `default`, `primary`, `info`, `success`, `warning`, `danger`               |
| `popupClass`  |        `String`         |       -       | Add class to popup component                                                                                          |
| `popupAttrs`  |        `Object`         |       -       | Add attribute to popup component                                                                                      |
| `dismissable` |        `Boolean`        |    `true`     | Enable dismiss button                                                                                                 |
| `actions`     |  `Array<ActionOption>`  |       -       | Add action button                                                                                                     |

In `actions` contains:

| Props     |    Type    | Default | Description                 |
|-----------|:----------:|:-------:|-----------------------------|
| `text`    |  `String`  |    -    | Action button's text        |
| `attrs`   |  `Object`  |    -    | Action additional attribute |
| `onClick` | `Function` |    -    | Action on-click handler     |

#### Shorthand

`popup(text: string, title?: string, type?: string, variant?: string): Promise<CloseFn>`

## See Also

- [Toast](../toast/)
