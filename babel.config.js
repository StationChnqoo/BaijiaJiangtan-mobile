module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@src': './src/',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // 确保支持的扩展名
      },
    ],
    ['react-native-reanimated/plugin', {disableInlineStylesWarning: true}],
  ],
};
