module.exports = {
  content: ["./public/**/*.{html,js,ejs}", "./views/**/*.{html,js,ejs}"],
  theme: {
    extend: {
      height: {
        'vh90': '90vh',
        'vh10': '10vh'
      },
      letterSpacing: {
        widestest: '.25em',
        widerest: '.75em'
      }
    }
  },
  plugins: [],
}
