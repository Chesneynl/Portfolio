import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        exclude: ['node_modules', 'public/models', 'public/libs'],
    },
    plugins: [react()],
});
