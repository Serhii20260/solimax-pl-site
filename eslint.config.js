// eslint.config.js — flat config під ESLint 9
//
// Конфіг був відсутній: у package.json є скрипт "lint": "eslint .", але
// самого конфігу в релізному архіві не збереглося, тому команда падала.
// Набір правил свідомо мінімальний: мета — ловити реальні дефекти
// (невикористані змінні, забуті залежності хуків, порушення правил хуків),
// а не переформатовувати наявний код.
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**', 'solimax-pl-backend/**'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // Невикористані аргументи з підкресленням — норма (сигнатури колбеків).
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      // 42 входження any по всьому коду — це стилістичний борг, а не дефект.
      // Тримаємо як попередження, щоб воно не заглушало 5 справжніх знахідок
      // у правилах react-hooks. Прибирати any — окрема робота.
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
);
