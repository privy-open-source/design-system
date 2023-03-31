# eslint-config-persona

> Eslint shareable config for Persona project

## Installation

First, Install all dependencies:

```sh
yarn add --dev \
  eslint \
  eslint-config-standard-with-typescript \
  eslint-formatter-pretty \
  eslint-plugin-align-assignments \
  eslint-plugin-import \
  eslint-plugin-n \
  eslint-plugin-node \
  eslint-plugin-promise \
  eslint-plugin-unicorn \
  eslint-plugin-varspacing \
  eslint-plugin-vue \
  typescript \
  @vue/eslint-config-typescript \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  @privyid/eslint-config-persona
```

Then, add this to your `.eslintrc` file (create one if doesn't exist):

```json
{
  "extends": ["@privyid/eslint-config-persona"],
  "parserOptions": { "project": "./tsconfig.json" }
}
```

Optional, add this to `package.json` script's:

```json
{
  // ...
  "scripts": {
    // ...
    "lint": "eslint . --ext .js,.vue,.ts --format pretty",
    "fix": "yarn lint:js --fix",
    // ...
  }
  // ...
}
```

## License

[MIT License](/LICENSE)
