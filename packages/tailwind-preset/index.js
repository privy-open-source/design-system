const { theme } = require('./basic')

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('./basic')],
  theme  : {
    extend: {
      colors: {
        brand: {
          logo  : theme.colors.red[40],
          action: theme.colors.red[40],
          accent: {
            DEFAULT : theme.colors.blue[40],
            subtle  : theme.colors.blue[20],
            subtlest: theme.colors.blue.milk,
          },
        },
        dark: {
          brand: {
            logo  : theme.colors.gray[0],
            action: theme.colors.red[30],
            accent: {
              DEFAULT : theme.colors.blue[30],
              subtle  : theme.colors.blue[50],
              subtlest: theme.colors.blue[100],
            },
          },
        },
        alpha: {
          black: {
            3 : `rgba(${theme.colors.gray[100]}, ${theme.opacity[3]})`,
            5 : `rgba(${theme.colors.gray[100]}, ${theme.opacity[5]})`,
            10: `rgba(${theme.colors.gray[100]}, ${theme.opacity[10]})`,
            20: `rgba(${theme.colors.gray[100]}, ${theme.opacity[20]})`,
            30: `rgba(${theme.colors.gray[100]}, ${theme.opacity[30]})`,
            40: `rgba(${theme.colors.gray[100]}, ${theme.opacity[40]})`,
            50: `rgba(${theme.colors.gray[100]}, ${theme.opacity[50]})`,
            60: `rgba(${theme.colors.gray[100]}, ${theme.opacity[60]})`,
            70: `rgba(${theme.colors.gray[100]}, ${theme.opacity[70]})`,
            80: `rgba(${theme.colors.gray[100]}, ${theme.opacity[80]})`,
            90: `rgba(${theme.colors.gray[100]}, ${theme.opacity[90]})`,
            95: `rgba(${theme.colors.gray[100]}, ${theme.opacity[95]})`,
          },
          white: {
            3 : `rgba(${theme.colors.gray[0]}, ${theme.opacity[3]})`,
            5 : `rgba(${theme.colors.gray[0]}, ${theme.opacity[5]})`,
            10: `rgba(${theme.colors.gray[0]}, ${theme.opacity[10]})`,
            20: `rgba(${theme.colors.gray[0]}, ${theme.opacity[20]})`,
            30: `rgba(${theme.colors.gray[0]}, ${theme.opacity[30]})`,
            40: `rgba(${theme.colors.gray[0]}, ${theme.opacity[40]})`,
            50: `rgba(${theme.colors.gray[0]}, ${theme.opacity[50]})`,
            60: `rgba(${theme.colors.gray[0]}, ${theme.opacity[60]})`,
            70: `rgba(${theme.colors.gray[0]}, ${theme.opacity[70]})`,
            80: `rgba(${theme.colors.gray[0]}, ${theme.opacity[80]})`,
            90: `rgba(${theme.colors.gray[0]}, ${theme.opacity[90]})`,
            95: `rgba(${theme.colors.gray[0]}, ${theme.opacity[95]})`,
          },
        },
      },
      fontSize: {
        'xt': [
          '10px',
          {
            lineHeight   : theme.lineHeight.tight,
            letterSpacing: theme.letterSpacing.wider,
          },
        ],
        'tn': [
          '11px',
          {
            lineHeight   : theme.lineHeight.tight,
            letterSpacing: theme.letterSpacing.wider,
          },
        ],
        'xs': [
          '12px',
          {
            lineHeight   : theme.lineHeight.tightest,
            letterSpacing: theme.letterSpacing.wide,
          },
        ],
        'sm': [
          '14px',
          {
            lineHeight   : theme.lineHeight.tighter,
            letterSpacing: theme.letterSpacing.wider,
          },
        ],
        'base': [
          '16px',
          {
            lineHeight   : theme.lineHeight.normal,
            letterSpacing: theme.letterSpacing.wide,
          },
        ],
        'xl': [
          '20px',
          {
            lineHeight   : theme.lineHeight.wide,
            letterSpacing: theme.letterSpacing.normal,
          },
        ],
        '2xl': [
          '24px',
          {
            lineHeight   : theme.lineHeight.wide,
            letterSpacing: theme.letterSpacing.normal,
          },
        ],
        '4xl': [
          '36px',
          {
            lineHeight   : theme.lineHeight.wide,
            letterSpacing: theme.letterSpacing.normal,
          },
        ],
        '5xl': [
          '48px',
          {
            lineHeight   : theme.lineHeight.wide,
            letterSpacing: theme.letterSpacing.normal,
          },
        ],
        '6xl': [
          '60px',
          {
            lineHeight   : theme.lineHeight.wide,
            letterSpacing: theme.letterSpacing.tight,
          },
        ],
        '7xl': [
          '72px',
          {
            lineHeight   : theme.lineHeight.wide,
            letterSpacing: theme.letterSpacing.tight,
          },
        ],
      },
      textColor: {
        'DEFAULT' : theme.colors.gray[95],
        'default' : theme.colors.gray[95],
        'subtle'  : theme.colors.gray[60],
        'subtlest': theme.colors.gray[35],
        'muted'   : theme.colors.gray[20],
        'link'    : {
          'DEFAULT'    : theme.colors.blue[50],
          'on-emphasis': theme.colors.blue[20],
        },
        'on-emphasis'   : theme.colors.gray[0],
        'state-emphasis': theme.colors.gray[0],
        'info'          : {
          'DEFAULT'    : theme.colors.blue[60],
          'on-emphasis': theme.colors.blue[30],
        },
        'success': {
          'DEFAULT'    : theme.colors.green[60],
          'on-emphasis': theme.colors.green[30],
        },
        'warning': {
          'DEFAULT'    : theme.colors.orange[70],
          'on-emphasis': theme.colors.orange[40],
        },
        'danger': {
          'DEFAULT'    : theme.colors.red[60],
          'on-emphasis': theme.colors.red[30],
        },
        'dark': {
          'DEFAULT' : theme.colors.gray[0],
          'default' : theme.colors.gray[0],
          'subtle'  : theme.colors.gray[40],
          'subtlest': theme.colors.gray[60],
          'muted'   : theme.colors.gray[80],
          'link'    : {
            'DEFAULT'    : theme.colors.blue[20],
            'on-emphasis': theme.colors.blue[50],
          },
          'on-emphasis'   : theme.colors.gray[95],
          'state-emphasis': theme.colors.gray[0],
          'info'          : {
            'DEFAULT'    : theme.colors.blue[20],
            'on-emphasis': theme.colors.blue[30],
          },
          'success': {
            'DEFAULT'    : theme.colors.green[20],
            'on-emphasis': theme.colors.green[30],
          },
          'warning': {
            'DEFAULT'    : theme.colors.orange[20],
            'on-emphasis': theme.colors.orange[40],
          },
          'danger': {
            'DEFAULT'    : theme.colors.red[20],
            'on-emphasis': theme.colors.red[30],
          },
        },
      },
      backgroundColor: {
        'inherit'    : 'inherit',
        'current'    : 'currentColor',
        'transparent': 'transparent',
        'base'       : {
          DEFAULT: theme.colors.gray[10],
          black  : theme.colors.base.black,
          white  : theme.colors.base.white,
        },
        'ground' : theme.colors.gray[5],
        'DEFAULT': theme.colors.gray[0],
        'default': {
          DEFAULT: theme.colors.gray[0],
          alpha  : `rgba(${theme.colors.gray[100]}, ${theme.opacity[3]})`,
        },
        'layer-1'       : theme.colors.gray[0],
        'layer-2'       : theme.colors.gray[0],
        'emphasis-alpha': `rgba(${theme.colors.gray[100]}, ${theme.opacity[5]})`,
        'inverse'       : theme.colors.gray[95],
        'on-inverse'    : {
          DEFAULT: theme.colors.gray[90],
          subtle : theme.colors.gray[80],
        },
        'info': {
          DEFAULT : theme.colors.blue[0],
          emphasis: theme.colors.blue[40],
        },
        'success': {
          DEFAULT : theme.colors.green[0],
          emphasis: theme.colors.green[40],
        },
        'warning': {
          DEFAULT : theme.colors.orange[0],
          emphasis: theme.colors.orange[40],
        },
        'danger': {
          DEFAULT : theme.colors.red[0],
          emphasis: theme.colors.red[40],
        },
        'dark': {
          'base'   : theme.colors.gray[100],
          'ground' : theme.colors.gray[90],
          'DEFAULT': theme.colors.gray[95],
          'default': {
            DEFAULT: theme.colors.gray[95],
            alpha  : `rgba(${theme.colors.gray[0]}, ${theme.opacity[3]})`,
          },
          'layer-1'       : theme.colors.gray[90],
          'layer-2'       : theme.colors.gray[85],
          'emphasis-alpha': `rgba(${theme.colors.gray[0]}, ${theme.opacity[5]})`,
          'inverse'       : theme.colors.gray[10],
          'on-inverse'    : {
            DEFAULT: theme.colors.gray[5],
            subtle : theme.colors.gray[0],
          },
          'info': {
            DEFAULT : theme.colors.blue[90],
            emphasis: theme.colors.blue[30],
          },
          'success': {
            DEFAULT : theme.colors.green[90],
            emphasis: theme.colors.green[30],
          },
          'warning': {
            DEFAULT : theme.colors.orange[90],
            emphasis: theme.colors.orange[30],
          },
          'danger': {
            DEFAULT : theme.colors.red[90],
            emphasis: theme.colors.red[30],
          },
        },
      },
      backgroundImage: { 'gradient-maroon-to-dark-red': 'linear-gradient(90deg, #37162E 0%, #482041 43.68%, #492143 55.03%, #52213F 64.67%, #58213C 76.02%, #912121 113.46%)' },
      fill           : ({ theme }) => ({ ...theme('backgroundColor') }),
      borderColor    : {
        'subtlest': theme.colors.gray[5],
        'subtle'  : {
          DEFAULT: theme.colors.gray[10],
          alpha  : `rgba(${theme.colors.gray[100]}, ${theme.opacity[5]})`,
        },
        'DEFAULT': theme.colors.gray[20],
        'default': {
          DEFAULT: theme.colors.gray[20],
          alpha  : `rgba(${theme.colors.gray[100]}, ${theme.opacity[10]})`,
        },
        'emphasis': {
          DEFAULT: theme.colors.gray[30],
          alpha  : `rgba(${theme.colors.gray[100]}, ${theme.opacity[20]})`,
        },
        'inverse'   : theme.colors.gray[90],
        'on-inverse': theme.colors.gray[50],
        'info'      : {
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
        'dark': {
          'subtlest': theme.colors.gray[90],
          'DEFAULT' : theme.colors.gray[85],
          'subtle'  : {
            DEFAULT: theme.colors.gray[80],
            alpha  : `rgba(${theme.colors.gray[0]}, ${theme.opacity[5]})`,
          },
          'default': {
            DEFAULT: theme.colors.gray[85],
            alpha  : `rgba(${theme.colors.gray[0]}, ${theme.opacity[10]})`,
          },
          'emphasis': {
            DEFAULT: theme.colors.gray[30],
            alpha  : `rgba(${theme.colors.gray[0]}, ${theme.opacity[20]})`,
          },
          'inverse'   : theme.colors.gray[10],
          'on-inverse': theme.colors.gray[40],
          'info'      : {
            DEFAULT : theme.colors.blue[100],
            emphasis: theme.colors.blue[30],
          },
          'success': {
            DEFAULT : theme.colors.green[100],
            emphasis: theme.colors.green[30],
          },
          'warning': {
            DEFAULT : theme.colors.orange[100],
            emphasis: theme.colors.orange[30],
          },
          'danger': {
            DEFAULT : theme.colors.red[100],
            emphasis: theme.colors.red[30],
          },
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
        DEFAULT    : theme.colors.gray[5],
        default    : theme.colors.gray[5],
        inherit    : 'inherit',
        current    : 'currentColor',
        transparent: 'transparent',
        accent     : theme.colors.blue[10],
        info       : theme.colors.blue[10],
        success    : theme.colors.green[10],
        warning    : theme.colors.orange[10],
        danger     : theme.colors.red[10],
        dark       : {
          DEFAULT: theme.colors.gray[80],
          default: theme.colors.gray[80],
          accent : theme.colors.blue[70],
          info   : theme.colors.blue[70],
          success: theme.colors.green[80],
          warning: theme.colors.orange[80],
          danger : theme.colors.red[70],
        },
      },
      ringColor: ({ theme }) => ({ ...theme('borderColor') }),
      zIndex   : {
        1       : 1,
        dropdown: 1020,
        sticky  : 1030,
        fixed   : 1040,
        modal   : 1050,
        dialog  : 1055,
        overlay : 1060,
        tooltip : 1070,
        tour    : {
          DEFAULT : 1085,
          backdrop: 1080,
        },
        notify: 1090,
      },
      minWidth : ({ theme }) => ({ ...theme('spacing') }),
      maxWidth : ({ theme }) => ({ ...theme('spacing') }),
      minHeight: ({ theme }) => ({ ...theme('spacing') }),
      maxHeight: ({ theme }) => ({ ...theme('spacing') }),
    },
  },
}
