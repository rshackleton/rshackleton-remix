/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    fontSize: false,
  },
  theme: {
    fluidType: {
      settings: {
        fontSizeMin: toRem(16),
        fontSizeMax: toRem(18),
        ratioMin: 1.125,
        ratioMax: 1.25,
        screenMin: toRem(375),
        screenMax: toRem(1600),
        unit: 'rem',
        prefix: '',
      },
    },
  },
  plugins: [require('tailwindcss-fluid-type')],
};

function toRem(pixelValue) {
  return pixelValue / 16;
}
