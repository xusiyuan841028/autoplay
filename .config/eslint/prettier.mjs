import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

/********************* Prettier ***********************/
/** @type {import('eslint').Linter.Config} */
const prettier = {
  plugins: {
    prettier: prettierPlugin,
  },
  rules: {
    ...prettierConfig.rules,
    ...prettierPlugin.configs.recommended.rules,

    // TODO: custom rules - prettier
    'prettier/prettier': 'error',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
  },
};

export default prettier;
