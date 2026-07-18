module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'no-void': 'off',
    // Theme values are resolved at runtime and composed with static StyleSheets.
    'react-native/no-inline-styles': 'off',
  },
  overrides: [
    {
      files: ['e2e/**/*.js'],
      env: {jest: true},
      globals: {device: 'readonly', element: 'readonly', by: 'readonly'},
    },
  ],
};
