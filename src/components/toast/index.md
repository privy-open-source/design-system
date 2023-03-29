---
title: Toast · Components
description: Simple notification pop-up.
---

<script setup>
  import Button from '../button/Button.vue'
  import Toast from './Toast.vue'
  import toast from '.'
</script>

# Toast

> Simple notification pop-up.

## Usage

### Simple Usage

<div class="flex mt-3">
  <Button color="info" @click="toast({
    title: 'Lorem ipsum',
    text : 'Lorem ipsum dolor sit amet.',
  })">
    Show Toast
  </Button>
</div>

```ts
import { toast } from '@privyid/persona/core'

toast({
  title: 'Lorem ipsum',
  text : 'Lorem ipsum dolor sit amet.',
})
```

### Advance Usage

<div class="flex mt-3">
  <Button color="info" @click="toast({
    type      : 'error',
    title     : 'Lorem ipsum',
    text      : 'Lorem ipsum dolor sit amet.',
    variant   : 'filled',
    duration  : 5000,
    toastClass: 'custom-toast',
  })">
    Show Toast
  </Button>
</div>

```ts
import { toast } from '@privyid/persona/core'

toast({
  type      : 'error',
  title     : 'Lorem ipsum',
  text      : 'Lorem ipsum dolor sit amet.',
  variant   : 'filled',
  duration  : 5000,
  toastClass: 'custom-toast',
})
```

## Type Variant

There available 4 type variants: `info`, `success`, `warning`, `error`. default is `info`

<preview class="flex-col items-center space-y-3">
  <Toast type="info" title="Lorem ipsum" text="Lorem ipsum dolor sit amet." />
  <Toast type="success" title="Lorem ipsum" text="Lorem ipsum dolor sit amet." />
  <Toast type="warning" title="Lorem ipsum" text="Lorem ipsum dolor sit amet." />
  <Toast type="error" title="Lorem ipsum" text="Lorem ipsum dolor sit amet." />
</preview>

**Try it:**

<div class="mt-3 space-gap-3">
  <Button color="info" @click="toast({
    type : 'info',
    title: 'Lorem ipsum',
    text : 'Lorem ipsum dolor sit amet.',
  })">
    Info
  </Button>
  <Button color="success" @click="toast({
    type : 'success',
    title: 'Lorem ipsum',
    text : 'Lorem ipsum dolor sit amet.',
  })">
    Success
  </Button>
  <Button color="warning" @click="toast({
    type : 'warning',
    title: 'Lorem ipsum',
    text : 'Lorem ipsum dolor sit amet.',
  })">
    Warning
  </Button>
  <Button color="danger" @click="toast({
    type : 'error',
    title: 'Lorem ipsum',
    text : 'Lorem ipsum dolor sit amet.',
  })">
    Error
  </Button>
</div>

```ts
import { toast } from '@privyid/persona/core'

// info
toast({
  type : 'info',
  title: 'Lorem ipsum',
  text : 'Lorem ipsum dolor sit amet.',
})

// success
toast({
  type : 'success',
  title: 'Lorem ipsum',
  text : 'Lorem ipsum dolor sit amet.',
})

// warning
toast({
  type : 'warning',
  title: 'Lorem ipsum',
  text : 'Lorem ipsum dolor sit amet.',
})

// error
toast({
  type : 'error',
  title: 'Lorem ipsum',
  text : 'Lorem ipsum dolor sit amet.',
})
```

## Style Variant

There available 2 style variant: `simple` and `filled`. default is `simple`

<preview class="flex-col items-center space-y-3">
  <Toast variant="filled" type="info" title="Lorem ipsum" text="Lorem ipsum dolor sit amet." />
  <Toast variant="filled" type="success" title="Lorem ipsum" text="Lorem ipsum dolor sit amet." />
  <Toast variant="filled" type="warning" title="Lorem ipsum" text="Lorem ipsum dolor sit amet." />
  <Toast variant="filled" type="error" title="Lorem ipsum" text="Lorem ipsum dolor sit amet." />
</preview>

**Try it:**

<div class="mt-3 space-gap-3">
  <Button color="info" @click="toast({
    type   : 'info',
    variant: 'filled',
    title  : 'Lorem ipsum',
    text   : 'Lorem ipsum dolor sit amet.',
  })">
    Info
  </Button>
  <Button color="success" @click="toast({
    type   : 'success',
    variant: 'filled',
    title  : 'Lorem ipsum',
    text   : 'Lorem ipsum dolor sit amet.',
  })">
    Success
  </Button>
  <Button color="warning" @click="toast({
    type   : 'warning',
    variant: 'filled',
    title  : 'Lorem ipsum',
    text   : 'Lorem ipsum dolor sit amet.',
  })">
    Warning
  </Button>
  <Button color="danger" @click="toast({
    type   : 'error',
    variant: 'filled',
    title  : 'Lorem ipsum',
    text   : 'Lorem ipsum dolor sit amet.',
  })">
    Error
  </Button>
</div>

```ts
import { toast } from '@privyid/persona/core'

// info
toast({
  type   : 'info',
  variant: 'filled',
  title  : 'Lorem ipsum',
  text   : 'Lorem ipsum dolor sit amet.',
})

// success
toast({
  type   : 'success',
  variant: 'filled',
  title  : 'Lorem ipsum',
  text   : 'Lorem ipsum dolor sit amet.',
})

// warning
toast({
  type   : 'warning',
  variant: 'filled',
  title  : 'Lorem ipsum',
  text   : 'Lorem ipsum dolor sit amet.',
})

// error
toast({
  type   : 'error',
  variant: 'filled',
  title  : 'Lorem ipsum',
  text   : 'Lorem ipsum dolor sit amet.',
})
```

## Customization

You can add some custom class to Toast element via `toastClass`.

<div class="mt-3">
  <Button type="" color="info" @click="toast({
    title     : 'Lorem ipsum',
    text      : 'Lorem ipsum dolor sit amet.',
    toastClass: 'mt-4 mr-4',
  })">
    Rounded Toast
  </Button>
</div>

```ts
import { toast } from '@privyid/persona/core'

toast({
  title     : 'Lorem ipsum',
  text      : 'Lorem ipsum dolor sit amet.',
  toastClass: 'mt-4 mr-4',
})
```

## API

### toast

`toast(options: ToastOptions): Promise<void>`

| Options      |   Type   | Default  | Description                                                               |
|--------------|:--------:|:--------:|---------------------------------------------------------------------------|
| `type`       | `String` |  `info`  | Toast type variant, valid value is `info`, `success`, `warning`, `error`     |
| `title`      | `String` |    -     | Toast title message, **required**                                         |
| `text`       | `String` |    -     | Toast text message, **required**                                          |
| `variant`    | `String` | `simple` | Toast style variant, valid value is `simple`, `filled`                    |
| `duration`   | `Number` |  `3000`  | Duration for which the toast should be displayed. `-1` to permanent toast |
| `toastClass` | `String` |    -     | Add class to toast component                                              |
