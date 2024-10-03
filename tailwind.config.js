/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "var(--main)",
        orange: "var(--orange)",
        lightOrange: "var(--light-orange)",
        lighterOrange: "var(--lighter-orange)",
        darkOrange: "var(--dark-orange)",
        blue: "var(--blue)",
        grey: "var(--grey)",
        white: "var(--white)",
        black: "var(--black)",
        grey10: "var(--grey-10)",
        grey20: "var(--grey-20)",
        grey40: "var(--grey-40)",
        grey60: "var(--grey-60)",
        grey80: "var(--grey-80)",
        greyHighlight: "var(--grey-highlight)",
        lightBlue: "var(--light-blue)",
        darkContrast: "var(--dark-contrast)",
        mediumDarkContrast: "var(--medium-dark-contrast)",
        lightDarkContrast: "var(--light-dark-contrast)",
        coreDarkContrast: "var(--core-dark-contrast)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
    },
    gridTemplateColumns: {
      2: "repeat(2, minmax(0, 1fr))",
      12: "repeat(12, minmax(0, 1fr))",
      24: "repeat(24, minmax(0, 1fr))",
    },
  },
  plugins: [],
  darkMode: "selector",
};
