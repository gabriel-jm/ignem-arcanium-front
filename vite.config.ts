import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@/tests': path.resolve('tests'),
      '@': path.resolve('src'),
    }
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    deps: {
      inline: [
        "lithen-super-element"
      ]
    },
    coverage: {
      exclude: ['src/main']
    }
  }
})
