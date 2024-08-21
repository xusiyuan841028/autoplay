const config = {
  extends: [
    '@commitlint/config-conventional',
    // '@commitlint/config-pnpm-scopes',
  ],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'chore',
        'ci',
        'revert',
      ],
    ],
  },
};

export default config;
