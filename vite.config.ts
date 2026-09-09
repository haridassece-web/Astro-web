import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'html2canvas-color-guard',
      transform(code, id) {
        if (id.includes('html2canvas')) {
          return code.replace(
            /throw new Error\((['"])Attempting to parse an unsupported color function [^)]+\);?/g,
            'return 0x00000000;'
          );
        }
      }
    }
  ],
})
