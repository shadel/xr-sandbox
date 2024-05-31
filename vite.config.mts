import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';


export default defineConfig({
  root: './examples-xr',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  server: {
    open: true,
  },
  plugins: [
    eslintPlugin({
      cache: false,
      include: ['src/**/*.ts', 'examples/**/*.ts'],
      fix: true
    }),
  ],
});