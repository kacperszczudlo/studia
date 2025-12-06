// screens/WelcomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ onAccept }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Regulamin i Polityka Prywatności</Text>
      <View style={styles.contentBox}>
        <Text style={styles.content}>
          Witamy w aplikacji Quiz! Korzystanie z naszej aplikacji wymaga akceptacji poniższego regulaminu:
          
          \n1. Dane o wynikach quizów są anonimowo przechowywane lokalnie (AsyncStorage).
          \n2. Aplikacja wymaga dostępu do sieci tylko w celu pobrania aktualnej daty (dla wyników).
          \n3. Wszystkie treści quizów są własnością twórców i przeznaczone są tylko do celów edukacyjnych i rozrywkowych.
          \n4. Kliknięcie "Akceptuję" spowoduje trwałe zapisanie Twojej zgody i nie zobaczysz tego ekranu ponownie.
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={onAccept}
      >
        <Text style={styles.buttonText}>Akceptuję i Rozpoczynam Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  contentBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  button: {
    backgroundColor: '#4CAF50', // Zielony kolor akceptacji
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default WelcomeScreen;