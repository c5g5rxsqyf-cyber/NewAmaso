/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  corePlugins: {
    // Keep existing site styling stable (this project uses custom/global styles already).
    preflight: false,
  },
  plugins: [],
};

