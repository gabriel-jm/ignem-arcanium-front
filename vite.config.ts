import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve('src'),
      '@/tests': path.resolve('tests')
    }
  }
})
