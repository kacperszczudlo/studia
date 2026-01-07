// screens/TestScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import ProgressBar from '../components/ProgressBar';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Import funkcji z utils/db.js
import { getLocalTests, shuffleArray } from '../utils/db';

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

  useEffect(() => {
    const prepareTest = async () => {
      // 1. Pobieramy testy z lokalnej pamięci (AsyncStorage)
      // Dzięki temu test działa nawet bez internetu [Zadanie 4]
      const allTests = await getLocalTests();
      const targetTest = allTests.find(t => t.id === testId);

      if (targetTest && targetTest.tasks && targetTest.tasks.length > 0) {
        setTestInfo(targetTest);
        
        // 2. Mieszanie pytań (Shuffle Tasks) [Zadanie 2]
        let shuffledQuestions = shuffleArray(targetTest.tasks);

        // 3. Mieszanie odpowiedzi wewnątrz każdego pytania [Zadanie 2]
        shuffledQuestions = shuffledQuestions.map(q => ({
            ...q,
            answers: shuffleArray(q.answers)
        }));

        setQuestions(shuffledQuestions);
        setLoading(false);
      } else {
        Alert.alert(
            "Błąd", 
            "Nie znaleziono szczegółów testu. Sprawdź połączenie z internetem i pobierz bazę ponownie.",
            [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      }
    };
    prepareTest();
  }, [testId]);

  // Funkcja wysyłająca wynik na serwer
  const sendResults = async (finalScore) => {
    const payload = {
      nick: "Student", // Można tu dodać logikę pobierania nicku z AsyncStorage
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
      console.log("Wynik wysłany na serwer.");
    } catch (error) {
      // W trybie offline fetch rzuci błąd - to normalne
      console.log("Jesteś offline - wynik nie został wysłany na serwer.");
    }
  };

  const handleAnswer = (answer) => {
    if (selectedAnswer !== null) return; // Blokada wielokrotnego klikania
    setSelectedAnswer(answer);
    if (answer.isCorrect) setScore(prev => prev + 1);
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      // Koniec testu
      const finalScore = score + (selectedAnswer?.isCorrect ? 0 : 0);
      
      // Próba wysłania wyniku
      await sendResults(finalScore); 
      
      Alert.alert(
        "Koniec Quizu!",
        `Twój wynik: ${finalScore}/${questions.length}.\n${testInfo.name}`,
        [{ text: "WRÓĆ DO LISTY", onPress: () => navigation.navigate('Results') }]
      );
    }
  };

  // Dynamiczne style dla przycisków odpowiedzi
  const getButtonStyle = (answer) => {
    let style = [styles.answerButton, styles.shadow];
    
    // Jeśli użytkownik już wybrał jakąś odpowiedź
    if (selectedAnswer !== null) {
        if (answer === selectedAnswer) {
             // Wybrana przez użytkownika: zielona jeśli dobra, czerwona jeśli zła
            style.push(answer.isCorrect ? styles.correctAnswer : styles.incorrectAnswer);
        } else if (answer.isCorrect) {
            // Pokaż poprawną odpowiedź, nawet jeśli użytkownik wybrał inną
            style.push(styles.correctAnswer);
        }
    }
    return style;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Przygotowywanie pytań...</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      {/* Nagłówek postępu */}
      <View style={styles.progressHeader}>
        <Text style={styles.progressText}>Pytanie {currentQuestionIndex + 1}/{questions.length}</Text>
        <View style={styles.timeBox}>
            <Ionicons name="time-outline" size={18} color="#4A90E2" />
            <Text style={styles.timeText}>{currentQuestion.duration}s</Text>
        </View>
      </View>
      
      <ProgressBar progress={(currentQuestionIndex + 1) / questions.length} />
      
      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
          {/* Box z pytaniem */}
          <View style={[styles.questionBox, styles.shadow]}>
            <Text style={styles.questionTitle}>{testInfo.name}</Text>
            <Text style={styles.mainQuestionText}>{currentQuestion.question}</Text>
          </View>

          {/* Odpowiedzi */}
          <View style={styles.answersContainer}>
            {currentQuestion.answers.map((answer, index) => (
                <TouchableOpacity 
                    key={index}
                    style={getButtonStyle(answer)} 
                    onPress={() => handleAnswer(answer)}
                    disabled={selectedAnswer !== null}
                    activeOpacity={0.7}
                >
                    <Text style={styles.answerText}>{answer.content}</Text>
                </TouchableOpacity>
            ))}
          </View>
          
          {/* Przycisk Dalej/Koniec */}
          {selectedAnswer !== null && (
            <TouchableOpacity style={[styles.submitButton, styles.shadow]} onPress={handleNext}>
                <Text style={styles.submitButtonText}>
                  {currentQuestionIndex < questions.length - 1 ? 'Następne Pytanie' : 'Zakończ Test'}
                </Text>
            </TouchableOpacity>
          )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F7FA' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontFamily: 'Lato_400Regular', marginTop: 10, color: '#666' },
  
  shadow: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 4 },
  
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  progressText: { fontSize: 16, fontFamily: 'Lato_700Bold', color: '#666' },
  
  timeBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E6F0FF', padding: 5, borderRadius: 5 },
  timeText: { marginLeft: 5, color: '#4A90E2', fontFamily: 'Lato_700Bold' },
  
  questionBox: { backgroundColor: '#fff', padding: 25, borderRadius: 15, marginVertical: 20 },
  questionTitle: { fontSize: 14, fontFamily: 'Oswald_400Regular', color: '#4A90E2', marginBottom: 5, textTransform: 'uppercase' },
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