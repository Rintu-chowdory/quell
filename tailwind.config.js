/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chat-bg': '#0d1117',
        'chat-dark': '#161b22',
        'chat-darker': '#0d1117',
        'emerald': '#10b981',
      }
    },
  },
  plugins: [],
}
