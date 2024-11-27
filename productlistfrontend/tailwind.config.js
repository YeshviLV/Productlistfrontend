/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-gray': '#f5f5f5',
        'dark-gray': '#333',
        'primary': '#4CAF50',
        'secondary': '#FFC107',
      },
    },
  },
  plugins: [],
}