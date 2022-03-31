import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fonts from 'vite-plugin-fonts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    fonts({ google: { families: ['DM Sans'] } })
  ]
})
