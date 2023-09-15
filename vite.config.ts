import type { UserConfig } from 'vite'
import type { UserConfig as VitestConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'

const config: UserConfig & Pick<VitestConfig, 'test'> = {
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
      statements: 100,
      lines     : 100,
      functions : 100,
    },
    setupFiles: ['./vitest.setup.ts'],
  },
}

export default config
