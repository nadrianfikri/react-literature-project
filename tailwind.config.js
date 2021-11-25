module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      padding: '3rem',
    },

    extend: {
      fontFamily: {
        hero: ['"Times New Roman"', 'ui-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
