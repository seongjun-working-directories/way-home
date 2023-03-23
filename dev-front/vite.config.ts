import path from 'path';
import dns from 'dns';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/server-options.html#server-host
dns.setDefaultResultOrder('verbatim');
// npm run dev -- --host

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    resolve: {
      alias: [
        // @ Import 할 때 사용하기
        {
          find: '@',
          replacement: path.resolve(__dirname, './src'),
        },
      ],
    },
    plugins: [vue()],
    // VIte API Proxy : https://vitejs.dev/config/server-options.html#server-proxy
    server: {
      proxy: {
        // with options
        '/api': {
          target: 'http://172.30.1.22:5135',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        // Proxying websockets or socket.io
        '/socket.io': {
          target: 'ws://172.30.1.22:5173',
          ws: true,
        },
      },
    },
  };
});
