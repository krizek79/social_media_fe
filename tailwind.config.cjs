/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
        extend: {
            colors: {
                superDarkBlue: '#0F044C',
                darkBlue: '#141E61',
                customWhite: '#F6F6F6',
            },
        },
    },
  },
  plugins: [],
}
