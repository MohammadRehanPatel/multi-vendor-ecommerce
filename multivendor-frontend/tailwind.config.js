/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // "primary-color": "#009688",
        // "primary-color": "#333333",
        // "primary-color": "#546E7A",
        "primary-color": "#37474F",
        "secondary-color": "#FAE3D9",
        "tertiary-color": "#FF6F61",
      },
    },
  },
  plugins: [],
};
