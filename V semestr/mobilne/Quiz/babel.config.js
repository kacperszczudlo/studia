module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin', // <-- To jest kluczowe dla działania Menu bocznego (Drawer)
    ],
  };
};