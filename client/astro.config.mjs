// @ts-check
import react from '@astrojs/react'
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite';

import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), db()],

  vite: {
    plugins: [tailwindcss()]
  }
})