// eslint.config.js
import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import tsEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';

export default [
  // Cấu hình file cần lint
  {
    files: ['src/**/*.{js,ts,vue}'],
    ignores: ['dist/**', 'node_modules/**'],
  },

  // Quy tắc cơ bản từ ESLint
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
    },
  },

  // Cấu hình cho Vue
  ...pluginVue.configs['flat/recommended'], // Sử dụng bộ quy tắc khuyến nghị cho Vue 3

  // Cấu hình cho TypeScript trong Vue
  ...vueTsEslintConfig(),

  // Cấu hình parser cho các file .vue
  {
    files: ['src/**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser, // Sử dụng TypeScript parser cho <script>
        sourceType: 'module',
      },
    },
  },

  // Quy tắc bổ sung cho TypeScript
  {
    files: ['src/**/*.{ts,vue}'],
    plugins: {
      '@typescript-eslint': tsEslint,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-function-return-type': 'off', // Tùy chỉnh theo nhu cầu
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];