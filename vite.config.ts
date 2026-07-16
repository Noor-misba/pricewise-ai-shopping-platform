import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/pricewise-ai-shopping-platform/',

  plugins: [react()],

  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
