import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import formatJsPlugin from 'eslint-plugin-formatjs';
import jsxPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'src/@types/styled.d.ts', 'src/vite-env.d.ts'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxPlugin,
      prettier: prettierPlugin,
      formatjs: formatJsPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      ...prettierConfig.rules,
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
      ],
      'max-len': [
        1,
        {
          code: 120,
          ignoreComments: true,
          ignoreUrls: true,
          ignorePattern: '^import\\s.+\\sfrom\\s.+;$',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          caughtErrors: 'none',
        },
      ],
      'prettier/prettier': 2,
      '@typescript-eslint/explicit-function-return-type': 0,
      '@typescript-eslint/no-empty-object-type': 0,
      'operator-linebreak': 0,
      'object-curly-newline': 0,
      'react/prop-types': 0,
      'lines-between-class-members': 0,
      'import/prefer-default-export': 0,
      'arrow-body-style': 0,
      'implicit-arrow-linebreak': 0,
      'react/jsx-curly-newline': 0,
      'react/jsx-props-no-spreading': 0,
      'react/jsx-wrap-multilines': [2, { prop: 'ignore' }],
      'import/no-cycle': 0,
      'no-plusplus': 0,
      'max-classes-per-file': 0,
      'no-async-promise-executor': 0,
      'no-confusing-arrow': 0,
      '@typescript-eslint/ban-types': 0,
      '@typescript-eslint/explicit-module-boundary-types': 0,
      '@typescript-eslint/ban-ts-comment': 1,
      '@typescript-eslint/no-throw-literal': 0,
      '@typescript-eslint/lines-between-class-members': 0,
      'react/require-default-props': 0,
      'no-underscore-dangle': 0,
      'import/no-named-as-default': 0,
      'react-hooks/rules-of-hooks': 2,
      'react-hooks/exhaustive-deps': 0,
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      '@typescript-eslint/no-unnecessary-type-constraint': 0,
      'jsx-a11y/anchor-is-valid': 'error',
      'react/function-component-definition': 0,
      'jsx-a11y/control-has-associated-label': 0,
      '@typescript-eslint/default-param-last': 0,
      'react/no-unstable-nested-components': [
        'error',
        {
          allowAsProps: true,
        },
      ],
      'react/jsx-no-constructed-context-values': 0,
    },
  },
);
