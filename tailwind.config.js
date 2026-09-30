/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb', // navy / professional blue
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        surface: '#f8fafc', // Very light blue/gray backgrounds
        status: {
          success: '#10b981', // green
          pending: '#f59e0b', // orange
          error: '#ef4444', // red
          info: '#3b82f6', // blue
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
