import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: './', // 👈 修改这里！把原先的 '/myself-web/' 改成 './'
})