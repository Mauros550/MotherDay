import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',             // project root
  base: './',            // use relative paths in the built files
  build: {
    outDir: 'dist',      // output folder
    emptyOutDir: true    // clean it on each build
  },
  server: {
    port: 5173,          // dev server port
    open: true           // open browser on start
  }
});
