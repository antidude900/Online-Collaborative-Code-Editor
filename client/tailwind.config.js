import daisyui from "./node_modules/daisyui";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			textShadow: {
				cyan50: "0 4px 6px rgba(0, 184, 212, 0.5)", 
			},
		},
	},
	plugins: [daisyui],
	daisyui: {
		themes: ["light", "dark", "dracula"],
	},
};
