# eslint-config-persona

> Eslint shareable config for Persona project

## Installation

First, Install all dependencies:

```sh
yarn add --dev \
  eslint@8.57.0 \
  eslint-config-standard-with-typescript@21.0.1 \
  eslint-formatter-pretty@5.0.0 \
  eslint-plugin-align-assignments@1.1.2 \
  eslint-plugin-import@2.29.1 \
  eslint-plugin-n@16.6.2 \
  eslint-plugin-node@11.1.0 \
  eslint-plugin-promise@6.1.1 \
  eslint-plugin-unicorn@48.0.1 \
  eslint-plugin-varspacing@1.2.2 \
  eslint-plugin-vue@9.23.0 \
  typescript@5.4.5 \
  @vue/eslint-config-typescript@13.0.0 \
  @typescript-eslint/eslint-plugin@5.62.0 \
  @typescript-eslint/parser@5.62.0 \
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
