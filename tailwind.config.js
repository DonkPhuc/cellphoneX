/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/vue-tailwind-datepicker/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: '#1ab394',
        'vtd-primary': colors.green,
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@headlessui/tailwindcss')],
};
