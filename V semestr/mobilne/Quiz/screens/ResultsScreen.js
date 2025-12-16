// screens/ResultsScreen.js
import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ResultsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Funkcja pobierająca wyniki (Zadanie 2 - Lab 9)
  const fetchResults = async () => {
    try {
      // Pobieranie ostatnich 20 wyników
      const response = await fetch('https://tgryl.pl/quiz/results?last=20'); 
      const data = await response.json();
      setResults(data.reverse()); 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchResults();
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
      <Text style={[styles.cell, styles.nickCell]}>{item.nick}</Text>
      <View style={[styles.cell, styles.pointCell]}>
          <Text style={styles.pointText}>{item.score}/{item.total}</Text> 
          {item.total > 0 && item.score === item.total && <Ionicons name="medal" size={16} color="#FFC300" />}
      </View>
      <Text style={styles.cell}>{item.type}</Text>
      <Text style={styles.cell}>{item.createdOn ? item.createdOn.slice(0, 10) : item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Ionicons name="trophy-outline" size={30} color="#333" />
        <Text style={styles.screenTitle}>Ostatnie Wyniki</Text>
      </View>
      
      <View style={[styles.tableContainer, styles.shadow]}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.nickCell, styles.headerText]}>Nick</Text>
          <Text style={[styles.cell, styles.pointCell, styles.headerText]}>Pkt</Text>
          <Text style={[styles.cell, styles.headerText]}>Typ</Text>
          <Text style={[styles.cell, styles.headerText]}>Data</Text>
        </View>
        
        {loading ? (
            <ActivityIndicator size="large" color="#4A90E2" style={{margin: 20}}/>
        ) : (
            <FlatList
            data={results}
            renderItem={renderItem}
            keyExtractor={(item) => item.id || Math.random().toString()}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#4A90E2" />
            }
            />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F7FA' },
  shadow: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 4 },
  headerBox: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  
  // ZASTOSOWANIE FONTÓW:
  screenTitle: { fontSize: 24, fontFamily: 'Oswald_700Bold', color: '#333', marginLeft: 10 },
  
  tableContainer: { backgroundColor: '#fff', borderRadius: 15, overflow: 'hidden', flex: 1 },
  headerRow: { backgroundColor: '#E6F0FF' },
  
  headerText: { fontFamily: 'Oswald_700Bold', color: '#4A90E2' },
  
  row: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', minHeight: 45 },
  evenRow: { backgroundColor: '#fff' },
  oddRow: { backgroundColor: '#f9f9f9' },
  cell: { flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' },
  
  // Zwykły tekst w tabeli używa Lato
  nickCell: { flex: 2, alignItems: 'flex-start', paddingLeft: 15, fontFamily: 'Lato_700Bold', color: '#333' },
  pointCell: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  pointText: { marginRight: 5, fontFamily: 'Lato_700Bold', color: '#4CAF50' }
});

export default ResultsScreen;