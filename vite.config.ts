import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Ignoramos node_modules y el DumpStack.log.tmp del root de C:
      ignored: [
        '**/node_modules/**',
        'C:/DumpStack.log.tmp',
        'C:\\DumpStack.log.tmp'
      ]
    }
  }
})
