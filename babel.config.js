module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@babel/plugin-transform-export-namespace-from',
    ['module-resolver', {root: ['./'], alias: {'@app': './src/app', '@features': './src/features', '@components': './src/components', '@services': './src/services', '@theme': './src/theme', '@utils': './src/utils', '@types': './src/types', '@hooks': './src/hooks'}}],
    'react-native-worklets/plugin',
  ],
};
