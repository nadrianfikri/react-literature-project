module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // container: {
    //   padding: '3rem',
    // },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: '#161616',
      secondary: '#252525',
      danger: '#AF2E1C',
    }),

    extend: {
      fontFamily: {
        hero: ['"Times New Roman"', 'ui-serif'],
      },
      fontSize: {
        '6xl': '96px',
      },
      width: {
        350: '350px',
        50: '50px',
        500: '500px',
        560: '560px',
        620: '620px',
        1080: '1080px',
      },
      height: {
        50: '50px',
        350: '350px',
        500: '500px',
        560: '560px',
        620: '620px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
