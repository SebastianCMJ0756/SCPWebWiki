/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        scp: {
          red: '#dc2626',
          dark: '#0a0a0a',
          card: '#121212',
          accent: '#22c55e',
        }
      }
    },
  },
  plugins: [],
}