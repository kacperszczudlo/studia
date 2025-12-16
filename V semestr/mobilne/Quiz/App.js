// App.js
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { TouchableOpacity, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

// Import Fontów (Zadanie 1 - Lab 9)
import { useFonts, Oswald_400Regular, Oswald_700Bold } from '@expo-google-fonts/oswald';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';

import HomeScreen from './screens/HomeScreen';
import TestScreen from './screens/TestScreen';
import ResultsScreen from './screens/ResultsScreen';
import WelcomeScreen from './screens/WelcomeScreen';

const AGREEMENT_KEY = '@MyApp:agreementAccepted';

SplashScreen.preventAutoHideAsync();

const DrawerItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={drawerStyles.itemContainer} onPress={onPress}>
    <Ionicons name={icon} size={24} color="#333" style={drawerStyles.icon} />
    <Text style={drawerStyles.itemLabel}>{label}</Text>
  </TouchableOpacity>
);

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ padding: 0 }}>
      <View style={drawerStyles.header}>
        <Ionicons name="bulb-outline" size={50} color="#fff" />
        <Text style={drawerStyles.appTitle}>Quiz App</Text>
      </View>
      <View style={drawerStyles.mainSection}>
        <DrawerItem icon="home-outline" label="Strona Główna" onPress={() => props.navigation.navigate('Home')} />
        <DrawerItem icon="bar-chart-outline" label="Wyniki" onPress={() => props.navigation.navigate('Results')} />
      </View>
    </DrawerContentScrollView>
  );
};

const drawerStyles = StyleSheet.create({
    header: { backgroundColor: '#4A90E2', padding: 20, paddingTop: 40, alignItems: 'center', marginBottom: 10 },
    // Użycie fontu Oswald dla nagłówka
    appTitle: { fontSize: 22, fontFamily: 'Oswald_700Bold', color: '#fff', marginTop: 10 },
    mainSection: { borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10, marginHorizontal: 10 },
    itemContainer: { flexDirection: 'row', alignItems: 'center', padding: 12, marginVertical: 4, borderRadius: 8 },
    icon: { marginRight: 15 },
    // Użycie fontu Lato dla menu
    itemLabel: { fontSize: 16, fontFamily: 'Lato_400Regular', color: '#333' },
});

const Drawer = createDrawerNavigator();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [agreementAccepted, setAgreementAccepted] = useState(false);

  // Ładowanie fontów z Google Fonts
  let [fontsLoaded] = useFonts({
    Oswald_400Regular,
    Oswald_700Bold,
    Lato_400Regular,
    Lato_700Bold,
  });

  useEffect(() => {
    const prepare = async () => {
      try {
        const value = await AsyncStorage.getItem(AGREEMENT_KEY);
        if (value === 'true') setAgreementAccepted(true);
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

  if (!agreementAccepted) {
    const handleAccept = async () => {
      await AsyncStorage.setItem(AGREEMENT_KEY, 'true');
      setAgreementAccepted(true);
    };
    return <WelcomeScreen onAccept={handleAccept} />;
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: { backgroundColor: '#fff', elevation: 0 },
          // Aplikujemy fonty globalnie do nagłówków nawigacji
          headerTitleStyle: { fontFamily: 'Oswald_700Bold', color: '#333' },
          headerLeftContainerStyle: { paddingLeft: 10 }
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'QUIZ APP' }} />
        <Drawer.Screen 
            name="Test" 
            component={TestScreen} 
            options={{ title: 'TEST', drawerItemStyle: { display: 'none' } }} 
        />
        <Drawer.Screen name="Results" component={ResultsScreen} options={{ title: 'WYNIKI' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;