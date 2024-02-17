/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      height: {
        navbar: "70px",
        "navbar-screen": "calc(100vh - 70px)",
      },
      minHeight: {
        navbar: "70px",
        "navbar-screen": "calc(100vh - 70px)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
