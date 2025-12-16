// screens/TestScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import ProgressBar from '../components/ProgressBar';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const TestScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { testId } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [testInfo, setTestInfo] = useState({});
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // 1. Pobieranie szczegółów testu (Zadanie 4 - Lab 9)
  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const response = await fetch(`https://tgryl.pl/quiz/test/${testId}`);
        const data = await response.json();
        
        // API zwraca obiekt z polem 'tasks' (pytania)
        setQuestions(data.tasks); 
        setTestInfo(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        Alert.alert("Błąd", "Nie udało się pobrać testu.");
        navigation.goBack();
      }
    };
    fetchTestDetails();
  }, [testId]);

  // 2. Wysyłanie wyników (Zadanie 3 - Lab 9)
  const sendResults = async (finalScore) => {
    const payload = {
      nick: "Student", // Tutaj możesz wpisać swoje imię/nick
      score: finalScore,
      total: questions.length,
      type: testInfo.tags ? testInfo.tags[0] : 'quiz'
    };

    try {
      await fetch('https://tgryl.pl/quiz/result', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      console.log("Wynik wysłany!");
    } catch (error) {
      console.error("Błąd wysyłania wyniku", error);
    }
  };

  const handleAnswer = (answer) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answer);
    if (answer.isCorrect) setScore(prev => prev + 1);
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      // Koniec testu - wyślij wynik
      const finalScore = score + (selectedAnswer?.isCorrect ? 0 : 0);
      await sendResults(finalScore); 
      
      Alert.alert(
        "Koniec Quizu!",
        `Twój wynik: ${finalScore}/${questions.length}. Wynik został wysłany na serwer.`,
        [{ text: "OK", onPress: () => navigation.navigate('Results') }]
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={{fontFamily: 'Lato_400Regular'}}>Pobieranie pytań...</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressText}>Pytanie {currentQuestionIndex + 1}/{questions.length}</Text>
        <View style={styles.timeBox}>
            <Ionicons name="time-outline" size={18} color="#4A90E2" />
            <Text style={styles.timeText}>{currentQuestion.duration}s</Text>
        </View>
      </View>
      
      <ProgressBar progress={(currentQuestionIndex + 1) / questions.length} />
      
      <View style={[styles.questionBox, styles.shadow]}>
        <Text style={styles.questionTitle}>{testInfo.name}</Text>
        <Text style={styles.mainQuestionText}>{currentQuestion.question}</Text>
      </View>

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
              {currentQuestionIndex < questions.length - 1 ? 'Następne' : 'Zakończ'}
            </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F7FA' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  shadow: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 4 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  
  // ZASTOSOWANIE FONTÓW:
  progressText: { fontSize: 16, fontFamily: 'Lato_700Bold', color: '#666' },
  
  timeBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E6F0FF', padding: 5, borderRadius: 5 },
  timeText: { marginLeft: 5, color: '#4A90E2', fontFamily: 'Lato_700Bold' },
  questionBox: { backgroundColor: '#fff', padding: 25, borderRadius: 15, marginVertical: 20 },
  questionTitle: { fontSize: 14, fontFamily: 'Oswald_400Regular', color: '#4A90E2', marginBottom: 5 },
  mainQuestionText: { fontSize: 20, fontFamily: 'Lato_700Bold', marginBottom: 10, color: '#333' },
  answersContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  answerButton: { width: '100%', backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#E0E0E0' },
  answerText: { fontSize: 16, fontFamily: 'Lato_400Regular', color: '#333' },
  correctAnswer: { borderColor: '#4CAF50', backgroundColor: '#E8F5E9' },
  incorrectAnswer: { borderColor: '#D32F2F', backgroundColor: '#FFEBEE' },
  submitButton: { backgroundColor: '#00BCD4', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  submitButtonText: { color: 'white', fontSize: 18, fontFamily: 'Oswald_700Bold' }
});

export default TestScreen;