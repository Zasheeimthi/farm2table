import js from '@eslint/js';
import globals from 'globals';
import next from '@next/eslint-plugin-next';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  {
    ignores: ['.next/**', 'node_modules/**', 'public/**', 'build/**', 'out/**', 'scripts/**']
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true }
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      '@next/next': next,
      react,
      'react-hooks': reactHooks
    },
    rules: {
      'no-undef': 'error',
      // JSX components count as usage, otherwise every component import looks unused.
      'react/jsx-uses-vars': 'error',
      'react/jsx-uses-react': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^React$' }],
      'no-empty': ['error', { allowEmptyCatch: true }],
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules
    },
    settings: {
      react: { version: 'detect' }
    }
  }
];
