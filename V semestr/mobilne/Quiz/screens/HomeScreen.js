// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // <-- DODANE

// KLUCZ, KTÓRY RESETUJEMY (ten sam, co w App.js)
const AGREEMENT_KEY = '@MyApp:agreementAccepted';

const HomeScreen = ({ navigation }) => {

  // Funkcja resetująca stan AsyncStorage
  const resetAgreement = async () => {
    try {
      await AsyncStorage.removeItem(AGREEMENT_KEY);
      Alert.alert(
        "Reset Udany!",
        "Stan akceptacji regulaminu został wyczyszczony. Zrestartuj aplikację (np. kliknij 'r' w terminalu lub odśwież stronę), aby zobaczyć ekran powitalny.",
        [{ text: "OK" }]
      );
    } catch (e) {
      Alert.alert("Błąd", "Nie udało się zresetować stanu.");
      console.error("Błąd usuwania AsyncStorage", e);
    }
  };

  return (
    <View style={styles.container}>
      {/* Sekcja Głównego Treści */}
      <View style={styles.contentBox}>
        <Text style={styles.title}>Witaj w Quiz App!</Text>
        <Text style={styles.subtitle}>Wybierz jeden z dostępnych testów z menu bocznego.</Text>
        <TouchableOpacity 
          style={styles.mainButton}
          onPress={() => navigation.navigate('Test', { testId: 1, title: 'Test title #1' })}
        >
          <Ionicons name="play-circle-outline" size={24} color="white" />
          <Text style={styles.mainButtonText}>Rozpocznij Test #1</Text>
        </TouchableOpacity>
      </View>

      {/* Stopka z przyciskiem do wyników */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.footerButton}
          onPress={() => navigation.navigate('Results')}
        >
          <Ionicons name="bar-chart-outline" size={20} color="#4A90E2" />
          <Text style={styles.footerText}>Zobacz Globalny Ranking</Text>
        </TouchableOpacity>
      </View>
      
      {/* TYMCZASOWY PRZYCISK DO TESTOWANIA FLOW APLIKACJI */}
      <TouchableOpacity 
          style={styles.resetButton}
          onPress={resetAgreement}
      >
          <Ionicons name="refresh-circle-outline" size={20} color="#D32F2F" />
          <Text style={styles.resetButtonText}>RESETUJ STAN (Ekran Powitalny)</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
    justifyContent: 'space-between',
  },
  contentBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  mainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  mainButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  footer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  footerText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFEBEE', // Bardzo jasna czerwień
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#D32F2F'
  },
  resetButtonText: {
    color: '#D32F2F',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  }
});

export default HomeScreen;