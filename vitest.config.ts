import { defineConfig } from 'vite'
import { UserConfig } from 'vitest'
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
      ],
      exclude: [
        '**/*.spec.ts',
        '**/__mocks__/*',
        'vitest.setup.ts',
      ],
    },
    setupFiles: ['./vitest.setup.ts'],
  },
}) as UserConfig

export default config
