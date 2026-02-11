// 앱 전역 컬러 상수

export const COLORS = {
  // Primary
  primary: '#FF6B6B',
  primaryLight: '#FF8E8E',
  primaryDark: '#E55A5A',

  // Text
  textBlack: '#000',
  textDark: '#333',
  textMedium: '#666',
  textLight: '#888',
  textPlaceholder: '#999',
  textWhite: '#fff',

  // Background
  bgWhite: '#fff',
  bgBlack: '#000',
  bgLight: '#f9f9f9',
  bgGray: '#eee',
  bgDark: '#121212',

  // Border
  border: '#ddd',
  borderDark: '#444',

  // Tab
  tabIconDefault: '#ccc',
  tintLight: '#2f95dc',
  tintDark: '#fff',

  // Status
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',
};

// 라이트/다크 테마
export default {
  light: {
    text: COLORS.textBlack,
    background: COLORS.bgWhite,
    tint: COLORS.tintLight,
    tabIconDefault: COLORS.tabIconDefault,
    tabIconSelected: COLORS.tintLight,
  },
  dark: {
    text: COLORS.textWhite,
    background: COLORS.bgBlack,
    tint: COLORS.tintDark,
    tabIconDefault: COLORS.tabIconDefault,
    tabIconSelected: COLORS.tintDark,
  },
};
