/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '3px 3px 50px 10px rgba(0, 0, 0, 0.25)',
      },
      colors: {
        primary: '#53C0FF',
        secondary:'#7F7F7F'
      }
    },
  },
  plugins: [],
};
