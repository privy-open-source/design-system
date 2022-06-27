const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  theme   : {
    fontFamily: { sans: ['DM Sans', ...defaultTheme.fontFamily.sans] },
    fontSize  : {
      'xxs': [
        '0.6875rem',
        {
          lineHeight   : '1.36',
          letterSpacing: '0.025rem',
        },
      ],
      'xs': [
        '0.75rem',
        {
          lineHeight   : '1.33',
          letterSpacing: '0.025rem',
        },
      ],
      'sm': [
        '0.875rem',
        {
          lineHeight   : '1.4',
          letterSpacing: '0.015625rem',
        },
      ],
      'base': [
        '1rem',
        {
          lineHeight   : '1.375',
          letterSpacing: '0.03125rem',
        },
      ],
      'xl': [
        '1.25rem',
        {
          lineHeight   : '1.3',
          letterSpacing: '0.01375rem',
        },
      ],
      '2xl': [
        '1.5rem',
        {
          lineHeight   : '1.3',
          letterSpacing: '0.009375rem',
        },
      ],
      '4xl': ['2.25rem', '1.3'],
      '5xl': [
        '3rem',
        {
          lineHeight   : '1.3',
          letterSpacing: '-0.009375rem', // -0.15px
        },
      ],
      '6xl': [
        '3.75rem',
        {
          lineHeight   : '1.3',
          letterSpacing: '-0.01375rem', // -0.22px
        },
      ],
      '7xl': [
        '4.5rem',
        {
          lineHeight   : '1.3',
          letterSpacing: '-0.01875rem', // -0.3px
        },
      ],
    },
    colors: {
      primary: {
        5      : '#F2F7FD',
        25     : '#BFD9F3',
        50     : '#80B2E8',
        75     : '#408BDD',
        100    : '#0065D1',
        focused: '#004C9D',
        hovered: '#0056B2',
      },
      secondary: {
        5      : '#F8F8F8',
        25     : '#DCDCDC',
        50     : '#B9B9B9',
        75     : '#969696',
        100    : '#737373',
        focused: '#565656',
        hovered: '#626262',
      },
      success: {
        5      : '#F4FBF6',
        25     : '#C8ECD0',
        50     : '#91D8A0',
        75     : '#5AC571',
        100    : '#23B242',
        focused: '#1A8531',
        hovered: '#1E9738',
      },
      info: {
        5      : '#F2FBFC',
        25     : '#C0EBF1',
        50     : '#80D7E2',
        75     : '#41C2D4',
        100    : '#02AEC5',
        focused: '#018294',
        hovered: '#0294A7',
      },
      warning: {
        5      : '#FFFBF4',
        25     : '#FDE9C8',
        50     : '#FAD391',
        75     : '#F8BC5A',
        100    : '#F5A623',
        focused: '#B87C1A',
        hovered: '#D08D1E',
      },
      danger: {
        5      : '#FEF5F4',
        25     : '#F8CBCA',
        50     : '#F29695',
        75     : '#EB6261',
        100    : '#E42E2C',
        focused: '#AB2221',
        hovered: '#C22725',
      },
      gold: {
        5      : '#FBFAF2',
        25     : '#EDE6BF',
        50     : '#DBCC80',
        75     : '#C9B340',
        100    : '#B79A00',
        focused: '#897400',
        hovered: '#9C8300',
      },
      yellow: {
        5  : '#FEFDF4',
        25 : '#FBF5CA',
        50 : '#F7EA95',
        75 : '#F3E061',
        100: '#EFD52C',
      },
      lime: {
        5  : '#FAFEF5',
        25 : '#E8F9CD',
        50 : '#D1F39A',
        75 : '#BAEC68',
        100: '#A3E635',
      },
      teal: {
        5  : '#F3FBFA',
        25 : '#C4EDE6',
        50 : '#88DBCE',
        75 : '#4DCAB5',
        100: '#12B89C',
      },
      purple: {
        5  : '#F7F2FD',
        25 : '#D7BFF3',
        50 : '#AE80E8',
        75 : '#8640DD',
        100: '#5E00D1',
      },
      background: {
        25 : '#FDFDFD',
        50 : '#FAFAFA',
        75 : '#F8F8F8',
        100: '#F5F5F5',
      },
      body: {
        25 : '#C8C8C8',
        50 : '#919191',
        75 : '#5A5A5A',
        100: '#232323',
      },
      subtext: {
        25 : '#E8E8E8',
        50 : '#D1D1D1',
        75 : '#BABABA',
        100: '#A3A3A3',
      },
      overlay: {
        primary  : 'rgba(0, 0, 0, 0.2)',
        secondary: 'rgba(0, 0, 0, 0.1)',
      },
      black      : '#000000',
      dark       : '#404040',
      grey       : '#808080',
      light      : '#BFBFBF',
      white      : '#FFFFFF',
      transparent: 'transparent',
    },
    borderRadius: {
      'none'   : '0rem',
      'tn'     : '0.25rem',
      'xs'     : '0.375rem',
      'sm'     : '0.438rem',
      'DEFAULT': '0.5rem',
      'md'     : '0.75rem',
      'lg'     : '0.875rem',
      'xl'     : '1rem',
      '2xl'    : '1.25rem',
      '3xl'    : '1.375rem',
      'full'   : '9999px',
    },
    boxShadow: {
      'sm'     : '0 1px 2px rgba(0, 0, 0, 0.05)',
      'DEFAULT': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
      'md'     : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      'lg'     : '0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)',
      'xl'     : '0 0 1px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      '2xl'    : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      'inner'  : 'inset 2px 0 4px rgba(0, 0, 0, 0.06), inset 0 4px 6px -1px rgba(0, 0, 0, 0.06)',
      'none'   : 'none',
    },
    extend: {
      keyframes: {
        bounceIn: {
          'from, 20%, 40%, 60%, 80%, to': { 'animation-timing-function': 'cubic-bezier(0.215, 0.61, 0.355, 1)' },
          '0%'                          : { opacity: '0', transform: 'scale3d(0.3, 0.3, 0.3)' },
          '20%'                         : { transform: 'scale3d(1.1, 1.1, 1.1)' },
          '40%'                         : { transform: 'scale3d(0.9, 0.9, 0.9)' },
          '60%'                         : { opacity: '1', transform: 'scale3d(1.03, 1.03, 1.03)' },
          '80%'                         : { transform: 'scale3d(0.97, 0.97, 0.97)' },
          'to'                          : { opacity: '1', transform: 'scale3d(1, 1, 1)' },
        },
        bounceOut: {
          '20%'     : { transform: 'scale3d(0.9, 0.9, 0.9)' },
          '50%, 55%': { opacity: '1', transform: 'scale3d(1.1, 1.1, 1.1)' },
          'to'      : { opacity: '0', transform: 'scale3d(0.3, 0.3, 0.3)' },
        },
      },
      animation: {
        bounceIn : 'bounceIn 0.75s',
        bounceOut: 'bounceOut 0.75s',
      },
    },
  },
  plugins: [require('@privyid/tailwind-animation')],
}
