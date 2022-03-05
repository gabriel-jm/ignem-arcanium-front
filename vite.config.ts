import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@/': path.resolve('src'),
      '@/tests/': path.resolve('tests')
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    root: './'
  }
})
