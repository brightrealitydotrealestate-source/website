/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAFAF5',
        peach: '#F9D8A5',
        gold: {
          light: '#E5C47A',
          DEFAULT: '#D9B104',
          dark: '#B09257',
          dust: '#C09A62',
          deep: '#3E2F0D',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Montserrat"', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
