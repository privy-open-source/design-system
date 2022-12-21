import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input  : '../../src/components/',
      outDir : './dist/components',
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
