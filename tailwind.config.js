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
        'border-color': "#E6E6E9",
        // 'side-bar-option-hover-bg' : "rgb(16, 36, 71)",
        'side-bar-option-hover-bg' : "#EEEFF1",
        'side-bar-option-hover-text' : "black",
        'hover-blue': 'blue',
      },
      height: {
        'footer-height': "7%",
      }
    },
  },
  plugins: [],
}
