/********************* Ignore files *******************/
/** @type {(globs?: string[]) => import('eslint').Linter.Config} */
export default function ignores(globs = []) {
  return {
    ignores: [
      '**/dist/**/*',
      '**/coverage/**/*',
      '**/.next/**/*',
      ...globs,
    ],
  };
}
