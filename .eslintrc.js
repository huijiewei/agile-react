module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended', 'prettier'],
  rules: { 'react/jsx-uses-react': 'off', 'react/react-in-jsx-scope': 'off' },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
};
