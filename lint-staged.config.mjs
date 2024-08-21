/** @type {import('lint-staged').config} */
const config = {
  '*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,vue}': ['eslint --fix'],
  '*.{md,html}': ['prettier --write'],
  '*.{css,less,scss,sass,styl,pcss}': ['stylelint --fix'],
  '*.sol': ['prettier --write', 'solhint'],
};

export default config;
