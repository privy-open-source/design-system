/* eslint-disable unicorn/prefer-module */
// vite.config.js
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import getTarget from 'browserslist-to-esbuild'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [cssInjectedByJsPlugin(), viteStaticCopy({ targets: [{ src: './src/persona-pdf.d.ts', dest: '.' }] })],
  build  : {
    target: getTarget('extends @privyid/browserslist-config'),
    lib   : {
      entry   : resolve(__dirname, './src/persona-pdf.mjs'),
      name    : 'PersonaPDF',
      fileName: 'persona-pdf',
    },
  },
})
