// @ts-check
import react from '@astrojs/react'
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

import db from '@astrojs/db'

import vercel from '@astrojs/vercel'
import clerk from '@clerk/astro'

// https://astro.build/config
export default defineConfig({
	output: 'server',
	integrations: [react(), db(), clerk()],

	vite: {
		plugins: [tailwindcss()],
	},

	adapter: vercel(),
})
