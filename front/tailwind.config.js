/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 8s ease-in-out infinite',
        'pulse-medium': 'pulse 5s ease-in-out infinite',
      },
    },
    
  },
  plugins: [require('tailwind-scrollbar-hide')],
}