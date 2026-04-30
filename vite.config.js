import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'OgdenUIComponents',
      fileName: (format) => `ogden-ui-components.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-router-dom',
        'lucide-react',
        'zustand',
        'zustand/middleware',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'react-router-dom': 'ReactRouterDOM',
          'lucide-react': 'LucideReact',
          zustand: 'zustand',
          'zustand/middleware': 'zustandMiddleware',
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || assetInfo.names?.[0] || 'asset';
          if (name.endsWith('.css')) return 'ogden-ui-components.css';
          return name;
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
