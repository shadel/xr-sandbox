import { defineConfig, normalizePath } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'

console.log(normalizePath(path.resolve(__dirname, './SystemAnimatorOnline') + "/*.*"))

const copyPlugin = viteStaticCopy({
  targets: [
    {
      src: normalizePath(path.resolve(__dirname, './SystemAnimatorOnline') + "/*.*"), // 1️⃣
      dest: './SystemAnimatorOnline', // 2️⃣
    },
    {
      src: normalizePath(path.resolve(__dirname, './SystemAnimatorOnline') + "/**/*.*"), // 1️⃣
      dest: './SystemAnimatorOnline', // 2️⃣
    },
  ],
})

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
    }),
  ],
});