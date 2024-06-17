import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite';
import 'dotenv/config';

export default defineConfig({
  define: {
    plugins: [react()],
  'process.env': {},
},
})

