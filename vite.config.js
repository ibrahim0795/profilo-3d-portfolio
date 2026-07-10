import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist/client',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) {
            return 'react-vendor';
          }

          if (
            id.includes('node_modules/three') ||
            id.includes('node_modules/@react-three') ||
            id.includes('node_modules/maath') ||
            id.includes('node_modules/troika')
          ) {
            return 'three-vendor';
          }

          if (id.includes('node_modules/gsap')) {
            return 'motion-vendor';
          }

          return undefined;
        },
      },
    },
  },
});
