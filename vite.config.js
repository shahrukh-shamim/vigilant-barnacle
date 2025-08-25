import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Base path configuration for different environments
  const getBasePath = () => {
    // if (mode === 'development') {
    //   return '/' // Development uses root path
    // }
    return '/static/' // Production/staging uses /static/ path
  }

  return {
    plugins: [react()],
    base: getBasePath(),
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: mode === 'development', // Only generate sourcemaps in development
      // Ensure consistent asset naming
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js'
        }
      }
    },
    // Configure for different environments
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    },
    // Development server configuration
    server: {
      port: 5173,
      open: true,
      cors: true
    },
    // Preview server configuration (for testing builds)
    preview: {
      port: 4173,
      open: true
    }
  }
})
