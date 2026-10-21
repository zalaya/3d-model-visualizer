import tsParser from '@typescript-eslint/parser'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default [
  { ignores: ['dist/'] },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: { parser: tsParser },
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      'simple-import-sort/imports': ['error', { groups: [['^']] }],
      'simple-import-sort/exports': 'error',
      eqeqeq: 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/*/*'],
              message: "Import features through their public API (e.g. '@/features/viewer')."
            }
          ]
        }
      ]
    }
  }
]
