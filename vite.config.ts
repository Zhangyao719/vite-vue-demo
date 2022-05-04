import { defineConfig } from 'vite'
import { resolve } from 'path'
// support tsx
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
// vue自动导入
import AutoImport from 'unplugin-auto-import/vite'
// element 按需导入
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    // 支持tsx
    vueJsx(),

    // element 按需导入
    AutoImport({
      imports:['vue'],
      dts: "src/auto-import.d.ts",
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
})
