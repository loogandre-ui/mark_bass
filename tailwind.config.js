/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8B5CF6",
        accent: "#22D3EE",
        surface: "#0B0F1A",
        panel: "#111827",
        muted: "#94A3B8",
        line: "#1F2937",
      },
      fontFamily: {
        heading: ['"Roboto Condensed"', "sans-serif"],
        body: ['"Roboto Condensed"', "sans-serif"],
      },
    },
  },
  plugins: [],
}