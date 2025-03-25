/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary color palette
        'paradox-purple': {
          DEFAULT: '#8A2BE2', // Medium purple
          '50': '#F3E8FF',
          '100': '#E9D5FF',
          '200': '#D8B4FE',
          '300': '#C084FC',
          '400': '#A855F7',
          '500': '#9333EA',
          '600': '#7E22CE',
          '700': '#6B21A8',
          '800': '#581C87',
          '900': '#4C1D95',
          '950': '#3B0764',
        },
        'paradox-indigo': {
          DEFAULT: '#4B0082', // Indigo
          '50': '#EEF2FF',
          '100': '#E0E7FF',
          '200': '#C7D2FE',
          '300': '#A5B4FC',
          '400': '#818CF8',
          '500': '#6366F1',
          '600': '#4F46E5',
          '700': '#4338CA',
          '800': '#3730A3',
          '900': '#312E81',
          '950': '#1E1B4B',
        },
        // Additional theme colors
        'truth': {
          DEFAULT: '#00A3FF', // Blue representing truth
          'dark': '#0077B6',
        },
        'lie': {
          DEFAULT: '#FF3D00', // Red-orange representing lies
          'dark': '#C30000',
        },
        'paradox': {
          DEFAULT: '#9D00FF', // Vibrant purple for paradoxes
          'dark': '#6A00A3',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'space-pattern': "url('/images/space-background.jpg')",
      },
      boxShadow: {
        'glow-sm': '0 0 5px rgba(138, 43, 226, 0.5)',
        'glow': '0 0 15px rgba(138, 43, 226, 0.7)',
        'glow-lg': '0 0 25px rgba(138, 43, 226, 0.9)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
        display: ['Orbitron', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'floating 3s ease-in-out infinite',
        'glow': 'pulse-glow 2s infinite',
      },
      borderRadius: {
        'paradox': '0.625rem', // 10px
      },
      backdropBlur: {
        'xs': '2px',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.purple.400'),
              '&:hover': {
                color: theme('colors.purple.300'),
              },
            },
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
            },
            h3: {
              color: theme('colors.white'),
            },
            h4: {
              color: theme('colors.white'),
            },
            strong: {
              color: theme('colors.white'),
            },
            code: {
              color: theme('colors.gray.300'),
              backgroundColor: theme('colors.gray.800'),
              borderRadius: theme('borderRadius.md'),
              paddingLeft: theme('spacing.1'),
              paddingRight: theme('spacing.1'),
              paddingTop: theme('spacing.0.5'),
              paddingBottom: theme('spacing.0.5'),
            },
            blockquote: {
              color: theme('colors.gray.300'),
              borderLeftColor: theme('colors.purple.600'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}; 