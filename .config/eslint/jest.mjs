import jestPlugin from 'eslint-plugin-jest';
import globals from 'globals';

export const jestGlob = [
  '**/__tests__/**/*.{js,jsx,mjs,cjs,ts,tsx,cts,mts}',
  '**/test/**/*.{js,jsx,mjs,cjs,ts,tsx,cts,mts}',
  '**/*.{spec,test}.{js,jsx,mjs,cjs,ts,tsx,cts,mts}',
];

/********************* Jest ***************************/
/** @type {import('eslint').Linter.Config} */
const jest = {
  files: jestGlob,
  plugins: {
    jest: jestPlugin,
  },
  languageOptions: {
    globals: {
      ...globals.jest,
    },
  },
  rules: {
    ...jestPlugin.configs.recommended.rules,
    ...jestPlugin.configs.style.rules,

    // TODO: custom rules - jest
  },
};

export default jest;
