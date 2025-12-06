// screens/ResultsScreen.js
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Struktura danych z konspektu (score i total)
const initialResults = [
  { nick: 'Marek', score: 18, total: 20, type: 'historia', date: '2022-11-22' },
  { nick: 'Anna', score: 15, total: 20, type: 'matematyka', date: '2022-11-21' },
  { nick: 'Piotr', score: 13, total: 20, type: 'fizyka', date: '2022-10-11' },
  { nick: 'Magda', score: 20, total: 20, type: 'historia', date: '2022-12-01' },
];

const ResultsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [results, setResults] = useState(initialResults);

  // Symulacja odświeżania danych (RefreshControl)
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Symulacja ładowania trwa 1.5 sekundy
    setTimeout(() => {
      // Dodajemy losowy wynik po odświeżeniu
      const newResult = {
        nick: 'Gość' + Math.floor(Math.random() * 100), 
        score: Math.floor(Math.random() * 20), 
        total: 20, 
        type: 'losowy', 
        date: new Date().toISOString().slice(0, 10)
      };
      // Dodanie nowego wyniku na początek listy
      setResults(prevResults => [newResult, ...prevResults]);
      setRefreshing(false);
    }, 1500);
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
      <Text style={[styles.cell, styles.nickCell]}>{item.nick}</Text>
      <View style={[styles.cell, styles.pointCell]}>
          {/* Wyświetlanie score/total zgodnie z konspektem */}
          <Text style={styles.pointText}>{item.score}/{item.total}</Text> 
          {item.score === item.total && <Ionicons name="medal" size={16} color="#FFC300" />}
      </View>
      <Text style={styles.cell}>{item.type}</Text>
      <Text style={styles.cell}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Ionicons name="trophy-outline" size={30} color="#333" />
        <Text style={styles.screenTitle}>Globalny Ranking</Text>
      </View>
      
      <View style={[styles.tableContainer, styles.shadow]}>
        {/* Nagłówki tabeli */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.nickCell, styles.headerText]}>Nick</Text>
          <Text style={[styles.cell, styles.pointCell, styles.headerText]}>Wynik</Text>
          <Text style={[styles.cell, styles.headerText]}>Test</Text>
          <Text style={[styles.cell, styles.headerText]}>Data</Text>
        </View>
        
        {/* Lista wyników (FlatList) z RefreshControl */}
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.nick + item.date + index}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#4A90E2" 
            />
          }
        />
      </View>
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
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
  },
  headerRow: {
    backgroundColor: '#E6F0FF', 
  },
  headerText: {
    fontWeight: 'bold',
    color: '#4A90E2', 
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    minHeight: 45,
  },
  evenRow: {
    backgroundColor: '#fff',
  },
  oddRow: {
    backgroundColor: '#f9f9f9',
  },
  cell: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nickCell: {
    flex: 2, 
    alignItems: 'flex-start',
    paddingLeft: 15,
    fontWeight: '600',
    color: '#333',
  },
  pointCell: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
  },
  pointText: {
      marginRight: 5,
      fontWeight: 'bold',
      color: '#4CAF50', 
  }
});

export default ResultsScreen;