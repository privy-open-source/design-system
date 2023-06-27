# Getting Started

> Installation Guide

## Quick Start

The fastest way to use Persona is using starter template, There various themes to suit your project:

### Theme: `dashboard`

<div data-tour="theme-dashboard">

👉 Suit for building dashboard, powered with <a href="https://v3.nuxtjs.org/" target="__blank" rel="noreferrer">Nuxt 3</a>.

#### Installation

```bash
# Install current folder
npx degit privy-open-source/persona-starter#dashboard

# Install in new folder
npx degit privy-open-source/persona-starter#dashboard my_dashboard
```

#### Try Online

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/privy-open-source/persona-starter/tree/dashboard)

</div>

### Theme: `docs`

<div data-tour="theme-docs" open>

👉 Suit for building technical documentation and static web, powered with <a href="https://vitepress.vuejs.org/" target="_blank" rel="noreferrer">VitePress</a>.

#### Installation

```bash
# Install current folder
npx degit privy-open-source/persona-starter#docs

# Install in new folder
npx degit privy-open-source/persona-starter#docs my_docs
```

#### Try Online

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/privy-open-source/persona-starter/tree/docs)

</div>

## Manual Installation

### Nuxt 3

👉 If you want add Persona to existing Nuxt 3 Project, you can follow the steps below

#### 1. Install Persona

Install persona and all dependencies.

```sh
yarn add --dev @privyid/persona @privyid/browserslist-config @privyid/tailwind-preset tailwindcss autoprefixer postcss  postcss-hexrgba postcss-lighten-darken
```

#### 2. Configure Tailwind

Add this your `tailwind.config.js`, Create one if not exist, using `npx tailwindcss init`.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',  // [!code ++]
    './layouts/**/*.vue',             // [!code ++]
    './pages/**/*.vue',               // [!code ++]
    './plugins/**/*.{js,ts}',         // [!code ++]
    './nuxt.config.{js,ts}',          // [!code ++]
    './app.vue',                      // [!code ++]
  ],
  presets: [require('@privyid/tailwind-preset')], // [!code ++]
}
```

#### 3. Add Tailwind base CSS

Create `./assets/css/tailwind.css`.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### 4. Configure Nuxt

Add this in your `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: [
    '@privyid/persona' // [!code ++]
  ],
  css    : ['~/assets/css/tailwind.css'], // [!code ++]
  postcss: {
    plugins: {
      'postcss-hexrgba'       : {}, // [!code ++]
      'tailwindcss/nesting'   : {}, // [!code ++]
      'tailwindcss'           : {}, // [!code ++]
      'postcss-lighten-darken': {}, // [!code ++]
      'autoprefixer'          : {}, // [!code ++]
    },
  },
})
```
