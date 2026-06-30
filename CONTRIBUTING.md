# Contributing Guide

Hi! We are really excited that you are interested in contributing to the Persona Design System. Before submitting your contribution, please make sure to take a moment and read through the following guide.

## Table of Contents

1. [Repo Setup](#repo-setup)
2. [Development Workflow](#development-workflow)
3. [Creating Components](#creating-components)
4. [Documentation](#documentation)
5. [Testing](#testing)
6. [Code Quality](#code-quality)
7. [Building & Releasing](#building--releasing)
8. [Git & Pull Request Guidelines](#git--pull-request-guidelines)

---

## Repo Setup

This is a **monorepo** using **Yarn 4** workspaces. You must use [Yarn][yarn] (not npm or pnpm) to ensure consistent dependency resolution across all packages.

### Prerequisites

- **Node.js**: 18.x or higher (use `.nvmrc` — run `nvm use`)
- **Yarn**: 4.9.1+ (pinned in `package.json`)

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/privy-open-source/design-system.git
cd design-system

# Install dependencies (uses Yarn workspaces)
yarn install

# Verify setup
yarn --version  # Should be 4.9.1+
node --version  # Should be 18+
```

---

## Development Workflow

### Start Development Server

```bash
# Start VitePress documentation site on http://localhost:3000
yarn dev

# Hot-reload is enabled — save changes and see updates in browser
```

The dev server watches:
- `src/components/` — Component documentation & live previews
- `src/foundation/` — Design tokens
- `packages/persona/` — Component source code

### Run Tests

```bash
# Run Vitest suite (all tests in watch mode)
yarn test

# Run tests once (useful for CI)
yarn test:run

# Run with coverage report
yarn coverage
```

### Linting & Type Checking

```bash
# ESLint on src/ with pretty output
yarn lint

# Auto-fix linting issues
yarn fix

# TypeScript type checking
yarn typecheck

# Run all checks together (like CI does)
yarn lint && yarn typecheck && yarn test
```

### Build Documentation

```bash
# Build VitePress static site
yarn build

# Output goes to: src/.vitepress/dist/

# Serve locally to test production build
yarn prod
```

---

## Creating Components

### File Structure

Every component must be created in one of two locations:

#### **For Documentation/Showcase (what users see)**
```
src/components/[component-name]/
├── [Component].vue         # Live component preview (same source as library)
├── [Component].spec.ts     # Unit test file (demonstrates testing patterns)
└── index.md                # Full documentation with examples
```

#### **For Library Source Code**
```
packages/persona/src/runtime/
├── components/
│   └── [ComponentName]/
│       ├── [ComponentName].vue
│       ├── [ComponentName].spec.ts
│       └── index.ts        # Export entry
├── directive/
├── core/
└── module.ts               # Nuxt module configuration
```

### Component Naming Convention

- **Vue file**: PascalCase (e.g., `Button.vue`, `FormGroup.vue`)
- **Folder**: kebab-case (e.g., `button/`, `form-group/`)
- **Spec file**: PascalCase (e.g., `Button.spec.ts`)
- **Markdown**: `index.md` (VitePress convention)

### Creating a New Component (Step-by-Step)

#### 1. Create the component in `packages/persona/`

**`packages/persona/src/runtime/components/MyComponent/MyComponent.vue`:**
```vue
<template>
  <div class="my-component">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'solid' | 'outline'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'solid',
  disabled: false,
})

const classes = computed(() => ({
  'my-component--solid': props.variant === 'solid',
  'my-component--outline': props.variant === 'outline',
  'my-component--disabled': props.disabled,
}))
</script>

<style scoped lang="postcss">
.my-component {
  @apply px-4 py-2 rounded-md transition-all;
  
  &--solid {
    @apply bg-primary-500 text-white;
  }

  &--outline {
    @apply bg-white border border-primary-500 text-primary-500;
  }

  &--disabled {
    @apply opacity-50 cursor-not-allowed;
  }
}
</style>
```

**`packages/persona/src/runtime/components/MyComponent/MyComponent.spec.ts`:**
```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from './MyComponent.vue'

describe('MyComponent', () => {
  it('renders slot content', () => {
    const wrapper = mount(MyComponent, {
      slots: {
        default: 'Click me'
      }
    })

    expect(wrapper.text()).toContain('Click me')
  })

  it('applies variant class', () => {
    const wrapper = mount(MyComponent, {
      props: {
        variant: 'outline'
      }
    })

    expect(wrapper.classes()).toContain('my-component--outline')
  })

  it('applies disabled class', () => {
    const wrapper = mount(MyComponent, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.classes()).toContain('my-component--disabled')
  })
})
```

**`packages/persona/src/runtime/components/MyComponent/index.ts`:**
```typescript
export { default as MyComponent } from './MyComponent.vue'
```

#### 2. Register in the Nuxt module

Update `packages/persona/src/module.ts` to auto-register the component (this is already automated in the module setup).

#### 3. Create documentation in `src/components/`

Copy the `.vue` and `.spec.ts` files into the documentation folder:

**`src/components/my-component/MyComponent.vue`** (same as library version)

**`src/components/my-component/MyComponent.spec.ts`** (same as library version)

**`src/components/my-component/index.md`:**
```markdown
---
title: MyComponent · Components
description: Brief description of MyComponent
---

<script setup>
  import MyComponent from './MyComponent.vue'
</script>

# MyComponent

> Short description of what this component does

## Usage

### Basic

<preview>
  <MyComponent>Click me</MyComponent>
</preview>

\`\`\`vue
<template>
  <MyComponent>Click me</MyComponent>
</template>
\`\`\`

### With Variant

<preview>
  <div class="flex gap-2">
    <MyComponent variant="solid">Solid</MyComponent>
    <MyComponent variant="outline">Outline</MyComponent>
  </div>
</preview>

\`\`\`vue
<template>
  <MyComponent variant="solid">Solid</MyComponent>
  <MyComponent variant="outline">Outline</MyComponent>
</template>
\`\`\`

### Disabled

<preview>
  <MyComponent disabled>Disabled</MyComponent>
</preview>

\`\`\`vue
<template>
  <MyComponent disabled>Disabled</MyComponent>
</template>
\`\`\`

## API

### Props

| Name       | Type                      | Default   | Description                |
|------------|---------------------------|-----------|----------------------------|
| `variant`  | `'solid' \| 'outline'`    | `'solid'` | Component style variant    |
| `disabled` | `boolean`                 | `false`   | Disable the component      |

### Slots

| Name      | Description                    |
|-----------|--------------------------------|
| `default` | Content to render in component |

### Events

| Name    | Payload | Description                |
|---------|---------|----------------------------|
| `click` | `Event` | Emitted when clicked       |

## Accessibility

- Always provide descriptive text or `aria-label`
- Support keyboard navigation (Tab, Enter)
- Maintain WCAG 2.1 AA contrast ratios

## Theming

MyComponent respects Tailwind design tokens via CSS variables:

\`\`\`css
--p-my-component-bg: theme(colors.primary.500);
--p-my-component-text: theme(colors.white);
\`\`\`
```

#### 4. Register in VitePress Sidebar

Update `src/.vitepress/config.ts` to add the component to the sidebar navigation:

```typescript
// In the '/components/' sidebar config
{
  text: 'MyComponent',
  link: '/components/my-component/'
}
```

---

## Documentation

### Documentation Standards

Every component must include:

1. **Title & Description** (frontmatter)
2. **Usage Examples** (live previews)
3. **Variants & States** (all visual variations)
4. **API Table** (Props, Slots, Events)
5. **Accessibility Notes** (WCAG compliance)
6. **Theming Info** (CSS variables)

### Writing Markdown in VitePress

```markdown
---
title: Button · Components
description: Base button component
---

<script setup>
  import Button from './Button.vue'
</script>

# Button

> Concise description

## Usage

### Simple

<preview>
  <Button>Click me</Button>
</preview>

\`\`\`vue
<template>
  <Button>Click me</Button>
</template>
\`\`\`

## API

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| ... | ... | ... | ... |
```

### Use `<preview>` Component

The `<preview>` tag is a custom VitePress component that:
- Renders live Vue code
- Shows rendered output
- Displays copy-paste code snippet

```vue
<preview label="optional label">
  <YourComponent prop="value">Content</YourComponent>
</preview>
```

---

## Testing

### Test File Location

Tests go in the **same directory** as the component:

```
packages/persona/src/runtime/components/Button/
├── Button.vue
├── Button.spec.ts       ← Test file
└── index.ts
```

### Test Template

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button', () => {
  it('renders slot content', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    })

    expect(wrapper.text()).toContain('Click me')
  })

  it('emits click event', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('applies disabled class', () => {
    const wrapper = mount(Button, {
      props: { disabled: true }
    })

    expect(wrapper.element.disabled).toBe(true)
  })
})
```

### Run Tests

```bash
# Watch mode (recommended during development)
yarn test

# Single run
yarn coverage

# Specific file
yarn test Button.spec.ts
```

---

## Code Quality

### Linting Rules

The project uses **ESLint** with shared config (`@privyid/eslint-config-persona`):

```bash
# Check for issues
yarn lint

# Auto-fix issues
yarn fix
```

### TypeScript

All Vue files should have proper TypeScript support:

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  modelValue?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'submit': []
}>()
</script>
```

### Code Style

- **Indentation**: 2 spaces
- **Quotes**: Single quotes (`)
- **Trailing commas**: Yes
- **Semicolons**: Yes (in JS/TS)
- **Line length**: ~100 chars (soft limit)

---

## Building & Releasing

### Build Documentation

```bash
yarn build        # Build VitePress site to src/.vitepress/dist/
```

### Build Packages

```bash
# Prepare all packages (build + type checks)
yarn packages:prepare

# Build all packages
yarn packages:build

# Publish to npm (requires npm credentials)
yarn release
```

### Versioning

This project uses **SemVer** and follows the monorepo release pattern. Versions are managed in `package.json` files across packages.

---

## Git & Pull Request Guidelines

### Branch Naming

```
feature/component-name       Add a new component
feature/improve-button       Improve existing component
fix/modal-scroll-issue       Bug fix
docs/update-guides           Documentation updates
chore/upgrade-deps           Dependencies
```

### Commit Messages

Follow conventional commits (optional but recommended):

```
feat: add button component
feat(button): add loading state
fix(modal): prevent scroll on open
docs: update contributing guide
chore: upgrade tailwind to 3.4
```

### Pull Request Checklist

Before submitting a PR, ensure:

- [ ] **Code** — Component works as expected
- [ ] **Tests** — All tests pass (`yarn test`)
- [ ] **Linting** — No linting errors (`yarn lint`)
- [ ] **Types** — TypeScript checks pass (`yarn typecheck`)
- [ ] **Docs** — Documentation is complete (`src/components/*/index.md`)
- [ ] **Responsive** — Works on mobile, tablet, desktop
- [ ] **Accessibility** — Passes WCAG 2.1 AA standards
- [ ] **Git** — Commits are clean & meaningful

### CI Pipeline

On every push/PR, GitHub Actions runs:

1. **Linting** — ESLint validation
2. **Type Checking** — TypeScript validation
3. **Tests** — Vitest suite (Node 18, 20, 22)
4. **Security** — CodeQL analysis
5. **Build** — Full site build + deployment (on `main`)

All checks must pass before merge.

---

## File Structure Reference

```
privy-open-source/design-system/
├── .github/
│   └── workflows/
│       ├── ci.yml                 # CI/CD pipeline
│       └── sync.yml               # Asset sync
├── packages/
│   ├── persona/                   # Core component library
│   │   ├── src/
│   │   │   ├── runtime/
│   │   │   │   ├── components/    # Component source
│   │   │   │   ├── directive/     # Vue directives
│   │   │   │   ├── core/          # Utilities
│   │   │   │   └── module.ts      # Nuxt module entry
│   │   │   └── build.config.ts    # Build configuration
│   │   └── package.json
│   ├── persona-icon/              # Icon library
│   ├── persona-ilustration/       # Illustration assets
│   ├── tailwind-preset/           # Tailwind config
│   ├── tailwind-extended/         # Extra utilities
│   ├── tailwind-animation/        # Animation utilities
│   ├── eslint-config-persona/     # Shared ESLint config
│   └── browserslist-config/       # Browser targets
├── src/                           # Documentation site
│   ├── .vitepress/
│   │   ├── config.ts              # VitePress config
│   │   ├── head.ts                # Meta tags
│   │   └── theme/                 # Custom theme
│   ├── components/                # Component docs (100+)
│   ├── foundation/                # Design tokens
│   ├── docs/                      # Getting started
│   ├── styleguide/                # UX guidelines
│   ├── ecosystem/                 # Related packages
│   └── index.md                   # Homepage
├── CONTRIBUTING.md                # This file
├── package.json                   # Monorepo root
├── tsconfig.json                  # TypeScript config
└── vite.config.ts                 # Vite config
```

---

## Common Tasks

### Add a new component variant

1. Update `Component.vue` with new prop
2. Add unit test in `Component.spec.ts`
3. Update documentation in `src/components/component-name/index.md`
4. Run tests: `yarn test`
5. Run linting: `yarn fix && yarn lint`

### Fix a bug

1. Create a new test that reproduces the bug
2. Fix the bug in the component
3. Verify test passes: `yarn test`
4. Update documentation if behavior changed

### Update design tokens

1. Modify JSON files in `src/foundation/` (or config source)
2. Update corresponding Tailwind preset in `packages/tailwind-preset/`
3. Update foundation documentation in `src/foundation/*/index.md`
4. Run full build: `yarn build`

### Update dependencies

1. Update `package.json` version (or use `yarn upgrade`)
2. Run `yarn install`
3. Run full test suite: `yarn lint && yarn typecheck && yarn test`
4. Commit with message like `chore: upgrade tailwind to 3.4`

---

## Resources

- [Vue 3 Documentation][vue-docs]
- [VitePress Documentation][vitepress-docs]
- [Tailwind CSS Documentation][tailwind-docs]
- [Nuxt 3 Documentation][nuxt-docs]
- [Vitest Documentation][vitest-docs]
- [WCAG 2.1 Guidelines][wcag-docs]

---

## Questions?

Have questions? Check out:

1. **Issues** — Search existing issues: https://github.com/privy-open-source/design-system/issues
2. **Discussions** — Ask in discussions: https://github.com/privy-open-source/design-system/discussions
3. **Documentation** — Visit: https://privy-open-source.github.io/design-system/

Thank you for contributing! 🎉

[yarn]: https://yarnpkg.com/getting-started
[vue-docs]: https://vuejs.org/
[vitepress-docs]: https://vitepress.dev/
[tailwind-docs]: https://tailwindcss.com/
[nuxt-docs]: https://nuxt.com/
[vitest-docs]: https://vitest.dev/
[wcag-docs]: https://www.w3.org/WAI/WCAG21/quickref/
