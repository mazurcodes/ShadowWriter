/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    theme: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        background: "#2E2F38",
        input: "#393A42",
        buttonBg: "#393A42",
        buttonBorder: "#696B76",
        text: "#D7D7D7",
        placeholder: "#696B76",
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /(bg|text|border)-(transparent|current|background|input|buttonBg|buttonBorder|text|placeholder)/,
    },
  ],
};
