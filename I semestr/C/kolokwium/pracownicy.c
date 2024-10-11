#include <stdio.h>

int main() {
    int iloscPracownikow;

    printf("Podaj ilosc pracownikow: ");
    scanf("%d", &iloscPracownikow);

    FILE *pFile = NULL;
    pFile = fopen("pracownicy.txt", "w");

    if (pFile == NULL) {
        printf("Nie udało się otworzyć pliku\n");
        return -1;
    }

    for (int i = 0; i < iloscPracownikow; i++) {
        char imie[50], nazwisko[50];

        printf("Podaj imie pracownika %d: ", i + 1);
        scanf("%s", imie);

        printf("Podaj nazwisko pracownika %d: ", i + 1);
        scanf("%s", nazwisko);

        fprintf(pFile, "%s %s\n", imie, nazwisko);
    }

    fclose(pFile);
    printf("Pomyślnie zapisano do pliku pracownicy.txt.\n");

    return 0;
}
