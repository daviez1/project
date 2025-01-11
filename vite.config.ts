import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
    plugins: [sveltekit()],
    base: '/project/',
    server: {
        fs: {
            allow: [
                'C:/Users/David/Desktop/Programacion/Desarrollo Web/project/assets',
                'C:/Users/DEMO/Desktop/Tesis/Hanoi_web/assets'
            ]
        }
    }
});
