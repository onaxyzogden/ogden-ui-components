import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    // Per-chunk CSS so the maqasid-surface CSS and the BBOS-surface CSS
    // emit as separate files (`ogden-ui-components.css` and
    // `ogden-ui-components-bbos.css`). Default in lib mode is false; we
    // explicitly enable it for the multi-entry layout below.
    cssCodeSplit: true,
    lib: {
      // Multi-entry library mode: one barrel for the maqasid surface (the
      // v0.1.0 components) and one for the BBOS surface (added in v0.2.0).
      // Consumers reach the BBOS bundle via `@ogden/ui-components/bbos`.
      entry: {
        index: resolve(__dirname, 'src/index.js'),
        bbos: resolve(__dirname, 'src/bbos.js'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format}.js`,
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
        // Stable, predictable CSS asset names per entry. Vite emits one CSS
        // chunk per entry (because cssCodeSplit is true above) — we route them
        // to friendly filenames so the package.json `exports` field can pin
        // them.
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || assetInfo.names?.[0] || 'asset';
          if (name.endsWith('.css')) {
            // The bbos entry's CSS chunk gets emitted with a name containing
            // 'bbos' (either the entry key itself or a hashed chunkName);
            // the main chunk's CSS comes through as `index.css` or `style.css`.
            const lower = name.toLowerCase();
            if (lower.includes('bbos')) return 'ogden-ui-components-bbos.css';
            return 'ogden-ui-components.css';
          }
          return name;
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
