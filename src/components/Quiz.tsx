import * as Speech from 'expo-speech';

import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';

import { COLORS } from '@/constants/Colors';
import Entypo from '@expo/vector-icons/Entypo';

export interface Word {
  wordId: string;
  jp: string;
  kana: string;
  ko: string;
}

interface QuizProps {
  words: Word[];
  onComplete: (score: number, total: number) => void;
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Quiz({ words, onComplete }: QuizProps) {
  const shuffledWords = useMemo(() => shuffle(words), [words]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentWord = shuffledWords[currentIndex];
  const total = shuffledWords.length;

  const choices = useMemo(() => {
    const correctAnswer = currentWord.ko;
    const wrongAnswers = shuffle(shuffledWords.filter((w) => w.ko !== correctAnswer).map((w) => w.ko)).slice(0, 3);
    return shuffle([correctAnswer, ...wrongAnswers]);
  }, [currentWord, shuffledWords]);

  const handleSelect = useCallback(
    (answer: string) => {
      if (selectedAnswer !== null) return;

      const correct = answer === currentWord.ko;
      setSelectedAnswer(answer);
      setIsCorrect(correct);

      const newScore = correct ? score + 1 : score;
      if (correct) setScore(newScore);

      setTimeout(() => {
        if (currentIndex + 1 < total) {
          setCurrentIndex(currentIndex + 1);
          setSelectedAnswer(null);
          setIsCorrect(null);
        } else {
          onComplete(newScore, total);
        }
      }, 1000);
    },
    [selectedAnswer, currentWord, score, currentIndex, total, onComplete]
  );

  const getButtonStyle = (answer: string) => {
    if (selectedAnswer === null) return styles.choiceButton;
    if (answer === currentWord.ko) return [styles.choiceButton, styles.correctButton];
    if (answer === selectedAnswer && !isCorrect) return [styles.choiceButton, styles.wrongButton];
    return [styles.choiceButton, styles.disabledButton];
  };

  const getButtonTextStyle = (answer: string) => {
    if (selectedAnswer === null) return styles.choiceText;
    if (answer === currentWord.ko) return [styles.choiceText, styles.correctText];
    if (answer === selectedAnswer && !isCorrect) return [styles.choiceText, styles.wrongText];
    return [styles.choiceText, styles.disabledText];
  };

  const speakJapanese = (text: string, isExample: boolean = false) => {
    Speech.stop();
    Speech.speak(text, {
      language: 'ja-JP',
      rate: isExample ? 0.4 : 0.5,
      pitch: 1.0,
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.progress}>
        {currentIndex + 1} / {total}
      </Text>

      <View style={styles.questionCard}>
        <Text style={styles.jpText}>{currentWord.jp}</Text>
        <Text style={styles.kanaText}>{currentWord.kana}</Text>
        <Entypo className="mt-4" name="megaphone" size={24} color="#B1CFE9" onPress={() => speakJapanese(currentWord.jp)} />
      </View>

      <View style={styles.choicesContainer}>
        {choices.map((choice, index) => (
          <TouchableOpacity key={`${currentIndex}-${index}`} style={getButtonStyle(choice)} onPress={() => handleSelect(choice)} activeOpacity={selectedAnswer !== null ? 1 : 0.7}>
            <Text style={getButtonTextStyle(choice)}>{choice}</Text>
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
    paddingTop: 20,
  },
  progress: {
    fontSize: 16,
    color: COLORS.textMedium,
    textAlign: 'center',
    marginBottom: 24,
  },
  questionCard: {
    alignItems: 'center',
    paddingVertical: 40,
    marginBottom: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  jpText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  kanaText: {
    fontSize: 18,
    color: COLORS.textMedium,
  },
  choicesContainer: {
    gap: 12,
  },
  choiceButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.bgWhite,
  },
  correctButton: {
    backgroundColor: '#E8F5E9',
    borderColor: COLORS.success,
  },
  wrongButton: {
    backgroundColor: '#FFEBEE',
    borderColor: COLORS.error,
  },
  disabledButton: {
    opacity: 0.5,
  },
  choiceText: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.textDark,
  },
  correctText: {
    color: COLORS.success,
    fontWeight: 'bold',
  },
  wrongText: {
    color: COLORS.error,
    fontWeight: 'bold',
  },
  disabledText: {
    color: COLORS.textLight,
  },
});
