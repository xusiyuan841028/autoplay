import vuePlugin from 'eslint-plugin-vue';

import baseConfig from './vue-base.mjs';

/** @type {import('eslint').Linter.Config} */
const config = {
  ...baseConfig,
  rules: {
    ...vuePlugin.configs.base.rules,
    ...vuePlugin.configs['essential'].rules,
    ...vuePlugin.configs['strongly-recommended'].rules,
    ...vuePlugin.configs['recommended'].rules,

    // TODO: custom rules - vue2
  },
};

export default config;
