// App.js
import 'react-native-gesture-handler'; // TA LINIA MUSI BYĆ PIERWSZA!
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { TouchableOpacity, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import * as SplashScreen from 'expo-splash-screen'; // Import dla Splash Screenu

// Import ekranów
import HomeScreen from './screens/HomeScreen';
import TestScreen from './screens/TestScreen';
import ResultsScreen from './screens/ResultsScreen';
import WelcomeScreen from './screens/WelcomeScreen';

// KLUCZ ASYNCSTORAGE
const AGREEMENT_KEY = '@MyApp:agreementAccepted';

// Zapobieganie automatycznemu ukryciu Splash Screenu (abyśmy mogli kontrolować ten moment)
SplashScreen.preventAutoHideAsync();

// --- Komponent przycisku w szufladzie ---
const DrawerItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={drawerStyles.itemContainer} onPress={onPress}>
    <Ionicons name={icon} size={24} color="#333" style={drawerStyles.icon} />
    <Text style={drawerStyles.itemLabel}>{label}</Text>
  </TouchableOpacity>
);

// --- Niestandardowa zawartość Drawera ---
const CustomDrawerContent = (props) => {
  const testTitles = [
    { id: 1, title: 'Test title #1', icon: 'flask-outline' },
    { id: 2, title: 'Test title #2', icon: 'flask-outline' },
    { id: 3, title: 'Test title #3', icon: 'flask-outline' },
  ];

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ padding: 0 }}>
      {/* Nagłówek Drawera */}
      <View style={drawerStyles.header}>
        <Ionicons name="bulb-outline" size={50} color="#fff" />
        <Text style={drawerStyles.appTitle}>Quiz App</Text>
      </View>
      
      {/* Główne przyciski nawigacyjne */}
      <View style={drawerStyles.mainSection}>
        <DrawerItem 
          icon="home-outline" 
          label="Home Page" 
          onPress={() => props.navigation.navigate('Home')} 
        />
        <DrawerItem 
          icon="bar-chart-outline" 
          label="Results (Ranking)" 
          onPress={() => props.navigation.navigate('Results')} 
        />
      </View>

      {/* Lista Testów */}
      <Text style={drawerStyles.sectionTitle}>Dostępne Testy</Text>
      <View style={drawerStyles.testSection}>
        {testTitles.map((test) => (
          <DrawerItem 
            key={test.id}
            icon={test.icon} 
            label={test.title} 
            onPress={() => props.navigation.navigate('Test', { testId: test.id, title: test.title })} 
          />
        ))}
      </View>
    </DrawerContentScrollView>
  );
};

const drawerStyles = StyleSheet.create({
  header: {
    backgroundColor: '#4A90E2', 
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  mainSection: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
    marginHorizontal: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
  },
  icon: {
    marginRight: 15,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999',
    marginTop: 10,
    marginLeft: 20,
    textTransform: 'uppercase',
  },
  testSection: {
    paddingHorizontal: 10,
  }
});

const Drawer = createDrawerNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [agreementAccepted, setAgreementAccepted] = useState(false);

  useEffect(() => {
    const checkAgreement = async () => {
      try {
        const value = await AsyncStorage.getItem(AGREEMENT_KEY);
        if (value === 'true') {
          setAgreementAccepted(true);
        }
      } catch (e) {
        console.error("Błąd odczytu AsyncStorage", e);
      } finally {
        setLoading(false);
        // Ukrywamy Splash Screen dopiero po zakończeniu ładowania danych
        SplashScreen.hideAsync();
      }
    };
    checkAgreement();
  }, []);

  const handleAccept = async () => {
    try {
      await AsyncStorage.setItem(AGREEMENT_KEY, 'true');
      setAgreementAccepted(true);
    } catch (e) {
      console.error("Błąd zapisu AsyncStorage", e);
    }
  };

  // 1. Stan ładowania (widoczny przez ułamek sekundy, po zniknięciu Splash Screenu)
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={{ marginTop: 10 }}>Ładowanie...</Text>
      </View>
    );
  }

  // 2. Ekran powitalny (tylko, jeśli zgoda NIE została zaakceptowana)
  if (!agreementAccepted) {
    return <WelcomeScreen onAccept={handleAccept} />;
  }
  
  // 3. Główna aplikacja (gdy zgoda została zaakceptowana)
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: 'transparent', 
            elevation: 0,
          },
          headerTitleStyle: {
              fontWeight: 'bold',
              color: '#333',
          },
          headerLeftContainerStyle: {
              paddingLeft: 10
          }
        }}
      >
        <Drawer.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'HOME PAGE' }} 
        />
        <Drawer.Screen 
          name="Test" 
          component={TestScreen} 
          options={({ route }) => ({ 
            title: route.params?.title || 'TEST W TOKU',
            drawerItemStyle: { display: 'none' } 
          })}
        />
        <Drawer.Screen 
          name="Results" 
          component={ResultsScreen} 
          options={{ title: 'WYNIKI RANKINGU' }} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;