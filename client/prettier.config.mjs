/** @type {import("prettier").Config} */
export default {
	printWidth: 100,
	useTabs: true,
	// Tabulación con 2 espacios
	tabWidth: 2,
	// Punto y coma al final de cada línea
	semi: false,
	// Comillas simples en lugar de dobles
	singleQuote: true,
	plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
	overrides: [
		{
			files: ["**/*.astro"],
			options: {
				parser: "astro",
			},
		},
	],
}