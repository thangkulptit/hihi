import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
  ],
  base: '/',
  build: {
    outDir: 'build', // Tương đương với `outputDir`
  },
  server: {
    port: 8080,
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@styles': path.resolve(__dirname, 'src/assets/styles'),
      "@auth": path.resolve(__dirname, 'src/modules/auth'),
      "@dashboard": path.resolve(__dirname, 'src/modules/dashboard'),
      "@module": path.resolve(__dirname, 'src/modules'),
    }
  },
});
