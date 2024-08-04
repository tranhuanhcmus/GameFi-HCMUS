import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

const aliases = {
  '/@/': path.resolve(__dirname, 'src') // Replace 'src' with your actual source directory
};
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // This will allow connections from any IP
    port: process.env.PORT || 3000, // Use the PORT environment variable provided by Render, or default to 3000
  },
  plugins: [react()],
  resolve: {
    alias: {
      components: "/src/components",
      layouts: "/src/layouts",
      routes: "/src/routes",
      pages: "/src/pages",
      constants: "/src/constants",
      services: "/src/services",
      redux: "/src/redux",
      apis: "/src/apis",
      utils: "/src/utils",
    },
  }
})
