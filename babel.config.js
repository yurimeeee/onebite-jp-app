module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'nativewind/babel'],
    plugins: [
      // Reanimated은 항상 마지막에 위치
      'react-native-reanimated/plugin',
    ],
  };
};
