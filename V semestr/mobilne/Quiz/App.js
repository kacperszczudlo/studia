// App.js
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { TouchableOpacity, View, Text, StyleSheet, Alert, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import NetInfo from '@react-native-community/netinfo';

// Import Fontów
import { useFonts, Oswald_400Regular, Oswald_700Bold } from '@expo-google-fonts/oswald';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';

// Import Ekranów
import HomeScreen from './screens/HomeScreen';
import TestScreen from './screens/TestScreen';
import ResultsScreen from './screens/ResultsScreen';
import WelcomeScreen from './screens/WelcomeScreen';

// Import Logiki Bazy Danych
import { syncTests, getLocalTests } from './utils/db';

const AGREEMENT_KEY = '@MyApp:agreementAccepted';

// Zapobiegamy ukryciu SplashScreen dopóki aplikacja nie będzie gotowa
SplashScreen.preventAutoHideAsync();

// Komponent pojedynczego elementu w menu Drawer
const DrawerItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={drawerStyles.itemContainer} onPress={onPress}>
    <Ionicons name={icon} size={24} color="#333" style={drawerStyles.icon} />
    <Text style={drawerStyles.itemLabel}>{label}</Text>
  </TouchableOpacity>
);

// Zawartość menu bocznego
const CustomDrawerContent = (props) => {
  
  // Funkcja: Losuj Test (Zadanie 1)
  const handleRandomTest = async () => {
    const tests = await getLocalTests();
    if (tests && tests.length > 0) {
      const randomIndex = Math.floor(Math.random() * tests.length);
      const randomTestId = tests[randomIndex].id;
      // Nawigacja do wylosowanego testu
      props.navigation.navigate('Test', { testId: randomTestId });
    } else {
      Alert.alert("Błąd", "Brak testów w bazie lokalnej. Pobierz je najpierw.");
    }
  };

  // Funkcja: Ręczne pobranie testów (Zadanie 1)
  const handleManualSync = async () => {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
        Alert.alert("Błąd", "Brak połączenia z internetem! Nie można pobrać nowych testów.");
        return;
    }
    
    // true = wymuszenie pobrania niezależnie od daty
    const data = await syncTests(true);
    
    if (data && data.length > 0) {
        Alert.alert("Sukces", "Baza testów została zaktualizowana!");
        // Przekazujemy parametr refresh, aby HomeScreen się odświeżył
        props.navigation.navigate('Home', { refresh: Date.now() }); 
    } else {
        Alert.alert("Info", "Nie udało się pobrać danych lub baza jest pusta.");
    }
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ padding: 0 }}>
      <View style={drawerStyles.header}>
        <Ionicons name="bulb-outline" size={50} color="#fff" />
        <Text style={drawerStyles.appTitle}>Quiz App</Text>
      </View>
      <View style={drawerStyles.mainSection}>
        <DrawerItem icon="home-outline" label="Strona Główna" onPress={() => props.navigation.navigate('Home')} />
        <DrawerItem icon="bar-chart-outline" label="Wyniki" onPress={() => props.navigation.navigate('Results')} />
        
        {/* Separator */}
        <View style={{ height: 1, backgroundColor: '#eee', marginVertical: 10 }} />
        
        {/* Nowe funkcjonalności */}
        <DrawerItem icon="shuffle-outline" label="Losuj Test" onPress={handleRandomTest} />
        <DrawerItem icon="cloud-download-outline" label="Pobierz Testy" onPress={handleManualSync} />
      </View>
    </DrawerContentScrollView>
  );
};

const drawerStyles = StyleSheet.create({
    header: { backgroundColor: '#4A90E2', padding: 20, paddingTop: 60, alignItems: 'center', marginBottom: 10 },
    appTitle: { fontSize: 22, fontFamily: 'Oswald_700Bold', color: '#fff', marginTop: 10 },
    mainSection: { borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10, marginHorizontal: 10 },
    itemContainer: { flexDirection: 'row', alignItems: 'center', padding: 12, marginVertical: 4, borderRadius: 8 },
    icon: { marginRight: 15 },
    itemLabel: { fontSize: 16, fontFamily: 'Lato_400Regular', color: '#333' },
});

const Drawer = createDrawerNavigator();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [agreementAccepted, setAgreementAccepted] = useState(false);

  // Ładowanie fontów
  let [fontsLoaded] = useFonts({
    Oswald_400Regular,
    Oswald_700Bold,
    Lato_400Regular,
    Lato_700Bold,
  });

  useEffect(() => {
    const prepare = async () => {
      try {
        // Sprawdzenie akceptacji regulaminu
        const value = await AsyncStorage.getItem(AGREEMENT_KEY);
        if (value === 'true') setAgreementAccepted(true);
        
        // Próba synchronizacji przy starcie (Zadanie 3 i 4)
        // Funkcja syncTests sama zdecyduje czy pobrać z sieci czy z cache
        await syncTests(); 

      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    };
    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  // Jeśli regulamin niezaakceptowany, pokaż WelcomeScreen
  if (!agreementAccepted) {
    const handleAccept = async () => {
      await AsyncStorage.setItem(AGREEMENT_KEY, 'true');
      setAgreementAccepted(true);
    };
    return <WelcomeScreen onAccept={handleAccept} />;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: { backgroundColor: '#fff', elevation: 0, shadowOpacity: 0 },
          headerTitleStyle: { fontFamily: 'Oswald_700Bold', color: '#333' },
          headerLeftContainerStyle: { paddingLeft: 10 }
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'QUIZ APP' }} />
        <Drawer.Screen 
            name="Test" 
            component={TestScreen} 
            options={{ 
                title: 'TEST', 
                drawerItemStyle: { display: 'none' }, // Ukrycie testu w menu
                unmountOnBlur: true // Resetowanie stanu po wyjściu
            }} 
        />
        <Drawer.Screen name="Results" component={ResultsScreen} options={{ title: 'WYNIKI' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;