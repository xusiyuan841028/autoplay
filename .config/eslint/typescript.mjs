import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

/**
 * @typedef TypeScriptOptions
 * @property {string} [tsconfigRootDir]
 * @property {import('eslint').Linter.RulesRecord} [rules]
 */

/********************* TypeScript *********************/
/** @type {(opts?: TypeScriptOptions) => import('eslint').Linter.Config} */
export default function typescript(opts = {}) {
  const { rules } = opts;
  return {
    files: ['**/*.{ts,tsx,cts,mts}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: true,
      },
    },
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...tsPlugin.configs['recommended-type-checked'].rules,
      ...tsPlugin.configs['stylistic-type-checked'].rules,
      ...tsPlugin.configs['eslint-recommended'].overrides.reduce((rules, config) => ({ ...rules, ...config.rules }), {}),

      // TODO: custom rules - typescript
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      ...rules,
    },
  };
}
