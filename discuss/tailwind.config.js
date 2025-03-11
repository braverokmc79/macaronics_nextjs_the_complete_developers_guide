// tailwind.config.js
import { defaultLayout } from "@heroui/theme";


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/(button|ripple|spinner).js",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {defaultLayout},
  },
  darkMode: "class",
  plugins: [heroui()],
};