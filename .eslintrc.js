module.exports = {
  extends: [
    'standard-with-typescript',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
    'plugin:unicorn/recommended',
  ],
  plugins      : ['align-assignments', 'unicorn'],
  parserOptions: {
    project: './tsconfig.eslint.json',
    parser : {
      'ts'        : '@typescript-eslint/parser',
      'js'        : 'espree',
      '<template>': 'espree',
    },
  },
  rules: {
    'curly'                : ['error', 'multi-or-nest'],
    'array-element-newline': [
      'error',
      {
        multiline: true,
        minItems : 3,
      },
    ],
    'array-bracket-newline': [
      'error',
      {
        multiline: true,
        minItems : 3,
      },
    ],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          multiline    : true,
          minProperties: 3,
        },
        ObjectPattern    : 'never',
        ImportDeclaration: {
          multiline    : true,
          minProperties: 3,
        },
        ExportDeclaration: 'always',
      },
    ],
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    'camelcase'              : 'warn',
    'comma-dangle'           : ['error', 'always-multiline'],
    'no-multi-spaces'        : [
      'error',
      {
        exceptions: {
          VariableDeclarator  : true,
          AssignmentExpression: true,
        },
      },
    ],
    'no-var'              : 'error',
    'prefer-template'     : 'error',
    'linebreak-style'     : 'off',
    'no-console'          : ['error', { allow: ['warn', 'error'] }],
    'prefer-const'        : ['error', { destructuring: 'all' }],
    'quote-props'         : ['error', 'consistent-as-needed'],
    'object-curly-spacing': ['error', 'always'],
    'key-spacing'         : [
      'error',
      {
        align: {
          beforeColon: false,
          afterColon : true,
          on         : 'colon',
        },
      },
    ],
    'arrow-parens'                                     : ['error', 'always'],
    'operator-linebreak'                               : ['error', 'before'],
    '@typescript-eslint/no-unused-vars'                : ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/ban-ts-ignore'                 : 'off',
    '@typescript-eslint/no-explicit-any'               : 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type' : 'off',
    '@typescript-eslint/strict-boolean-expressions'    : 'off',
    '@typescript-eslint/member-delimiter-style'        : [
      'error',
      {
        multiline: {
          delimiter  : 'comma',
          requireLast: true,
        },
        singleline: {
          delimiter  : 'comma',
          requireLast: false,
        },
        multilineDetection: 'brackets',
      },
    ],
    'align-assignments/align-assignments': [2, { requiresOnly: false }],
    'vue/multi-word-component-names'     : 'off',
    'vue/no-reserved-component-names'    : 'off',
    'vue/html-closing-bracket-newline'   : [
      'error',
      {
        singleline: 'never',
        multiline : 'never',
      },
    ],
    'unicorn/prevent-abbreviations'      : 'off',
    'unicorn/consistent-function-scoping': 'off',
  },
  overrides: [
    {
      files: ['**/*.spec.js', '**/*.spec.ts'],
      env  : {
        jest: true,
        node: true,
      },
      globals: {
        page         : true,
        browser      : true,
        context      : true,
        jestPuppeteer: true,
      },
      rules: {
        '@typescript-eslint/no-floating-promises': 'off',
        'unicorn/filename-case'                  : [
          'error',
          {
            cases: {
              kebabCase : true,
              pascalCase: true,
            },
          },
        ],
      },
    },
    {
      files: ['**/*.js'],
      rules: { 'unicorn/prefer-module': 'off' },
    },
    {
      files: ['**/*.vue'],
      rules: { 'unicorn/filename-case': ['off', { case: 'pascalCase' }] },
    },
  ],
}
