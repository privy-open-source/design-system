# Contributing Guide

Hi! We are really excited that you are interested in contributing to our Design System. Before submitting your contribution, please make sure to take a moment and read through the following guide:

## Repo Setup

This repo is monorepo using yarn 2 workspace. The package manager used to install and link dependencies must be [yarn][yarn].

To develop, and test:

1. Run `yarn install`
2. Run `yarn dev` to start development server
3. Run `yarn test` to run unit test

## Creating Components

- Creating should be place in `components/` directory and grouped with their directory. The Component at least has 3 files:
  - `[Component].vue` - The component SFC itself <sup>*</sup>
  - `[Component].spec.ts` - The component unit test <sup>*</sup>
  - `component.md` - The component documentation

      <small>*: Change `[Component]` to your actual Component name</small>

- To shown in sidebar, you need register your component into vitepress config `./components/.vitepress/config.ts`

[yarn]: https://yarnpkg.com/getting-started
