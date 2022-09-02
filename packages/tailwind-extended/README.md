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

## License

[MIT License](/LICENSE)
