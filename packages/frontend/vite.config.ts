import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

const setProxyConfig = () => {
  if (process.env.NODE_ENV !== 'production') {
    return {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    };
  } else {
    return {};
  }
};

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: [path.resolve(__dirname, 'src/vitest.setup.ts')],
  },
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      backend: path.resolve(__dirname, '../backend/src'),
      frontend: path.resolve(__dirname, '../frontend/src'),
    },
  },
  server: setProxyConfig(),
});
