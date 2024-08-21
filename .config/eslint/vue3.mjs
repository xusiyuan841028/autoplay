import vuePlugin from 'eslint-plugin-vue';

import baseConfig from './vue-base.mjs';

/** @type {import('eslint').Linter.Config} */
const config = {
  ...baseConfig,
  rules: {
    ...vuePlugin.configs.base.rules,
    ...vuePlugin.configs['vue3-essential'].rules,
    ...vuePlugin.configs['vue3-strongly-recommended'].rules,
    ...vuePlugin.configs['vue3-recommended'].rules,

    // TODO: custom rules - vue3
  },
};

export default config;
