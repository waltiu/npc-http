import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './src/hooks/index.ts',
      name: 'rHook',
      fileName: 'rHook'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react', 'npc-http']
    }
  },
  plugins: [react(), dts({ rollupTypes: true })],
})
