import { Text, View } from '@/components/Themed';

import { COLORS } from '@/constants/Colors';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useAuthStore } from '@/src/store/authStore';

export default function ListScreen() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>리스트</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: COLORS.bgGray,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  logoutText: {
    fontSize: 14,
    color: COLORS.textDark,
  },
});
