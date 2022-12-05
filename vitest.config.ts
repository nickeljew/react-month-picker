/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'happy-dom',
    globals: true,
    outputFile: './coverage/unittest.junit.xml',
    reporters: process.env.CI ? ['default', 'junit'] : 'default',
    setupFiles: ['./test/setup-test-env.ts'],
  },
})
