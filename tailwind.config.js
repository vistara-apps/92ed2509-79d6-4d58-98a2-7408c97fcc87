/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(225 10% 98%)',
        accent: 'hsl(170 70% 45%)',
        border: 'hsl(220 15% 90%)',
        danger: 'hsl(0 80% 50%)',
        primary: 'hsl(220 80% 50%)',
        success: 'hsl(130 60% 50%)',
        surface: 'hsl(0 0% 100%)',
        warning: 'hsl(33 90% 50%)',
        'text-primary': 'hsl(220 15% 25%)',
        'text-secondary': 'hsl(220 15% 45%)',
        // Dark theme colors for crypto dashboard
        'dark-bg': 'hsl(220 15% 8%)',
        'dark-surface': 'hsl(220 15% 12%)',
        'dark-border': 'hsl(220 15% 20%)',
        'crypto-teal': 'hsl(170 70% 45%)',
        'crypto-green': 'hsl(130 60% 50%)',
        'crypto-orange': 'hsl(33 90% 50%)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
        'xl': '24px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'xl': '32px',
      },
      boxShadow: {
        'card': '0 2px 8px hsla(0, 0%, 0%, 0.1)',
        'modal': '0 12px 28px hsla(0,0%,0%,0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 0.25s cubic-bezier(0.22,1,0.36,1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
