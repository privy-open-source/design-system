import { defineConfig } from 'vite'
import { UserConfig } from 'vitest'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    Vue(),
  ],
  test: {
    globals    : true,
    environment: 'happy-dom',
  },
} as UserConfig)
