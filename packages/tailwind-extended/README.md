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

### Margin Inline

| Class   | Properties                  |
|---------|-----------------------------|
| `.mi-1` | `margin-inline: 0.25rem`    |
| `.ms-1` | `margin-inline-start: 0.25` |
| `.me-1` | `margin-inline-end: 0.25`   |

Other values is similar to [Margin](https://tailwindcss.com/docs/margin).

### Padding Inline

| Class   | Properties                   |
|---------|------------------------------|
| `.pi-1` | `padding-inline: 0.25rem`    |
| `.ps-1` | `padding-inline-start: 0.25` |
| `.pe-1` | `padding-inline-end: 0.25`   |

Other values is similar to [Padding](https://tailwindcss.com/docs/padding).

### Space Gap

Flex Gap alternative, using negative margin method. Given space between child element in `x` and `y` direction.

If you not use `flex-wrap` or similar "break wrap" things,
better use `space-x` or `space-y`.

```scss
.space-gap-1 {
  margin-top: -0.5rem;
  margin-left: -0.5rem;

  & > * {
    margin-top: 0.5;
    margin-left: 0.5rem;
  }
}
```

Note: you can't use `space-gap` together with `mt-*` and `ml-*`. You need wrap the element.

```html
<!-- Not Work -->
<div class="mt-4 space-gap-2">
  <!-- Content -->
</div>

<!-- Work -->
<div class="mt-4">
  <div class="space-gap-2">
    <!-- Content -->
  </div>
</div>
```

Other values is similar to [Space](https://tailwindcss.com/docs/space).

## License

[MIT License](/LICENSE)
