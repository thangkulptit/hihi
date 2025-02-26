import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
  ], // Hỗ trợ Vue và SVG
  base: '/', // Tương đương với `publicPath`
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
      '@': path.resolve(__dirname, 'src')
    }
  },
});
