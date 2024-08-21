import vuePlugin from 'eslint-plugin-vue';
import globals from 'globals';

const baseConfig = vuePlugin.configs.base;

/** @type {import('eslint').Linter.Config} */
const config = {
  files: ['**/*.vue'],
  plugins: {
    vue: vuePlugin,
  },
  languageOptions: {
    parser: baseConfig.parser,
    parserOptions: baseConfig.parserOptions,
    globals: {
      ...globals.browser,
      ...globals.es2021,
    },
  },
  processor: vuePlugin.processors['.vue'],
};

export default config;
