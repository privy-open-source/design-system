# tailwind-animation

> Collection animation class for vue `<transition>`

## Installation

```sh
yarn add -D @privyid/tailwind-animation
```

Then, add into `tailwind.config.js`

```js
module.exports = {
  plugins: [
    require('@privyid/tailwind-animation')
  ],
  // ...
}
```

## Usage

```vue
<template>
<!-- ... -->
  <transition name="fade" >
    <!-- ... -->
  </transition>
<!-- ... -->
</template>
```

## Available list

- `fade`
- `slide-up`
- `slide-left`
- `slide-right`
- `slide-top`
- `slide-bottom`
- `slide-full-left`
- `slide-full-right`
- `slide-full-top`
- `slide-full-bottom`
- `zoom-in`
- `zoom-out`

## License

[MIT License](/LICENSE)
