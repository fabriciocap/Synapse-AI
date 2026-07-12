/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#14111d",
        foreground: "#f6f4fa",
        primary: {
          DEFAULT: "#7c3aed",
          foreground: "#ffffff",
        },
        border: "rgba(167,139,250,0.28)",
      },
    },
  },
  plugins: [],
};


