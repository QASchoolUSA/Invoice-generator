/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          accent: '#4a7c85',
        },
        ink: {
          DEFAULT: '#1f2937',
          soft: '#4b5563',
          muted: '#6b7280',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        paper: '0 10px 40px -12px rgba(15, 23, 42, 0.18), 0 2px 8px -4px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}
