import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, 'public'),
  resolve: {
    alias: [
      {
        find: /^@ov\/ui-components\/(.*)/,
        replacement: `${resolve(__dirname, '../../packages/ui-components/src')}/$1`,
      },
    ],
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        solutions: resolve(__dirname, 'src/solutions.html'),
        services: resolve(__dirname, 'src/services.html'),
      },
    },
  },
});
