import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

const config = defineConfig({
  plugins: [Vue()],
  build  : { sourcemap: true },
  test   : {
    globals    : true,
    environment: 'happy-dom',
    coverage   : {
      reporter: [
        'text',
        'json',
        'html',
        'lcov',
      ],
      exclude: [
        '**/*.spec.ts',
        '**/__mocks__/*',
        'vitest.setup.ts',
      ],
    },
    setupFiles: ['./vitest.setup.ts'],
  },
})

export default config
