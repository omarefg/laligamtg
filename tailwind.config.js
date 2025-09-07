/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mtg: {
          dark: '#0f0f0f',
          gray: '#1a1a1a', 
          card: '#2a2a2a',
          border: '#404040',
          gold: '#d4af37',
          blue: '#0e68ab',
          white: '#fffbd5',
          black: '#150b00',
          red: '#d3202a',
          green: '#00733e',
        }
      },
    },
  },
  plugins: [],
}
