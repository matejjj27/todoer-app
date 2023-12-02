/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  purge: "",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // class, 'media' or boolean
  theme: {
    extend: {
      colors: {
        gray: {
          900: "#202225",
          850: "#121724",
          800: "#2f3136",
          750: "#202A37",
          700: "#36393f",
          650: "#374151",
          600: "#4f545c",
          500: "#969C9C",
          400: "#d4d7dc",
          350: "#F9FAFB",
          300: "#e3e5e8",
          200: "#ebedef",
          100: "#f2f3f5"
        }
      },
      spacing: {
        88: "22rem"
      }
    }
  },
  plugins: []
};
