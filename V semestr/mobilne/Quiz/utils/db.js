// utils/db.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const TESTS_KEY = '@MyApp:tests_full_data';
const LAST_FETCH_KEY = '@MyApp:last_fetch_date';

// Algorytm tasowania Fisher-Yates (Shuffle) 
export const shuffleArray = (array) => {
    if (!array) return [];
    let currentIndex = array.length, randomIndex;
    // Tworzymy kopię, żeby nie mutować oryginału
    const newArray = [...array];

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [newArray[currentIndex], newArray[randomIndex]] = [
            newArray[randomIndex], newArray[currentIndex]];
    }
    return newArray;
};

// Główna funkcja synchronizacji
export const syncTests = async (force = false) => {
    const netState = await NetInfo.fetch();
    
    // 1. Sprawdź czy mamy internet [cite: 25]
    if (!netState.isConnected) {
        console.log('Brak internetu - używam danych lokalnych');
        return await getLocalTests();
    }

    // 2. Sprawdź datę ostatniego pobrania (raz dziennie) 
    const lastFetch = await AsyncStorage.getItem(LAST_FETCH_KEY);
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    if (!force && lastFetch === today) {
        console.log('Dane są aktualne (pobrane dzisiaj).');
        return await getLocalTests();
    }

    // 3. Pobierz nowe dane (Lista + Detale każdego testu)
    try {
        console.log('Rozpoczynam pobieranie danych z serwera...');
        const listResponse = await fetch('https://tgryl.pl/quiz/tests'); // [cite: 23]
        const listData = await listResponse.json();
        
        // Pobieramy detale dla każdego testu (aby działało offline)
        // Promise.all pozwala pobrać wszystko równolegle
        const detailedTests = await Promise.all(listData.map(async (test) => {
            try {
                const detailResponse = await fetch(`https://tgryl.pl/quiz/test/${test.id}`); // [cite: 24]
                const details = await detailResponse.json();
                // Łączymy dane z listy z danymi szczegółowymi (zadaniami)
                return { ...test, ...details }; 
            } catch (e) {
                return test; // Fallback jeśli detal padnie
            }
        }));

        // Zapisz do AsyncStorage
        await AsyncStorage.setItem(TESTS_KEY, JSON.stringify(detailedTests));
        await AsyncStorage.setItem(LAST_FETCH_KEY, today);
        
        return detailedTests;
    } catch (error) {
        console.error('Błąd synchronizacji:', error);
        return await getLocalTests();
    }
};

export const getLocalTests = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(TESTS_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch(e) {
        console.error(e);
        return [];
    }
};