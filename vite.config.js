import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@css': resolve(__dirname, 'src/assets/css'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@models': resolve(__dirname, 'src/models'),
      '@services': resolve(__dirname, 'src/services'),
      '@store': resolve(__dirname, 'src/store'),
      '@constants': resolve(__dirname, 'src/constants'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@layouts': resolve(__dirname, 'src/layouts'),
      '@managers': resolve(__dirname, 'src/managers'),
      '@assets': resolve(__dirname, 'src/assets'),
    },
  },
})
