
module.exports = {
  content: [
    './frontend/src/pages/**/*.{js,jsx,ts,tsx}',
    './frontend/src/components/**/*.{js,jsx,ts,tsx}',
  ],
  prefix: 'tw-',
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')({ strategy: 'class' })
  ],
};