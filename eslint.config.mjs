import all from './.config/eslint/all.mjs';
import commonjs from './.config/eslint/commonjs.mjs';
import ignores from './.config/eslint/ignore.mjs';
import imports from './.config/eslint/imports.mjs';
import jest from './.config/eslint/jest.mjs';
import node from './.config/eslint/node.mjs';
import prettier from './.config/eslint/prettier.mjs';
import react from './.config/eslint/react.mjs';
import typescript from './.config/eslint/typescript.mjs';

export { default as all } from './.config/eslint/all.mjs';
export { default as commonjs } from './.config/eslint/commonjs.mjs';
export { default as ignores } from './.config/eslint/ignore.mjs';
export { default as imports } from './.config/eslint/imports.mjs';
export { default as jest } from './.config/eslint/jest.mjs';
export { default as node } from './.config/eslint/node.mjs';
export { default as prettier } from './.config/eslint/prettier.mjs';
export { default as reactNative } from './.config/eslint/react-native.mjs';
export { default as react } from './.config/eslint/react.mjs';
export { default as typescript } from './.config/eslint/typescript.mjs';
export { default as vueBase } from './.config/eslint/vue-base.mjs';
export { default as vue2 } from './.config/eslint/vue2.mjs';
export { default as vue3 } from './.config/eslint/vue3.mjs';

/** @type {Array<import('eslint').Linter.Config>} */
const config = [
  ignores(),
  all(),
  commonjs(),
  typescript({
    rules: {
      '@typescript-eslint/no-misused-promises': 'off',
    },
  }),
  imports(),
  jest,
  react,
  prettier,
  node({
    rules: {
      'n/file-extension-in-import': [
        'error',
        'never',
        {
          '.mjs': 'always',
        },
      ],
    },
  }),
  /********************* Default language options *******/
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
];

export default config;
