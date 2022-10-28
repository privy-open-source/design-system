# tailwind-extended
> Add missing tailwind utilities

## Installation

```sh
yarn add -D @privyid/tailwind-extended
```

Then, add into `tailwind.config.js`

```js
module.exports = {
  plugins: [
    require('@privyid/tailwind-extended')
  ],
  // ...
}
```

## Usage

### Writing Mode

| Class            | Properties                    |
|------------------|-------------------------------|
| `.horizontal-tb` | `writing-mode: horizontal-tb` |
| `.vertical-rl`   | `writing-mode: vertical-rl`   |
| `.vertical-lr`   | `writing-mode: vertical-lr`   |

### Aspect Compat

Similar to native tailwind [aspect-ratio](https://tailwindcss.com/docs/aspect-ratio) but with fallback for old browser.

```css
/* Tailwind Core aspect-ratio */
.aspect-video {
  aspect-ratio: 16 / 9;
}

/* Aspect Ratio Compat */
.aspect-compat-video {
  aspect-ratio: 16 / 9;
}

@supports not (aspect-ratio: 1/1) {
  .aspect-compat-video::before {
    content: '';
    float: left;
    padding-top: calc(100% * 16/9);
  }
  .aspect-compat-video::after {
    content: '';
    display: block;
    clear: both;
  }
}
```

## License

[MIT License](/LICENSE)
