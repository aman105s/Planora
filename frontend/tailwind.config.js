/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wedding-gold': '#D4AF37',
        'wedding-blush': '#FCE7F3', // tailwind pink-100/rose-100
        'wedding-cream': '#FEFDFB',
        'wedding-gray': '#4B5563',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
