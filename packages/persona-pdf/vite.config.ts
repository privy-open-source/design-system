/* eslint-disable unicorn/prefer-module */
// vite.config.js
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import topLevelAwait from 'vite-plugin-top-level-await'
import dts from 'vite-plugin-dts'
import getTarget from 'browserslist-to-esbuild'

export default defineConfig({
  plugins: [topLevelAwait(), dts({ rollupTypes: true })],
  build  : {
    target: getTarget('extends @privyid/browserslist-config'),
    lib   : {
      entry   : resolve(__dirname, './src/persona-pdf.ts'),
      name    : 'PersonaPDF',
      fileName: 'persona-pdf',
      formats : ['es'],
    },
    rollupOptions: {},
  },
})
