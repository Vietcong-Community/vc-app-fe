import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import pluginChecker from 'vite-plugin-checker';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl(), viteTsconfigPaths(), pluginChecker({ typescript: true })],
  server: {
    open: true,
    // this sets a default port to 3000
    port: 3000,
  },
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    process: {
      env: {
        NODE_DEBUG: false,
      },
    },
  },
});
