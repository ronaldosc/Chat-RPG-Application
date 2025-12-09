import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// Better-practice Vite config with minimal maintenance in mind:
// - Loads env vars automatically for different modes
// - Centralizes dev server settings via env variables (VITE_PORT, VITE_OPEN)
// - Enables sensible build defaults (sourcemaps in non-production, target)
// - Keeps tsconfig path aliasing via vite-tsconfig-paths
export default defineConfig(({ mode }) => {
  // loadEnv returns plain strings; use prefix '' to include all VITE_* vars
  const env = loadEnv(mode, process.cwd(), '');

  const port = Number(env.VITE_PORT) || 5173;
  const open = env.VITE_OPEN === 'true' || false;
  const isProduction = mode === 'production';

  return {
    plugins: [
      react({
        // let React plugin pick the best defaults; explicit options can be added if required
        jsxRuntime: 'automatic',
      }),
      tsconfigPaths(),
    ],

    // Development server config driven by environment for low maintenance
    server: {
      port,
      strictPort: true,
      open,
      // You can add proxy settings here by reading env.VITE_API_PROXY etc.
    },

    // Build options tuned for predictable output and easy debugging in non-prod
    build: {
      outDir: 'dist',
      sourcemap: !isProduction,
      target: 'es2018',
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        // simple vendor chunking to improve caching for deps
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },

    // Optimize dependency pre-bundling; adjust if you add heavy deps that need esbuild options
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2018',
      },
    },

    // Expose a small, stable define for the app environment if desired.
    // Prefer import.meta.env.VITE_* in application code; this is optional.
    define: {
      __APP_MODE__: JSON.stringify(mode),
    },

    // Keep CSS preprocessor config here if you're using SASS/LESS/styled system.
    // Example (disabled by default): to enable, uncomment and create the referenced file.
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: `@use "src/styles/_variables.scss" as *;`,
    //     },
    //   },
    // },

    // tsconfigPaths handles aliases from tsconfig.json — nothing to maintain here.
  };
});
