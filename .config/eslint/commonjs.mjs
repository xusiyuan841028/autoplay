import globals from 'globals';

/**
 * @typedef ESVersion
 */

/**
 * @typedef CommonjsOptions
 * @property {'es5'} [esVersion='es2025']
 */

/********************* Commonjs ***************************/
/**
 * @param {CommonjsOptions} opts
 * @returns {import('eslint').Linter.Config}
 */
export default function commonjs(opts = {}) {
  const { esVersion = 'es2025' } = opts;
  return {
    files: ['**/*.cjs'],
    languageOptions: {
      globals: {
        ...globals[esVersion],
        ...globals['shared-node-browser'],
        ...globals.commonjs,
      },
    },
  };
}
