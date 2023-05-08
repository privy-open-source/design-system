import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input  : './src/vue/',
      outDir : './dist/vue',
    },
    {
      builder: 'mkdist',
      input  : './src/svg/',
      outDir : './dist/svg',
    },
  ],
  declaration: true,
})
