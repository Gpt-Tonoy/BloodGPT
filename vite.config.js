import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/bio-gen-lab/', // GitHub Pages এর জন্য পাথ সেট করা হলো
})
