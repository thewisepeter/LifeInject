import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  eslint.configs.recommended, // Use recommended ESLint rules
  {
    languageOptions: {
      ecmaVersion: 'latest', // Use latest ECMAScript version
      sourceType: 'module',
    },
    env: {
      browser: true,
      es2021: true,
    },
    rules: {
      'prettier/prettier': 'error', // Ensure Prettier formatting is enforced
    },
    plugins: {
      prettier: prettierPlugin,
    },
  },
  prettier, // Disable ESLint rules that conflict with Prettier
];
