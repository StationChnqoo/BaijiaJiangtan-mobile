const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const config = {
  watchFolders: ['./src'],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
