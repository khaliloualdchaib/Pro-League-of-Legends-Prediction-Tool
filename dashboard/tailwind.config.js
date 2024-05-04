/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'node_modules/flowbite/lib/esm/**/*.js',
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}