import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
    plugins: [sveltekit()],
    server: {
        fs: {
            allow: [
                'C:/Users/David/Desktop/Programacion/Desarrollo Web/project/assets'
            ]
        }
    }
});
