import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        h1: '3.2rem',
        h2: '2.8rem',
        h3: '2.4rem',
        st1: '2rem',
        st2: '1.8rem',
        p1: '1.6rem',
        p2: '1.4rem',
        c1: '1.2rem',
        c2: '1rem',
      },
      fontWeight: {
        bold: 'var(--bold)',
        medium: 'var(--medium)',
        light: 'var(--light)',
      },
      lineHeight: {
        h1: '4.8rem',
        h2: '4.2rem',
        h3: '3.6rem',
        st: '2.6rem',
        p1: '2.6rem',
        p2: '2.4rem',
        c1: '1.8rem',
        c2: '1.4rem',
      },
    },
    colors: {
      /* --- red --- */
      red500: 'var(--red500)',
      red400: 'var(--red400)',
      red300: 'var(--red300)',
      red200: 'var(--red200)',
      red100: 'var(--red100)',
      red50: 'var(--red50)',

      /* --- primary --- */
      primary800: 'var(--primary800)',
      primary700: 'var(--primary700)',
      primary600: 'var(--primary600)',
      primary500: 'var(--primary500)',
      primary400: 'var(--primary400)',
      primary300: 'var(--primary300)',
      primary200: 'var(--primary200)',
      primary100: 'var(--primary100)',
      primary50: 'var(--primary50)',

      /* --- secondary --- */
      secondary800: 'var(--secondary800)',
      secondary700: 'var(--secondary700)',
      secondary600: 'var(--secondary600)',
      secondary500: 'var(--secondary500)',
      secondary400: 'var(--secondary400)',
      secondary300: 'var(--secondary300)',
      secondary200: 'var(--secondary200)',
      secondary100: 'var(--secondary100)',
      secondary50: 'var(--secondary50)',

      /* --- gray --- */
      gray800: 'var(--gray800)',
      gray700: 'var(--gray700)',
      gray600: 'var(--gray600)',
      gray500: 'var(--gray500)',
      gray400: 'var(--gray400)',
      gray300: 'var(--gray300)',
      gray200: 'var(--gray200)',
      gray100: 'var(--gray100)',
      gray50: 'var(--gray50)',

      primary1: 'var(--primary-1)',
      primary2: 'var(--primary-2)',
      primary3: 'var(--primary-3)',
      primary4: 'var(--primary-4)',
      primary5: 'var(--primary-5)',
      point1: 'var(--point-1)',
      point2: 'var(--point-2)',
      point3: 'var(--point-3)',
      gray1: 'var(--gray-1)',
      gray2: 'var(--gray-2)',
      gray3: 'var(--gray-3)',
      gray4: 'var(--gray-4)',
      gray5: 'var(--gray-5)',
      kakaoYellow: '#FEE500',
      black: '#000000',
      white: '#FFFFFF',
      red: '#FF9999',
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
  darkMode: 'class',
};
export default config;
