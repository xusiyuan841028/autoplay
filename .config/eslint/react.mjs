import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

/********************* React **************************/
/** @type {import('eslint').Linter.Config} */
const react = {
  files: ['**/*.{jsx,tsx}'],
  plugins: {
    react: reactPlugin,
    'react-hooks': reactHooksPlugin,
  },
  languageOptions: {
    parserOptions: reactPlugin.configs['jsx-runtime'].parserOptions,
    globals: {
      ...globals.browser,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    ...reactPlugin.configs.recommended.rules,
    ...reactPlugin.configs['jsx-runtime'].rules,
    ...reactHooksPlugin.configs.recommended.rules,

    // custom rules - react
    'react/default-props-match-prop-types': 'warn',
    'react/destructuring-assignment': 'warn',
    'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never', propElementValues: 'always' }],
    'react/jsx-curly-newline': ['warn', { multiline: 'consistent', singleline: 'consistent' }],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'], allow: 'as-needed' }],
    'react/jsx-fragments': ['warn', 'syntax'],
    'react/jsx-handler-names': [
      'warn',
      {
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
        checkLocalVariables: true,
        checkInlineFunction: true,
      },
    ],
    'react/jsx-key': ['error', { warnOnDuplicates: true }],
    'react/jsx-max-depth': ['error', { max: 6 }],
    'react/jsx-no-bind': [
      'error',
      {
        ignoreRefs: true,
        allowArrowFunctions: true,
        allowFunctions: false,
        allowBind: false,
        ignoreDOMComponents: true,
      },
    ],
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],
    'react/jsx-no-script-url': 'error',
    'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'react/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],
    'react/jsx-pascal-case': [
      'error',
      {
        allowAllCaps: true,
        allowNamespace: true,
        allowLeadingUnderscore: false,
        ignore: [],
      },
    ],
    'react/no-invalid-html-attribute': 'error',
    'react/no-array-index-key': 'error',
    'react/no-access-state-in-setstate': 'error',
    'react/no-arrow-function-lifecycle': 'error',
    'react/no-children-prop': ['error', { allowFunctions: false }],
    'react/no-did-mount-set-state': 'error',
    'react/no-did-update-set-state': 'error',
    'react/no-multi-comp': ['error', { ignoreStateless: true }],
    'react/no-object-type-as-default-prop': 'error',
    'react/no-redundant-should-component-update': 'error',
    'react/no-this-in-sfc': 'error',
    'react/no-typos': 'error',
    'react/no-unstable-nested-components': 'error',
    'react/no-unused-class-component-methods': 'warn',
    'react/no-unused-prop-types': [
      'warn',
      {
        skipShapeProps: true,
      },
    ],
    'react/no-unused-state': 'warn',
    'react/no-will-update-set-state': 'error',
    'react/prefer-es6-class': ['error', 'always'],
    'react/prefer-stateless-function': 'error',
    'react/self-closing-comp': 'error',
    'react/sort-comp': [
      'error',
      {
        order: [
          'static-methods',
          'instance-variables',
          'lifecycle',
          'everything-else',
          'rendering',
          'render',
        ],
        groups: {
          rendering: ['/^render.+$/', 'render'],
        },
      },
    ],
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: false,
        shorthandLast: true,
        ignoreCase: true,
        noSortAlphabetically: true,
        reservedFirst: true,
      },
    ],
    'react/static-property-placement': ['error', 'static public field'],
    'react/style-prop-object': 'error',
    'react/void-dom-elements-no-children': 'error',

    // custom rules - react-hooks
  },
};

export default react;
