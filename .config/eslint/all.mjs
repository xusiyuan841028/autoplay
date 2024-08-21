import js from '@eslint/js';
import promisePlugin from 'eslint-plugin-promise';
import globals from 'globals';

/**
 * @typedef AllOptions
 */

/********************* Eslint All *********************/
/**
 * @param {AllOptions} opts
 * @returns {import('eslint').Linter.Config}
 */
export default function all(opts = {}) {
  return {
    files: ['**/*.{ts,tsx,cts,mts,js,jsx,mjs,vue}'],
    languageOptions: {
      globals: {
        ...globals.es2021,
        ...globals['shared-node-browser'],
      },
    },
    plugins: {
      promise: promisePlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...promisePlugin.configs.recommended.rules,
      // custom rules - promise
      'promise/always-return': ['error', { ignoreLastCallback: true }],
      'promise/prefer-await-to-then': 'warn',
      'promise/no-multiple-resolved': 'error',

      // TODO: custom rules - eslint
      semi: 'error',
      quotes: ['error', 'single'],
      'no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  };
}
