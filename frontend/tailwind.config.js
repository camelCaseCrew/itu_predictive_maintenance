/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#181B1F',
        'component1': '#22252B',
        'component2': '#30343D',
        'text': '#DEDEDE',
        'ok': '#37872D',
        'risk': '#FADE2A ',
        'critical': '#C4162A',
      },
    },
  },
  plugins: [],
}