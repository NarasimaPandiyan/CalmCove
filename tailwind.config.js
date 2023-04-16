/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily:{
        'Rowan': ['Rowan', 'serif'],
        'Quilon': ['Quilon', 'sans-serif'],
        'Stardom': ['Stardom', 'sans-serif']
      }
    },

  },
  plugins: [require('@tailwindcss/aspect-ratio')
            ,require('@tailwindcss/forms')
            ,require('@tailwindcss/line-clamp')
            ,require('@tailwindcss/typography')
           ],
};
