import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/speedskatetrack-landing/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
  },
}));
