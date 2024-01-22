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
          accent: theme.colors.red[40],
        },
        dark: {
          brand: {
            logo  : theme.colors.gray[0],
            action: theme.colors.red[30],
            accent: theme.colors.red[30],
          },
        },
      },
      fontSize: {
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
        'DEFAULT'       : theme.colors.gray[100],
        'default'       : theme.colors.gray[100],
        'subtle'        : theme.colors.gray[60],
        'subtlest'      : theme.colors.gray[35],
        'muted'         : theme.colors.gray[25],
        'link'          : theme.colors.blue[50],
        'on-emphasis'   : theme.colors.gray[0],
        'state-emphasis': theme.colors.gray[0],
        'info'          : theme.colors.blue[60],
        'success'       : theme.colors.green[60],
        'warning'       : theme.colors.orange[70],
        'danger'        : theme.colors.red[60],
        'dark'          : {
          'DEFAULT'       : theme.colors.gray[0],
          'default'       : theme.colors.gray[0],
          'subtle'        : theme.colors.gray[40],
          'subtlest'      : theme.colors.gray[60],
          'muted'         : theme.colors.gray[75],
          'link'          : theme.colors.blue[30],
          'on-emphasis'   : theme.colors.gray[100],
          'state-emphasis': theme.colors.gray[0],
          'info'          : theme.colors.blue[20],
          'success'       : theme.colors.green[20],
          'warning'       : theme.colors.orange[20],
          'danger'        : theme.colors.red[20],
        },
      },
      backgroundColor: {
        'inherit'    : 'inherit',
        'current'    : 'currentColor',
        'transparent': 'transparent',
        'base'       : {
          DEFAULT: theme.colors.gray[5],
          black  : theme.colors.base.black,
          white  : theme.colors.base.white,
        },
        'DEFAULT': theme.colors.gray[0],
        'layer-1': theme.colors.gray[0],
        'layer-2': theme.colors.gray[0],
        'default': {
          DEFAULT: theme.colors.gray[0],
          alpha  : `rgba(${theme.colors.gray[50]}, ${theme.opacity[5]})`,
        },
        'inverse': theme.colors.gray[100],
        'subtle' : {
          DEFAULT: theme.colors.gray[10],
          alpha  : `rgba(${theme.colors.gray[80]}, ${theme.opacity[10]})`,
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
          'DEFAULT': theme.colors.gray[95],
          'layer-1': theme.colors.gray[90],
          'layer-2': theme.colors.gray[85],
          'default': {
            DEFAULT: theme.colors.gray[95],
            alpha  : `rgba(${theme.colors.gray[80]}, ${theme.opacity[10]})`,
          },
          'inverse': theme.colors.gray[0],
          'subtle' : {
            DEFAULT: theme.colors.gray[90],
            alpha  : `rgba(${theme.colors.gray[20]}, ${theme.opacity[10]})`,
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
      fill       : ({ theme }) => ({ ...theme('backgroundColor') }),
      borderColor: {
        DEFAULT: theme.colors.gray[15],
        default: {
          DEFAULT: theme.colors.gray[15],
          alpha  : `rgba(${theme.colors.gray[100]}, ${theme.opacity[5]})`,
        },
        subtle: {
          DEFAULT: theme.colors.gray[25],
          alpha  : `rgba(${theme.colors.gray[100]}, ${theme.opacity[10]})`,
        },
        muted  : theme.colors.gray[10],
        inverse: theme.colors.gray[100],
        info   : {
          DEFAULT : theme.colors.blue[10],
          emphasis: theme.colors.blue[40],
        },
        success: {
          DEFAULT : theme.colors.green[10],
          emphasis: theme.colors.green[40],
        },
        warning: {
          DEFAULT : theme.colors.orange[10],
          emphasis: theme.colors.orange[40],
        },
        danger: {
          DEFAULT : theme.colors.red[10],
          emphasis: theme.colors.red[40],
        },
        dark: {
          DEFAULT: theme.colors.gray[90],
          default: {
            DEFAULT: theme.colors.gray[90],
            alpha  : `rgba(${theme.colors.gray[0]}, ${theme.opacity[5]})`,
          },
          subtle: {
            DEFAULT: theme.colors.gray[80],
            alpha  : `rgba(${theme.colors.gray[0]}, ${theme.opacity[10]})`,
          },
          muted  : theme.colors.gray[85],
          inverse: theme.colors.gray[0],
          info   : {
            DEFAULT : theme.colors.blue[100],
            emphasis: theme.colors.blue[30],
          },
          success: {
            DEFAULT : theme.colors.green[100],
            emphasis: theme.colors.green[30],
          },
          warning: {
            DEFAULT : theme.colors.orange[100],
            emphasis: theme.colors.orange[30],
          },
          danger: {
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
        DEFAULT    : theme.colors.gray[15],
        default    : theme.colors.gray[15],
        inherit    : 'inherit',
        current    : 'currentColor',
        transparent: 'transparent',
        info       : theme.colors.blue[40],
        success    : theme.colors.green[40],
        warning    : theme.colors.orange[40],
        danger     : theme.colors.red[40],
        dark       : {
          DEFAULT: theme.colors.gray[90],
          default: theme.colors.gray[90],
          info   : theme.colors.blue[30],
          success: theme.colors.green[30],
          warning: theme.colors.orange[30],
          danger : theme.colors.red[30],
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
