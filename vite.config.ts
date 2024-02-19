import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export const viteUserConfig: UserConfig = {
  plugins: [react(), viteTsconfigPaths()],
  build: { outDir: 'build' },
  server: { open: true, port: 3000 },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
}
export default defineConfig(viteUserConfig)
