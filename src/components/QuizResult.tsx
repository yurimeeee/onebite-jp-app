import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { COLORS } from '@/constants/Colors';

interface QuizResultProps {
  score: number;
  total: number;
  onRetry: () => void;
  onBack: () => void;
}

export default function QuizResult({ score, total, onRetry, onBack }: QuizResultProps) {
  const percentage = Math.round((score / total) * 100);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>퀴즈 결과</Text>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreText}>
          {score} / {total}
        </Text>
        <Text style={styles.percentText}>{percentage}%</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>다시 풀기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>돌아가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  scoreCard: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 40,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  percentText: {
    fontSize: 20,
    color: COLORS.textMedium,
    marginTop: 8,
  },
  buttons: {
    width: '100%',
    gap: 12,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  retryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textWhite,
  },
  backButton: {
    backgroundColor: COLORS.bgGray,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    color: COLORS.textDark,
  },
});
