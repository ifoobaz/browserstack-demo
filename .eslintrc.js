module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'airbnb',
    'plugin:playwright/playwright-test',
  ],
  plugins: [],
  settings: {
  },
  globals: {
    document: true,
    window: true,
  },
  overrides: [
    {
      files: [
        '**/*.test.js',
        '**/*.test.jsx',
      ],
      env: {
        jest: true,
      },
      plugins: ['jest'],
      rules: {
        'no-console': 0,
      },
    },
  ],
  rules: {
    quotes: ['error', 'single'],
    camelcase: 'error',
    'no-console': 0,
    'no-unused-vars': 2,
    'no-empty': 0,
    'no-undef': 'off',
    'no-extra-boolean-cast': 0,
    'max-params': ['error', 3],
    'arrow-parens': ['error', 'always'],
    'consistent-return': 'off',
    'class-methods-use-this': 'off',
    'require-await': 2,
    'no-delete-var': 'error',
    indent: ['error', 2, { SwitchCase: 1 }],
    'func-names': ['off', 'as-needed'],
    curly: ['error', 'all'],
    'max-len': 'off',
    semi: ['error', 'always'],
    'object-curly-newline': ['error', {
      ObjectExpression: { consistent: true },
      ObjectPattern: 'never',
      ImportDeclaration: 'never',
      ExportDeclaration: {
        multiline: true,
        minProperties: 3,
      },
    }],
    'no-await-in-loop': 'off',
    'no-continue': 'off',
    'no-plusplus': 'off',
    'no-prototype-builtins': 'off',
    'playwright/no-conditional-in-test': 'off',
    'playwright/no-force-option': 'off',
    'import/no-extraneous-dependencies': 2,
    'import/no-named-as-default': 2,
    'import/no-default-export': 'error',
    'import/no-cycle': 'off',
    'import/group-exports': 'error',
    'import/exports-last': 'error',
    'import/prefer-default-export': 'off',
    'import/order': ['error', {
      'newlines-between': 'always',
      groups: [
        ['builtin', 'external'],
        ['internal', 'parent', 'sibling', 'index'],
      ],
    }],
  },
};
