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
          lineHeight   : '1.25',
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
    letterSpacing: { ...defaultTheme.letterSpacing },
    fontWeight   : {
      inherit   : 'inherit',
      thin      : 100,
      extralight: 200,
      light     : 300,
      normal    : 400,
      medium    : 500,
      semibold  : 600,
      bold      : 700,
      extrabold : 800,
      black     : 900,
    },
    colors: {
      inherit    : 'inherit',
      transparent: 'transparent',
      current    : 'currentColor',
      base       : {
        black: 'var(--color-base-black)',
        white: 'var(--color-base-white)',
      },
      gray: {
        0  : 'var(--color-gray-0)',
        5  : 'var(--color-gray-5)',
        10 : 'var(--color-gray-10)',
        15 : 'var(--color-gray-15)',
        20 : 'var(--color-gray-20)',
        25 : 'var(--color-gray-25)',
        30 : 'var(--color-gray-30)',
        35 : 'var(--color-gray-35)',
        40 : 'var(--color-gray-40)',
        45 : 'var(--color-gray-45)',
        50 : 'var(--color-gray-50)',
        55 : 'var(--color-gray-55)',
        60 : 'var(--color-gray-60)',
        65 : 'var(--color-gray-65)',
        70 : 'var(--color-gray-70)',
        75 : 'var(--color-gray-75)',
        80 : 'var(--color-gray-80)',
        85 : 'var(--color-gray-85)',
        90 : 'var(--color-gray-90)',
        95 : 'var(--color-gray-95)',
        100: 'var(--color-gray-100)',
      },
      blue: {
        0 : 'var(--color-blue-0)',
        10: 'var(--color-blue-10)',
        20: 'var(--color-blue-20)',
        30: 'var(--color-blue-30)',
        40: 'var(--color-blue-40)',
        50: 'var(--color-blue-50)',
        60: 'var(--color-blue-60)',
      },
      green: {
        0 : 'var(--color-green-0)',
        10: 'var(--color-green-10)',
        20: 'var(--color-green-20)',
        30: 'var(--color-green-30)',
        40: 'var(--color-green-40)',
        50: 'var(--color-green-50)',
        60: 'var(--color-green-60)',
      },
      lightblue: {
        0 : 'var(--color-lightblue-0)',
        10: 'var(--color-lightblue-10)',
        20: 'var(--color-lightblue-20)',
        30: 'var(--color-lightblue-30)',
        40: 'var(--color-lightblue-40)',
        50: 'var(--color-lightblue-50)',
        60: 'var(--color-lightblue-60)',
      },
      orange: {
        0 : 'var(--color-orange-0)',
        10: 'var(--color-orange-10)',
        20: 'var(--color-orange-20)',
        30: 'var(--color-orange-30)',
        40: 'var(--color-orange-40)',
        50: 'var(--color-orange-50)',
        60: 'var(--color-orange-60)',
      },
      red: {
        0 : 'var(--color-red-0)',
        10: 'var(--color-red-10)',
        20: 'var(--color-red-20)',
        30: 'var(--color-red-30)',
        40: 'var(--color-red-40)',
        50: 'var(--color-red-50)',
        60: 'var(--color-red-60)',
      },
      gold: {
        0 : 'var(--color-gold-0)',
        10: 'var(--color-gold-10)',
        20: 'var(--color-gold-20)',
        30: 'var(--color-gold-30)',
        40: 'var(--color-gold-40)',
        50: 'var(--color-gold-50)',
        60: 'var(--color-gold-60)',
      },
      yellow: {
        0 : 'var(--color-yellow-0)',
        10: 'var(--color-yellow-10)',
        20: 'var(--color-yellow-20)',
        30: 'var(--color-yellow-30)',
        40: 'var(--color-yellow-40)',
        50: 'var(--color-yellow-50)',
        60: 'var(--color-yellow-60)',
      },
      lime: {
        0 : 'var(--color-lime-0)',
        10: 'var(--color-lime-10)',
        20: 'var(--color-lime-20)',
        30: 'var(--color-lime-30)',
        40: 'var(--color-lime-40)',
        50: 'var(--color-lime-50)',
        60: 'var(--color-lime-60)',
      },
      teal: {
        0 : 'var(--color-teal-0)',
        10: 'var(--color-teal-10)',
        20: 'var(--color-teal-20)',
        30: 'var(--color-teal-30)',
        40: 'var(--color-teal-40)',
        50: 'var(--color-teal-50)',
        60: 'var(--color-teal-60)',
      },
      purple: {
        0 : 'var(--color-purple-0)',
        10: 'var(--color-purple-10)',
        20: 'var(--color-purple-20)',
        30: 'var(--color-purple-30)',
        40: 'var(--color-purple-40)',
        50: 'var(--color-purple-50)',
        60: 'var(--color-purple-60)',
      },
      primary: {
        5      : '#F2F7FD',
        25     : '#BFD9F3',
        50     : '#80B2E8',
        75     : '#408BDD',
        100    : '#0065D1',
        DEFAULT: '#0065D1',
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
      black: '#000000',
      dark : {
        default: '#404040',
        50     : '#86888B',
        55     : '#7A7C7F',
        60     : '#6E7074',
        65     : '#626468',
        70     : '#56585D',
        75     : '#4A4D51',
        80     : '#3D4145',
        85     : '#31353A',
        90     : '#24292F',
        95     : '#232323',
        100    : '#000000',
      },
      grey : '#808080',
      light: {
        default: '#BFBFBF',
        60     : '#B6B8B9',
        65     : '#C2C3C5',
        70     : '#CFCFD1',
        75     : '#DBDCDD',
        80     : '#E7E8EA',
        85     : '#F3F4F5',
        90     : '#F7F8F9',
        95     : '#FAFBFC',
        100    : '#FCFDFE',
      },
      white     : '#FFFFFF',
      shimmer   : 'linear-gradient(90deg, rgba(249, 249, 250, 0.01) 0%, #EEEEEE 69.79%, rgba(245, 245, 245, 0.01) 100%)',
      labelBg   : 'linear-gradient(180deg, rgba(245, 247, 249, 0) 46.88%, #FFFFFF 46.88%)',
      subtextAlt: {
        25 : '#E7E7E7',
        50 : '#CFCFCF',
        75 : '#B7B7B7',
        100: '#9F9F9F',
      },
      backgroundAlt: {
        25 : '#F8F8F8',
        50 : '#F1F1F1',
        75 : '#E9E9E9',
        100: '#E2E2E2',
      },
      secondaryAlt: {
        25 : '#D3D3D3',
        50 : '#A8A8A8',
        75 : '#7D7D7D',
        100: '#515151',
      },
      alphaBlack: {
        10   : '#0000001A',
        20   : '#00000033',
        30   : '#0000004D',
        40   : '#00000066',
        50   : '#00000080',
        60   : '#00000099',
        70   : '#000000B2',
        80   : '#000000CC',
        90   : '#000000E5',
        light: '#0000000D',
      },
      alphaWhite: {
        10   : '#FFFFFF1A',
        20   : '#FFFFFF33',
        30   : '#FFFFFF4D',
        40   : '#FFFFFF66',
        50   : '#FFFFFF80',
        60   : '#FFFFFF99',
        70   : '#FFFFFFB2',
        80   : '#FFFFFFCC',
        90   : '#FFFFFFE5',
        light: '#FFFFFF0D',
      },
      blackWhite: {
        0  : '#000000',
        5  : '#FDFDFD',
        10 : '#FAFAFA',
        15 : '#F5F5F5',
        20 : '#E8E8E8',
        25 : '#DCDCDC',
        30 : '#D1D1D1',
        35 : '#C8C8C8',
        40 : '#BABABA',
        45 : '#B1B1B1',
        50 : '#A3A3A3',
        55 : '#969696',
        60 : '#919191',
        65 : '#808080',
        70 : '#737373',
        75 : '#626262',
        80 : '#5A5A5A',
        85 : '#565656',
        90 : '#404040',
        95 : '#232323',
        100: '#000000',
      },
      gradients: {
        secondary : 'linear-gradient(180deg, rgba(204, 204, 204, 0) 0%, #CCCCCC 49.8%)',
        background: 'linear-gradient(180deg, rgba(245, 245, 245, 0) 0%, #F5F5F5 40.1%)',
      },
    },
    variables: {
      DEFAULT: {
        color: {
          base: {
            black: '0 0 0', // #000000
            white: '255 255 255', // #ffffff
          },
          gray: {
            0  : '250 250 250', // #FAFAFA
            5  : '243 243 243', // #F3F3F3
            10 : '231 231 232', // #E7E7E8
            15 : '219 219 220', // #DBDBDC
            20 : '207 207 209', // #CFCFD1
            25 : '194 195 197', // #C2C3C5
            30 : '182 184 185', // #B6B8B9
            35 : '170 172 174', // #AAACAE
            40 : '158 160 162', // #9EA0A2
            45 : '146 148 151', // #929497
            50 : '134 136 139', // #86888B
            55 : '122 124 127', // #7A7C7F
            60 : '110 112 116', // #6E7074
            65 : '98 100 104', // #626468
            70 : '86 88 93', // #56585D
            75 : '74 77 81', // #4A4D51
            80 : '61 65 69', // #3D4145
            85 : '49 53 58', // #31353A
            90 : '37 41 46', // #25292E
            95 : '25 29 35', // #191D23
            100: '13 17 23', // #0D1117
          },
          blue: {
            0 : '242 247 253', // #F2F7FD
            10: '191 217 243', // #BFD9F3
            20: '128 178 232', // #80B2E8
            30: '64 139 221', // #408BDD
            40: '0 101 209', // #0065D1
            50: '0 86 178', // #0056B2
            60: '0 76 157', // #004C9D
          },
          green: {
            0 : '244 251 246', // #F4FBF6
            10: '200 236 208', // #C8ECD0
            20: '145 216 160', // #91D8A0
            30: '90 197 113', // #5AC571
            40: '35 178 66', // #23B242
            50: '30 151 56', // #1E9738
            60: '26 133 49', // #1A8531
          },
          lightblue: {
            0 : '242 251 252', // #F2FBFC
            10: '192 235 241', // #C0EBF1
            20: '128 215 226', // #80D7E2
            30: '65 194 212', // #41C2D4
            40: '2 174 197', // #02AEC5
            50: '2 148 167', // #0294A7
            60: '1 130 148', // #018294
          },
          orange: {
            0 : '255 251 244', // #FFFBF4
            10: '253 233 200', // #FDE9C8
            20: '250 211 145', // #FAD391
            30: '248 188 90', // #F8BC5A
            40: '245 166 35', // #F5A623
            50: '208 141 30', // #D08D1E
            60: '184 124 26', // #B87C1A
          },
          red: {
            0 : '254 245 244', // #FEF5F4
            10: '248 203 202', // #F8CBCA
            20: '242 150 149', // #F29695
            30: '235 98 97', // #EB6261
            40: '228 46 44', // #E42E2C
            50: '194 39 37', // #C22725
            60: '171 34 33', // #AB2221
          },
          gold: {
            0 : '251 250 242', // #FBFAF2
            10: '237 230 191', // #EDE6BF
            20: '219 204 128', // #DBCC80
            30: '201 179 64', // #C9B340
            40: '183 154 0', // #B79A00
            50: '156 131 0', // #9C8300
            60: '137 116 0', // #897400
          },
          yellow: {
            0 : '254 253 244', // #FEFDF4
            10: '251 245 202', // #FBF5CA
            20: '247 234 149', // #F7EA95
            30: '243 224 97', // #F3E061
            40: '239 213 44', // #EFD52C
            50: '203 181 37', // #CBB525
            60: '179 160 33', // #B3A021
          },
          lime: {
            0 : '#FAFEF5',
            10: '#E8F9CD',
            20: '#D1F39A',
            30: '#BAEC68',
            40: '#A3E635',
            50: '#8BC32D',
            60: '#7AAC28',
          },
          teal: {
            0 : '#F3FBFA',
            10: '#C4EDE6',
            20: '#88DBCE',
            30: '#4DCAB5',
            40: '#12B89C',
            50: '#0F9C85',
            60: '#0E8A75',
          },
          purple: {
            0 : '#F7F2FD',
            10: '#D7BFF3',
            20: '#AE80E8',
            30: '#8640DD',
            40: '#5E00D1',
            50: '#5000B2',
            60: '#46009D',
          },
        },
      },
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
      'sm'        : '0 1px 2px rgba(var(--tw-shadow-color, 0, 0, 0), 0.05)',
      'DEFAULT'   : '0 1px 3px rgba(var(--tw-shadow-color, 0, 0, 0), 0.1), 0 1px 2px rgba(var(--tw-shadow-color, 0, 0, 0), 0.06)',
      'md'        : '0 4px 6px -1px rgba(var(--tw-shadow-color, 0, 0, 0), 0.1), 0 2px 4px -1px rgba(var(--tw-shadow-color, 0, 0, 0), 0.06)',
      'lg'        : '0 10px 15px -3px rgba(0,0,0, 0.1), 0 4px 6px -2px rgba(var(--tw-shadow-color, 0, 0, 0), 0.05)',
      'xl'        : '0 0 1px rgba(var(--tw-shadow-color, 0, 0, 0), 0.15), 0 8px 10px -6px rgba(var(--tw-shadow-color, 0, 0, 0), 0.1), 0 20px 25px -5px rgba(var(--tw-shadow-color, 0, 0, 0), 0.1)',
      '2xl'       : '0 25px 50px -12px rgba(var(--tw-shadow-color, 0, 0, 0), 0.25)',
      'inner'     : 'inset 2px 0 4px rgba(var(--tw-shadow-color, 0, 0, 0), 0.06), inset 0 4px 6px -1px rgba(var(--tw-shadow-color, 0, 0, 0), 0.06)',
      'none'      : 'none',
      'outline'   : '0 0 0 4px rgba(var(--tw-shadow-color, 220, 220, 220), 0.35)',
      'onemphasis': '0 10px 15px -3px rgba(var(--tw-shadow-color, 220, 220, 220), 0.35)',
    },
    opacity: {
      0  : 0,
      5  : 0.05,
      10 : 0.1,
      15 : 0.15,
      20 : 0.2,
      25 : 0.25,
      30 : 0.3,
      35 : 0.35,
      40 : 0.4,
      45 : 0.45,
      50 : 0.5,
      55 : 0.55,
      60 : 0.6,
      65 : 0.65,
      70 : 0.7,
      75 : 0.75,
      80 : 0.8,
      85 : 0.85,
      90 : 0.9,
      95 : 0.95,
      100: 1,
    },
  },
  plugins: [
    require('@privyid/tailwind-animation'),
    require('@privyid/tailwind-extended'),
    require('@mertasan/tailwindcss-variables'),
  ],
}
