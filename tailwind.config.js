/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/render/srcindex.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // dark
        dark_24: '#24272e',
        dark_29: '#293043',
        // grey
        grey_charcoal_28: '#282b33',
        grey_charcoal_42: '#42464d',
        grey_battleship: '#686b7e',
        grey_brown: '#868686',
        grey_bluey_a7: '#a7a7a8',
        grey_bluey_8c: '#8c96ac',
        grey_bluey_9b: '#9ba2b1',
        pale_grey: '#eaf4ff',
        // white
        white_f5: '#f5f5f5',
        white_ff: '#ffffff',
        // blue
        blue_cerulean: '#0475f4',
        blue_bright: '#006cff',
        azure: '#0093ff',
        //
        squash: '#eb9c19',
        orange_blood: '#ff4e00'
      },
      spacing: {
        13: '3.25rem',
        15: '3.75rem',
        17: '4.25rem',
        28: '7rem',
        30: '7.5rem'
      },
      fontSize: {
        k10: '2.5rem',
        k9: '2.25rem',
        k8: '2rem',
        'k7.5': '1.875rem',
        k6: '1.5rem',
        'k5.5': '1.375rem',
        k5: '1.25rem',
        'k4.5': '1.125rem'
      }
    }
  },
  plugins: []
}
