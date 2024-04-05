/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      screens: {
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
        'xsm': {'max': '639px'},
        'x2xl': {'max': '1440px'},
        'xxl': {'max': '1280px'},
        'x-sm-tab': {'max': '990px'},
        'x-xsm-tab': {'max': '768px'},
      },
    extend: {},
  },
  plugins: [],
}