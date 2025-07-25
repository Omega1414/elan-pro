
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
   
    screens: {
      'xxs': '280px', // min-width
      'xs': '360px',
      's': '540px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend:
    {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'anuphan': ['Anuphan', 'sans-serif'],
        'kanit': ['Kanit'],
       
      },
    },
  
  },
 
  plugins: [require("@tailwindcss/forms"), ],
}