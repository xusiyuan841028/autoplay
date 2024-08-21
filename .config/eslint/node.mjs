import nodePlugin from 'eslint-plugin-n';

// import packageJSON from '../../package.json' with { type: 'json' };
//
// const moduleRegexp = /^(@?eslint)|@typescript-eslint|@babel/;
//
// const devDependencies = packageJSON.devDependencies;
// const eslintModules = Object.keys(devDependencies)
// .filter((name) => moduleRegexp.test(name))
// .concat('globals');

const pluginConfig = nodePlugin.configs['flat/recommended-module'];

/**
 * @typedef NodeOptions
 * @property {import('eslint').Linter.RulesRecord} [rules]
 */

/********************* Node *************************/
/**
 * @param {NodeOptions} opts
 * @returns {import('eslint').Linter.Config}
 */
export default function (opts = {}) {
  const { rules = {} } = opts;
  return {
    ...pluginConfig,
    rules: {
      ...pluginConfig.rules,

      // TODO: custom rules - node
      'n/callback-return': 'error',
      'n/file-extension-in-import': ['error', 'always'],
      'n/handle-callback-err': 'error',
      'n/no-callback-literal': 'error',
      'n/no-mixed-requires': 'error',
      'n/no-new-require': 'error',
      'n/no-path-concat': 'error',
      'n/no-process-env': 'error',
      'n/prefer-global/buffer': 'error',
      'n/prefer-global/process': 'error',
      'n/prefer-global/text-decoder': 'error',
      'n/prefer-global/text-encoder': 'error',
      'n/prefer-promises/dns': 'error',
      'n/prefer-promises/fs': 'error',
      'n/no-missing-import': 'off',
      'n/no-missing-require': 'off',
      'n/no-unpublished-import': 'off',
      ...rules,
    },
  };
}
