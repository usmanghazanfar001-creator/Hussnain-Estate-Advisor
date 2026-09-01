/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#101a33",
          50: "#f2f4f8",
          100: "#e3e7f0",
          400: "#3c4a72",
          600: "#1b2b52",
          700: "#152142",
          800: "#101a33",
          900: "#0a1224",
          950: "#060b16",
        },
        gold: {
          DEFAULT: "#bd9448",
          50: "#faf6ec",
          100: "#f1e6c9",
          300: "#d9bd7d",
          400: "#cba75f",
          500: "#bd9448",
          600: "#a17a37",
          700: "#7e5f2c",
        },
        sand: {
          DEFAULT: "#f4f1e8",
          50: "#fbfaf6",
          100: "#f4f1e8",
          200: "#eae4d3",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', "serif"],
        body: ['"Manrope"', "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.22em",
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(16,26,51,0.35)",
      },
    },
  },
  plugins: [],
};
