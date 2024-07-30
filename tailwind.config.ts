import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 5s linear infinite',
        'spin-fast': 'spin 0.5s linear infinite',
      },
      colors: {
        'dark-primary': '#001857',
        'light-primary': '#ffffff'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide')
  ],
  variants: {
    scrollbar: ['rounded']
  }
};
export default config;
