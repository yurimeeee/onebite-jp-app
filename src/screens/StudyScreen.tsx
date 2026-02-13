import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import { Text, View } from '@/components/Themed';
import { COLORS } from '@/constants/Colors';
import { db } from '@/src/services/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import Quiz, { Word } from '@/src/components/Quiz';
import QuizResult from '@/src/components/QuizResult';

type Screen = 'level' | 'day' | 'quiz' | 'result';

const LEVELS = [
  { key: 'beginner', label: '초급' },
  { key: 'elementary', label: '초중급' },
  { key: 'intermediate', label: '중급' },
  { key: 'advanced', label: '고급' },
];

export default function StudyScreen() {
  const [screen, setScreen] = useState<Screen>('level');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [days, setDays] = useState<number[]>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const handleSelectLevel = async (level: string) => {
    setSelectedLevel(level);
    setLoading(true);
    try {
      const daysRef = collection(db, 'quizzes', level, 'days');
      const snapshot = await getDocs(daysRef);
      const dayNumbers = snapshot.docs
        .map((d) => {
          const data = d.data();
          return data.day as number;
        })
        .sort((a, b) => a - b);
      setDays(dayNumbers);
      setScreen('day');
    } catch {
      Alert.alert('오류', '데이터를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDay = async (day: number) => {
    setLoading(true);
    try {
      const dayDoc = doc(db, 'quizzes', selectedLevel, 'days', `day${day}`);
      const snapshot = await getDoc(dayDoc);
      if (!snapshot.exists()) {
        Alert.alert('오류', '해당 일차 데이터가 없습니다.');
        return;
      }
      const data = snapshot.data();
      setWords(data.words as Word[]);
      setScreen('quiz');
    } catch {
      Alert.alert('오류', '단어를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuizComplete = (s: number, t: number) => {
    setScore(s);
    setTotal(t);
    setScreen('result');
  };

  const handleRetry = () => {
    setScreen('quiz');
  };

  const handleBack = () => {
    setScreen('level');
    setSelectedLevel('');
    setDays([]);
    setWords([]);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (screen === 'quiz') {
    return <Quiz key={Date.now()} words={words} onComplete={handleQuizComplete} />;
  }

  if (screen === 'result') {
    return (
      <QuizResult
        score={score}
        total={total}
        onRetry={handleRetry}
        onBack={handleBack}
      />
    );
  }

  if (screen === 'day') {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backNav} onPress={handleBack}>
          <Text style={styles.backNavText}>← 레벨 선택</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {LEVELS.find((l) => l.key === selectedLevel)?.label}
        </Text>
        <Text style={styles.subtitle}>일차를 선택하세요</Text>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.dayGrid}
        >
          {days.map((day) => (
            <TouchableOpacity
              key={day}
              style={styles.dayButton}
              onPress={() => handleSelectDay(day)}
            >
              <Text style={styles.dayText}>Day {day}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  // Level selection (default)
  return (
    <View style={styles.centered}>
      <Text style={styles.title}>학습</Text>
      <Text style={styles.subtitle}>레벨을 선택하세요</Text>
      <View style={styles.levelList}>
        {LEVELS.map((level) => (
          <TouchableOpacity
            key={level.key}
            style={styles.levelButton}
            onPress={() => handleSelectLevel(level.key)}
          >
            <Text style={styles.levelText}>{level.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textMedium,
    marginBottom: 24,
    textAlign: 'center',
  },
  levelList: {
    width: '100%',
    gap: 12,
  },
  levelButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  levelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textWhite,
  },
  backNav: {
    paddingVertical: 12,
  },
  backNavText: {
    fontSize: 16,
    color: COLORS.primary,
  },
  scrollView: {
    flex: 1,
  },
  dayGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: 24,
  },
  dayButton: {
    width: '30%',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    backgroundColor: COLORS.bgWhite,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDark,
  },
});
