/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  env: {
    node: true,
  },
  root: true,
  parser: 'vue-eslint-parser',
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    './.eslintrc-auto-import.json',
  ],
  plugins: ['vue', 'prettier', '@typescript-eslint', 'simple-import-sort'],
  overrides: [
    {
      files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended'],
    },
  ],
  rules: {
    'no-var': 'warn',
    'vue/block-lang': [
      'error',
      {
        script: {
          lang: 'ts',
        },
      },
    ],
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: false,
      },
    ],
    'vue/v-bind-style': ['error', 'shorthand'],
    'vue/v-on-style': ['error', 'shorthand'],
    'vue/padding-line-between-blocks': 'error',
    'vue/block-tag-newline': ['error', { singleline: 'always', multiline: 'always', maxEmptyLines: 0 }],
    'vue/no-unused-vars': 'warn',
    'vue/component-api-style': ['error', ['script-setup', 'composition']],
    'vue/multi-word-component-names': 'off',
    'vue/object-curly-spacing': [2, 'always'],
    'vue/no-arrow-functions-in-watch': 'error',
    'vue/no-async-in-computed-properties': 'error',
    'vue/no-use-v-if-with-v-for': 'warn',
    'vue/require-v-for-key': 'error',
    'vue/html-closing-bracket-spacing': [
      2,
      {
        selfClosingTag: 'always',
      },
    ],
    'vue/component-tags-order': [
      'error',
      {
        order: ['script', 'template', 'style'],
      },
    ],
    'vue/mustache-interpolation-spacing': 'error',
    'vue/eqeqeq': 'error',
    camelcase: 'error',
    eqeqeq: 'error',
    'no-nested-ternary': 'error',
    'no-path-concat': 'error',
    'no-new-object': 'error',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
};
