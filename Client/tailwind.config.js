/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter"],
        rexlia: ["rexlia"],
      },
      colors: {
        color_up_trend: "#012500",
        color_down_trend: "#420E0E",
        color_card_trend: "rgba(255, 255, 255, 0.12)",
        white_trend: "rgba(255, 255, 255, 1)",
        color_button_filter: "#282828",
        color_app: "#210035",
      },
    },
  },
  plugins: [],
};
