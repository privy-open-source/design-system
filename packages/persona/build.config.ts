import { defineBuildConfig } from 'unbuild'

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
    },
    {
      builder: 'mkdist',
      input  : '../../src/core/',
      outDir : './dist/core',
    },
    {
      builder: 'mkdist',
      input  : '../../src/directive/',
      outDir : './dist/directive',
    },
  ],
  externals: [],
})
