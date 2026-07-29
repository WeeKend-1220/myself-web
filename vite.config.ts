import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
  base: './', // 👈 把这里的 '/myself-web/' 改成 './' 或者是 '/'
 })