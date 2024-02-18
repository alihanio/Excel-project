/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  important: "#root",
  darkMode: false,
  theme: {
    extend: {
      screens: {
        s: "370px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1536px",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    base: true,
    utils: true,
    logs: true,
    rtl: true,
    prefix: "",
    darkTheme: false,
  },
};
