// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

// Import funkcji z utils/db.js
import { syncTests, shuffleArray } from '../utils/db';

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Służy do wykrycia parametrów przekazanych z Drawera
  
  const [testsData, setTestsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Funkcja ładująca dane
  const loadData = async (force = false) => {
    try {
      // Pobieramy dane (z sieci lub cache)
      const data = await syncTests(force);
      
      // Zadanie 2: Prezentacja testów w losowej kolejności
      const shuffledData = shuffleArray(data);
      
      setTestsData(shuffledData);
    } catch (error) {
      console.error("Błąd w HomeScreen:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Pierwsze ładowanie przy montowaniu komponentu
  useEffect(() => {
    loadData();
  }, []);

  // Reakcja na manualne odświeżenie z poziomu Drawera
  useEffect(() => {
     if(route.params?.refresh) {
         setLoading(true);
         loadData();
     }
  }, [route.params?.refresh]);

  // Obsługa pociągnięcia w dół (RefreshControl)
  const onRefresh = () => {
    setRefreshing(true);
    // Force = true wymusza pobranie z serwera
    loadData(true); 
  };

  const ModernTestCard = ({ test }) => (
    <TouchableOpacity 
      style={[styles.testCard, styles.shadow]}
      onPress={() => navigation.navigate('Test', { testId: test.id })}
    >
      <Text style={styles.cardTitle}>{test.name}</Text>
      <View style={styles.tagsContainer}>
        {test.tags && test.tags.map((tag, index) => (
          <Text key={index} style={styles.cardTag}>#{tag}</Text>
        ))}
      </View>
      <Text style={styles.cardContent}>{test.description}</Text>
      <Text style={styles.levelText}>Poziom: {test.level}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4A90E2']} />}
      >
        <View style={[styles.headerBox, styles.shadow]}>
          <Text style={styles.headerTitle}>Wybierz Quiz</Text>
          <Text style={styles.headerContent}>
             {loading ? "Sprawdzanie bazy danych..." : `Dostępnych testów: ${testsData.length}`}
          </Text>
        </View>

        {loading ? (
            <ActivityIndicator size="large" color="#4A90E2" style={{ marginTop: 20 }} />
        ) : (
            testsData.map(test => (
              <ModernTestCard key={test.id} test={test} />
            ))
        )}

        {/* Karta przejścia do rankingu */}
        <TouchableOpacity
            style={[styles.rankingCard, styles.shadow]}
            onPress={() => navigation.navigate('Results')}
        >
            <LinearGradient colors={['#4A90E2', '#00BCD4']} style={StyleSheet.absoluteFill} />
            <Text style={styles.rankingText}>Sprawdź globalny ranking</Text>
        </TouchableOpacity>
        
        {/* Pusty widok na dole dla lepszego scrollowania */}
        <View style={{height: 20}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  scrollContainer: { padding: 20 },
  shadow: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 5 },
  
  headerBox: { marginBottom: 20, padding: 20, backgroundColor: '#fff', borderRadius: 15 },
  headerTitle: { fontSize: 24, fontFamily: 'Oswald_700Bold', color: '#333', marginBottom: 5 },
  headerContent: { fontSize: 16, fontFamily: 'Lato_400Regular', color: '#666' },
  
  testCard: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 15, borderLeftWidth: 5, borderLeftColor: '#4A90E2' },
  cardTitle: { fontSize: 18, fontFamily: 'Oswald_700Bold', marginBottom: 8, color: '#333' },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  cardTag: { backgroundColor: '#E6F0FF', color: '#4A90E2', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 15, fontSize: 12, marginRight: 8, fontFamily: 'Lato_400Regular' },
  cardContent: { fontSize: 14, color: '#666', fontFamily: 'Lato_400Regular' },
  levelText: { fontSize: 12, color: '#999', marginTop: 10, textAlign: 'right', fontStyle: 'italic', fontFamily: 'Lato_400Regular' },
  
  rankingCard: { height: 80, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10, overflow: 'hidden' },
  rankingText: { fontSize: 18, fontFamily: 'Oswald_700Bold', color: '#fff', zIndex: 1 },
});

export default HomeScreen;