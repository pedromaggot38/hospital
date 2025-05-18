import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        secondary: '#9333EA',
        accent: '#10B981',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  darkMode: 'class', // ou 'media' se preferir seguir o sistema
  plugins: [],
};
export default config;
