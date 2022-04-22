<script setup>
  import Button from '../button/Button.vue'
  import Toast from './Toast.vue'
  import toast from './use-toast'
</script>

# Toast

## Usage

### Simple Usage

<div class="flex mt-3">
  <Button @click="toast({
    title: 'Lorem ipsum',
    text : 'Lorem ipsum dolor sit amet.',
  })">
    Show Toast
  </Button>
</div>

```ts
import toast from './use-toast'

toast({
  title: 'Lorem ipsum',
  text : 'Lorem ipsum dolor sit amet.',
})
```

### Complex Usage

<div class="flex mt-3">
  <Button @click="toast({
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
import toast from './use-toast'

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

There available 4 type variants: `info`, `success`, `warn`, `error`. default is `info`

<preview class="flex-col items-center gap-3">
  <Toast type="info" title="Lorem ipsum" text="Lorem ipsum dolor sit amet." />
  <Toast type="success" title="Lorem ipsum" text="Lorem ipsum dolor sit amet." />
  <Toast type="warn" title="Lorem ipsum" text="Lorem ipsum dolor sit amet." />
  <Toast type="error" title="Lorem ipsum" text="Lorem ipsum dolor sit amet." />
</preview>

**Try it:**

<div class="flex flex-wrap gap-3 mt-3">
  <Button color="primary" @click="toast({
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
    type : 'warn',
    title: 'Lorem ipsum',
    text : 'Lorem ipsum dolor sit amet.',
  })">
    Warn
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
import toast from './use-toast'

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

// warn
toast({
  type : 'warn',
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

<preview class="flex-col items-center gap-3">
  <Toast variant="filled" type="info" title="Lorem ipsum" text="Lorem ipsum dolor sit amet." />
  <Toast variant="filled" type="success" title="Lorem ipsum" text="Lorem ipsum dolor sit amet." />
  <Toast variant="filled" type="warn" title="Lorem ipsum" text="Lorem ipsum dolor sit amet." />
  <Toast variant="filled" type="error" title="Lorem ipsum" text="Lorem ipsum dolor sit amet." />
</preview>

**Try it:**

<div class="flex flex-wrap gap-3 mt-3">
  <Button color="primary" @click="toast({
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
    type   : 'warn',
    variant: 'filled',
    title  : 'Lorem ipsum',
    text   : 'Lorem ipsum dolor sit amet.',
  })">
    Warn
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
import toast from './use-toast'

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

// warn
toast({
  type   : 'warn',
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

<div class="flex gap-3 mt-3">
  <Button type="" color="primary" @click="toast({
    title     : 'Lorem ipsum',
    text      : 'Lorem ipsum dolor sit amet.',
    toastClass: 'rounded-full',
  })">
    Rounded Toast
  </Button>
</div>

```ts
import toast from './use-toast'

toast({
  title     : 'Lorem ipsum',
  text      : 'Lorem ipsum dolor sit amet.',
  toastClass: 'rounded-full',
})
```

## API

### toast

`toast(options: ToastOptions): Promise<void>`

| Options      |   Type   | Default  | Description                                                               |
|--------------|:--------:|:--------:|---------------------------------------------------------------------------|
| `type`       | `String` |  `info`  | Toast type variant, valid value is `info`, `success`, `warn`, `error`     |
| `title`      | `String` |    -     | Toast title message, **required**                                         |
| `text`       | `String` |    -     | Toast text message, **required**                                          |
| `variant`    | `String` | `simple` | Toast style variant, valid value is `simple`, `filled`                    |
| `duration`   | `Number` |  `3000`  | Duration for which the toast should be displayed. `-1` to permanent toast |
| `toastClass` | `String` |    -     | Add class to toast component                                              |
