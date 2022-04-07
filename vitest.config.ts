import { defineConfig } from 'vite'
import { UserConfig } from 'vitest'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    Vue(),
  ],
  build: { sourcemap: true },
  test : {
    globals    : true,
    environment: 'happy-dom',
    coverage   : {
      exclude : ['**/*.spec.ts', '**/__mocks__/*'],
      reporter: ['text', 'json', 'html'],
    },
    setupFiles: [
      './vitest.setup.ts'
    ]
  },
} as UserConfig)
