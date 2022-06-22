/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./pages/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Lato', 'sans-serif'] 
      },
      colors: {
        'primary-hover': '#1858CE',
        'primary-not-hover': "0E61F6"
      }
    },
  },
  plugins: [],
}
