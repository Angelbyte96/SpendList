// @ts-check
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import db from '@astrojs/db';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',
  output: 'server',
  integrations: [react(), db()],

  vite: {
      plugins: [tailwindcss()],
	},

  adapter: vercel(),
})