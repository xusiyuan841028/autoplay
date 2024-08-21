/** @type { import('prettier').Config } */
module.exports = {
  printWidth: 160,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  requirePragma: false,
  insertPragma: false,
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'strict',
  vueIndentScriptAndStyle: false,
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'auto',
  singleAttributePerLine: false,
  overrides: [
    {
      files: ['*.sql'],
      options: {
        parser: 'sql',
      },
    },
  ],
  plugins: [
    'prettier-plugin-embed',
    'prettier-plugin-sql',
    'prettier-plugin-packagejson',
    // '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-multiline-arrays',
  ],

  // plugin: prettier-plugin-sql
  // embeddedSqlIdentifiers: ['sql'],
  language: 'postgresql',
  keywordCase: 'upper',
  // dataTypeCase: 'upper',
  // functionCase: 'upper',
  identifierCase: 'lower',
  indentStyle: 'standard',
  logicalOperatorNewline: 'before',
  expressionWidth: 120,
  linesBetweenQueries: 1,
  denseOperators: false,
  newlineBeforeSemicolon: false,

  // plugin: prettier-plugin-multiline-arrays
  multilineArraysWrapThreshold: 3,
  // multilineFunctionArguments: true,

  // plugin: @trivago/prettier-plugin-sort-imports
  /*importOrder: [
    '^node:(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@(.*)$',
    '^react(.*)$',
    '^vue(.*)$',
    '^[$](.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
  importOrderCaseInsensitive: true,
  importOrderParserPlugins: [
    'typescript',
    'jsx',
    'tsx',
    'decorators',
    'importAttributes',
  ],*/
};
