import { defineBuildConfig } from 'unbuild'
import { createResolver } from './script/create-resolver'

export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input  : '../../src/components/',
      outDir : './dist/components',
      pattern: [
        '**/*',
        '!(**/*.md)',
        '!(**/*.{spec,bench}.ts)',
        '!(**/__mocks__/**)',
        '!(**/demo/**)',
      ],
      format: 'esm',
    },
    {
      builder: 'mkdist',
      input  : '../../src/components/',
      outDir : './dist/components',
      pattern: [
        '**/*',
        '!(**/*.md)',
        '!(**/*.{spec,bench}.ts)',
        '!(**/__mocks__/**)',
        '!(**/demo/**)',
      ],
      format     : 'cjs',
      declaration: false,
    },
    {
      builder: 'mkdist',
      input  : '../../src/core/',
      outDir : './dist/core',
      format : 'esm',
    },
    {
      builder    : 'mkdist',
      input      : '../../src/core/',
      outDir     : './dist/core',
      format     : 'cjs',
      declaration: false,
    },
    {
      builder: 'mkdist',
      input  : '../../src/directive/',
      outDir : './dist/directive',
      format : 'esm',
    },
    {
      builder    : 'mkdist',
      input      : '../../src/directive/',
      outDir     : './dist/directive',
      format     : 'cjs',
      declaration: false,
    },
  ],
  externals: [],
  hooks    : {
    async 'build:done' (ctx) {
      await createResolver(ctx)
    },
  },
})
