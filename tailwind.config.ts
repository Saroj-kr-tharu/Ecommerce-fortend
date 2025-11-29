import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#0284c7",
          100: "#cfedfb",
          200: "#9fdbf6",
          300: "#6ec9f2",
          400: "#3eb7ed",
          500: "#0ea5e9",
          600: "#0b84ba",
          700: "#08638c",
          800: "#06425d",
          900: "#03212f"
        },
        secondary: {
          light: '#f43f5e',
          DEFAULT: '#f43f5e',
          dark: '#be123c',
        },
        accent: {
          light: "#0f766e",
          100: "#d0f1ed",
          200: "#a1e3db",
          300: "#72d4ca",
          400: "#43c6b8",
          500: "#14b8a6",
          600: "#109385",
          700: "#0c6e64",
          800: "#084a42",
          900: "#042521",
        },
        background: {
          light: '#f9fafb',
          dark: '#1f2937',
        },
        text: {
          primary: '#111827',
          secondary: '#6b7280',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
