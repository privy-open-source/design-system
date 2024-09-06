---
title: Toast · Components
description: Simple notification pop-up.
---

<script setup>
  import { ref, markRaw } from 'vue-demi'
  import Button from '../button/Button.vue'
  import Toast from './Toast.vue'
  import toast from '.'
  import IconSuccess from '@privyid/persona-icon/vue/checkmark/16.vue'
  import IconFailed from '@privyid/persona-icon/vue/trash/16.vue'
  import Banner from '../banner/Banner.vue'

  async function runLoading () {
    let progress = 0

    const t     = await toast.withProgress('Uploading...')
    const timer = setInterval(() => {
      if (progress >= 100) {
        clearInterval(timer)
        t.close()

        toast('Upload successfully')
      }

      t.setProgress(`${++progress}%`)
    }, 50)
  }
</script>

# Toast

> Simple notification pop-up.

## Usage

### Simple Usage

<div class="flex mt-3">
  <Button color="info" @click="toast({ text: 'Far far away, behind the word.', duration: -1 })">
    Show Toast
  </Button>
</div>

```ts
import { toast } from '@privyid/persona/core'

toast('Far far away, behind the word.')
```

### Advance Usage

<div class="flex mt-3">
  <Button color="info" @click="toast({
    text    : `Far far away, behind the word.`,
    duration: 5000,
    position: 'bottom-right'
  })">
    Show Toast
  </Button>
</div>

```ts
import { toast } from '@privyid/persona/core'

toast({
  text    : 'Far far away, behind the word.',
  duration: 5000,
  position: 'bottom-right'
})
```

## Position

There available 3 position for toast: `bottom-left`, `bottom-center`, `bottom-right` default is `bottom-left`

**Try it:**

<div class="grid grid-cols-3 gap-3 mt-3">
  <Button class="items-center" color="info" @click="toast({
    text    : 'Far far away, behind the word.',
    position: 'bottom-left'
  })">
    Bottom Left
  </Button>

  <Button class="items-center" color="info" @click="toast({
    text    : 'Far far away, behind the word.',
    position: 'bottom-center'
  })">
    Bottom Center
  </Button>

  <Button class="items-center" color="info" @click="toast({
    text    : 'Far far away, behind the word.',
    position: 'bottom-right'
  })">
    Bottom Right
  </Button>
</div>

```ts
import { toast } from '@privyid/persona/core'

// bottom-left
toast({
  text    : 'Far far away, behind the word.',
  position: 'bottom-left'
})

// bottom-center
toast({
  text    : 'Far far away, behind the word.',
  position: 'bottom-center'
})

// bottom-right
toast({
  text    : 'Far far away, behind the word.',
  position: 'bottom-right'
})
```

## Icon

It's possible to custom icon of toast, like color and icon-name.
There are 6 icon colors available for toast: `default`, `primary`, `info`, `success`, `warning` and `danger`. Default icon color is toast icon color it's self.

<preview>
  <Toast
    text="Member added to the group"
    :icon="IconSuccess"
    icon-color="success" />
</preview>

<div class="mt-3 space-x-5">
  <Button color="info" @click="toast({
    text     : 'Member added to the group',
    icon     : IconSuccess,
    iconColor: 'success',
  })">
    Show toast
  </Button>
</div>

```ts
import { toast } from '@privyid/persona/core'
import IconSuccess from '@privyid/persona-icon/vue/checkmark/24.vue'

toast({
  text     : 'Member added to the group',
  icon     : markRaw(IconSuccess),
  iconColor: 'success',
})
```

## Dismissable

Dismiss button of toast can be show or hide by `dismissable` props. If `dismissable`
set to `true`, dismiss button will show.

<preview class="flex-col items-center space-y-3">
  <Toast :dismissable="false" variant="filled" text="Lorem ipsum dolor sit amet." />
</preview>

```ts
import { toast } from '@privyid/persona/core'

toast({
  text       : 'Lorem ipsum dolor sit amet.',
  variant    : 'filled',
  dismissable: false,
})
```

## Actions

Add additional button using option `actions`.

<preview>
  <Toast
    text="Upload document successfully."
    :actions="[
      { text: 'Goto Doc' },
    ]"
  />
</preview>

<div class="mt-3">
  <Button type="" color="info" @click="toast({
    text   : 'Upload document successfully.',
    actions: [
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
toast({
  text   : 'Upload document successfully.',
  actions: [
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

## Progress

Show loading progress using toast with `.runProgress`.

<preview>
  <Toast
    text="Uploading..."
    loading
    loading-text="75%"
    :dismissable="false" />
</preview>

<div class="mt-3">
  <Button type="" color="info" @click="runLoading()">
    With Progress
  </Button>
</div>

```ts
import { toast } from '@privyid/persona/core'

async function doUpload () {
  // ...
  const progressToast = await toast.withProgress('Uploading...')
  const response      = await axios.put('/endpoint/url', formData, {
    onUploadProgress (progressEvent) {
      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)

      progressToast.setProgress(`${progress}%`)
    }
  })

  progressToast.close()
  toast('Upload successfully')
}
```

## Customization

You can add some custom class to Toast element via `toastClass` and `toastAttrs`.

<div class="mt-3">
  <Button type="" color="info" @click="toast({
    text      : 'A wonderful serenity has taken.',
    toastClass: 'h-20',
    toastAttrs: { 'data-e2eid': 'toast-upload' },
  })">
    Custom Toast
  </Button>
</div>

```ts
import { toast } from '@privyid/persona/core'

toast({
  text      : 'A wonderful serenity has taken.',
  toastClass: 'h-20',
  toastAttrs: { 'data-e2eid': 'toast-upload' },
})
```

## API

### toast

`toast(options: ToastOptions): Promise<ToastInstance>`

| Options       |          Type           |    Default    | Description                                                                                             |
|---------------|:-----------------------:|:-------------:|---------------------------------------------------------------------------------------------------------|
| `text`        |        `String`         |       -       | Toast text message (support markdown)                                                                   |
| `position`    |        `String`         | `bottom-left` | Position for toast, valid value is `bottom-left`, `bottom-center`, `top-right`                          |
| `duration`    |        `Number`         |    `3000`     | Duration for which the toast should be displayed. `-1` to permanent toast                               |
| `icon`        | `String` or `Component` |       -       | Custom toast icon (will replace default icon)                                                           |
| `iconColor`   |        `String`         |       -       | Custom color of toast icon, valid value is `default`, `primary`, `info`, `success`, `warning`, `danger` |
| `toastClass`  |        `String`         |       -       | Add class to toast component                                                                            |
| `toastAttrs`  |        `String`         |       -       | Add attribute to toast component                                                                        |
| `dismissable` |        `Boolean`        |    `true`     | Enable dismiss button                                                                                   |
| `actions`     |  `Array<ActionOption>`  |       -       | Add action button                                                                                       |

In `actions` contains:

| Props     |    Type    | Default | Description                 |
|-----------|:----------:|:-------:|-----------------------------|
| `text`    |  `String`  |    -    | Action button's text        |
| `attrs`   |  `Object`  |    -    | Action additional attribute |
| `onClick` | `Function` |    -    | Action on-click handler     |

#### Shorthand

`toast(text: string): Promise<ToastInstance>`

### .withProgress

`.withProgress(options: ToastOption): Promise<ToastProgressInstance>`

#### Shorthand

`.withProgress(text: string, loadingText?: string): Promise<ToastProgressInstance>`

## See Also

- [Popup](../popup/)
