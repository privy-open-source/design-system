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
      ext    : 'mjs',
    },
    {
      builder: 'mkdist',
      input  : '../../src/core/',
      outDir : './dist/core',
      format : 'cjs',
      ext    : 'cjs',
    },
  ],
  externals: ['node:url'],
})
