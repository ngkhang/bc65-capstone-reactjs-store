/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
  // 👇 Resolve conflic between Antd and TaildwindCSS
  corePlugins: {
    preflight: false,
  },
  important: '#root',
};
