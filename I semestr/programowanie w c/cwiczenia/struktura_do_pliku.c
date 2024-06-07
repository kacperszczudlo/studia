#include <stdio.h>

// Definicja struktury owoc
struct owoc {
    char nazwa[50];
    int ilosc_pestek;
    enum wielkosc {MALY, SREDNI, DUZY} wielkosc;
    int czy_jadalny; // 0 - niejadalny, 1 - jadalny
};

int main() {
    // Inicjalizacja przykładowej struktury owoc
    struct owoc jablko = {"Jabłko", 5, SREDNI, 1};

    // Zapisanie struktury do pliku tekstowego
    FILE *plik = fopen("owoc.txt", "w");
    if (plik == NULL) {
        printf("Błąd podczas otwierania pliku.\n");
        return 1;
    }
    fprintf(plik, "Nazwa: %s\n", jablko.nazwa);
    fprintf(plik, "Ilość pestek: %d\n", jablko.ilosc_pestek);
    fprintf(plik, "Wielkość: %d\n", jablko.wielkosc);
    fprintf(plik, "Czy jest jadalny: %d\n", jablko.czy_jadalny);
    fclose(plik);

    // Odczytanie i wyświetlenie zawartości pliku
    plik = fopen("owoc.txt", "r");
    if (plik == NULL) {
        printf("Błąd podczas otwierania pliku.\n");
        return 1;
    }
    char linia[100];
    printf("Zawartość pliku owoc.txt:\n");
    while (fgets(linia, sizeof(linia), plik) != NULL) {
        printf("%s", linia);
    }
    fclose(plik);

    return 0;
}
