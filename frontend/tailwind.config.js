/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
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
        'ok': '#3A7924',
        'risk': '#BB5E1B',
        'critical': '#971020',
      },
    },
  },
  plugins: [],
}