import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  root: './examples',
  build: {
    outDir: '../dist',
  },
  server: {
    open: true,
  },
  plugins: [
    eslintPlugin({
      cache: false,
      include: ['src/**/*.ts', 'examples/**/*.ts'],
    }),
  ],
});