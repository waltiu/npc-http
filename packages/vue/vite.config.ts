import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
// https://vitejs.dev/config/
export default defineConfig({
  build:{
    lib:{
      entry:'./src/hooks/index.ts',
      name:'vHook',
      fileName:'vHook'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'npc-http']
    }
  },
  plugins: [vue(),dts({ rollupTypes: true })]
})
