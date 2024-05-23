module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  ignorePatterns: ['dist/', 'node_modules/'],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
