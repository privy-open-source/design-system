import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input  : '../../components',
      outDir : './dist/components',
    },
  ],
})
