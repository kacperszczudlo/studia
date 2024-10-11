#include <stdio.h>
#include <stdbool.h>
#include <string.h>

enum rozmiar {
    MAŁY,
    SREDNI,
    DUZY
};

typedef struct {
    char nazwa[50];
    int ilosc_pestek;
    enum rozmiar wielkosc;
    bool czy_jest_jadalny;
} owoc;

int main() {
    owoc owoce;
    strcpy(owoce.nazwa, "awokado");
    owoce.ilosc_pestek = 10;
    owoce.wielkosc = SREDNI;
    owoce.czy_jest_jadalny = true;

    FILE *pFile = fopen("data.txt", "w");
    if (pFile == NULL) {
        printf("Failed to open file for writing!\n");
        return -1;
    }
    fprintf(pFile, "%s %d %d %d", owoce.nazwa, owoce.ilosc_pestek, owoce.wielkosc, owoce.czy_jest_jadalny ? 1 : 0);
    fclose(pFile);

    FILE *readFile = fopen("data.txt", "r");
    if (readFile == NULL) {
        printf("Failed to open file for reading!\n");
        return -1;
    }
    owoc odczytPliku;
    fscanf(readFile, "%s %d %d %d", odczytPliku.nazwa, &odczytPliku.ilosc_pestek, (int*)&odczytPliku.wielkosc, (int*)&odczytPliku.czy_jest_jadalny);
    fclose(readFile);

    printf("Nazwa: %s\nIlosc pestek: %d\n", odczytPliku.nazwa, odczytPliku.ilosc_pestek);
    switch (odczytPliku.wielkosc) {
    case MAŁY:
        printf("Rozmiar: Mały\n");
        break;
    case SREDNI:
        printf("Rozmiar: Sredni\n");
            break;
    case DUZY:
        printf("Rozmiar: Duży\n");
            break;
    }
    printf("Czy jest jadalny: %s\n", odczytPliku.czy_jest_jadalny ? "Tak" : "Nie");

    return 0;
}
