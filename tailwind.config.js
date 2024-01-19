/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'purple': 'rgb(var(--color-purple) / <alpha-value>)',
        'navy': '#313E51',
        'dark-navy': '#3C4D66',
        'grey-navy': '#626C7F',
        'light-bluish': '#ABC1E1',
        'light-grey': '#F4F6FA',
        'pure-white': 'rgb(var(--color-pure-white) / <alpha-value>)',
        'green': '#26D782',
        'red': '#EE5454',
      },
      borderWidth: {
        '3': '3px'
      },
      padding: {
        '4.5': '18px'
      },
      fontFamily: {
        'rubik': ["Rubik", "sans-serif"]
      },
      fontSize: {
        '2.5xl': '28px',
        '4.5xl': '40px',
      },
      animation: {
        'scale': 'scalePulse .3s ease-in-out'
      },
      keyframes: {
        scalePulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(.95)' },
        }
      },
      lineHeight: {
        'full': '100%',
      },
      backgroundImage: {
        'pattern-desktop-light': "url('/src/assets/images/pattern-background-desktop-light.svg')",
        'pattern-desktop-dark': "url('/src/assets/images/pattern-background-desktop-dark.svg')",
        'pattern-tablet-light': "url('/src/assets/images/pattern-background-tablet-light.svg')",
        'pattern-tablet-dark': "url('/src/assets/images/pattern-background-tablet-dark.svg')",
        'pattern-mobile-light': "url('/src/assets/images/pattern-background-mobile-light.svg')",
        'pattern-mobile-dark': "url('/src/assets/images/pattern-background-mobile-dark.svg')",
      }
    },
  },
  darkMode: 'class',
  plugins: [],
};
