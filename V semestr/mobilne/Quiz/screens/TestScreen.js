// screens/TestScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ProgressBar from '../components/ProgressBar';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { QUIZ_QUESTIONS } from '../data/quizData'; 

const TestScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { testId } = route.params || {};
  
  const quizData = QUIZ_QUESTIONS.find(q => q.id === testId) || QUIZ_QUESTIONS[0];
  const questions = quizData.questions;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const timeLimit = quizData.duration;
  
  // Funkcja obsługująca wybór odpowiedzi
  const handleAnswer = (answer) => {
    if (selectedAnswer !== null) return; 
    setSelectedAnswer(answer);
    
    if (answer.isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
  };

  // Funkcja przejścia do następnego pytania lub zakończenia testu
  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null); 
    } else {
      // Zakończenie testu i prezentacja rezultatu
      Alert.alert(
        "Quiz zakończony!", 
        `Twój wynik: ${score}/${totalQuestions}. Przejdź do wyników, aby sprawdzić ranking!`,
        [
            { 
                text: "OK", 
                onPress: () => navigation.navigate('Results') 
            }
        ]
      );
    }
  };

  const getButtonStyle = (answer) => {
    let style = [styles.answerButton, styles.shadow];
    if (selectedAnswer === answer) {
        style.push(answer.isCorrect ? styles.correctAnswer : styles.incorrectAnswer);
    } else if (selectedAnswer !== null && answer.isCorrect) {
        style.push(styles.correctAnswer); 
    }
    return style;
  };

  return (
    <View style={styles.container}>
      {/* Nagłówek i Czas */}
      <View style={styles.progressHeader}>
        <Text style={styles.progressText}>Pytanie {currentQuestionIndex + 1}/{totalQuestions}</Text>
        <View style={styles.timeBox}>
            <Ionicons name="time-outline" size={18} color="#4A90E2" />
            <Text style={styles.timeText}>{timeLimit}s</Text>
        </View>
      </View>
      
      {/* Pasek Postępu */}
      <ProgressBar progress={(currentQuestionIndex + 1) / totalQuestions} />
      
      {/* Kontener pytania */}
      <View style={[styles.questionBox, styles.shadow]}>
        <Text style={styles.questionTitle}>{quizData.title}</Text>
        <Text style={styles.mainQuestionText}>
          {currentQuestion.question}
        </Text>
      </View>

      {/* Opcje odpowiedzi (2x2) */}
      <View style={styles.answersContainer}>
        {currentQuestion.answers.map((answer, index) => (
            <TouchableOpacity 
                key={index}
                style={getButtonStyle(answer)} 
                onPress={() => handleAnswer(answer)}
                disabled={selectedAnswer !== null}
            >
                <Text style={styles.answerText}>{answer.content}</Text>
            </TouchableOpacity>
        ))}
      </View>
      
      {selectedAnswer !== null && (
        <TouchableOpacity style={[styles.submitButton, styles.shadow]} onPress={handleNext}>
            <Text style={styles.submitButtonText}>
              {currentQuestionIndex < totalQuestions - 1 ? 'Następne Pytanie' : 'Zakończ Test'}
            </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  timeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F0FF',
    padding: 5,
    borderRadius: 5,
  },
  timeText: {
    marginLeft: 5,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  questionBox: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    marginVertical: 20,
  },
  questionTitle: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  mainQuestionText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  answersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  answerButton: {
    width: '48%', 
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  answerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  correctAnswer: {
    borderColor: '#4CAF50', 
    backgroundColor: '#E8F5E9',
  },
  incorrectAnswer: {
    borderColor: '#D32F2F', 
    backgroundColor: '#FFEBEE',
  },
  submitButton: {
    backgroundColor: '#00BCD4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default TestScreen;