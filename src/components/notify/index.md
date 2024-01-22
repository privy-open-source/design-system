---
title: Notify · Components
description: Low level component for Popup and Toast.
---

<script setup>
  import notify from '.'
  import pCard from '../card/Card.vue'
  import Button from '../button/Button.vue'
</script>

# Notify

> Low-Level component for [Popup](../popup/) and [Toast](../toast/).

## Usage

### Simple Usage

<div class="flex mt-3">
  <Button color="info" @click="notify({
    component: pCard,
    props    : {
      title      : 'Hello World',
      class      : 'w-[300px]',
      callout    : true,
      dismissable: true,
    },
    duration : 3000,
    position : 'bottom-left',
  })">
    Show Notify
  </Button>
</div>


```ts
import pCard from '#components'
import { notify } from '@privyid/persona/core'

notify({
  component: pCard,
  props    : {
    title      : 'Hello World',
    class      : 'w-[300px]',
    callout    : true,
    dismissable: true,
  },
  duration : 3000,
  position : 'bottom-left',
})
```

## Variables

Toast use local CSS variables on `.notify-container` for enhanced real-time customization.

```sass
--p-notify-z-index: theme(zIndex.notify); //1090
```

## API

### notify

`notify(options: PopupOptions): Promise<NotifyInstance>`

| Options     |    Type     |    Default    | Description                                                                                                           |
|-------------|:-----------:|:-------------:|-----------------------------------------------------------------------------------------------------------------------|
| `component` | `Component` |      `-`      | Notify item component                                                                                                 |
| `props`     |  `Object`   |      `-`      | Notify item props                                                                                                     |
| `duration`  |  `Number`   |    `3000`     | Duration for which the popup should be displayed. `-1` to permanent popup                                             |
| `position`  |  `String`   | `bottom-left` | Position for popup, valid value is `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `top-right` |

## See Also

- [Toast](../toast/)
- [Popup](../popup/)
