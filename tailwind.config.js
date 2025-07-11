// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  // Habilita o modo escuro baseado em uma classe no elemento <html>
  darkMode: 'class', 
  
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}