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
        'primary-not-hover': "#0E61F6",
        'secondary-hover': "#F8F8FA",
        'secondary-not-hover': "white",
        'border-color': "#E6E6E9"
      },
      height: {
        'footer-height': "7%",
      }
    },
  },
  plugins: [],
}
