/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				//'background': '#F5F5F5',
				//'white-text': '#FFFFFF',
				//'black-text': '#000000',
				'white-transparent': '#ffffff61',
				'blue-accent': '#3A86FF',
				'lightblue-accent': '#01cfff',
				'purple-accent': '#8338EC',
				'rose-accent': '#FF006E',
				'orange-accent': '#fb5607',
				'yellow-accent': '#ffbe0b',
			}
		},
		fontFamily: {
			'cards': ["Poppins", "sans-serif"],
		},
	},
	plugins: [],
}
