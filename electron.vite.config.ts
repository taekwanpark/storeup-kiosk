import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve(__dirname, './src/renderer/src'),
        '@typings': resolve(__dirname, './src/typings'),
        '@libs': resolve(__dirname, './src/libs')
      }
    },

    plugins: [vue(), svgLoader()]
  }
})
