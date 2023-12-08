/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
    extend: {
      width: {
        log: "646px",
        mission: "407px",
        itemImage: "29px",
      },
      height: {
        panel: "631px",
        itemImage: "29px",
        tabHeader: "200px",
        fullScreen: "100vh",
      },
      fontFamily: {
        primary: ["Comfortaa"],
      },
      colors: {
        transparent: "transparent",
        darkpurple: "#0F0720",
        purple: "#1A102F",
        primary: "#F4EBFF",
        border: "#F4EBFF80",
      },
      background: {
        gray: "#EBF1FB",
      },
    },
  },
  plugins: [],
};
