import path from 'node:path';
import { fileURLToPath } from 'node:url';

// import babelParser from '@babel/eslint-parser';
import importPlugin from 'eslint-plugin-import';

import { jestGlob } from './jest.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const scriptExtensions = [
  '.ts',
  '.tsx',
  '.cts',
  '.mts',
  '.js',
  '.jsx',
  '.cjs',
  '.mjs',
  '.vue',
];

/**
 * @typedef ImportOptions
 * @property {string[]} [tsconfigPaths]
 */

/********************* Import *************************/
/**
 * @param {ImportOptions} opts
 * @returns {import('eslint').Linter.Config}
 */
function imports(opts = {}) {
  const {
    tsconfigPaths = [
      path.resolve(process.cwd(), 'tsconfig.json'),
      path.resolve(__dirname, '../../packages/**/tsconfig.json'),
      path.resolve(__dirname, '../../apps/**/tsconfig.json'),
    ],
  } = opts;

  return {
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      ...importPlugin.configs.recommended.parserOptions,
      // parser: babelParser,
      // parserOptions: {
      // requireConfigFile: false,
      // babelOptions: {
      // plugins: ['@babel/plugin-syntax-import-attributes'],
      // },
      // },
    },
    settings: {
      ...importPlugin.configs.typescript.settings,
      'import/resolver': {
        ...importPlugin.configs.typescript.settings['import/resolver'],
        typescript: {
          alwaysTryTypes: true,
          project: tsconfigPaths,
        },
      },
      'import/parsers': {
        '@typescript-eslint/parser': scriptExtensions,
      },
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,

      // custom rules - import
      'import/no-deprecated': 'warn',
      'import/no-empty-named-blocks': 'error',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            path.resolve(__dirname, '../**/*.mjs'),
            ...jestGlob,
            '**/{eslint,prettier,eslint,lint-staged}.config.{js,ts,cjs,mjs}',
            '**/*.d.ts',
          ],
        },
      ],
      'import/no-mutable-exports': 'error',
      'import/no-unused-modules': 'off',
      'import/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
            orderImportKind: 'asc',
          },
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'unknown',
            'type',
          ],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: 'react*',
              group: 'builtin',
              position: 'before',
            },
          ],
        },
      ],
    },
  };
}

export default imports;
