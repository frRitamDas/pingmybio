/** @type {import('tailwindcss').Config} */
// Design tokens from the PingMyBio design system (neutral light theme).
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        'surface-muted': '#F8F8F8',
        ink: '#0B0B0B',
        secondary: '#585858',
        muted: '#7D7D7D',
        border: '#E9E9E9',
        'border-subtle': '#F3F3F3',
        'border-strong': '#C4C4C4',
        accent: '#353535',
        'accent-strong': '#1F1F1F',
        success: '#007530',
        warning: '#A86C00',
        danger: '#CD1526',
      },
      fontFamily: {
        display: ['Geist', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        control: '1.125rem',
        panel: '1.625rem',
        surface: '2.125rem',
      },
      boxShadow: {
        resting: '0 1px 2px #00000009',
        raised: '0 6px 18px #0001, 0 1px 3px #00000009',
        floating: '0 20px 48px #0000001b, 0 3px 10px #0000000b',
      },
      transitionTimingFunction: {
        enter: 'cubic-bezier(.16,1,.3,1)',
        standard: 'cubic-bezier(.22,1,.36,1)',
      },
      letterSpacing: {
        display: '-0.03em',
        body: '-0.01em',
      },
      maxWidth: {
        '7xl': '80rem',
      },
    },
  },
  plugins: [],
};
