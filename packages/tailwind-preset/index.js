const { theme } = require('./basic')

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('./basic')],
  theme  : {
    extend: {
      colors: {
        base: {
          white: theme.colors.base.white,
          black: theme.colors.base.black,
        },
      },
      fontSize: {
        'tn': [
          '11px',
          {
            lineHeight   : '1.45',
            letterSpacing: theme.letterSpacing.wider,
          },
        ],
        'xs': [
          '12px',
          {
            lineHeight   : '1.33',
            letterSpacing: theme.letterSpacing.wide,
          },
        ],
        'sm': [
          '14px',
          {
            lineHeight   : '1.42',
            letterSpacing: theme.letterSpacing.normal,
          },
        ],
        'base': [
          '16px',
          {
            lineHeight   : '1.5',
            letterSpacing: theme.letterSpacing.normal,
          },
        ],
        'xl': [
          '20px',
          {
            lineHeight   : '1.3',
            letterSpacing: theme.letterSpacing.normal,
          },
        ],
        '2xl': [
          '24px',
          {
            lineHeight   : '1.3',
            letterSpacing: theme.letterSpacing.normal,
          },
        ],
        '4xl': [
          '36px',
          {
            lineHeight   : '1.3',
            letterSpacing: theme.letterSpacing.normal,
          },
        ],
        '5xl': [
          '48px',
          {
            lineHeight   : '1.3',
            letterSpacing: theme.letterSpacing.normal,
          },
        ],
        '6xl': [
          '60px',
          {
            lineHeight   : '1.3',
            letterSpacing: theme.letterSpacing.tight,
          },
        ],
        '7xl': [
          '72px',
          {
            lineHeight   : '1.36',
            letterSpacing: theme.letterSpacing.tight,
          },
        ],
      },
      textColor: {
        'DEFAULT'    : theme.colors.gray[100],
        'default'    : theme.colors.gray[100],
        'subtle'     : theme.colors.gray[70],
        'muted'      : theme.colors.gray[40],
        'on-emphasis': theme.colors.base.white,
        'accent'     : theme.colors.blue[50],
        'success'    : theme.colors.green[50],
        'warning'    : theme.colors.orange[50],
        'danger'     : theme.colors.red[50],
      },
      backgroundColor: {
        inherit    : 'inherit',
        current    : 'currentColor',
        transparent: 'transparent',
        DEFAULT    : theme.colors.base.white,
        default    : {
          DEFAULT: theme.colors.base.white,
          alpha  : `rgba(${theme.colors.gray[50]}, ${theme.opacity[5]})`,
        },
        subtle: {
          DEFAULT: theme.colors.gray[0],
          alpha  : `rgba(${theme.colors.gray[80]}, ${theme.opacity[10]})`,
        },
        muted   : theme.colors.gray[5],
        inactive: theme.colors.gray[20],
        emphasis: {
          DEFAULT: theme.colors.gray[100],
          subtle : theme.colors.gray[95],
          alpha  : {
            DEFAULT: `rgba(${theme.colors.gray[0]}, ${theme.opacity[5]})`,
            subtle : `rgba(${theme.colors.gray[0]}, ${theme.opacity[10]})`,
          },
        },
        accent: {
          DEFAULT : theme.colors.blue[0],
          emphasis: theme.colors.blue[40],
        },
        success: {
          DEFAULT : theme.colors.green[0],
          emphasis: theme.colors.green[40],
        },
        warning: {
          DEFAULT : theme.colors.orange[0],
          emphasis: theme.colors.orange[40],
        },
        danger: {
          DEFAULT : theme.colors.red[0],
          emphasis: theme.colors.red[40],
        },
      },
      fill       : ({ theme }) => ({ ...theme('backgroundColor') }),
      borderColor: {
        'DEFAULT': theme.colors.gray[15],
        'default': {
          DEFAULT: theme.colors.gray[15],
          alpha  : `rgba(${theme.colors.gray[100]}, ${theme.opacity[5]})`,
        },
        'subtle': {
          DEFAULT: theme.colors.gray[20],
          alpha  : `rgba(${theme.colors.gray[100]}, ${theme.opacity[10]})`,
        },
        'muted'      : theme.colors.gray[10],
        'on-emphasis': {
          DEFAULT: theme.colors.gray[90],
          subtle : theme.colors.gray[70],
          alpha  : {
            DEFAULT: `rgba(${theme.colors.gray[0]}, ${theme.opacity[5]})`,
            subtle : `rgba(${theme.colors.gray[0]}, ${theme.opacity[10]})`,
          },
        },
        'accent': {
          DEFAULT : theme.colors.blue[10],
          emphasis: theme.colors.blue[40],
        },
        'success': {
          DEFAULT : theme.colors.green[10],
          emphasis: theme.colors.green[40],
        },
        'warning': {
          DEFAULT : theme.colors.orange[10],
          emphasis: theme.colors.orange[40],
        },
        'danger': {
          DEFAULT : theme.colors.red[10],
          emphasis: theme.colors.red[40],
        },
      },
      boxShadowColor: ({ theme }) => ({ ...theme('backgroundColor') }),
      boxShadow     : {
        'none'                 : '0 0 #0000',
        'sm'                   : `0 1px 3px rgba(${theme.colors.gray[100]}, ${theme.opacity[10]}), 0 1px 2px rgba(${theme.colors.gray[100]}, ${theme.opacity[5]})`,
        'md'                   : `0 4px 6px -1px rgba(${theme.colors.gray[100]}, ${theme.opacity[10]}), 0 2px 4px rgba(${theme.colors.gray[100]}, ${theme.opacity[5]})`,
        'DEFAULT'              : `0 4px 6px -1px rgba(${theme.colors.gray[100]}, ${theme.opacity[10]}), 0 2px 4px rgba(${theme.colors.gray[100]}, ${theme.opacity[5]})`,
        'lg'                   : `0 10px 15px -3px rgba(${theme.colors.gray[100]}, ${theme.opacity[10]}), 0 4px 6px rgba(${theme.colors.gray[100]}, ${theme.opacity[5]})`,
        'lg-top'               : `0 -10px 15px -3px rgba(${theme.colors.gray[100]}, ${theme.opacity[10]}), 0 -4px 6px rgba(${theme.colors.gray[100]}, ${theme.opacity[5]})`,
        'lg-left'              : `-10px 0 15px -3px rgba(${theme.colors.gray[100]}, ${theme.opacity[10]}), -4px 0 6px rgba(${theme.colors.gray[100]}, ${theme.opacity[5]})`,
        'lg-right'             : `10px 0 15px -3px rgba(${theme.colors.gray[100]}, ${theme.opacity[10]}), 4px 0 6px rgba(${theme.colors.gray[100]}, ${theme.opacity[5]})`,
        'lg-on-emphasis'       : `0 10px 15px -3px rgba(${theme.colors.gray[100]}, ${theme.opacity[35]}), 0 4px 6px -2px rgba(${theme.colors.gray[100]}, ${theme.opacity[15]})`,
        'lg-on-emphasis-darker': `0 10px 15px -3px rgba(${theme.colors.base.black}, ${theme.opacity[85]}), 0 4px 6px -2px rgba(${theme.colors.base.black}, ${theme.opacity[65]})`,
        'lg-accent'            : `0 10px 15px -3px rgba(${theme.colors.blue[40]}, ${theme.opacity[10]}), 0 4px 6px -2px rgba(${theme.colors.blue[40]}, ${theme.opacity[5]})`,
        'lg-success'           : `0 10px 15px -3px rgba(${theme.colors.green[40]}, ${theme.opacity[10]}), 0 4px 6px -2px rgba(${theme.colors.green[40]}, ${theme.opacity[5]})`,
        'lg-warning'           : `0 10px 15px -3px rgba(${theme.colors.orange[40]}, ${theme.opacity[5]}), 0 4px 6px -2px rgba(${theme.colors.orange[40]}, ${theme.opacity[5]})`,
        'lg-danger'            : `0 10px 15px -3px rgba(${theme.colors.red[40]}, ${theme.opacity[10]}), 0 4px 6px -2px rgba(${theme.colors.red[40]}, ${theme.opacity[5]})`,
        'xl'                   : `0 0 1px rgba(${theme.colors.gray[100]}, ${theme.opacity[15]}), 0 8px 10px -2px rgba(${theme.colors.gray[100]}, ${theme.opacity[10]}), 0 16px 25px -2px rgba(${theme.colors.gray[100]}, ${theme.opacity[10]})`,
        '2xl'                  : `0 20px 40px -8px rgba(${theme.colors.gray[100]}, ${theme.opacity[25]})`,
        'mask'                 : `0 0 0 9999px rgba(${theme.colors.base.black}, ${theme.opacity[50]})`,
      },
      dropShadow: {
        'sm'                   : [`0 1px 3px rgba(${theme.colors.gray[100]}, ${theme.opacity[10]})`, `0 1px 2px rgba(${theme.colors.gray[100]}, ${theme.opacity[5]})`],
        'md'                   : [`0 4px 6px -1px rgba(${theme.colors.gray[100]}, ${theme.opacity[10]})`, `0 2px 4px rgba(${theme.colors.gray[100]}, ${theme.opacity[5]})`],
        'DEFAULT'              : [`0 4px 6px -1px rgba(${theme.colors.gray[100]}, ${theme.opacity[10]})`, `0 2px 4px rgba(${theme.colors.gray[100]}, ${theme.opacity[5]})`],
        'lg'                   : [`0 10px 15px -3px rgba(${theme.colors.gray[100]}, ${theme.opacity[10]})`, `0 4px 6px rgba(${theme.colors.gray[100]}, ${theme.opacity[5]})`],
        'lg-top'               : [`0 -10px 15px -3px rgba(${theme.colors.gray[100]}, ${theme.opacity[10]})`, `0 -4px 6px rgba(${theme.colors.gray[100]}, ${theme.opacity[5]})`],
        'lg-left'              : [`-10px 0 15px -3px rgba(${theme.colors.gray[100]}, ${theme.opacity[10]})`, `-4px 0 6px rgba(${theme.colors.gray[100]}, ${theme.opacity[5]})`],
        'lg-right'             : [`10px 0 15px -3px rgba(${theme.colors.gray[100]}, ${theme.opacity[10]})`, `4px 0 6px rgba(${theme.colors.gray[100]}, ${theme.opacity[5]})`],
        'lg-on-emphasis'       : [`0 10px 15px -3px rgba(${theme.colors.gray[100]}, ${theme.opacity[35]})`, `0 4px 6px -2px rgba(${theme.colors.gray[100]}, ${theme.opacity[15]})`],
        'lg-on-emphasis-darker': [`0 10px 15px -3px rgba(${theme.colors.base.black}, ${theme.opacity[85]})`, `0 4px 6px -2px rgba(${theme.colors.base.black}, ${theme.opacity[65]})`],
        'lg-accent'            : [`0 10px 15px -3px rgba(${theme.colors.blue[40]}, ${theme.opacity[10]})`, `0 4px 6px -2px rgba(${theme.colors.blue[40]}, ${theme.opacity[5]})`],
        'lg-success'           : [`0 10px 15px -3px rgba(${theme.colors.green[40]}, ${theme.opacity[10]})`, `0 4px 6px -2px rgba(${theme.colors.green[40]}, ${theme.opacity[5]})`],
        'lg-warning'           : [`0 10px 15px -3px rgba(${theme.colors.orange[40]}, ${theme.opacity[5]})`, `0 4px 6px -2px rgba(${theme.colors.orange[40]}, ${theme.opacity[5]})`],
        'lg-danger'            : [`0 10px 15px -3px rgba(${theme.colors.red[40]}, ${theme.opacity[10]})`, `0 4px 6px -2px rgba(${theme.colors.red[40]}, ${theme.opacity[5]})`],
        'xl'                   : [
          `0 0 1px rgba(${theme.colors.gray[100]}, ${theme.opacity[15]})`,
          `0 8px 10px -2px rgba(${theme.colors.gray[100]}, ${theme.opacity[10]})`,
          `0 16px 25px -2px rgba(${theme.colors.gray[100]}, ${theme.opacity[10]})`,
        ],
        '2xl': [`0 20px 40px -8px rgba(${theme.colors.gray[100]}, ${theme.opacity[25]})`],
      },
      outlineColor: {
        DEFAULT    : theme.colors.gray[15],
        default    : theme.colors.gray[15],
        inherit    : 'inherit',
        current    : 'currentColor',
        transparent: 'transparent',
        accent     : theme.colors.blue[40],
        success    : theme.colors.green[40],
        warning    : theme.colors.orange[40],
        danger     : theme.colors.red[40],
      },
      ringColor: ({ theme }) => ({ ...theme('borderColor') }),
      zIndex   : { 1: 1 },
    },
  },
}
