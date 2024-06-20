/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  // 👇 Resolve conflic between Antd and TaildwindCSS
  corePlugins: {
    preflight: true,
  },
  important: '#root',
};
