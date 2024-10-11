#include <stdio.h>
#define N 100
typedef struct {
    char nazwa[50];
    char kierownik_katedry[50];
    int liczba_pracownikow;
    int liczba_studentow;
} katedra;

typedef struct {
    char nazwa[50];
    char nazwa_skrot[10];
    int liczba_katedr;
    katedra katedry[N];
} wydzial;

int main() {
    wydzial wydzialy = {"Politechniczny",
                        "PT",
                        2,
                        {{"Informatyki", "Daniel Krol", 25, 500},
                         {"Elektrotechniki", "Grzegorz Aksamit", 15, 200}}};

    printf("Wydzial %s (%s):\n", wydzialy.nazwa, wydzialy.nazwa_skrot);
    printf("Liczba katedr: %d\n", wydzialy.liczba_katedr);

    for (int i = 0; i < wydzialy.liczba_katedr; i++) {
        printf("  Katedra %s:\n", wydzialy.katedry[i].nazwa);
        printf("    Kierownik katedry: %s\n",
               wydzialy.katedry[i].kierownik_katedry);
        printf("    Liczba pracownikow: %d\n",
               wydzialy.katedry[i].liczba_pracownikow);
        printf("    Liczba studentow: %d\n",
               wydzialy.katedry[i].liczba_studentow);
    }

    return 0;
}
